const express = require('express')
const app = express()
const mongoose = require('mongoose')
const model = require('./../models/Main')
const randomize = require('randomatic')


const blogModel = mongoose.model('Main');

// create blog 

let createBlog = (req, res) => {

    let blogId = randomize('A0a', 6);
    console.log(blogId)
    let lastModified = Date.now()

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
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log(`some error occured while creating blog`)
            res.send(err)
        } else {
            res.send(result)
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
        } else {
            res.send(result)
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
    blogModel.deleteOne({ 'blogId': req.params.blogId },((err, result) => {
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