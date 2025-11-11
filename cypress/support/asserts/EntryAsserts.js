import { StatusAsserts } from "./base/StatusAsserts";
import { MessageAsserts } from "./base/MessageAsserts";


export class EntryAsserts{

    static validateSuccessResponse(response){
        StatusAsserts.validateSuccessResponse(response);
        MessageAsserts.validateAuthorizedEntry(response);
    }

    static validateUnauthorizedResponse(response){
        StatusAsserts.validateBadRequestse(response)
        MessageAsserts.validateUnauthorizedEntry(response)
    }
}