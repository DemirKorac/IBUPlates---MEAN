//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var PlatesModelSchema = new Schema({
    plate: String,
    ownerid:String,
});

//Export function to create "User" model class
module.exports = mongoose.model('Plates', PlatesModelSchema );