import { HTTP_STATUS } from "../../constants/http.constants"

export class StatusAsserts{

    static validateSuccessResponse(response){
        expect(response.status).to.eq(HTTP_STATUS.OK)
    }

    static validateBadRequest(response){
        expect(response.status).to.eq(HTTP_STATUS.BAD_REQUEST)
    }
}