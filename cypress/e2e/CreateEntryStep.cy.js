import {CreateEntry} from "../support/page_object_model/CreateEntry.cy";
import { DataGenerate } from "../support/utils/DataGenerate";
import { EntryAsserts } from "../support/asserts/EntryAsserts";
import { DatabaseAsserts } from "../support/asserts/DatabaseAsserts";
 

 describe('Crear entrada a un parqueadero de Mitte', function () {

     before(function() {
       
          cy.loginCognito().then((token) => {
               this.idToken = token;
          });
     });

     
     const testCases=[
          {
               description: 'Validar la entrada exitosa de un vehículo a un parqueadero mite con el servicio de Flypass',
               dataToUse: DataGenerate.getAuthorizedEntry(),
               validator: (response,data)=>{
                    EntryAsserts.validateSuccessResponse(response);
                    DatabaseAsserts.validateTransactionCreated(data.sessionId)
               }
          },
          {
               description: 'Validar la entrada RECHAZADA por placa no autorizada',
               dataToUse: DataGenerate.getUnauthorizedEntry(),
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