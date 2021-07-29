'use strict'

const { Router } = require('express')
const router = Router();
const raffleController = require('../controllers/raffle.controller')

router.get('/sorteos', raffleController.getAllRaffle)
router.get('/actualizar-rifa', raffleController.getAllRaffle)

router.post('/addraffle', raffleController.addRaffle)

router.post('/actualizar-rifa', raffleController.updateRaffle)

router.get('/sorteo', raffleController.getARaflle)

router.delete('/eliminar-rifa', raffleController.deleteRaffle)
router.get('/eliminar-rifa', raffleController.deleteRaffle)


router.get('/newtickets', raffleController.addtickets)

router.post('/addtickets', raffleController.reqTickets)

module.exports = router;