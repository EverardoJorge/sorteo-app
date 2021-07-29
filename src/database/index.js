const mongoose = require('mongoose');
const set = require('../config/index');

mongoose.connect(set.URL_DB, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(db => console.log('***************** CONNECTED TO DB *****************'))
    .catch(err => console.log(err));