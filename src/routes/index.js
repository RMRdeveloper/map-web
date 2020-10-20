const Router = require('express').Router()

Router.get('/', (req, res, next) => {
    res.render('index')
})

module.exports = Router