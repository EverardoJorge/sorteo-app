const ID = require('./generateId')

const generateUserJson = async(dataUsers, tickets, username, lastname, email, phone, state) => {
    let usersJson = JSON.parse(dataUsers)
    let ln = usersJson.length;
    const id = await ID.generateId(ln);
    const newUser = {
        id,
        username,
        lastname,
        tickets: [tickets],
        email,
        phone,
        state
    }

    usersJson.push(newUser)
    let newDataUsers = JSON.stringify(usersJson);
    return newDataUsers;
}


module.exports = {
    generateUserJson
}