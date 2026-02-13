import { MESSAGE_CONSTANTS } from "../constants/message.constants";
import { StatusAsserts } from "./base/StatusAsserts";
import { MessageAsserts } from "./base/MessageAsserts";


export class EntryAsserts{

    static validateSuccessResponse(response){
        StatusAsserts.validateSuccessResponse(response);
        MessageAsserts.validateAuthorized(response);
    }

    static validateUnauthorizedResponse(response){
        StatusAsserts.validateBadRequest(response);
        MessageAsserts.validateErrorMessage(response, MESSAGE_CONSTANTS.ERRORS.ENTRY);
    }

    static validateMissingFieldResponse(response,fieldName){
        StatusAsserts.validateBadRequest(response),
        MessageAsserts.validateFieldSpecificError(response, fieldName, MESSAGE_CONSTANTS.ERRORS.REQUIRED_FIELD)
    }
}