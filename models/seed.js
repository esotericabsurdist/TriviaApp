'use strict';
var mongoose = require('mongoose');

var  seeder = require('mongoose-seed');

var Question = require("./questionSchema.js");



// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'Model1',
        'documents': [
            { "question": "Who was the first computer programmer",
               "answer": "Ada Lovelace", "answerID": 1
            },
            { "question": "Who led software development for NASA's Apollo lunar mission?",
              "answer": "Margaret Hamilton", "answerID": 2
            }
        ]
    }
];

data.forEach(function(question, answer, id) {
  Question.find({'question1' : question, 'answer1' : answer, 'answerId': id}, function(err, data)
  {
    if (!err && !data.length)
    {
      Question.create({
        question: String,
        answer: String,
        answerID: Number
      });
    }
  });
});





/*
var Todo = require('./models/todo.js');

var todos = [
  'Feed the dog',
  'Walk the kids',
  'Water the birds'
];

todos.forEach(function(todo, index) {
  Todo.find({'name' : todo}, function(err, todos) {
    if (!err && !todos.length) {
      Todo.create({completed: false, name: todo});
    }
  });
});
*/















/*
var seeder = require('mongoose-seed');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/sample-dev', function() {

    // Load Mongoose models
    seeder.loadModels([
        'app/model1File.js',
        'app/model2File.js'
    ]);

    // Clear specified collections
    seeder.clearModels(['Model1', 'Model2'], function() {

        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data);

    });
});

// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'Model1',
        'documents': [
            {
                'name': 'Doc1'
                'value': 200
            },
            {
                'name': 'Doc2'
                'value': 400
            }
        ]
    }
];



*/







//This is what our questionSchema looks like
/*
var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
  question: String,
  answer: String,
  answerID: Number},
  {versionKey: false }
);

var question = mongoose.model('question', questionSchema);
module.exports = question;

*/





/*
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/27017/questions', function() {

    // Load Mongoose models
    seeder.loadModels([
        './questionSchema.js'

    ]);

    // Clear specified collections
    seeder.clearModels(['Model1'], function() {

        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data);

    });
});


*/
