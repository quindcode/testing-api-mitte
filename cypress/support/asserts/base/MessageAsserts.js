export class MessageAsserts{

    static validateAuthorizedEntry(response){
        expect(response.body.message).to.eq('AUTORIZADO'),
        expect(response.body.code).to.eq("000")
    }

    static validateUnauthorizedEntry(response){
        expect(response.body.messages.error).to.eq('Error al enviar entrada.')
    }
}