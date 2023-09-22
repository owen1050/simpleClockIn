import sqlite3, datetime

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

	def checkUserIn(self, id):
		cur = self.con.cursor()
		try:
			res = cur.execute("UPDATE users SET checkedIn = 1 where id = " + str(id))
			ret = res.fetchone()
			s = f"INSERT INTO events VALUES ({id},'{datetime.datetime.now()}', {1})"
			res = cur.execute(s)

			self.con.commit()

			return 0
		except Exception as e:
			print("error in checkUserIn", e)
			return -1
		

	def checkUserOut(self, id):
		cur = self.con.cursor()
		try:
			res = cur.execute("UPDATE users SET checkedIn = 0 where id = " + str(id))
			ret = res.fetchone()

			s = f"INSERT INTO events VALUES ({id},'{datetime.datetime.now()}', {0})"
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
				res = cur.execute(f"INSERT INTO users VALUES ({id}, '{name}', 0)")
				ret = res.fetchone()
				self.con.commit()
				return 0
		except Exception as e:
			print("error in createUser", e)
			return -1