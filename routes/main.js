const express = require('express');
const app = express();

const test = require('./../controller/blog')
const apiToken = require('./../auth/token')


let routes = (app) => {
    // app.get('/home', main.hello);

    // app.get('/test/route/:p1/:p2', test.testRoute)
    app.get('/test',apiToken.apiToken, test.getAllBlog)
    /**
 * This is a comment.
 * @api {get} /test This api is used to GET all blogs from the db.
 * @apiSampleRequest http://localhost:3000
 * @apiSuccessExample {json} Success-Response:
 *  {
        "_id": "5e77c8336fe3d40cec248e64",
        "title": "test 11",
        "description": "hi test descripti1",
        "bodyHtml": "<h1>frien11</h1>",
        "views": 0,
        "isPublished": true,
        "category": "te",
        "author": "rr",
        "tags": [],
        "blogId": "5zg4jM",
        "lastModified": "2020-03-22T20:18:59.334Z",
        "created": "2020-03-22T20:18:59.340Z",
        "__v": 0
    }
 * 
 */
    app.get('/select/:blogId', test.selectBlog)
    app.get('/author/:author', test.authorBlog)
    app.post('/body', test.createBlog)
    app.put('/test/:blogId', test.editBlog)
    app.post('/test/:blogId/delete', test.deleteBlog)

}

module.exports = {
    routes: routes
}