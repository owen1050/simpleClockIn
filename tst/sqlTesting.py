import sys, time
  
sys.path.append("..")



from src.databaseQuerys import databaseQuerys

db = databaseQuerys()
ret = db.checkUserIn(1050, "hi", 0)
time.sleep(5)
ret = db.checkUserOut(1050, "hi", 0)
