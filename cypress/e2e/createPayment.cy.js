describe('Create payment Mitte', () => {
  it('Should create a payment for an exit entry on mitte successfully', () => {
    cy.loginCognito().then((authToken) => {
      // cy.createCurrentDate().then((formattedDate) => {
      //   cy.log('fecha:', formattedDate);
      cy.readFile('cypress/support/utils/createPaymentForAnExitEntry.txt').then((content) => {
        const variables = content.split('\n').reduce((acc, line) => {
          const [key, value] = line.split('=');
          acc[key.trim()] = value.trim();
          return acc;
        }, {});
        const { actualEnd, sessionId, facilityId,stayAmountSa, actualStart, credentialType, localIdentifier } = variables;
        return cy.createPayment(actualEnd, sessionId, facilityId,stayAmountSa, actualStart, credentialType, localIdentifier, authToken)
          .then((response) => {
            if (response.status !== 200) {
              expect(result.message).not.to.include("PAGO EXITOSO");
            } else {
              const serviceMovementSQL = `SELECT * FROM FLYPASS_PDN.TFPS_MVTOS_COBRO_SERVICIOS WHERE CDPUNTO_ATENCION_SER = 198 AND CDNUMERO_TRANSACCION_EXTERNA ='${sessionId}' and FECOBRO='${actualEnd}' and CDESTADO=1`;
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
