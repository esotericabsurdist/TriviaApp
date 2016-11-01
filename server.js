var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var PORT = process.env.PORT || 3000;
// mongo====
require('./db.js'); // MongoDB COnnection.
var db = mongoose.connection;
/* handle for questions collection in db. collections contain documents.
 each document is an instance of the questionSchema. */
var questions = require("./models/questionSchema.js");
//==========
app.use(express.static(__dirname));
app.use(bodyParser.json());
//redis=====
var redis = require("redis"); // redis
var redisClient = redis.createClient();
var counts = { "right answers": 0,
                "wrong": 0};
//==========


redisClient.incr("right");



app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});



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
    var answerID = questionData.answerID;

    var questionResonseData = {
      question: questionText,
      answerId: answerID
    }
    res.setHeader('Content-Type', 'application/json');
    res.json(questionResonseData);
  });
});
//==============================================================================
app.post('/question', function(req, res) {
    /* Should receive this format. and insert to mongo db as per schema.
    {
      question: "Who led software development for NASA's Apollo lunar mission?",
      answer: "Margaret Hamilton"
    }
    */

    // Get data:
    var questionText = req.body.question;
    var answerText = req.body.answer;
    var answerId = null;

    questions.find({}).count(function(err, numberQuestions){
        // set proper question id.
        answerId = numberQuestions + 1;

        console.log(answerId);


        // build question to insert based on schema.
        var newQuestion =
        {
          question: questionText,
          answer: answerText,
          answerID: answerId
        }

        // insert to mongoDB, this is asynchronous. The create method adds version keys.
        questions.create(newQuestion, function(err, data){
          if(err){
            console.log(err)
            res.end();
          }
          else{
            console.log("Inserted New Question");
            res.end();
          }
        });
    });
});
//==============================================================================
app.post('/answer', function(req, res){

    var answerText = req.body.answer;
    var answerID = req.body.answerID;

    questions.findOne({'answerID': answerID}, function (err, questionData){

        if( answerText == questionData.answer){
          // data to return
          var responseData = {
            correct: true
          }

          // update the counts of right
          redisClient.incr("right");

          // return the result.
          res.json(responseData);
        }
        else {
          // data to return
          var responseData = {
            correct: false
          }

          // update the counts of wrong
          redisClient.incr("wrong");

          // return the result.
          res.send(responseData);
        }
      }
    );


});
//==============================================================================
app.get('/score', function(req, res){
  /* format response like so:
    {
    right: 2,
    wrong: 1
  }
  */

  // get wrong and right from computer, computer knows all.
  // get from redis is asynchronous so send data in callback.
  redisClient.mget("right", "wrong", function(err, scoreData){
      var rightScore = scoreData[0]; // right score
      var wrongScore = scoreData[1]; // wrong score

      // data to return.
      var score = {
        right: rightScore,
        wrong: wrongScore
      }

      // send score data
      res.json(score);
  });
});
//==============================================================================
