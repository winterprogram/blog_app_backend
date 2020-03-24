let moment = require('moment')
let momenttimezone = require('moment-timezone')
let timezone = 'Asia/Kolkata'

let localtime = () =>{
    return momenttimezone.tz(timezone).format('LLLL')
}

module.exports={
    localtime:localtime
}