Cypress.Commands.add('createEntry', (createInfo, authToken) => {
    const variables = {
        sessionId: createInfo.sessionId,
        facilityId: createInfo.facilityId,
        actualStart: createInfo.actualStart,
        credentialType: createInfo.credentialType,
        localIdentifier: createInfo.localIdentifier,
    };
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
