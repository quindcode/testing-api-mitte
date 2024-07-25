class CreateEntry {

  response = null

  dynamicDateSessionid() {
    cy.fixture('mitteIntegrador/entry.json').then((data) => {
      //Genero la fecha del dia actual
      cy.generarfechaactual().then((actualStart) => {
        data.actualStart = actualStart;
        //Genero sesionID 
        cy.getUniqueSessionId().then((sessionId) => {
          data.sessionId = sessionId
          cy.writeFile('cypress/fixtures/mitteIntegrador/entry.json', data)
        })
      })
    })
  }

  sendData(incorrect) {
    cy.readFile('cypress/fixtures/mitteIntegrador/entry.json').then((data) => {
      //Genero token para postman
      cy.loginCognito().then((authToken) => {
        const createInfo = {
          ...data,
          authToken
        }
        return cy.createEntry(createInfo, authToken)
          .then((response) => {
            this.response = response
            if (incorrect) {
              if (this.response.status == 400) {
                expect(response.body).to.have.property('messages');
                expect(response.body.messages).to.have.property('error');
                expect(response.body.messages.error).to.include('Error al enviar entrada.');
              } else {
                throw new Error('La respuesta no tiene un status 400');
              }
            }
          })
      })
    })
  }

  sendEntry() {
    this.sendData(false)
  }

  executeSQLQuery(data, attempt = 1) {
    const MAX_ATTEMPTS = 3;
    const RETRY_DELAY = 30000;
    const serviceMovementSQL = `SELECT * FROM FLYPASS_PDN.TFPS_MVTOS_COBRO_SERVICIOS WHERE CDPUNTO_ATENCION_SER = 198 AND CDNUMERO_TRANSACCION_EXTERNA ='${data.sessionId}' and CDESTADO=0`;
    cy.task('queryDatabase', { query: serviceMovementSQL }).then((movement_result) => {
      if (movement_result.length >= 1) {
        const finalizedTransactionStatus = 0;
        expect(movement_result).to.have.lengthOf(1);
        expect(movement_result[0].CDESTADO).to.be.eq(finalizedTransactionStatus, 'el vehículo ingresa correctamente al parqueadero con el servicio de Flypass');
      } else if (attempt < MAX_ATTEMPTS) {
        cy.log(`Intento ${attempt} fallido. Reintentando en ${RETRY_DELAY / 1000} segundos...`);
        cy.wait(RETRY_DELAY).then(() => {
          this.executeSQLQuery(data, attempt + 1);
        });
      } else {
        expect(movement_result).to.have.lengthOf.at.least(1, 'No se encontraron registros con CDESTADO=0 después de 3 intentos');
      }
    });
  }

  validateResponseCorrect() {
    cy.readFile('cypress/fixtures/mitteIntegrador/entry.json').then((data) => {
      if (this.response.status !== 200) {
        expect(result.message).not.to.include("INGRESO EXITOSO");
      } else {
        cy.wait(30000).then(() => {
          this.executeSQLQuery(data);
        });
      }
    });
  }


  validateResponseIncorrect() {
    this.sendData(true)
  }


}

export default CreateEntry