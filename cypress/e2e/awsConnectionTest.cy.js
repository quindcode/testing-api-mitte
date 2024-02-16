// test.spec.js
const AWS = require('aws-sdk');

describe('Prueba usando credenciales temporales de AWS', () => {
  before(() => {
    // Obtiene las credenciales temporales antes de las pruebas
    cy.task("awsSetTemporaryCredentials").then(credentials => {
      AWS.config.update({
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        sessionToken: credentials.sessionToken
      });
    });
  });

  it('Prueba de llamada a AWS usando credenciales temporales', () => {
    const dynamoDB = new AWS.DynamoDB();
    dynamoDB.listTables({}, (err, data) => {
        if (err) {
          cy.log('Error al listar las tablas:', err);
        } else {
          cy.log('Tablas:', data);
        }
      });
  });
});
