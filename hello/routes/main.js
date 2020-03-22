const express = require('express');
const app = express();

const test = require('./../controller/blog')


let routes = (app) => {
    // app.get('/home', main.hello);

    // app.get('/test/route/:p1/:p2', test.testRoute)
    // app.get('/test/query', test.testquery)
    app.post('/body',test.createBlog)

}

module.exports = {
    routes: routes
}