import sys, time
  
sys.path.append("..")



from src.databaseQuerys import databaseQuerys

db = databaseQuerys()
ret = db.getOneUsersTimes(262626)
print(ret)