import sqlite3, datetime


con = sqlite3.connect("testDB.db")
cur = con.cursor()

def doesUserExist(id):
	try:
		res = cur.execute("SELECT * FROM users where id = " + str(id))
		ret = res.fetchone()
		if(ret == None):
			return False
		return True
	except:
		return -1

def isUserCheckedIn(id):
	res = cur.execute("SELECT * FROM users where id = " + str(id))
	ret = res.fetchone()[2]
	if(ret == 1):
		return True
	return False

def checkUserIn(id):
	try:
		res = cur.execute("UPDATE users SET checkedIn = 1 where id = " + str(id))
		ret = res.fetchone()
		s = f"INSERT INTO events VALUES ({id},'{datetime.datetime.now()}', {1})"
		res = cur.execute(s)

		con.commit()

		return 0
	except:
		return -1
	

def checkUserOut(id):
	res = cur.execute("UPDATE users SET checkedIn = 0 where id = " + str(id))
	ret = res.fetchone()

	s = f"INSERT INTO events VALUES ({id},'{datetime.datetime.now()}', {0})"
	res = cur.execute(s)

	con.commit()

	return ret

def createUser(id, name):
	try:
		if(doesUserExist(id)):
			return 1;
		else:
			res = cur.execute(f"INSERT INTO users VALUES ({id}, '{name}', 0)")
			ret = res.fetchone()
			con.commit()
			return 0
	except:
		pass



#res = cur.execute("INSERT INTO users VALUES (1053, 'Owen2', 0)")

#res = cur.execute("SELECT * FROM users")
#print(res.fetchall())
#print(checkUserIn(1053))
#print(checkUserOut(1053))
print(createUser(1050, "owen2"))
print(doesUserExist(1050))