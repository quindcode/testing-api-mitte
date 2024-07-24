Cypress.Commands.add('loginCognito', () => {
    // Retorna la promesa que maneja toda la lógica de la solicitud
    return cy.fixture('login/loginCognito.json').then((loginCognito) => {
        // Realiza la solicitud POST para iniciar sesión
        return cy.request({
            method: 'POST',
            url: 'https://cognito-idp.us-east-1.amazonaws.com/',
            headers: {
                'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
                'Content-Type': 'application/x-amz-json-1.1'
            },
            body: loginCognito
        }).then((response) => {
            // Retorna la respuesta completa de la solicitud
            
            return response.body.AuthenticationResult.IdToken;
            
        });
        
    });
});
