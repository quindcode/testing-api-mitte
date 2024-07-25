Cypress.Commands.add('createPayment', (paymentInfo, authToken) => {
    const variables = {
        currency: paymentInfo.currency,
        actualEnd: paymentInfo.actualEnd,
        sessionId: paymentInfo.sessionId,
        facilityId: paymentInfo.facilityId,
        stayAmount: paymentInfo.stayAmount,
        actualStart: paymentInfo.actualStart,
        credentialType: paymentInfo.credentialType,
        localIdentifier: paymentInfo.localIdentifier,
    };
    return cy.request({
        method: 'POST',
        url: 'https://cert-providers.flypass.com.co/mitte/api/v1/webhooks/usage/end',
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
    });
});
