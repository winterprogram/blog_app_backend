const response = require('./../libs/response_structure')

let apiToken = (req, res, next) => {
    if (req.params.authtoken || req.body.authtoken || req.query.authtoken) {
        if (req.params.authtoken == "Admin" || req.body.authtoken == 'Admin' || req.query.authtoken == 'Admin') {
            console.log("Success")
            next();

        } else {
            let api = response.apiresponse(true, 'Incorrect token', 403, null)
            res.send(api)
        }
    }
    else {
        let api = response.apiresponse(true, 'AuthToken is missing', 403, null)
        res.send(api)
    }
}

module.exports={
    apiToken:apiToken
}