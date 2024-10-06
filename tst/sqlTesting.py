import sys
  
sys.path.append("..")



from src.databaseQuerys import databaseQuerys

import json, time, requests

db = databaseQuerys()

ret = db.updateCategoryValues(1, 5, 2, 3, 4, 5, 6, 7, "worked2", 800)

print(ret)