const { porcentCalculate, generateId } = require('./utilities');
const set = require('../config/index');

const generateUser = async(dataUsers, ticket, username, lastname, email, phone, state) => {
    let usersJson = JSON.parse(dataUsers);
    let ln = usersJson.length;
    const id = await generateId(ln);
    /**
     * FORMATO ESPERADO PARA LOS BOLETOS
     */
    const ticketsFormat = [{
        status: set.VALID_STATES[1].status,
        ticket
    }];
    const newUser = {
        id,
        username,
        lastname,
        tickets: ticketsFormat,
        email,
        phone,
        state
    };
    usersJson.push(newUser);
    let newDataUsers = JSON.stringify(usersJson);
    return newDataUsers;
};

const searchTicket = async(raffle, nticket) => {
    let jsonSoldTickets = JSON.parse(raffle.sold_tickets);
    let foudTicket = await jsonSoldTickets.find(ticket => ticket == nticket);
    if (foudTicket) {
        let porcent = porcentCalculate(jsonSoldTickets.length, raffle.total_tickets);
        let message = `El boleto ${ticket} ya fue comprado`;
        const ticketFound = {
            raffe,
            porcent,
            message
        };
        return ticketFound;
    }
};

const newSoldTickets = (sold_tickets, ticket) => {
    if (typeof ticket == 'object') {
        const newSoldTickets = JSON.parse(sold_tickets);
        for (let i = 0; i < ticket.length; i++) {
            newSoldTickets.push(ticket[i].nticket);
        }
        return JSON.stringify(newSoldTickets);
    }else{
        const jST = JSON.parse(sold_tickets);
        jST.push(ticket);
        const res = JSON.stringify(jST);
        return res;
    }
};

const updatedTickets = (newRaffle) => {
    const jsonSt = JSON.parse(newRaffle.sold_tickets);
    const porcent = porcentCalculate(jsonSt.length, newRaffle.total_tickets);
    let message = `Boleto comprado`;
    const data = {
        raffle: newRaffle,
        porcent,
        message
    };
    return data;
};

const findUser = (users, userid, raffleID, totalTickets) => {
    return new Promise(async(resolve, reject) => {
        let user = await JSON.parse(users).find(user => user.id == userid);
        if (!user) {
            let message = 'The user not found or no exis, try with other user';
            reject(message);
        }
        const data = {
            user,
            raffleID,
            totalTickets
        };
        resolve(data);
    });
};

const findTickets = (raffleData, body) => {
    return new Promise(async(resolve, reject) => {
        var ticket;
        let ticketsObject = [];
        let formTickets=[];
        var idUSER = body.userId - 1;
        /**
         * CON EL CICLO FOR BUSCAMOS LOS TICKETS PARA VER SI  ESTAN DISPONIBLES
         */
        for (let i = 0; i < body.tickets.length; i++) {
            ticket = JSON.parse(raffleData.sold_tickets).find((ticket) => ticket == body.tickets[i].ticket);
            /**
             * CREAMOS UN OBJETO EL CUAL CONTIENE LA INFORMCION DE LOS BOLETOS, BOLETOS ENCONTRADOS Y NO ENCONTRADOS
             * ESTE OBJETO NOS SERVIRA PARA DAR RESPUESTA AL FRONT-END
             */
            if (!ticket) {
                ticketsObject.push({found: false, nticket: body.tickets[i].ticket, status: body.tickets[i].status});
            }else {
                ticketsObject.push({found: true, nticket: body.tickets[i].ticket, status: body.tickets[i].status});
            }
        }
        /**
         * BUSCAMOS AL USUARIO PARA VER SI EXISTE, DE NO EXISTIR SE ENVIAR UN ERROR EN EL REJECT
        */
        let user = await JSON.parse(raffleData.users).find(user => user.id == body.userId);
        if (!user) {
            return reject("user no exist, try other user");
        }

        let newUsers = await makepush(ticketsObject, raffleData, idUSER);
        let dataTickets = await newSoldTickets(raffleData.sold_tickets , ticketsObject,);
        const dataUpdate = {
            "sold_tickets": dataTickets,
            "users": newUsers
        };
        return resolve(dataUpdate);
    });
};

const makepush = async(ticketsObject, raffleData, idUSER) => {
    var updatedUsers = JSON.parse(raffleData.users);
    for (let i = 0; i < ticketsObject.length; i++) {
        if(ticketsObject[i].found == false){
            updatedUsers[idUSER]['tickets'].push({
                status: ticketsObject[i].status,
                ticket: ticketsObject[i].nticket
            });
        }
    }
    return JSON.stringify(updatedUsers);
};

const findTickets = (raffleData, body) => {
    return new Promise(async(resolve, reject) => {
        var ticket;
        let ticketsObject = [];
        let formTickets=[];
        var idUSER = body.userId - 1;
        /**
         * CON EL CICLO FOR BUSCAMOS LOS TICKETS PARA VER SI  ESTAN DISPONIBLES
         */
        for (let i = 0; i < body.tickets.length; i++) {
            ticket = JSON.parse(raffleData.sold_tickets).find(ticket => ticket == body.tickets[i].ticket)
            /**
             * CREAMOS UN OBJETO EL CUAL CONTIENE LA INFORMCION DE LOS BOLETOS, BOLETOS ENCONTRADOS Y NO ENCONTRADOS
             * ESTE OBJETO NOS SERVIRA PARA DAR RESPUESTA AL FRONT-END
             */
            if (!ticket) {
                ticketsObject.push({found: false, nticket: body.tickets[i].ticket, status: body.tickets[i].status})
            }else {
                ticketsObject.push({found: true, nticket: body.tickets[i].ticket, status: body.tickets[i].status})
            }
        }
        /**
         * BUSCAMOS AL USUARIO PARA VER SI EXISTE, DE NO EXISTIR SE ENVIAR UN ERROR EN EL REJECT
        */
        let user = await JSON.parse(raffleData.users).find(user => user.id == body.userId)
        if (!user) {
            return reject("user no exist, try other user")
        }
        /**
         * CREAMOS UN NUEVO OBJETO DE BOLETOS DISPONIBLES PARA QUE POSTERIORMENTE PUEDAN SER AÑADIDOS
         */
        for (let i = 0; i < ticketsObject.length; i++) {
            if (ticketsObject[i].found == false) {
                JSON.parse(raffleData.users)[idUSER].tickets.push({
                    status: ticketsObject[i].status,
                    ticket: ticketsObject[i].nticket
                })
                console.log(JSON.parse(raffleData.users)[idUSER].tickets);
                // formTickets.push({
                //     status: ticketsObject[i].status,
                //     ticket: ticketsObject[i].nticket
                // })
            }
        }
        // console.log(formTickets);
        /**
         * AÑADIMOS LOS BOLETOS QUE NO SE ENCONTRARON AL RESPECTIVO USUARIO
         */
        // for (let i = 0; i < formTickets.length; i++) {
        //     await JSON.parse(raffleData.users)[idUSER].tickets.push(formTickets[i])
        // }
        console.log(JSON.parse(raffleData.users)[idUSER].tickets);

        return resolve(ticketsObject)
    })
}


module.exports = {
    generateUser,
    searchTicket,
    newSoldTickets,
    updatedTickets,
    findUser,
    findTickets

};