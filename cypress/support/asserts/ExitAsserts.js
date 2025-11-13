import { StatusAsserts } from "./base/StatusAsserts";
import { MessageAsserts } from "./base/MessageAsserts";

export class ExitAsserts{

    static validateSuccessResponse(response){
        StatusAsserts.validateSuccessResponse(response),
        MessageAsserts.validateAuthorized(response)
    }

    static validateUnauthorizedResponse(response){
        StatusAsserts.validateBadRequestse(response),
        MessageAsserts.validateErrorMessage(response,'Error al enviar salida.')
    }   
}