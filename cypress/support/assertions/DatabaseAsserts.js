import { DATABASE_CONSTANTS } from "../constants/database.constants";

export class DatabaseAsserts {

    /**
   * Valida que una transacción de ENTRADA exista (CDESTADO=0).
   * @param {string} sessionId 
   */
    static validateTransactionEntry(sessionId) {
        this.validateTransactionCreated(sessionId,
            DATABASE_CONSTANTS.TRANSACTION_STATES.ENTRY
        )
    }


    static validateTransactionExit(sessionId) {
        this.validateTransactionCreated(sessionId,
            DATABASE_CONSTANTS.TRANSACTION_STATES.EXIT
        )
    }


    static validateTransactionCreated(sessionId, expectState, attempt = 1) {

        const { MAX_ATTEMPTS, RETRY_DELAY } = DATABASE_CONSTANTS.RETRY;
        const { MOVEMENTS } = DATABASE_CONSTANTS.TABLES;
        const { PLACE_ATTENTION, EXTERNAL_TRANSACTION, STATE } = DATABASE_CONSTANTS.COLUMNS;

        cy.log(`Validando BD para ${sessionId} (Intento ${attempt}/${MAX_ATTEMPTS})`);

        const query = `
            SELECT * FROM ${MOVEMENTS} 
            WHERE ${PLACE_ATTENTION} = :1 
            AND ${EXTERNAL_TRANSACTION} = :2 
            AND ${STATE} = :3`;

        const values = [
            DATABASE_CONSTANTS.PLACE_ID,
            sessionId,
            expectState
        ];

        cy.task('queryDatabase', { query, values }).then((movement_result) => {

            if (movement_result.length === 1) {
                expect(movement_result,
                    `La transacción DEBE existir en la BD y tener CDESTADO=${expectState} (sessionId: ${sessionId})`
                ).to.have.lengthOf(1);

                expect(movement_result[0][STATE]).to.be.eq(expectState);
                return
            }

            if (attempt < MAX_ATTEMPTS) {
                cy.log(`Intento ${attempt} fallido (registros encontrados: ${movement_result.length}). Reintentando en ${RETRY_DELAY / 1000}s...`);
                cy.wait(RETRY_DELAY);
                DatabaseAsserts.validateTransactionCreated(sessionId, expectState, attempt + 1);
            }

            else {
                cy.log(`Todos los ${MAX_ATTEMPTS} intentos fallaron para el sessionId: ${sessionId}`);
                expect(movement_result,
                    `La transacción DEBE existir en la BD (sessionId: ${sessionId}) [FALLO FINAL]`
                ).to.have.lengthOf(1);
            }
        });
    }

    static validateTransactionNotCreated(sessionId) {
        cy.log(`Validando que NO exista en BD: ${sessionId}`);

        const { MOVEMENTS } = DATABASE_CONSTANTS.TABLES;
        const { EXTERNAL_TRANSACTION } = DATABASE_CONSTANTS.COLUMNS;

        const query = `
            SELECT * FROM ${MOVEMENTS} 
            WHERE ${EXTERNAL_TRANSACTION} = :1`;

        const values = [sessionId];

        cy.task('queryDatabase', { query, values }).then((movement_result) => {
            expect(movement_result,
                `Se encontró una transacción (${sessionId}) que no debía existir`
            ).to.have.lengthOf(0);
        });
    }
}