import { CreateEntry } from "../support/page_object_model/CreateEntry.cy";
import { CreateExit } from "../support/page_object_model/ExitWhitEntry.cy";
import {ExitDataGenerate} from "../support/utils/ExitDataGenerate"
import { ExitAsserts } from "../support/asserts/ExitAsserts";
import { DatabaseAsserts } from "../support/asserts/DatabaseAsserts";
import { EntryDataGenerate } from "../support/utils/EntryDataGenerate";
import { EntryAsserts } from "../support/asserts/EntryAsserts";

describe('Crear salida de un parqueadero de Mitte', function () {

    const testCase=[
        {
            description:'Validar la salida sin entrada exitosa de un vehículo a un parqueadero mite con el servicio de Flypass',
            dataToUse: ExitDataGenerate.getAuthorizedExit(),
            validator: (response, data)=>{
                ExitAsserts.validateSuccessResponse(response)
                DatabaseAsserts.validateTransactionExit(data.sessionId)
            }
        },
        {
            description:'Validar la salida RECHAZADA por placa no autorizada',
            dataToUse: ExitDataGenerate.getUnauthorizedExit(),
            validator:(respone)=>{
                ExitAsserts.validateUnauthorizedResponse(respone)
            }
        }
    ]

    testCase.forEach((testCase)=>{
        it(testCase.description,function(){
            const exitData = testCase.dataToUse;
            CreateExit.sendExit(testCase.dataToUse, this.idToken)
            .then((respone)=>{
                testCase.validator(respone,exitData)
            })
        });
    })
    
});

describe('Entrda y salida exitosa de un parqueadero con Mitte',function() {
   it('Debe registrar una entrada exitosa y luego una salida exitosa',function () {
    const entryData = EntryDataGenerate.getAuthorizedEntry();
    const entrySessionId = entryData.sessionId
    cy.log("El sesision ID de la entrada es ", entrySessionId);
    
    CreateEntry.sendEntry(entryData, this.idToken)
    .then((entryResponse)=>{
        EntryAsserts.validateSuccessResponse(entryResponse);
        const exitData = ExitDataGenerate.getAuthorizedExit(entrySessionId);
        cy.log("El sessionId de la salida es ",exitData.sessionId)
        return CreateExit.sendExit(exitData, this.idToken)
    })
    .then((exitResponse)=>{
        ExitAsserts.validateSuccessResponse(exitResponse)
        DatabaseAsserts.validateTransactionExit(entrySessionId)
    })
   });
});


/*
import ExitWhitEntry from "../support/page_object_model/ExitWhitEntry.cy";
import CreateEntry from "../support/page_object_model/CreateEntry.cy";

const exithWhitEntry = new ExitWhitEntry();
const createEntry = new CreateEntry();

describe('Salida con entrada', () => {
    it('Validar la salida exitosa de un vehículo que tuvo una entrada exitosa a un parqueadero MITE con el servicio de Flypass', () => {
        exithWhitEntry.dynamicDateSessionidExit()
        createEntry.sendEntry()
        exithWhitEntry.departureDate()
        exithWhitEntry.sendDataOutput()
        exithWhitEntry.validateOutput()
    });
});
*/