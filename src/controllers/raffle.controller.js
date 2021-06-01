const Raffle = require('../models/raffle.model')


const addRaffle = async(req, res) => {
    const { name, desc, total_tickets, reward, date, price_by_ticket } = req.body;
    const sold_tickets = [];
    let sTickets = JSON.stringify(sold_tickets)
    const newRaffle = new Raffle({
        name,
        desc,
        total_tickets,
        reward,
        date,
        price_by_ticket,
        sold_tickets: `${sTickets}`
    })
    await newRaffle.save()
        .then((raffle) => {
            res.redirect('/sorteos');
        })
        .catch((e) => {
            console.log(e);
            res.redirect('/sorteos')
        })

}

const deleteRaffle = (req, res) => {
    const idRaffle = req.query.idRaffle;
    if (!idRaffle) {
        return res.redirect('/sorteos');
    }

    Raffle.findById(idRaffle)
        .exec()
        .then(async(raffle) => {
            await Raffle.findByIdAndDelete(idRaffle)
            res.redirect('/sorteos')
        })
        .catch((e) => {
            console.log(e);
            res.redirect('/sorteos')
        })

}

const getARaflle = (req, res) => {
    const idRaffle = req.query.idRaffle;
    if (!idRaffle) {
        return res.redirect('/sorteos');
    }
    Raffle.findById(idRaffle).exec()
        .then((raffle) => {

            let jsonSoldTickets = JSON.parse(raffle.sold_tickets)
            let porcent = jsonSoldTickets.length * 100 / raffle.total_tickets;
            let message = '';
            res.render('raffle-info', { raffle, porcent, message });

        })
        .catch((e) => {
            console.log(e);
            res.redirect('/sorteos')
        })


}

const getAllRaffle = async(req, res) => {
    Raffle.find().exec().then((raffles) => {
        res.render('raffle', { raffles });
    }).catch((e) => {
        console.log(e);
        res.redirect('/sorteos')
    })
}

const updateRaffle = async(req, res) => {
    const { idRaffle, nticket } = req.body;

    Raffle.findById(idRaffle).exec()
        .then((raffle) => {
            if (nticket <= raffle.total_tickets && nticket > 0 && typeof nticket != 'number') {
                const jsonSt = JSON.parse(raffle.sold_tickets)
                const foudTicket = jsonSt.find(ticket => ticket == nticket)
                let porcent = jsonSt.length * 100 / raffle.total_tickets;
                let message = `El boleto ${nticket} ya fue comprado`;
                if (foudTicket) {
                    return res.render('raffle-info', { raffle, porcent, message });
                }
                const jST = JSON.parse(raffle.sold_tickets)
                jST.push(nticket)
                const convertString = JSON.stringify(jST)
                const body = {
                    "sold_tickets": `${convertString}`
                };

                Raffle.findByIdAndUpdate(idRaffle, body, {
                    new: true
                }, (e, newRaffle) => {
                    if (e) {
                        console.log(e)
                        return res.json({ e })
                    }
                    const raffle = newRaffle;
                    const jsonSt = JSON.parse(raffle.sold_tickets)
                    const porcent = jsonSt.length * 100 / raffle.total_tickets;
                    let message = `Boleto comprado`;
                    res.render('raffle-info', { raffle, porcent, message });
                })

            } else {
                //let porcent = raffle.sold_tickets * 100 / raffle.total_tickets;
                const jsonSTickets = JSON.parse(raffle.sold_tickets);
                let porcent = jsonSTickets.length * 100 / raffle.total_tickets;
                let message = `El boleto ${nticket} no se encuentra dentro del total de boletos`
                res.render('raffle-info', { raffle, porcent, message });
            }
        })
        .catch((e) => {
            console.log(e);
            res.redirect('/sorteos')
        })

}

module.exports = {
    addRaffle,
    deleteRaffle,
    getARaflle,
    getAllRaffle,
    updateRaffle
}