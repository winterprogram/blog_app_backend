const express = require('express')
const model = require('./config/appConfig')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser') //middleware body
const cookieParser = require('cookie-parser') //third party middleware
const errormiddle = require('./middlewares/error_handler_for_routes')
const routelog = require('./middlewares/route_logger')
const apiToken = require('./auth/token')
const http = require('http')
const helmet = require('helmet')

// const port = 3000

// app.get('/', (req, a) => a.send('Hello World!'))
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())


app.use(errormiddle.errorhandlerglobal)
app.use(routelog.routelodger)
app.use(helmet())
const fs = require('fs');

let routePath = './routes'
fs.readdirSync(routePath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        let route = require(routePath + '/' + file)
        console.log(file)
        route.routes(app)
    }
});


app.use(errormiddle.routeError)

let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function (file) {
    if (~file.indexOf('.js')) require(modelsPath + '/' + file)
})



app.listen(model.port, async () => {
    console.log(`Example app listening on port 3000`);
    let db = mongoose.connect(model.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });

})

// const server = http.createServer(app)
// server.listen(model.port)
// server.on('error', onError)
// server.on('listen', onListen)

// function onError(error){
//     if(error.syscall !=='listen'){
//         throw error
//     }
//     switch (error.code){
//         case 'EACCES'
//         process.exit(1)
//         break
//     }
// }
mongoose.set('useCreateIndex', true)
mongoose.connection.on('error', function (err) {
    console.log(`error in database connection`)
    console.log(err)
})

mongoose.connection.on('open', function (err) {
    if (err) {
        console.log(`error in database connection`)
        console.log(err)
    } else {
        console.log('database is connected successfully')
    }
})