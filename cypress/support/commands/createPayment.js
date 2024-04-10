Cypress.Commands.add('createPayment', (actualEnd, sessionId, facilityId,stayAmountSa, actualStart, credentialType, localIdentifier,authToken) => {
        return cy.fixture('mitteIntegrador/payment.json').then((fixture) => {
            const variables = {
                actualEnd: actualEnd,
                sessionId: sessionId,
                facilityId: facilityId,
                stayAmountSa: stayAmountSa,
                actualStart: actualStart,
                credentialType: credentialType,
                localIdentifier: localIdentifier,
            };
            return cy.replaceVariables(fixture, variables).then((requestBody) => {
                return cy.request({
                    method: 'POST',
                    url: 'https://cert-providers.flypass.com.co/mitte/api/v1/webhooks/usage/end',
                    headers: {
                        'Accept': '*/*',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: requestBody
                }).then((response) => {
                    // Retorna la respuesta completa de la solicitud
                    return response;
                });
            });
        });
});
