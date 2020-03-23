let errorhandlerglobal = (err, req, res, next) => {
    console.log(`app errorhandlerglobal is called `);
    console.log(err)
    res.send(`some error is occured`)
}

let routeError = (req, res, next) => {
    console.log(`requested route doesn't exist`)
    res.status(404).send(`route doesn't exist`)
}

module.exports = {
    errorhandlerglobal: errorhandlerglobal,
    routeError: routeError
}