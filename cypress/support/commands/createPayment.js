Cypress.Commands.add('createPayment', (currency, actualEnd, sessionId, facilityId,stayAmount, actualStart, credentialType, localIdentifier,authToken) => {
        return cy.fixture('mitteIntegrador/payment.json').then((fixture) => {
            const variables = {
                currency: currency,
                actualEnd: actualEnd,
                sessionId: sessionId,
                facilityId: facilityId,
                stayAmount: stayAmount,
                actualStart: actualStart,
                credentialType: credentialType,
                localIdentifier: localIdentifier,
            };
            cy.log('Datos con los cuales se genera la salida:', JSON.stringify(variables))            
                return cy.request({
                    method: 'POST',
                    url: 'https://cert-providers.flypass.com.co/mitte/api/v1/webhooks/usage/end',
                    headers: {
                        'Accept': '*/*',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: variables
                }).then((response) => {
                    // Retorna la respuesta completa de la solicitud
                    return response;
                });           
        });
});
