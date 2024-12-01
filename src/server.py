from databaseQuerys import databaseQuerys
from flask import Flask
from flask import request
from flask import send_file
from threading import Thread


import json, time, requests

db = databaseQuerys()
app = Flask(__name__, static_folder='static', static_url_path='')


@app.route('/')
def main():
	return app.send_static_file('main.html')

@app.route('/calendar')
def calendarPage():
	return app.send_static_file('calendar.html')

@app.route('/timer')
def timerPage():
	return app.send_static_file('timer.html')

@app.route('/matchtimer')
def matchTimer():
	return app.send_static_file('matchTime.html')


@app.route('/newUser')
def newUser():
	return app.send_static_file('newUserPage.html')

@app.route('/supersecretpassword')
def adminPage():
	return app.send_static_file('admin.html')

@app.route('/hours')
def hoursPage():
	return app.send_static_file('hours.html')

@app.route('/api/doesUserExist')
def apiDoesUserExist():
	id = int(request.args.get('id', default = -1))
	exists = db.doesUserExist(id)
	print("doesUserExist:", id, exists)
	return str(exists)

@app.route('/api/getMatchTime')
def apiGetMatchTime():
	global matchTime
	print(matchTime)
	if(matchTime == -1):
		return str(-1)
	r = time.time() - matchTime
	print(r)
	return str(int(r))

@app.route('/api/resetMatchTime')
def apiResetMatchTime():
	global matchTime
	matchTime = -1
	return str(0)

@app.route('/api/startMatch')
def apiStartMatch():
	global matchTime
	matchTime  = time.time()
	print(matchTime)
	return str(0)


@app.route('/api/endMatch')
def apiEndMatch():
	global matchTime
	matchTime = -1
	return str(0)


@app.route('/api/addOneMatchNum')
def apiAddOneMatchNum():
	global matchNum
	matchNum = matchNum + 1
	return str(0)

@app.route('/api/subOneMatchNum')
def apiSubOneMatchNum():
	global matchNum
	matchNum = matchNum - 1
	return str(0)

@app.route('/api/getMatchNum')
def apiGetMatchNum():
	global matchNum
	return str(matchNum)

@app.route('/api/isUserCheckedIn')
def apiIsUserCheckedIn():
	id = int(request.args.get('id', default = -1))
	checkedIn = db.isUserCheckedIn(id)
	print("isUserCheckedIn:", id, checkedIn)
	return str(checkedIn)

@app.route('/api/checkUserIn')
def apiCheckUserIn():
	id = int(request.args.get('id', default = -1))
	action = request.args.get('action', default = 'checkIn')
	category = request.args.get('cat', default = '-1')
	checkedIn = db.checkUserIn(id, action, category)
	print("checkUserIn:", id, checkedIn)
	return str(checkedIn)

@app.route('/api/checkUserOut')
def apiCheckUserOut():
	id = int(request.args.get('id', default = -1))
	action = request.args.get('action', default = 'checkOut')
	category = request.args.get('cat', default = '-1')
	checkedOut = db.checkUserOut(id, action, category)
	print("checkUserOut:", id, action, checkedOut, category)
	return str(checkedOut)

@app.route('/api/getUserName')
def getUserName():
	id = int(request.args.get('id', default = -1))
	name = db.getUserName(id)
	print("gotUsername:", id, name)
	return str(name)

@app.route('/api/createUser')
def apiCreateUser():
	id = int(request.args.get('id', default = -1))
	name = request.args.get('name', default = 'nullName')

	createdUser = db.createUser(id, name)
	print("createUser:", id, name, createdUser)
	return str(createdUser)

@app.route('/api/setHoursForCategory')
def setHoursForCategory():
	id = int(request.args.get('id', default = -1))
	hours = request.args.get('hours', default = 0)

	reply = db.setHoursForCategory(id, hours)
	print("setHoursForCategory:", id, hours, reply)
	return str(reply)

@app.route('/image/background')
def getBackgroundImage():
	return send_file("static/background.png", mimetype='image/png')

@app.route('/api/checkOutAllUsers')
def checkOutAllUsers():
	ret = db.checkOutAllUsers()
	print("checkedOutAllUsers:", ret)
	return str(ret)

@app.route('/api/checkOutAllUsersNow')
def checkOutAllUsersNow():
	ret = db.checkOutAllUsersNow()
	print("checkedOutAllUsersNow:", ret)
	return str(ret)

@app.route('/api/getUserTimes')
def getUserTimes():
	id = int(request.args.get('id', default = -1))
	ret = db.getOneUsersTimes(id)
	print("getUserTimes:", ret)
	return str(ret)

@app.route('/api/download/getAllUsersTimes')
def getAllUsersTimes():
	ret = db.writeUserTimesToFile()
	print("got getAllUsersTimes", ret)
	return send_file("data.xls", download_name='data.xls')

@app.route('/api/getAllUsersHours')
def getAllUsersHours():
	ret = db.getAllUsersHours()
	retStr = str(ret)[1:-1]
	print("got getAllUsersHours", retStr)
	return str(retStr)

@app.route('/api/getAllUsers')
def getListOfUsers():
	ret = json.dumps(db.getListOfUsers())
	print("getALlusers:", ret)
	return str(ret)

@app.route('/api/getAllCategories')
def getAllCategories():
	ret = json.dumps(db.getAllCategories())
	print("getAllCategories:", ret)
	return str(ret)

@app.route('/api/manuallyAddEvent')
def manuallyAddEvent():
	id = int(request.args.get('id', default = -1))
	text = request.args.get('text', default = -1)
	cat = int(request.args.get('cat', default = -1))
	daysAgo = int(request.args.get('daysAgo', default = -1))
	hours = float(request.args.get('hours', default = -1))

	ret = db.addSignInEvent(id, text, daysAgo, hours, cat)

	print("manuallyAddEvent:", ret, id, text, daysAgo, hours, cat)
	return str(ret)

@app.route('/api/updateCategoryValues')
def updateCategoryValues():
	id = int(request.args.get('id', default = -1))
	hours = float(request.args.get('hours', default = -1))

	bV = float(request.args.get('bV', default = -1))
	bJV = float(request.args.get('bJV', default = -1))
	bP = float(request.args.get('bP', default = -1))

	busV = float(request.args.get('busV', default = -1))
	busJV = float(request.args.get('busJV', default = -1))
	busPar = float(request.args.get('busPar', default = -1))

	weight = float(request.args.get('weight', default = -1))

	name = request.args.get('name', default = 'no name given')

	ret = db.updateCategoryValues(id, hours, bV, bJV, bP, busV, busJV, busPar, name, weight)

	print("updateCategoryValues:", ret, id, hours, bV, bJV, bP, busV, busJV, busPar, name, weight)
	return str(ret)

if __name__ == '__main__':
	global matchTime
	global matchNum
	matchNum = 0
	matchTime = -1
	app.run(host="0.0.0.0", port=5000)