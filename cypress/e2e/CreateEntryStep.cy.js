import { EntryService } from "../support/page_objects/EntryService";
import { EntryDataGenerator } from "../support/utils/EntryDataGenerator";
import { EntryAsserts } from "../support/assertions/EntryAsserts";
import { DatabaseAsserts } from "../support/assertions/DatabaseAsserts";


describe('Crear entrada a un parqueadero de Mitte', function () {

     const testCases = [
          {
               description: 'Validar la entrada exitosa de un vehículo a un parqueadero Mitte con el servicio de Flypass',
               dataToUse: EntryDataGenerator.getAuthorizedEntry(),
               validator: (response, data) => {
                    EntryAsserts.validateSuccessResponse(response);
                    DatabaseAsserts.validateTransactionEntry(data.sessionId)
               }
          },
          {
               description: 'Validar la entrada RECHAZADA por placa no autorizada',
               dataToUse: EntryDataGenerator.getUnauthorizedEntry(),
               validator: (response, data) => {
                    EntryAsserts.validateUnauthorizedResponse(response)
               }
          }
     ]

     testCases.forEach((testCase) => {
          it(testCase.description, function () {
               const entryData = testCase.dataToUse;

               EntryService.sendEntry(testCase.dataToUse, this.idToken)
                    .then((response) => {
                         testCase.validator(response, entryData);
                    })
          });
     });
});