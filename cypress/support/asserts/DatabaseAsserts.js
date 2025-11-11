export class DatabaseAsserts {

    static validateTransactionCreated(sessionId, attempt = 1) {
        
        const MAX_ATTEMPTS = 3;
        const RETRY_DELAY = 2000;
        
        cy.log(`Validando BD para ${sessionId} (Intento ${attempt}/${MAX_ATTEMPTS})`);

        const query = `
            SELECT * FROM FLYPASS_PDN.TFPS_MVTOS_COBRO_SERVICIOS 
            WHERE CDPUNTO_ATENCION_SER = :1 
            AND CDNUMERO_TRANSACCION_EXTERNA = :2 
            AND CDESTADO = :3`;

        const values = [
            198,        // Corresponde a :1
            sessionId,  // Corresponde a :2
            0           // Corresponde a :3 (CDESTADO)
        ];

        cy.task('queryDatabase', { query, values }).then((movement_result) => {
            
            if (movement_result.length ===1) {
                expect(movement_result, 
                `La transacción DEBE existir en la BD y tener CDESTADO=0 (sessionId: ${sessionId})`
                ).to.have.lengthOf(1);

                expect(movement_result[0].CDESTADO).to.be.eq(0);
                return    
            }
            
            if (attempt < MAX_ATTEMPTS) {
                cy.log(`Intento ${attempt} fallido (registros encontrados: ${movement_result.length}). Reintentando en ${RETRY_DELAY / 1000}s...`);
                cy.wait(RETRY_DELAY);
                DatabaseAsserts.validateTransactionCreated(sessionId, attempt + 1);
            }
            
            else{
                cy.log(`Todos los ${MAX_ATTEMPTS} intentos fallaron para el sessionId: ${sessionId}`);
                expect(movement_result, 
                    `La transacción DEBE existir en la BD (sessionId: ${sessionId}) [FALLO FINAL]`
                ).to.have.lengthOf(1);
            }
        });
    }

    /**
     * (Opcional) Valida que una transacción NO exista.
     */
    static validateTransactionNotCreated(sessionId) {
        cy.log(`Validando que NO exista en BD: ${sessionId}`);

        const query = `
            SELECT * FROM FLYPASS_PDN.TFPS_MVTOS_COBRO_SERVICIOS 
            WHERE CDNUMERO_TRANSACCION_EXTERNA = :1`;
        
        const values = [sessionId];

        cy.task('queryDatabase', { query, values }).then((movement_result) => {
            expect(movement_result, 
                `Se encontró una transacción (${sessionId}) que no debía existir`
            ).to.have.lengthOf(0);
        });
    }
}