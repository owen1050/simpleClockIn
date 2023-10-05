from databaseQuerys import databaseQuerys
from datetime import datetime

db = databaseQuerys()
db.checkUserIn(1050,"tes")
#users = db.ifUserCheckedInCheckOutAtPlusMinute(1050)
print(db.getListOfUsers())


print(db.checkOutAllUsers())

print(db.getListOfUsers())