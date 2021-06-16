const Raffle = require('../models/raffle.model')
const {generateUser, searchTicket, newSoldTickets, updatedTickets} = require('../libs/userAndTickets')


const addRaffle = async(req, res) => {
    const { name, desc, total_tickets, reward, date, price_by_ticket } = req.body;
    const sold_tickets = [];
    const users = []
    let dataUsers = JSON.stringify(users)
    let sTickets = JSON.stringify(sold_tickets)
    const newRaffle = new Raffle({
        name,
        desc,
        total_tickets,
        reward,
        date,
        price_by_ticket,
        sold_tickets: sTickets,
        users: dataUsers
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
    const { idRaffle, nticket, username, lastname, email, phone, state } = req.body;
    /**
     * BUSCAR EN LA BASE DE DATOS SI HAY UNA RIFA CON EL ID 
     */
    Raffle.findById(idRaffle).exec()
        .then(async(raffle) => {
            if (nticket <= raffle.total_tickets && nticket > 0 && typeof nticket != 'number') {
                
                /**
                 * BUSCA DENTRO DE LA BASE DE DATOS QUE EL BOLETO ESTE DISPONIBLE
                 */
                let ticketFound = await searchTicket(raffle, nticket);
                if (ticketFound) {
                    return res.render('raffle-info', ticketFound);
                }

                const dataUsers = await generateUser(raffle.users, nticket, username, lastname, email, phone, state)
                const dataTickets = await newSoldTickets(raffle.sold_tickets, nticket)

                const body = {
                    "sold_tickets": dataTickets,
                    "users": dataUsers
                };

                Raffle.findByIdAndUpdate(idRaffle, body, {
                    new: true
                }, (e, newRaffle) => {
                    if (e) {
                        console.log(e)
                        return res.json({ e })
                    }
                    const data = updatedTickets(newRaffle)
                    res.render('raffle-info', data);
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