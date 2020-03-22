// var MongoClient = require('mongodb').MongoClient
//     , assert = require('assert');
// const mongoose = require('mongoose')
let appConfig = {};

appConfig.port = 3000;
appConfig.allowedCorsOrogin = "*"; // this all domians
appConfig.env = "dev";
appConfig.db = {
    uri: "mongodb://127.0.0.1:27017/blogdb"
}

appConfig.appVersion = '/api/v1';

module.exports = {
    port: appConfig.port,
    allowedCorsOrogin: appConfig.allowedCorsOrogin,
    env: appConfig.env,
    db: appConfig.db,
    appVersion: appConfig.appVersion

}