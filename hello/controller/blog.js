const express = require('express')
const app = express()
const mongoose = require('mongoose')
const model = require('./../models/Main')
const randomize = require('randomatic')
const blogModel = mongoose.model('Main');

// create blog 

let createBlog = (req, res) => {

    let blogId = randomize('A0!', 6);
    console.log(blogId)
    let lastModified = Date.now()
    
    let blogdata = new blogModel([{
        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.bodyHtml,
        isPublished: true,
        category: req.body.category,
        author: req.body.author,
        lastModified: lastModified
    }
    ])

    let tag = (req.body.tag == undefined && req.body.tag == null && req.body.tag == '') ? req.body.tag.split(',') : []
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

module.exports = {
    createBlog: createBlog
}