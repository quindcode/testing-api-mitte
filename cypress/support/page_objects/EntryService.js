import { API_CONFIG } from '../config/api.config';

export class EntryService {
  static sendEntry(dataToUse, authToken){
    return cy.request({
        method: 'POST',
        url: API_CONFIG.endpoints.entryBegin,
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