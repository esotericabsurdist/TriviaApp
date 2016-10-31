var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var PORT = process.env.PORT || 3000;



app.use(express.static(__dirname));
app.use(bodyParser.json());

require('./db.js');


//var db = mongoose.connection;

var question = require("./models/questionSchema.js");

app.get('/question', function(req,res){
  //mongoose.model('users').find(function(err, users){
    mongoose.model('usermodel').find(function(err, usermodel){
      res.send(usermodel);
    });

});







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
