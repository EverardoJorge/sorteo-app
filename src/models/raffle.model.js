const { Schema, model } = require('mongoose')

const RaffleSchema = new Schema({
    name: {
        type: String,
        required: [true, 'is required a name.']
    },
    desc: {
        type: String
    },
    total_tickets: {
        type: Number,
        required: [true, 'the total tickets is required']
    },
    price_by_ticket: {
        type: Number,
        required: [true, 'the price by ticket is required']
    },
    sold_tickets: {
        type: String
    },
    reward: {
        type: String
    },
    date: {
        type: String
    },
    users: {
        type: String
    }
})

module.exports = model('Raffle', RaffleSchema)