import CreateEntry from "../support/page_object_model/CreateEntry.cy";
import ExitWhitZeroPayment from "../support/page_object_model/ExitWhitZeroPayment.cy";
import ExitWhitEntry from "../support/page_object_model/ExitWhitEntry.cy";


const createEntry = new CreateEntry();
const exitWhitZeroPayment = new ExitWhitZeroPayment();
const exitWhitEntry = new ExitWhitEntry();

describe('Salida con cobro cero', () => {
    it('Validar la salida sin entrada de un vehículo con cobro igual a 0 de un parqueadero mite con el servicio de Flypass', () => {
        createEntry.dynamicDateSessionid()
        createEntry.sendEntry()
        exitWhitZeroPayment.exitAtZero()
        exitWhitEntry.departureDate()
        exitWhitEntry.sendDataOutput()
        exitWhitEntry.validateOutput()
    });
});