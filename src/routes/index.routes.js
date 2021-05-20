'use strict'
const express = require('express')
const app = express()

app.use('/', require('./home.routes'))
app.use(require('./raffle.routes'))

module.exports = app