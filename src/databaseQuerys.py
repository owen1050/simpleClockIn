import sqlite3
from datetime import datetime
from datetime import timedelta

class databaseQuerys:

	con = -1

	def __init__(self):
		self.con = sqlite3.connect("realDB.db", check_same_thread=False)
		
	def doesUserExist(self, id):
		cur = self.con.cursor()
		try:
			res = cur.execute("SELECT * FROM users where id = " + str(id))
			ret = res.fetchone()
			if(ret == None):
				return 0
			return 1
		except Exception as e:
			print("error in doesUserExist", e)
			return -1

	def isUserCheckedIn(self, id):
		cur = self.con.cursor()
		try:
			res = cur.execute("SELECT * FROM users where id = " + str(id))
			ret = res.fetchone()[2]
			if(ret == 1):
				return 1
			return 0
		except Exception as e:
			print("error in isUserCheckedIn", e)
			return -1

	def checkUserIn(self, id, action):
		cur = self.con.cursor()
		try:
			res = cur.execute("UPDATE users SET checkedIn = 1 where id = " + str(id))
			ret = res.fetchone()
			s = f"INSERT INTO events VALUES ({id},'{datetime.now()}', '{action}', {1})"
			res = cur.execute(s)

			self.con.commit()

			return 0
		except Exception as e:
			print("error in checkUserIn", e)
			return -1
		

	def checkUserOut(self, id, action):
		cur = self.con.cursor()
		try:
			res = cur.execute("UPDATE users SET checkedIn = 0 where id = " + str(id))
			ret = res.fetchone()

			s = f"INSERT INTO events VALUES ({id},'{datetime.now()}', '{action}', {0})"
			res = cur.execute(s)

			self.con.commit()
			print(f"Checked out {id} at {datetime.now()} ")
			return 0
		except Exception as e:
			print("error in checkUserOut", e)
			return -1

	def createUser(self, id, name):
		cur = self.con.cursor()
		try:
			if(self.doesUserExist(id)):
				return 1;
			else:
				res = cur.execute(f"INSERT INTO users VALUES ({id}, '{name}', 0)")
				ret = res.fetchone()
				self.con.commit()
				return 0
		except Exception as e:
			print("error in createUser", e)
			return -1

	def getUserName(self, id):
		cur = self.con.cursor()
		try:
			res = cur.execute("SELECT * FROM users where id = " + str(id))
			ret = res.fetchone()[1]
			return ret
			
		except Exception as e:
			print("error in isUserCheckedIn", e)
			return -1

	def getUsersTimes(self, id):
		cur = self.con.cursor()
		try:
			res = cur.execute("SELECT * FROM events where userID = " + str(id))
			ret = res.fetchall()
			return ret
			
		except Exception as e:
			print("error in getUsersTimes", e)
			return -1

	def getListOfUsers(self):
		cur = self.con.cursor()
		try:
			res = cur.execute("SELECT * FROM users")
			ret = res.fetchall()
			return ret
			
		except Exception as e:
			print("error in getListOfUsers", e)
			return -1

	def getAllUsersTimes(self):
		cur = self.con.cursor()
		try:
			ret = {}
			users = self.getListOfUsers()
			for user in users:
				thisUsersList = []
				userEvents = self.getUsersTimes(user[0])
				for index in range(len(userEvents)):
					event = userEvents[index]
					#print(event)
					id = event[0]
					time = event[1]
					action = event[2]
					signInOut = event[3]
					datetimeOfTime = datetime.fromisoformat(time)

					if(int(signInOut) == 0):
						signInTime = datetime.fromisoformat(userEvents[index-1][1])
						timeSpentCheckedIn = datetimeOfTime - signInTime
						thisUsersList.append((datetimeOfTime.date(), timeSpentCheckedIn))
						#print(db.getUserName(int(id)), datetimeOfTime.date(), timeSpentCheckedIn)
				ret[user[0]] = thisUsersList
			return ret
			
		except Exception as e:
			print("error in getListOfUsers", e)
			return -1

	def ifUserCheckedInCheckOutAtPlusMinute(self, id):
		cur = self.con.cursor()
		try:
			res = cur.execute(f"SELECT MAX(time) from events where userID = {str(id)}")
			time = res.fetchone()[0]

			res = cur.execute("SELECT * FROM users where id = " + str(id))
			ret = res.fetchone()

			if(int(ret[2]) == 0):
				return 0

			res = cur.execute("UPDATE users SET checkedIn = 0 where id = " + str(id))
			ret = res.fetchone()

			s = f"INSERT INTO events VALUES ({id},'{datetime.fromisoformat(str(time)) + timedelta(minutes=1)}', 'forced check out', {0})"
			res = cur.execute(s)
			self.con.commit()

			return time
			
		except Exception as e:
			print(f"error in ifUserCheckedInGetCheckedInTime for id:{id}", e)
			return -1

	def checkOutAllUsers(self):
		cur = self.con.cursor()
		try:
			res = cur.execute("SELECT * FROM users")
			ret = res.fetchall()
			for r in ret:
				id = r[0]
				print("id:" , id)
				self.ifUserCheckedInCheckOutAtPlusMinute(id)
			return 0

		except Exception as e:
			print("error in getListOfUsers", e)
			return -1

	def checkOutAllUsersNow(self):
		cur = self.con.cursor()
		try:
			res = cur.execute("SELECT * FROM users")
			ret = res.fetchall()
			for r in ret:
				id = r[0]
				res2 = cur.execute("SELECT * FROM users where id = " + str(id))
				ret2 = res2.fetchone()

				if(int(ret2[2]) == 0):
					pass
				else:
					self.checkUserOut(id, "forced sign out")
			return 0

		except Exception as e:
			print("error in getListOfUsers", e)
			return -1
