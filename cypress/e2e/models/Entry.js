export class Entry {
    constructor(entryData){
        this.sessionId = entryData.sessionId;
        this.placeId = entryData.placeId;
        this.actualStart = entryData.actualStart;
        this.credentialType = entryData.credentialType;
        this.localIdentifier = entryData.localIdentifier;   
    }
}