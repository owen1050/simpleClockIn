import sys
  
sys.path.append("..")



from src.databaseQuerys import databaseQuerys

db = databaseQuerys()

ret = db.runOnceToFillNewWvents()
