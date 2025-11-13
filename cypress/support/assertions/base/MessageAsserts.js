import { MESSAGE_CONSTANTS } from "../../constants/message.constants";

export class MessageAsserts{

    static validateAuthorized(response){
        expect(response.body.message).to.eq(MESSAGE_CONSTANTS.SUCCESS.MESSAGE);
        expect(response.body.code).to.eq(MESSAGE_CONSTANTS.SUCCESS.CODE);
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