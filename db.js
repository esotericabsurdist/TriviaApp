'use strict';

var mongoose = require('mongoose');

mongoose.createConnection('mongodb://localhost:27017/questions', function(err){
  if (err){
    console.log("Failed connecting to Mongodb!");
  } else {
    console.log("Successfully connected to MongoDB!");
  }
});


/*
conn = new Mongo();
db = conn.getDB("/home/tom/Desktop/473Assignment4/data");


*/
