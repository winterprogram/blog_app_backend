let emptycheck = (a) => {
    if (a == undefined || a == null || a == '' || a.length == 0) {
        return true
    } else {
        return false
    }
}

module.exports = {
    emptycheck: emptycheck
}