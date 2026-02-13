import { EXIT_FIELDS } from "../support/constants/api.fields.constants";
import { ExitDataGenerator } from "../support/utils/ExitDataGenerator";
import { ExitService } from "../support/page_objects/ExitService";
import { ExitAsserts } from "../support/assertions/ExitAsserts";
describe('Validaciones de Contrato - Crear Salida', function () {

    const requiredFields = [
        EXIT_FIELDS.SESSION_ID,
        EXIT_FIELDS.PLACE_ID,
        EXIT_FIELDS.ACTUAL_START,
        EXIT_FIELDS.CURRENCY,
        EXIT_FIELDS.ACTUAL_END
        //EXIT_FIELDS.AMOUNT_DUE, // "No debe ser null"
        //EXIT_FIELDS.AMOUNT_PAID, // "No debe ser null"
        //EXIT_FIELDS.TAX_INCLUDED, // "No debe ser null"
        //EXIT_FIELDS.EXIT_ASSUMED, // "No debe ser null"
        //EXIT_FIELDS.QOUTE_ID, // No es obligatorio
        //EXIT_FIELDS.PAYMENT_STATUS //"Unexpected character ('}' (code 125)): was expecting double-quote to start field name\n at [Source: REDACTED (`StreamReadFeature.INCLUDE_SOURCE_IN_LOCATION` disabled); line: 15, column: 1]"
    ]

    requiredFields.forEach((field) => {
        it(`Debe retornar 400 Bad Request cuando FALTA el campo: ${field}`, function () {
            const exitData = ExitDataGenerator.generateExitData({
                [field]: undefined
            })
            ExitService.sendExit(exitData, this.idToken)
                .then((response) => {
                    ExitAsserts.validateMissingFieldResponse(response, field)
                })
        })
    })
})