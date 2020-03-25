const logger = require('pino')

let errorlogs = (errorMessage, errorOrigin, errorMethod, priority) => {
    let resp = {
        errorMessage: errorMessage,
        errorOrigin: errorOrigin,
        errorMethod: errorMethod,
        priority: priority
    }
     logger.error(resp)
     return resp
}

module.exports = {
    errorlogs: errorlogs
}