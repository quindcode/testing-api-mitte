

export class CreateEntry {
  static sendEntry(dataToUse, authToken){
    return cy.request({
        method: 'POST',
        url: 'mitte/api/v1/webhooks/usage/begin',
        headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
        body: dataToUse,
        failOnStatusCode: false
    }).then((response)=>{
      return response;
    })
  }
}