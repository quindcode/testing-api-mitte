class ExitWhitZeroPayment {
    time = 1000
    exitAtZero() {
        cy.wait(this.time)
        cy.readFile('cypress/fixtures/mitteIntegrador/entry.json').then((data) => {
            data.currency = "COP"
            data.actualEnd = ""
            data.stayAmount = "0"
            cy.writeFile('cypress/fixtures/mitteIntegrador/payment.json', data)
        })
    }

} export default ExitWhitZeroPayment