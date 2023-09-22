from databaseQuerys import databaseQuerys
from flask import Flask
from flask import request


#doesUserExist(id):
#isUserCheckedIn(id):
#checkUserIn(id):
#checkUserOut(id):
#createUser(id, name):

db = databaseQuerys()
app = Flask(__name__, static_folder='static', static_url_path='')

@app.route('/')
def test():
	return app.send_static_file('main.html')

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
	checkedIn = db.checkUserIn(id)
	print("checkUserIn:", id, checkedIn)
	return str(checkedIn)

@app.route('/api/checkUserOut')
def apiCheckUserOut():
	id = int(request.args.get('id', default = -1))
	checkedOut = db.checkUserOut(id)
	print("checkUserOut:", id, checkedOut)
	return str(checkedOut)

@app.route('/api/createUser')
def apiCreateUser():
	id = int(request.args.get('id', default = -1))
	name = request.args.get('name', default = 'nullName')

	createdUser = db.createUser(id, name)
	print("createUser:", id, name, createdUser)
	return str(createdUser)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)