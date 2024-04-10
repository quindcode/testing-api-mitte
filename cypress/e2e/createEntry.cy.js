describe('Create entry Mitte', () => {
  it('Should create a new entry on mitte successfully', () => {
    cy.loginCognito().then((authToken) => {

      cy.readFile('cypress/support/utils/createEntry.txt').then((content) => {
        const variables = content.split('\n').reduce((acc, line) => {
          const [key, value] = line.split('=');
          acc[key.trim()] = value.trim();
          return acc;
        }, {});
        const { sessionId, facilityId, actualStart, credentialType, localIdentifier } = variables;
        return cy.createEntry(sessionId, facilityId, actualStart, credentialType, localIdentifier, authToken)
          .then((response) => {
            if (response.status !== 200) {
              expect(result.message).not.to.include("INGRESO EXITOSO");
            } else {
              const serviceMovementSQL = `SELECT * FROM FLYPASS_PDN.TFPS_MVTOS_COBRO_SERVICIOS WHERE CDPUNTO_ATENCION_SER = 198 AND CDNUMERO_TRANSACCION_EXTERNA ='${sessionId}' and CDESTADO=0`;
              cy.wait(10000);
              return cy.task('queryDatabase', { query: serviceMovementSQL }).then((movement_result) => {
                if (movement_result.length >= 1) {
                  const finalizedTransactionStatus = 0;
                  expect(movement_result).to.have.lengthOf(1);
                  expect(movement_result[0].CDESTADO).to.be.eq(finalizedTransactionStatus);
                }
              });
            }
          });
      });
    });

  });
});
