var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
  question: String, answer: 'string'

});

mongoose.model('usermodel', {name: String});
