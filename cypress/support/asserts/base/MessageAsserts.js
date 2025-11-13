export class MessageAsserts{

    static validateAuthorized(response){
        expect(response.body.message).to.eq('AUTORIZADO'),
        expect(response.body.code).to.eq("000")
    }

    /**
     * Valida CUALQUIER respuesta de error que use la estructura 'messages.error'.
     * @param {object} response - La respuesta de cy.request()
     * @param {string} expectedError - El mensaje de error exacto que se espera
     */
    
    static validateErrorMessage(response, expectedError) {
        expect(response.body.messages.error).to.eq(expectedError);
    }


}