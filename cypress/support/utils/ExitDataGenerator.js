import { Exit } from "../../e2e/models/Exit";
import { generateDate } from "./dateUtils";
import { generateSessionId } from "./SessionIdUtils";
import plate from "../../fixtures/mitteIntegrador/plate.json"
import exitDataTemplate from "../../fixtures/mitteIntegrador/exit.json"

export class ExitDataGenerator{
    static generateExitData(overrides ={}){
        const dynamicExitData={
            ...exitDataTemplate,
            sessionId: generateSessionId(),
            actualStart: generateDate(),
            localIdentifier: plate.plateAuthorized,
            actualEnd: generateDate(),
        }
        const finalExitData={
            ...dynamicExitData,
            ...overrides
        }
        return new Exit(finalExitData)
    }

    static getAuthorizedExit(entrySessionId){
        if (entrySessionId) {
            return this.generateExitData({sessionId: entrySessionId})
        } else {
            return this.generateExitData()
        }
    }


    static getUnauthorizedExit(){
        return this.generateExitData({
            localIdentifier: plate.plateNoAuthorized
        })
    }
}