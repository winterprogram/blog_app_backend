/*

Complete the Express application that runs on port 3000 and connects to a Database assignment. 
The database should have a user collection which contains the following user details. 

  a) userId - "user1",
  firstName - "Akshay",
  lastName - "Kumar",
  email - "khiladi@gmail.com"

  b) userId - "user2"
	firstName - "Rajnikanth",
	lastName - "",
	email - "boss@rajnikanth.com"

  The application should have the following api - 
  /users - returns the JSON of all users in the DB
  /users/:userId - returns the object of a single user based on the userId passed

Edit the following files in the given application - 
response.js
app.js

And make this a fully functional REST API with following two kind of responses - 
a) Error response - 
  {‘isError’:true,'status’: 500,'errorMessage':’Some error message’,successMessage:null}
b) Success response - 
{‘isError’:false,'status’: 200,'errorMessage':null,successMessage:’Some result’}

NOTE: You are not required to use app.listen(<port>). This will be handled by the system.

*/

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./User.js');

let db = mongoose.connect('mongodb://testuser:password123@ds149252.mlab.com:49252/assignment', { useMongoClient: true });
const responseLib = require('./responseLib');
const model = mongoose.model('User', userSchema);

let create = (req, res) => {

    let newuser = new model({
        userId: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });
    newuser.save((err, result) => {
        if (err) {

            res.send(err);
        } else {
            // let a = api.apiresponse(false, 'Blog created successfully', 200, result)
            res.send(result);
        }
    });
};

let getAlluser = (req, res) => {
    model.find().select('-_v-_ID').lean().exec((err, result) => {
        if (err) {
            // console.log(`Error while geting list of blog`);
            let a = responseLib.generateResponse(true, 500, 'SomeError occured', err);
            res.send(a);
        } else {
            let a = responseLib.generateResponse(false, 200, 'successMessage', result);
            res.send(a);
        }
    });
}

let search = (req, res) => {
    model.findOne({'userId': req.params.userId},(err,result)=>{
        if (err) {
            // console.log(`Error while geting list of blog`);
            let a = responseLib.generateResponse(true, 500, 'SomeError occured', err);
            res.send(a);
        } else {
            let a = responseLib.generateResponse(false, 200, 'successMessage', result);
            res.send(a);
        }  
    });
};

app.get('/users',getAlluser);
app.get('/users/:userId',search);

module.exports = app;