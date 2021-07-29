'use strict';
const { Router } = require('express');
const router = Router();

router.get('/dashboard', (req, res) => {
    res.render('home');
});

module.exports = router;