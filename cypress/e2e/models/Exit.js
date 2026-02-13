export class Exit{
    constructor(exitData){
      this.sessionId = exitData.sessionId;
      this.placeId = exitData.placeId;
      this.actualStart = exitData.actualStart;
      this.credentialType = exitData.credentialType;
      this.localIdentifier = exitData.localIdentifier;
      this.currency = exitData.currency;
      this.actualEnd = exitData.actualEnd;
      this.amountDue = exitData.amountDue;
      this.amountPaid = exitData.amountPaid;
      this.taxIncluded = exitData.taxIncluded;
      this.exitAssumed = exitData.exitAssumed;
      this.qouteId = exitData.qouteId;
      this.paymentStatus = exitData.paymentStatus;
    }
}