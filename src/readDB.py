from databaseQuerys import databaseQuerys
from datetime import datetime

db = databaseQuerys()

users = db.getAllUsersTimes()
print(users)