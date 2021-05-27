'use strict'

const { Router } = require('express')
const router = Router();
const publicRaffles = require('../controllers/public-raffles.controller')

router.get('/', publicRaffles.homePublicRaffle)

module.exports = router;