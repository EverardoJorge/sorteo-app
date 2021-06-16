'use strict';
require('dotenv').config();
module.exports = {
    PORT: process.env.PORT,
    URL_DB: process.env.URL_DB,
    VALID_STATES: [
        {
            id:1, 
            status: "Comprado",
        },
        {
            id: 2,
            status: "Pendiente"
        }
    ]
}