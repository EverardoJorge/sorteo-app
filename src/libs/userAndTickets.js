const {porcentCalculate, generateId} = require('./utilities')
const set = require('../config/index');

const generateUser = async (dataUsers, tickets, username, lastname, email, phone, state) => {
    let usersJson = JSON.parse(dataUsers)
    let ln = usersJson.length;
    const id = await generateId(ln);
    /**
     * FORMATO ESPERADO PARA LOS BOLETOS
     */
    const ticketsFormat = [
        {
            id: set.VALID_STATES[1].id,
            tickets
        }
    ];

    const newUser = {
        id,
        username,
        lastname,
        tickets: ticketsFormat,
        email,
        phone,
        state
    }

    usersJson.push(newUser)
    let newDataUsers = JSON.stringify(usersJson);
    return newDataUsers;
}



const searchTicket = async(raffle, nticket) => {
    let jsonSoldTickets = JSON.parse(raffle.sold_tickets)
    let foudTicket = await jsonSoldTickets.find(ticket => ticket == nticket)
    if (foudTicket) {
        let porcent = porcentCalculate(jsonSoldTickets.length, raffle.total_tickets)
        let message = `El boleto ${ticket} ya fue comprado`;
        const ticketFound = {
            raffe,
            porcent,
            message
        }

        return ticketFound
    }
}


const newSoldTickets = (sold_tickets, ticket) => {
    const jST = JSON.parse(sold_tickets)
    jST.push(ticket)
    const res = JSON.stringify(jST)
    return res;
}

const updatedTickets = (newRaffle) => {
    const jsonSt = JSON.parse(newRaffle.sold_tickets)
    const porcent = porcentCalculate(jsonSt.length, newRaffle.total_tickets) 
    let message = `Boleto comprado`;

    const data = {
        raffle:newRaffle,
        porcent,
        message
    }
    return data
}

module.exports = {
    generateUser,
    searchTicket,
    newSoldTickets,
    updatedTickets
}