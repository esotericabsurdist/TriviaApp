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

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});

/* handle for questions collection in db. collections contain documents.
 each document is an instance of the questionSchema. */
var questions = require("./models/questionSchema.js");
var questionCount = 2; // for testing, we have a 2 questions already.
/*//This should be set on start up by asyn method:

 questions.count({},function(err,numberQuestions){
    questionCount = numberQuestions;
 });


*/

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

    var questionText = questionData.question;
    var answerID = questionData.answerId;

    var questionResonseData = {
      question: questionText,
      answerId: answerID
    }
    res.json(questionResonseData);
  });
});
//==============================================================================
app.post('/question', function(req, res) {
    /* Should receive this format.
    {
      question: "Who led software development for NASA's Apollo lunar mission?",
      answer: "Margaret Hamilton"
    }
    */

    // Get data:
    var questionText = req.body.question;
    var answerText = req.body.answer;
    var answerID = questionCount + 1;

    var newQuestion = {
      question: questionText,
      answer: answerText,
      answerId: answerID
    }

    questions.insert(newQuestion, function(err, data){
      if(err){
        console.log(err)
      }
      else{
        console.log("Inserted New Question");
      }
    });

    res.end();
});
//==============================================================================
app.post('/answer', function(req, res){

    var answerText = req.answer;
    var answerID = req.answerId;

    questions.findOne({'answerID': answerID}, function (err, questionData){
        if( answerText == questionData.answer){
          res.send(true);
        }
        else {
          res.send(false);
        }
    }
});
//==============================================================================
