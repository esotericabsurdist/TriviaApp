var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
  question: String,
  answer: String,
  answerID: Number},
  {versionKey: false }
);

var question = mongoose.model('question', questionSchema);
module.exports = question;
