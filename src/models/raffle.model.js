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
    sold_tickets: [{
        type: Number
    }],
    reward: {
        type: String,
    },
    date: {
        type: String
    }
})

module.exports = model('Raffle', RaffleSchema)