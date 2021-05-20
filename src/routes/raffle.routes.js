'use strict'

const { Router } = require('express')
const router = Router();


router.get('/sorteos', (req, res) => {
    res.render('raffle');
})

router


module.exports = router;