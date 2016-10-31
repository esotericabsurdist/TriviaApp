var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
require('./db.js');



var user = require("./models/users.js");

app.get('/users', function(req,res){
  //mongoose.model('users').find(function(err, users){
    user.find(function(err, users){
    res.json({users : users});
  });
});



var questions = [
{
    id: 1,
    name: 'Who was the first computer programmer?'
},

];



var currentId = 2;

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

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
