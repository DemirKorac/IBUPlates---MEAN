// ======================= \\
//        Packages         \\
// ======================= \\
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // Get configurations

var Activity = require('./app/models/activity'); // Mongoose activities model
var User = require('./app/models/user'); // Mongoose users model
var Plates = require('./app/models/plates'); // Plates model
var Actions = require('./app/models/actions'); // Actions model

mongoose.connect(config.database); // Connect to db
app.set('superSecret', config.secret); // secret variable

app.use(bodyParser.urlencoded({extended:false})); // body-parser => we can get info from POST/URL parameters
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app')); // client side

// ======================= \\
//         Routes          \\
// ======================= \\
app.get('/', function (req, res) {
  res.send("Hello! The API is at /api");
});

// ========================================================= \\
//       Get an instance of the router for api routes        \\
// ========================================================= \\
var apiRoutes = express.Router();

//Authentication - No Middleware needed
apiRoutes.post('/authenticate', function(req, res){
	var username = req.body.username;
	var enteredPassword = req.body.password;

	User.findOne({username:username}, function(err, users){
		if(err){
			res.send("Request error");
		}
		if(users){
		bcrypt.compare(enteredPassword, users.password, function(err, resp) {
			if(resp===true){
				const payload = {
					_id: users.id,
					username: users.username,
					firstname: users.firstname,
					lastname: users.lastname,
					admin: users.admin
				};
				var token = jwt.sign(payload, app.get('superSecret'), {
					expiresIn : 60*60*24 //24 hours valid token
				});
				res.setHeader("x-access-token", token);
				res.send({
								success: true,
          			message: 'Successfully Logged in!',
					  token: token,
					  firstname:payload.firstname,
					  lastname:payload.lastname,
					  admin:payload.admin,
					  _id:payload._id,
				});
			}else{
				res.send({
					success: false,
					message: "Wrong password"
				})
			}
		});
		}else{
			res.send({
				user: false
			})
		}
	});
});

// ========================================================== \\
//      Route middleware to authenticate and check token      \\
// ========================================================== \\
apiRoutes.use(function(req, res, next){

	//Check header/URL/POST parameters for token
	var token = req.body.token || req.params.token || req.headers['x-access-token'];

	//Decode token
	if(token){
		// Verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded){			
			if(err){
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			}else{
				// If everything is good, save to request for use in other routes
				req.decoded = decoded;
				//console.log(decoded);	
				next();
			}
		});
	}else{
		// If there is no token
		// Return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
	}
});


// ========================== \\
//    Authenticated routes    \\
// ========================== \\
apiRoutes.get('/', function(req, res){
	res.json({ message: 'Welcome!', /*firstname:req.decoded.firstname*/ });
});

apiRoutes.get('/myinfo', function(req, res){
	res.json(req.decoded);
});

//Get activity by id
apiRoutes.get('/activities/:id', function(req, res){
	Activity.find({detailsid:req.params.id}, function(err, activity){
		if(err)
			res.send(err);
		res.json(activity);
	});
});

//Create new activity
apiRoutes.post('/activities', function(req, res){
	Activity.create( req.body, function(err, activities){
		if(err)
			res.send(err);
		res.json(activities);
	});
});

//Remove selected activity
apiRoutes.delete('/activities/:id', function(req, res){
	Activity.findOneAndRemove({_id:req.params.id}, function(err, activities){
		if(err)
			res.send(err);
		res.json(activities);
	});
});

//Update selected activity
apiRoutes.put('/activities/:id', function(req, res){
	var query = {
		time:req.body.time,
		registration:req.body.registration,
		action:req.body.action,
	};

	Activity.findOneAndUpdate({_id:req.params.id}, query, function(err, activities){
		if(err)
			res.send(err);
		res.json(activities);
	});
});


//Create new registration
apiRoutes.post('/plates', function(req, res){
	var plate = req.body.plate;
	var ownerid = req.body.ownerid;
	var plates = new Plates({plate:plate, ownerid: ownerid});
	Plates.create( plates, function(err, plates){
		if(err)
			res.send(err);
		res.json(plates);
	});
});

//Remove selected registration
apiRoutes.delete('/plates/:id', function(req, res){
	Plates.findOneAndRemove({_id:req.params.id}, function(err, plates){
		if(err)
			res.send(err);
		res.json(plates);
	});
});

//Get Registration by id
apiRoutes.get('/plates/:id', function(req, res){
	Plates.find({ownerid:req.params.id}, function(err, plates){
		if(err)
			res.send(err);
		res.json(plates);
	});
});

//Update selected registration
apiRoutes.put('/plates/:id', function(req, res){
	var query = {
		plate:req.body.plate,
	};

	Plates.findOneAndUpdate({_id:req.params.id}, query, function(err, plates){
		if(err)
			res.send(err);
		res.json(plates);
	});
});

//Get all actions
apiRoutes.get('/actions', function(req, res){
	Actions.find(function(err, actions){
	  if(err)
		res.send(err);
	  res.json(actions);
	})
});

//Create new actions
apiRoutes.post('/actions', function(req, res){
	Actions.create( req.body, function(err, actions){
		if(err)
			res.send(err);
		res.json(actions);
	});
});

//Remove selected action
apiRoutes.delete('/actions/:id', function(req, res){
	Actions.findOneAndRemove({_id:req.params.id}, function(err, actions){
		if(err)
			res.send(err);
		res.json(actions);
	});
});

//Get action by id
apiRoutes.get('/actions/:id', function(req, res){
	Actions.findOne({_id:req.params.id}, function(err, actions){
		if(err)
			res.send(err);
		res.json(actions);
	});
});

//Update selected action
apiRoutes.put('/actions/:id', function(req, res){
	var query = {
		name:req.body.name,
	};

	Actions.findOneAndUpdate({_id:req.params.id}, query, function(err, t){
		if(err)
			res.send(err);
		res.json(t);
	});
});

//Create new user
apiRoutes.post('/users', function(req, res){
	var username = req.body.username;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var admin = false;
	if(req.body.role == "Admin"){
		admin = true;
	}
	
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		var user = new User({username: username, password: hash, firstname: firstname, lastname: lastname, admin: admin});
		User.create(user, function(err, users){
			if(err)
				res.send(err);
			res.json(users);
		});
	});
});


//Get all users
apiRoutes.get('/users', function(req, res){
  User.find(function(err, users){
    if(err)
      res.send(err);
    res.json(users);
  })
});

app.use('/api', apiRoutes);

// ======================= \\
//      Start Server       \\
// ======================= \\
var listener = app.listen(3000, function(){
  console.log("Started at http:localhost:" + listener.address().port + " port");
});