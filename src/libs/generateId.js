const generateId = (ln) => {
    if (ln === 0) {
        return 1
    } else {
        return ln + 1;
    }
}

module.exports = {
    generateId
}