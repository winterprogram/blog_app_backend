const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const blogModel = mongoose.model('Blog')

let testRoute = (req, res) => {
    console.log(req.params);
    res.send(req.params)
}

let testquery = (req, res) => {
    console.log(req.query);
    res.send(req.query)
}

let testbody = (req, res) => {
    console.log(req.body);
    res.send(req.body)
}



module.exports = {
    testRoute: testRoute,
    testquery: testquery,
    testbody: testbody
}