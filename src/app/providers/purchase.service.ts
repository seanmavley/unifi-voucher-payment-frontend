import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

// const API_URL = 'http://localhost:3012';
const API_URL = 'https://api.enjoywifi.today';

@Injectable()
export class PurchaseService {

  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(public http: Http) {
  }

  /**
  * Makes a purchase to API
  * @param {string} name The name of the Mobile Money Account Holder
  * @param {string} network The mobile money wallet network provider
  * @param {number} phone_number The mobile money to deduct money from
  * @param {string} internet_package What package selected
  * @param {string} captcha_token
  * @returns {Observable} 
  */
  buy(name: string, 
    network: string, 
    from_phone_number: number, 
    internet_package: string,
    captcha_token: string) {

    let params = {
      network: network,
      from_number: from_phone_number,
      package: internet_package,
      captcha_token: captcha_token
    };

    // console.log(params);

    return this.http.post(API_URL + '/buy', JSON.stringify(params), { headers: this.headers })
      .map((res) => {
        return res;
      })
  }

  /**
  * Poll transaction callback to learn if return value is in.
  * @param {string} trans_id The transaction ID to use to check
  * @returns {Observable}
  */
  callback(trans_id: string) {
    let params = {
      trans_id: trans_id
    };

    return this.http.post(API_URL + '/callback/get', JSON.stringify(params), { headers: this.headers })
      .map((res) => {
        return res;
      })
  }

}
