const Raffle = require('../models/raffle.model')


const addRaffle = async(req, res) => {
    const { name, desc, total_tickets, reward, date } = req.body;
    const newRaffle = new Raffle({
        name,
        desc,
        total_tickets,
        reward,
        date
    })
    await newRaffle.save()
        .then((raffle) => {
            console.log(raffle)
            res.redirect('/sorteos');
        })
        .catch((e) => {
            console.log(e)
        })

}

const deleteRaffle = (req, res) => {

}

const getARaflle = (req, res) => {

}

const getAllRaffle = async(req, res) => {
    Raffle.find().exec().then((raffles) => {
        res.render('raffle', { raffles });
    }).catch((e) => {
        console.log(e);
    })
}

const updateRaffle = (req, res) => {

}

module.exports = {
    addRaffle,
    deleteRaffle,
    getARaflle,
    getAllRaffle,
    updateRaffle
}