import sqlite3

con = sqlite3.connect("testDB.db")
cur = con.cursor()

cur.execute("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, name TEXT, checkedIn INTEGER)")

cur.execute("CREATE TABLE IF NOT EXISTS events(userID INTEGER, time TIMESTAMP, action TEXT, category INTEGER, checkIn INTEGER)")

cur.execute("CREATE TABLE IF NOT EXISTS envVars(id INTEGER, name TEXT, value TEXT)")

cur.execute("CREATE TABLE IF NOT EXISTS categories(  id integer, hours real,  buildVarsityPer real,  buildJVPer real,  buildParPer real,  busVarsityPer real,  busJVPer real,  busParPer real,  name text,  weight real)")

con.commit()