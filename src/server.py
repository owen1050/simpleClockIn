from databaseQuerys import databaseQuerys
from flask import Flask
from flask import request
from flask import send_file

#doesUserExist(id):
#isUserCheckedIn(id):
#checkUserIn(id):
#checkUserOut(id):
#createUser(id, name):

db = databaseQuerys()
app = Flask(__name__, static_folder='static', static_url_path='')

@app.route('/')
def main():
	return app.send_static_file('main.html')

@app.route('/newUser')
def newUser():
	return app.send_static_file('newUserPage.html')


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

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)