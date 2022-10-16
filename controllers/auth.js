const passport = require('passport')
const bcrypt = require('bcrypt')


exports.getLogin = (req, res) => {
    res.render('login', {
        title: 'Login'
    })
}

exports.postLogin = (req, res) => {
    res.send('This is the login post page.')
}

exports.getLogout = (req, res) => {
    res.send('This is the logout page')
}

exports.getSignup = (req, res) => {
    res.send('This is the signup get page')
}

exports.postSignup = (req, res) => {
    res.send('This is the signup post page')
}