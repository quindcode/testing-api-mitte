import {CreateEntry} from "../support/page_object_model/CreateEntry.cy";
import { EntryDataGenerate } from "../support/utils/EntryDataGenerate";
import { EntryAsserts } from "../support/asserts/EntryAsserts";
import { DatabaseAsserts } from "../support/asserts/DatabaseAsserts";
 

 describe('Crear entrada a un parqueadero de Mitte', function () {
     
     const testCases=[
          {
               description: 'Validar la entrada exitosa de un vehículo a un parqueadero mite con el servicio de Flypass',
               dataToUse: EntryDataGenerate.getAuthorizedEntry(),
               validator: (response,data)=>{
                    EntryAsserts.validateSuccessResponse(response);
                    DatabaseAsserts.validateTransactionEntry(data.sessionId)
               }
          },
          {
               description: 'Validar la entrada RECHAZADA por placa no autorizada',
               dataToUse: EntryDataGenerate.getUnauthorizedEntry(),
               validator: (respone, data)=>{
                    EntryAsserts.validateUnauthorizedResponse(respone)
               }  
          }
     ]

     testCases.forEach((testCase) => {
          it(testCase.description, function() {
               const entryData = testCase.dataToUse;

               CreateEntry.sendEntry(testCase.dataToUse, this.idToken)
               .then((response)=>{
                    testCase.validator(response, entryData);
               })
          });
     });
 });