import sqlite3, openpyxl
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

	def checkUserIn(self, id, action, categoryId = -1):
		cur = self.con.cursor()
		s = f"UPDATE users SET checkedInTime = '{datetime.now()}' where id = " + str(id)
		res = cur.execute(s)
		res = cur.execute("UPDATE users SET checkedIn = 1 where id = " + str(id))
		
		s = f"INSERT INTO events VALUES ({id},'{datetime.now()}', '{action}', {categoryId}, {1})"
		res = cur.execute(s)

		self.con.commit()

		return 0
		
		

	def checkUserOut(self, id, action, categoryId = -1):
		cur = self.con.cursor()
		try:
			res = cur.execute("UPDATE users SET checkedIn = 0 where id = " + str(id))

			res = cur.execute("SELECT checkedInTime from users where id = " + str(id))
			ret = res.fetchone()
			checkInTime = datetime.fromisoformat(ret[0])

			s = f"INSERT INTO events VALUES ({id},'{datetime.now()}', '{action}', {categoryId}, {0})"
			res = cur.execute(s)

			s = f"INSERT INTO newEvents VALUES ({id},'{checkInTime}', '{(datetime.now() - checkInTime).total_seconds()/3600}', {categoryId}, \"{action}\")"
			res = cur.execute(s)

			self.con.commit()
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
				res = cur.execute(f"INSERT INTO users VALUES ({id}, '{name}', 0, {datetime.now()})")
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
			res = cur.execute("SELECT * FROM newEvents where userID = " + str(id))
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

	def getAllCategories(self):
		cur = self.con.cursor()
		try:
			res = cur.execute("SELECT * FROM categories")
			ret = res.fetchall()
			return ret
			
		except Exception as e:
			print("error in getAllCategories", e)
			return -1

	def getAllUsersTimes(self):
		cur = self.con.cursor()
		try:
			ret = {}
			users = self.getListOfUsers()
			for user in users:
				thisUsersList = []
				userEvents = self.getUsersTimes(user[0])
				#print(userEvents)
				datetimeEvents = []
				for event in range(len(userEvents)):
					datetimeEvents.append((datetime.fromisoformat(userEvents[event][1]), timedelta(hours = float(userEvents[event][2])),  int(userEvents[event][3])))
				
				ret[user[0]] = datetimeEvents
			return ret
			
		except Exception as e:
			print("error in getListOfUsers", e)
			return -1

	def getAllUsersHours(self):
		cur = self.con.cursor()
		
		ret = {}
		users = self.getListOfUsers()
		for user in users:
			totalSec = 0
			userEvents = self.getUsersTimes(user[0])
			for index in range(len(userEvents)):
				event = userEvents[index]
				totalSec = totalSec + event[2]
			ret[user[0]] = totalSec
		return ret	

	def getOneUsersTimes(self, id):
		cur = self.con.cursor()
		try:
			thisUsersList = []
			userEvents = self.getUsersTimes(id)
			for index in range(len(userEvents)):
				event = userEvents[index]
				#print(event)
				id = event[0]
				timeOfSignIn = event[1]
				duration = event[2]
				category = event[3]
				action = event[4]
				datetimeOfTime = datetime.fromisoformat(timeOfSignIn)

				thisUsersList.append((datetimeOfTime.date(), timedelta(hours = duration).total_seconds(), category, str(action)))
				#print(db.getUserName(int(id)), datetimeOfTime.date(), timeSpentCheckedIn)
				
			return thisUsersList
			
		except Exception as e:
			print("error in getListOfUsers", e)
			return -1

	def ifUserCheckedInCheckOutAtPlusMinute(self, id):
		cur = self.con.cursor()
		try:
			res = cur.execute("SELECT * FROM users where id = " + str(id))
			ret = res.fetchone()
			checkedInTime = datetime.fromisoformat(ret[3])
			if(int(ret[2]) == 0):
				return 0

			res = cur.execute("UPDATE users SET checkedIn = 0 where id = " + str(id))
			ret = res.fetchone()

			s = f"INSERT INTO newEvents VALUES ({id},'{checkedInTime}', '{(checkedInTime + timedelta(minutes = 1)).total_seconds()/3600}', {-1}, \"forcedSignOut\")"
			res = cur.execute(s)


			s = f"INSERT INTO events VALUES ({id},'{checkedInTime + timedelta(minutes=1)}', 'forced check out', {-1}, {-1})"
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
			res = cur.execute("SELECT * FROM users where checkedIn = 1")
			ret = res.fetchall()
			for r in ret:
				self.checkUserOut(id, "forced sign out")
			return 0

		except Exception as e:
			print("error in getListOfUsers", e)
			return -1

	def writeUserTimesToFile(self):
		try:
			t = self.getAllUsersTimes()

			wb = openpyxl.Workbook()
			letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
			sheet = wb.active

			sheet['A1'] = 'Name'
			sheet['B1'] = 'ID'
			sheet['C1'] = 'Date'
			sheet['D1'] = 'TimeSpent'

			row = 2
			for user in t:
				name = self.getUserName(user)
				for events in t[user]:
					sheet["A" + str(row)] = name
					sheet["B" + str(row)] = user
					sheet["C" + str(row)] = events[0].strftime("%m/%d/%Y")
					sheet["D" + str(row)] = str(events[1])
					row = row + 1
			wb.save("data.xls")
			return str(t)

			return 0
		except Exception as e:
			print("error in writeUserTimesToFile", e)
			return -1

	def setHoursForCategory(self, id, hours):
		cur = self.con.cursor()
		try:
			res = cur.execute(f"UPDATE categories SET hours='{hours}' WHERE id = '{id}'")
			ret = res.fetchone()
			self.con.commit()
			return 0
		except Exception as e:
			print("error in setHoursForCategory", e)
			return -1

	def addSignInEvent(self, id, action,  daysAgo, hours, categoryId = -1,):
		cur = self.con.cursor()
		try:
			res = cur.execute("UPDATE users SET checkedIn = 1 where id = " + str(id))
			ret = res.fetchone()
			s = f"INSERT INTO newEvents VALUES ({id},'{datetime.now() - timedelta(days = int(daysAgo), hours = float(hours))}', {int(categoryId)}, '{action}')"
			res = cur.execute(s)

			self.con.commit()

			return 0
		except Exception as e:
			print("error in addSignInEvent", e)
			return -1

	def updateCategoryValues(self, id, hours, bV, bJV, bP, busV, busJV, busPar, name, weight):
		if(self.doesCategoryIDExist(id)):
			cur = self.con.cursor()
			try:
				s = f"UPDATE categories SET hours='{hours}',"\
					f"buildVarsityPer='{bV}', "\
					f"buildJVPer='{bJV}', "\
					f"buildParPer='{bP}', "\
					f"busVarsityPer='{busV}', "\
					f"busJVPer='{busJV}', "\
					f"busParPer='{busPar}', "\
					f"name='{name}', "\
					f"weight='{weight}'"\
					f"WHERE id = '{id}'"
					
				res = cur.execute(s)
				ret = res.fetchone()
				self.con.commit()
				return 0
			except Exception as e:
				print("error in setHoursForCategory", e)
				return -1
		else:
			cur = self.con.cursor()
			try:
				s = f"INSERT INTO categories VALUES ('{id}','{hours}',"\
					f"'{bV}', "\
					f"'{bJV}', "\
					f"'{bP}', "\
					f"'{busV}', "\
					f"'{busJV}', "\
					f"'{busPar}', "\
					f"'{name}', "\
					f"'{weight}')"
					
				res = cur.execute(s)
				ret = res.fetchone()
				self.con.commit()
				return 0
			except Exception as e:
				print("error in setHoursForCategory", e)
				return -1

	def doesCategoryIDExist(self, id):
		cur = self.con.cursor()
		try:
			res = cur.execute("SELECT * FROM categories where id = " + str(id))
			ret = res.fetchone()
			if(ret == None):
				return 0
			return 1
		except Exception as e:
			print("error in doesCategoryIDExist", e)
			return -1

	def runOnceToFillNewEvents(self):

		cur = self.con.cursor()
		try:


			allTS = self.getAllUsersTimes()
			for user in allTS:
				thisUsersTimes = allTS[user]
				#print(thisUsersTimes)
				for time in range(len(thisUsersTimes)):
					print(user, thisUsersTimes[time][0], thisUsersTimes[time][1].total_seconds()/3600, thisUsersTimes[time][2])

					s = f"INSERT INTO newEvents VALUES ({user},'{thisUsersTimes[time][0]}', '{thisUsersTimes[time][1].total_seconds()/3600}', {thisUsersTimes[time][2]}, \"new event\")"
					res = cur.execute(s)

			self.con.commit()

			return 0
		except Exception as e:
			print("error in runOnceToFillNewWvents", e)
			return -1

		
