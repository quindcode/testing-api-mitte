Cypress.Commands.add('createEntry', (sessionId, facilityId, actualStart, credentialType, localIdentifier, authToken) => {
     return cy.fixture('mitteIntegrador/entry.json').then((fixture) => {
   //      return cy.createCurrentDate().then((formattedDate) => {
            const variables = {
                sessionId: sessionId,
                facilityId: facilityId,
                actualStart: actualStart,
                credentialType: credentialType,
                localIdentifier: localIdentifier,
            };
            return cy.replaceVariables(fixture, variables).then((requestBody) => {
                return cy.request({
                    method: 'POST',
                    url: 'https://cert-providers.flypass.com.co/mitte/api/v1/webhooks/usage/begin',
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
     //   });
    });
});
