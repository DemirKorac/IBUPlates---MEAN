//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ActivityModelSchema = new Schema({
    time:String,
	registration:String,
	action:String,
	detailsid:String,
	
});

//Export function to create "Activity" model class
module.exports = mongoose.model('Activity', ActivityModelSchema );