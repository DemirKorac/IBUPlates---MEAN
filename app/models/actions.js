//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ActionsModelSchema = new Schema({
    name: String
});

//Export function to create "Actions" model class
module.exports = mongoose.model('Actions', ActionsModelSchema );