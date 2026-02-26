import './commands'

import '@shelex/cypress-allure-plugin';

before(function () {

     cy.loginCognito().then((token) => {
          this.idToken = token;
     });
});