export class StatusAsserts{

    static validateSuccessResponse(response){
        expect(response.status).to.eq(200)
    }

    static validateBadRequestse(response){
        expect(response.status).to.eq(400)
    }
}