'use strict';
var mongoose = require('mongoose');

var  seeder = require('mongoose-seed');

var Question = require("/home/tom/Desktop/473Assignment4/models/questionSchema.js");

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/questions', function() {

    // Load Mongoose models
    seeder.loadModels([
        '/home/tom/Desktop/473Assignment4/models/questionSchema.js'
    ]);
});
// Data array containing seed data - documents organized by Model
var data = [
  {
    "question": "Who was the first computer programmer",
     "answer": "Ada Lovelace",
    "answerID": 1
  },
  {
    "question": "Who led software development for NASA's Apollo lunar mission?",
    "answer": "Margaret Hamilton",
    "answerID": 2
  }
];



// Clear specified collections
seeder.clearModels(['questions'], function() {
    console.log("Going to populate model in seed!");
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data);

});
