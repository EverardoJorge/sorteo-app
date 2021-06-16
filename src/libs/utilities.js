const generateId = (ln) => {
    if (ln === 0) {
        return 1
    } else {
        return ln + 1;
    }
}

const porcentCalculate = (sold_tickets, total_tickets) => {
    let res = sold_tickets * 100 / total_tickets;
    return res;
}

module.exports = {
    porcentCalculate,
    generateId
}