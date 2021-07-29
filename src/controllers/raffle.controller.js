<<<<<<< HEAD
const Raffle = require('../models/raffle.model');
const { generateUser, searchTicket, newSoldTickets, updatedTickets, findUser, findTickets } = require('../libs/userAndTickets');
=======
const Raffle = require('../models/raffle.model')
const { generateUser, searchTicket, newSoldTickets, updatedTickets, findUser, findTickets } = require('../libs/userAndTickets')
>>>>>>> 003c94bd686a89612b3dbe062fc4fdbab2000cd0


const addRaffle = async (req, res) => {
    let body = req.body;
<<<<<<< HEAD
    console.log(body);
=======
    console.log(body)
>>>>>>> 003c94bd686a89612b3dbe062fc4fdbab2000cd0
    const { name, desc, total_tickets, reward, date, price_by_ticket } = req.body;
    const sold_tickets = [];
    const users = [];
    let dataUsers = JSON.stringify(users);
    let sTickets = JSON.stringify(sold_tickets);
    const newRaffle = new Raffle({
        name,
        desc,
        total_tickets,
        reward,
        date,
        price_by_ticket,
        sold_tickets: sTickets,
        users: dataUsers
    });
    await newRaffle.save()
        .then((raffle) => {
            res.redirect('/sorteos');
        })
        .catch((e) => {
            console.log(e);
            res.redirect('/sorteos')
        });

};

const deleteRaffle = (req, res) => {
    const idRaffle = req.query.idRaffle;
    if (!idRaffle) {
        return res.redirect('/sorteos');
    }
    Raffle.findById(idRaffle)
        .exec()
        .then(async (raffle) => {
<<<<<<< HEAD
            await Raffle.findByIdAndDelete(idRaffle);
            res.redirect('/sorteos');
=======
            await Raffle.findByIdAndDelete(idRaffle)
            res.redirect('/sorteos')
>>>>>>> 003c94bd686a89612b3dbe062fc4fdbab2000cd0
        })
        .catch((e) => {
            console.log(e);
            res.redirect('/sorteos');
        })

}

const getARaflle = (req, res) => {
    const idRaffle = req.query.idRaffle;
    if (!idRaffle) {
        return res.redirect('/sorteos');
    }
    Raffle.findById(idRaffle).exec()
        .then((raffle) => {
            let jsonSoldTickets = JSON.parse(raffle.sold_tickets);
            let porcent = jsonSoldTickets.length * 100 / raffle.total_tickets;
            let message = '';
            res.render('raffle-info', { raffle, porcent, message });
        })
        .catch((e) => {
            console.log(e);
            res.redirect('/sorteos');
        })


}

const getAllRaffle = async (req, res) => {
<<<<<<< HEAD
    Raffle.find()
            .exec()
            .then((raffles) => {
                res.render('raffle', { raffles });
            })
            .catch((e) => {
                console.log(e);
                res.redirect('/sorteos');
            });
=======
    Raffle.find().exec().then((raffles) => {
        res.render('raffle', { raffles });
    }).catch((e) => {
        console.log(e);
        res.redirect('/sorteos')
    })
>>>>>>> 003c94bd686a89612b3dbe062fc4fdbab2000cd0
}

const updateRaffle = async (req, res) => {
    const { idRaffle, nticket, username, lastname, email, phone, state } = req.body;
    /**
     * BUSCAR EN LA BASE DE DATOS SI HAY UNA RIFA CON EL ID
     */
    Raffle.findById(idRaffle).exec()
        .then(async (raffle) => {
            if (nticket <= raffle.total_tickets && nticket > 0 && typeof nticket != 'number') {
                /**
                 * BUSCA DENTRO DE LA BASE DE DATOS QUE EL BOLETO ESTE DISPONIBLE
                 */
                let ticketFound = await searchTicket(raffle, nticket);
                if (ticketFound) {
                    return res.render('raffle-info', ticketFound);
                }
                /**
                 * FUNCIONES PARA GENERAR LA INFORMACION A ACTUALIZAR
                 */
                const dataUsers = await generateUser(raffle.users, nticket, username, lastname, email, phone, state);
                const dataTickets = await newSoldTickets(raffle.sold_tickets, nticket);
                const body = {
                    "sold_tickets": dataTickets,
                    "users": dataUsers
                };
                /**
                 * FUNCION QUE ACTUALIZA LA INFORMACION DE LA BASE DE DATOS
                 * RECIVE UN CALLBACK CON 2 PARAMETROS UN ERROR Y UNA RESPUESTA POSITIVA
                 */
                Raffle.findByIdAndUpdate(idRaffle, body, {
                    new: true
                }, (e, newRaffle) => {
                    if (e) {
                        console.log(e);
                        return res.json({ e });
                    }
                    const data = updatedTickets(newRaffle)
                    res.render('raffle-info', data);
                });

            } else {
                const jsonSTickets = JSON.parse(raffle.sold_tickets);
                let porcent = jsonSTickets.length * 100 / raffle.total_tickets;
                let message = `El boleto ${nticket} no se encuentra dentro del total de boletos`;
                res.render('raffle-info', { raffle, porcent, message });
            }
        })
        .catch((e) => {
            console.log(e);
            res.redirect('/sorteos')
        });

}

const addtickets = (req, res) => {
    const id = req.query.id;
    const userid = req.query.userid;
    if (!id) {
        return res.redirect(`/sorteo?idRaffle=${id}`);
    }
    Raffle.findById(id).exec()
        .then((raffle) => {
            return findUser(raffle.users, userid, id, raffle.total_tickets);
        })
        .then((data) => {
            console.log(data)
            res.render('add-tickets', data);
        })
        .catch((e) => {
            console.log(e);
            res.redirect(`/sorteo?idRaffle=${id}`);
        });
}

const reqTickets = (req, res) => {
    const { raffleId, tickets, userId } = req.body;
    const body = { tickets, userId };
    Raffle.findById(raffleId)
        .exec()
        .then((raffle) => {
            return findTickets(raffle, body);
        })
<<<<<<< HEAD
        .then((body) => {
            /**
             * ACTUALIZAR LA INFORMACION
             */
            return Raffle.findByIdAndUpdate(raffleId, body, {new: true});
        }).then(newRaffleData => {

            console.log(newRaffleData);
            /**
             * RESPUESTA AL BACK-END DESPUES DE ACTUALIZAR AL USUARIO
             */
             res.json({
                ok: true,
                message: "Todo salio bien"
=======
        .then((dataTickets) => {
            // console.log(dataTickets);
            /**
             * ACTUALIZAR LA INFORMACION
             */

            /**
             * RESPUESTA AL BACK-END DESPUES DE ACTUALIZAR AL USUARIO
             */
            res.json({
                ok: true,
                message: "there is not a error",
                dataTickets
>>>>>>> 003c94bd686a89612b3dbe062fc4fdbab2000cd0
            });
        })
        .catch((e) => {
            console.log(e)
        })
};

module.exports = {
    addRaffle,
    deleteRaffle,
    getARaflle,
    getAllRaffle,
    updateRaffle,
    addtickets,
    reqTickets
}