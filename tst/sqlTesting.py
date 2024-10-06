import sys
  
sys.path.append("..")



from src.databaseQuerys import databaseQuerys

import json, time, requests

db = databaseQuerys()

ret = db.checkOutAllUsersNow()

print(ret)