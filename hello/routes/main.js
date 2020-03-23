const express = require('express');
const app = express();

const test = require('./../controller/blog')


let routes = (app) => {
    // app.get('/home', main.hello);

    // app.get('/test/route/:p1/:p2', test.testRoute)
    app.get('/test', test.getAllBlog)
    app.get('/select/:blogId', test.selectBlog)
    app.get('/author/:author', test.authorBlog)
    app.post('/body', test.createBlog)
    app.put('/test/:blogId', test.editBlog)
    app.post('/test/:blogId/delete', test.deleteBlog)

}

module.exports = {
    routes: routes
}