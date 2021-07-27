const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
const set = require('./src/config/index')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(require('./src/routes/index.routes'))
app.listen(set.PORT, async() => {
    await require('./src/database/index')
    console.log(`Server runnig on the port ${set.PORT}`);
})