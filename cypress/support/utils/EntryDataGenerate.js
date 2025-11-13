import { Entry } from "../../e2e/models/Entry";
import { generateDate } from "./dateUtils";
import { generateSessionId } from "./SessionIdUtils";
import entryDataTemplate from "../../fixtures/mitteIntegrador/entry.json"
import plate from "../../fixtures/mitteIntegrador/plate.json"


export class EntryDataGenerate{
    static generateEntryData(overrides ={}){
        const dynamicData={
            ...entryDataTemplate,
            actualStart: generateDate(),
            sessionId: generateSessionId(),
            localIdentifier : plate.plateAuthorized
        }

        const finalData={
            ...dynamicData,
            ...overrides
        }
        return new Entry(finalData)
    }

    static getAuthorizedEntry(){
        return this.generateEntryData()
    }

    static getUnauthorizedEntry(){
       return this.generateEntryData({
        localIdentifier: plate.plateNoAuthorized
       })
    }
}