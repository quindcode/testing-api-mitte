Cypress.Commands.add('createEntry', (sessionId, facilityId, actualStart, credentialType, localIdentifier, authToken) => {
    return cy.fixture('mitteIntegrador/entry.json').then((fixture) => {
        const variables = {
            sessionId: sessionId,
            facilityId: facilityId,
            actualStart: actualStart,
            credentialType: credentialType,
            localIdentifier: localIdentifier,

        };
        cy.log('Datos con los que se genera la entrada:', JSON.stringify(variables))

        return cy.request({
            method: 'POST',
            url: 'https://cert-providers.flypass.com.co/mitte/api/v1/webhooks/usage/begin',
            headers: {
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: variables,
            failOnStatusCode: false
        }).then((response) => {
            // Retorna la respuesta completa de la solicitud
            return response;
        })

    })
})
