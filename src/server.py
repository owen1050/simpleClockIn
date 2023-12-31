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

@app.route('/newUser')
def newUser():
	return app.send_static_file('newUserPage.html')

@app.route('/admin')
def adminPage():
	return app.send_static_file('admin.html')


@app.route('/api/doesUserExist')
def apiDoesUserExist():
	id = int(request.args.get('id', default = -1))
	exists = db.doesUserExist(id)
	print("doesUserExist:", id, exists)
	return str(exists)

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
	checkedIn = db.checkUserIn(id, action)
	print("checkUserIn:", id, checkedIn)
	return str(checkedIn)

@app.route('/api/checkUserOut')
def apiCheckUserOut():
	id = int(request.args.get('id', default = -1))
	action = request.args.get('action', default = 'checkOut')
	checkedOut = db.checkUserOut(id, action)
	print("checkUserOut:", id, action, checkedOut)
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

@app.route('/api/download/getAllUsersTimes')
def getAllUsersTimes():
	ret = db.writeUserTimesToFile()
	print("got getAllUsersTimes", ret)
	return send_file("data.xls", download_name='data.xls')

@app.route('/api/getAllUsers')
def getListOfUsers():
	ret = json.dumps(db.getListOfUsers())
	print("getALlusers:", ret)
	return str(ret)

@app.route('/owen/flashLights')
def flashLights():
	thread = Thread(target = flashLightsFunc)
	thread.start()
	return str("done")

def flashLightsFunc():
	for i in range(4):
		#on lightson https://maker.ifttt.com/trigger/lightson/json/with/key/Bf91G_MsjKUzsWqRs5N7n
		requests.get('https://maker.ifttt.com/trigger/lightson/json/with/key/Bf91G_MsjKUzsWqRs5N7n')
		time.sleep(1)
		#off https://maker.ifttt.com/trigger/Lightsoff/with/key/Bf91G_MsjKUzsWqRs5N7n
		requests.get('https://maker.ifttt.com/trigger/Lightsoff/with/key/Bf91G_MsjKUzsWqRs5N7n')
		time.sleep(1)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)