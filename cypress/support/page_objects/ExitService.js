import { API_CONFIG } from '../config/api.config';

export class ExitService {
  static sendExit(dataToUse, authToken){
    return cy.request({
        method: 'POST',
        url: API_CONFIG.endpoints.entryEnd,
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