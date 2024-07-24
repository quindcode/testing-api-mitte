Cypress.Commands.add('getUniqueSessionId', () => {
    const sessionId = Math.random().toString(8).slice(2)
    return sessionId;
})

Cypress.Commands.add('generarfechaactual', () => {
    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0');
    }

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = padTo2Digits(date.getMonth() + 1);
        const day = padTo2Digits(date.getDate());
        const hours = padTo2Digits(date.getHours());
        const minutes = padTo2Digits(date.getMinutes());
        const seconds = padTo2Digits(date.getSeconds());

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

    const actualStart = formatDate(new Date());
    return actualStart;
})


