import sqlite3

con = sqlite3.connect("realDB.db")
cur = con.cursor()

cur.execute("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, name TEXT, checkedIn INTEGER)")

cur.execute("CREATE TABLE IF NOT EXISTS events(userID INTEGER, time TIMESTAMP, checkIn INTEGER)")