class ExitWhithoutEntry {
    time = (10000)
    exit() {
        cy.fixture('mitteIntegrador/payment.json').then((data) => {
            //Genero sesisionID
            cy.getUniqueSessionId().then((sessionId) => {
                data.sessionId = sessionId
                //Genero fecha y hora de entrada
                cy.generarfechaactual().then((actualStart) => {
                    data.actualStart = actualStart
                })
                cy.wait(this.time)
                //Genero fecha hora de salida y valor de cobro
                cy.generarfechaactual().then((actualEnd) => {
                    data.actualEnd = actualEnd
                    data.stayAmount = "200"
                })
                cy.writeFile('cypress/fixtures/mitteIntegrador/payment.json', data)
            })
        })
    }
} export default ExitWhithoutEntry