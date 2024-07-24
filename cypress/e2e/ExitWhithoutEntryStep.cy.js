import ExitWhitEntry from "../support/page_object_model/ExitWhitEntry.cy";
import ExitWhithoutEntry from "../support/page_object_model/ExitWhithoutEntry.cy";


const exitWhitEntry = new ExitWhitEntry();
const exitWhithoutEntry = new ExitWhithoutEntry();

describe('Salida sin entrada', () => {
    it('Validar la salida exitosa de un vehículo de un parqueadero MITE con el servicio de Flypass sin haber registrado una entrada', () => {
        exitWhithoutEntry.exit()
        exitWhitEntry.sendDataOutput()
        exitWhitEntry.validateOutput()
    });
});