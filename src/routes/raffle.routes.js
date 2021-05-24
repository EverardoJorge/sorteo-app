'use strict'

const { Router } = require('express')
const router = Router();
const raffleController = require('../controllers/raffle.controller')

router.get('/sorteos', raffleController.getAllRaffle)

router.post('/addraffle', raffleController.addRaffle)

router.put('/actualizar-rifa', raffleController.updateRaffle)

router.get('/sorteo', raffleController.getARaflle)

router.delete('/eliminar-rifa', raffleController.deleteRaffle)



module.exports = router;