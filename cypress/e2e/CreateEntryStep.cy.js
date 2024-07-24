import CreateEntry from "../support/page_object_model/CreateEntry.cy";

const createEntry = new CreateEntry();

describe('Crear Entrada', () => {
     it('Validar la entrada exitosa de un vehículo a un parqueadero mite con el servicio de Flypass', () => {
          createEntry.dynamicDateSessionid()
          createEntry.sendEntry()
          createEntry.validateResponseCorrect()
     });
     it('Validar la entrada no exitosa de un vehículo a un parqueadero MITE con el servicio de Flypass, cuando ya existe una entrada con datos exactamente iguales registrada en el sistema', () => {
          createEntry.validateResponseIncorrect()
     });
});