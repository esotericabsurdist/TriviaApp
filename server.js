var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var PORT = process.env.PORT || 3000;
require('./db.js'); // MongoDB COnnection.
var db = mongoose.connection;
app.use(express.static(__dirname));
app.use(bodyParser.json());



/* handle for questions collection in db. collections contain documents.
 each document is an instance of the questionSchema. */
var questions = require("./models/questionSchema.js");



//==============================================================================
app.get('/question', function(req,res){

  /*  Response should have this format:
    {
      question: "Who was the first computer programmer?",
      answerId: 1
    }
  */
  questions.findOne({'answerID': 1}, function (err, questionData){
    if (err) return handleError(err);
    console.log(questionData);

    var questionText = questionData.question;
    var answerID = questionData.answerID;
    var questionResonseData = {
      question: questionText,
      answerId: answerID
    }
    res.json(questionResonseData);
  });

});
//==============================================================================










app.get('/questions', function(req, res) {
    res.send({ questions: questions });
});

app.post('/questions', function(req, res) {
    var questionType = req.body.name;
    currentId++;

    questions.push({
        id: currentId,
        name: questionType
    });

    res.send('Successfully created question!');
});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
