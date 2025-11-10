import {CreateEntry} from "../support/page_object_model/CreateEntry.cy";
import { DataGenerate } from "../support/utils/DataGenerate";

 

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
               //ira lo que se debe validar
          },
          {
               description: 'Validar la entrada RECHAZADA por placa no autorizada',
               dataToUse: DataGenerate.getUnauthorizedEntry(),
               //Ira lo que se debe validar
          }
     ]

     testCases.forEach((testCase) => {
          it(testCase.description, function() {
               
               CreateEntry.sendEntry(testCase.dataToUse, this.idToken)
               .then((response)=>{
                    testCase.validator();
               })
          });
     });
 });





/*const createEntry = new CreateEntry();

describe('Crear Entrada', () => {
     const sessionId = generateSessionId();
     const actualStart = generateDate();

     it('Validar la entrada exitosa de un vehículo a un parqueadero mite con el servicio de Flypass', () => {
          createEntry.dynamicDateSessionid()
          createEntry.sendEntry()
          createEntry.validateResponseCorrect()
     });
     it('Validar la entrada no exitosa de un vehículo a un parqueadero MITE con el servicio de Flypass, cuando ya existe una entrada con datos exactamente iguales registrada en el sistema', () => {
          createEntry.validateResponseIncorrect()
     });
});*/