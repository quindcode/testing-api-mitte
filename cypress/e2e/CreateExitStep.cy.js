import { EntryService } from "../support/page_objects/EntryService";
import { ExitService    } from "../support/page_objects/ExitService";
import { ExitDataGenerator } from "../support/utils/ExitDataGenerator"
import { ExitAsserts } from "../support/assertions/ExitAsserts";
import { DatabaseAsserts } from "../support/assertions/DatabaseAsserts";
import { EntryDataGenerator } from "../support/utils/EntryDataGenerator";
import { EntryAsserts } from "../support/assertions/EntryAsserts";

describe('Crear salida de un parqueadero de Mitte', function () {

    const testCase=[
        {
            description:'Validar la salida sin entrada exitosa de un vehículo a un parqueadero mite con el servicio de Flypass',
            dataToUse: ExitDataGenerator.getAuthorizedExit(),
            validator: (response, data)=>{
                ExitAsserts.validateSuccessResponse(response)
                DatabaseAsserts.validateTransactionExit(data.sessionId)
            }
        },
        {
            description:'Validar la salida RECHAZADA por placa no autorizada',
            dataToUse: ExitDataGenerator.getUnauthorizedExit(),
            validator:(respone)=>{
                ExitAsserts.validateUnauthorizedResponse(respone)
            }
        }
    ]

    testCase.forEach((testCase)=>{
        it(testCase.description,function(){
            const exitData = testCase.dataToUse;
            ExitService.sendExit(testCase.dataToUse, this.idToken)
            .then((respone)=>{
                testCase.validator(respone,exitData)
            })
        });
    })
    
});

describe('Entrda y salida exitosa de un parqueadero con Mitte',function() {
   it('Debe registrar una entrada exitosa y luego una salida exitosa',function () {
    const entryData = EntryDataGenerator.getAuthorizedEntry();
    const entrySessionId = entryData.sessionId
    cy.log("El sesision ID de la entrada es ", entrySessionId);
    
    EntryService.sendEntry(entryData, this.idToken)
    .then((entryResponse)=>{
        EntryAsserts.validateSuccessResponse(entryResponse);
        const exitData = ExitDataGenerator.getAuthorizedExit(entrySessionId);
        cy.log("El sessionId de la salida es ",exitData.sessionId)
            return ExitService.sendExit(exitData, this.idToken)
    })
    .then((exitResponse)=>{
        ExitAsserts.validateSuccessResponse(exitResponse)
        DatabaseAsserts.validateTransactionExit(entrySessionId)
    })
   });
});
