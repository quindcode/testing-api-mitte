import { EntryService } from "../support/page_objects/EntryService";
import { EntryDataGenerator } from "../support/utils/EntryDataGenerator";
import { ENTRY_FIELDS } from "../support/constants/api.fields.constants"; 
import { StatusAsserts } from "../support/assertions/base/StatusAsserts";
import { EntryAsserts } from "../support/assertions/EntryAsserts";

describe('Validaciones de Contrato - Crear Entrada',function () {

    const requiredFields = [
        ENTRY_FIELDS.SESSION_ID, 
        ENTRY_FIELDS.LOCAL_IDENTIFIER, 
        //ENTRY_FIELDS.ACTUAL_START, --verifucar este error aaroja : "actualStart": "must not be blank"
        ENTRY_FIELDS.PLACE_ID
    ];

    requiredFields.forEach((field)=>{
        it(`Debe retornar 400 Bad Request cuando FALTA el campo: ${field}`,function(){
            const entryData = EntryDataGenerator.generateEntryData({
                [field]:undefined
            })
            EntryService.sendEntry(entryData, this.idToken)
            .then((response)=>{
                EntryAsserts.validateMissingFieldResponse(response,field)
        })
    })

    const invalidScenarios = [
        // Casos para Session ID
        { field: ENTRY_FIELDS.SESSION_ID, value: null, desc: 'es NULO' },
        { field: ENTRY_FIELDS.SESSION_ID, value: '', desc: 'está VACÍO' },
       
        // Casos para Local Identifier (Placa)
        { field: ENTRY_FIELDS.LOCAL_IDENTIFIER, value: null, desc: 'es NULO' },
        { field: ENTRY_FIELDS.LOCAL_IDENTIFIER, value: '', desc: 'está VACÍO' },

        // Casos para Place ID
        { field: ENTRY_FIELDS.PLACE_ID, value: null, desc: 'es NULO' },

        // Casos para Fecha
        { field: ENTRY_FIELDS.ACTUAL_START, value: "fecha-mala", desc: 'tiene FORMATO INVÁLIDO' },
        { field: ENTRY_FIELDS.ACTUAL_START, value: null, desc: 'es NULO' }
    ];

    invalidScenarios.forEach((scenario)=>{
        it(`Debe retornar 400 cuando ${scenario.field} ${scenario.desc}`,function() {
            const entryData = EntryDataGenerator.generateEntryData({
                [scenario.field]: scenario.value
            })

            EntryService.sendEntry(entryData, this.idToken)
            .then((response)=>{
                StatusAsserts.validateBadRequest(response)
            })
        })
    })
})
})