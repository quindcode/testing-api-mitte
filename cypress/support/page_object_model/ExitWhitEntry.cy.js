export class CreateExit {
  static sendExit(dataToUse, authToken){
    return cy.request({
        method: 'POST',
        url: 'mitte/api/v1/webhooks/usage/end',
        headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
        body: dataToUse,
        failOnStatusCode: false
    }).then((response)=>{
      return response;
    })
  }
}

/* 
import CreateEntry from "./CreateEntry.cy";

const createEntry = new CreateEntry()
class ExitWhitEntry {
    response = null
    time = 10000
    dynamicDateSessionidExit() {
        createEntry.dynamicDateSessionid()
        cy.wait(this.time)
        cy.readFile('cypress/fixtures/mitteIntegrador/entry.json').then((data) => {
            data.currency = "COP"
            data.actualEnd = ""
            data.stayAmount = "200"
            cy.writeFile('cypress/fixtures/mitteIntegrador/payment.json', data)
        })
    }

    departureDate() {
        cy.wait(this.time)
        cy.fixture('mitteIntegrador/payment.json').then((data) => {
            cy.generarfechaactual().then((actualEnd) => {
                data.actualEnd = actualEnd
                cy.writeFile('cypress/fixtures/mitteIntegrador/payment.json', data)
            })
        })
    }

    sendDataOutput() {
        cy.readFile('cypress/fixtures/mitteIntegrador/payment.json').then((data) => {
            cy.loginCognito().then((authToken) => {
                const paymentInfo = {
                    ...data,
                    authToken 
                };
                return cy.createPayment(paymentInfo, authToken)
                    .then((response) => {
                        this.response = response;
                    });
            })
        })
    }

    executeSQLQuery(data, attempt = 1) {
        const MAX_ATTEMPTS = 3;
        const RETRY_DELAY = 30000;
        const serviceMovementSQL = `SELECT * FROM FLYPASS_PDN.TFPS_MVTOS_COBRO_SERVICIOS WHERE CDPUNTO_ATENCION_SER = 198 AND CDNUMERO_TRANSACCION_EXTERNA ='${data.sessionId}' and CDESTADO=1`;
        cy.task('queryDatabase', { query: serviceMovementSQL }).then((movement_result) => {
            if (movement_result.length >= 1) {
                const finalizedTransactionStatus = 1;
                expect(movement_result).to.have.lengthOf(1);
                expect(movement_result[0].CDESTADO).to.be.eq(finalizedTransactionStatus, 'el vehículo sale correctamente de parqueadero con el servicio de Flypass');
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

    validateOutput() {
        cy.readFile('cypress/fixtures/mitteIntegrador/payment.json').then((data) => {
            if (this.response.status !== 200) {
                expect(result.message).not.to.include("PAGO EXITOSO");
            } else {
                cy.wait(30000).then(() => {
                    this.executeSQLQuery(data);
                });
            }
        })
    }
}
export default ExitWhitEntry
*/