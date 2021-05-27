'use strict'
const express = require('express')
const app = express()

app.use('/', require('./home.routes'))
app.use(require('./raffle.routes'))
app.use(require('./public-raffles.routes'))

module.exports = app