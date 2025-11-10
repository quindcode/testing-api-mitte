Cypress.Commands.add('loginCognito', () => {
    const username = Cypress.env('COGNITO_USERNAME');
    const password = Cypress.env('COGNITO_PASSWORD');
    const clientId = Cypress.env('COGNITO_CLIENT_ID');

        const requestBody = {
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
        },
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: clientId,
    };

        return cy.request({
            method: 'POST',
            url: 'https://cognito-idp.us-east-1.amazonaws.com/',
            headers: {
                'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
                'Content-Type': 'application/x-amz-json-1.1'
            },
            body: requestBody
        }).then((response) => {
            return response.body.AuthenticationResult.IdToken;
        });    
});
