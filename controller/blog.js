const express = require('express')
const app = express()
const mongoose = require('mongoose')
const model = require('./../models/Main')
const randomize = require('randomatic')
const api = require('./../libs/response_structure')
const time = require('./../libs/timezone')
const repete = require('./../libs/repete')

const blogModel = mongoose.model('Main');

// create blog 

let createBlog = (req, res) => {

    let blogId = randomize('A0a', 6);
    console.log(blogId)
    let lastModified = time.localtime()

    let blogdata = new blogModel({
        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.bodyHtml,
        isPublished: true,
        category: req.body.category,
        author: req.body.author,
        lastModified: lastModified
    }
    )
    // console.log(blogdata)


    let tag = (req.body.tag != undefined && req.body.tag != null && req.body.tag != '') ? req.body.tag.split(',') : []
    blogdata.tag = tag;

    blogdata.save((err, result) => {
        if (err) {
            console.log(`some error occured while creating blog`)
            let b = api.apiresponse(true, 'Something is broken', 500, err)
            res.send(b)
        } else if (repete.emptycheck(result)) {
            let a = api.apiresponse(true, 'Blog is not created', 404, result)
            console.log(`some error occured while creating blog`)
            res.send(a)
        } else {
            let a = api.apiresponse(false, 'Blog created successfully', 200, result)
            res.send(a)
        }
    })
}

// getallblog
let getAllBlog = (req, res) => {
    blogModel.find().select('-_v-_ID').lean().exec((err, result) => {
        if (err) {
            console.log(`Error while geting list of blog`);
            res.send(err)
        } else {
            res.send(result)
        }
    })
}

// select the blog by id
let selectBlog = (req, res) => {
    blogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {
        if (err) {
            console.log(`error while selecting blog`)
            let b = api.apiresponse(true, 'Something is broken', 500, null)
            res.send(b)
        } else if (repete.emptycheck(result)) {
            let b = api.apiresponse(true, 'Something is broken', 404, result)
            res.send(b)
        }
        else {
            let a = api.apiresponse(false, 'Blog exist', 200, result)
            res.send(a)
        }
    })
}

// select blog by author

let authorBlog = (req, res) => {
    blogModel.findOne({ 'author': req.params.author }, (err, result) => {
        if (err) {
            console.log(`error while selecting by author`)
        } else {
            res.send(result)
        }
    })
}

// update the blog

let editBlog = (req, res) => {
    let option = req.body
    blogModel.updateOne({ 'blogId': req.params.blogId }, option, { multi: true }).exec((err, result) => {
        if (err) {
            console.log(`error while editing blog`)
        } else {
            res.send(result)
        }
    })
}

// delete blog

let deleteBlog = (req, res) => {
    blogModel.deleteOne({ 'blogId': req.params.blogId }, ((err, result) => {
        if (err) {
            console.log(`error while deleting the blog`)
        } else {
            res.send(result)
        }
    }))
}


module.exports = {
    createBlog: createBlog,
    getAllBlog: getAllBlog,
    selectBlog: selectBlog,
    authorBlog: authorBlog,
    editBlog: editBlog,
    deleteBlog: deleteBlog

}