var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
  name: String

});

var model = mongoose.model('user', questionSchema);
module.exports = model;
