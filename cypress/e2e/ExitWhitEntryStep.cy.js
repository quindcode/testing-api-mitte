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