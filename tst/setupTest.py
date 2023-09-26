import sqlite3

con = sqlite3.connect("testDB.db")
cur = con.cursor()

cur.execute("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, name TEXT, checkedIn INTEGER)")

cur.execute("CREATE TABLE IF NOT EXISTS events(userID INTEGER, time TIMESTAMP, action TEXT, checkIn INTEGER)")

con.commit()