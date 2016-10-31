var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
  question: String, answer: String, answerID: Number
});

var question = mongoose.model('question', questionSchema);
module.exports = question;
