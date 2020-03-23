const express = require('express');
const app = express();

let hello = (req, res) => res.send('hello')


module.exports = {
    hello: hello
}