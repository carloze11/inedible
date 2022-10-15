const express = require('express')
const app = express()
const expressLayouts = require('express-layouts')
const methodOverride = require('method-override')
const mongoose = require('mongoose')



app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layout/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))


const indexRouter = require('./routes/index')

app.get('/', indexRouter)

app.listen(3000, () => {
    console.log(`Server running at port 3000`)
})