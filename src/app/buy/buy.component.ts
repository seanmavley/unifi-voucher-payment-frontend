import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PurchaseService } from '../providers/purchase.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  encapsulation: ViewEncapsulation.None
})
export class BuyComponent implements OnInit {

  constructor(public purchase: PurchaseService) { }

  busy: boolean;
  name: string;
  network: string;
  phone_number: number;
  internet_package: string;
  phone_number_validity: boolean;

  captcha_response: string;

  result: any;

  trans_id: string;
  error: boolean;
  msg: string;
  success: boolean;

  network_prefix = ['024', '054', '055', '026', '056', '027', '057'];

  ngOnInit() {
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.captcha_response = captchaResponse;
  }

  onSubmit(data) {
    console.log(data);
    if (!this.network_prefix.includes(data.phone_number.slice(0, 3))) {
      this.error = true;
      this.msg = 'The phone number entered is NOT a valid Ghana Mobile Network phone number.';
      return;
    }
    this.busy = true;
    this.purchase
    .buy(data.name, data.network, data.phone_number, data.internet_package, this.captcha_response)
      .subscribe((res) => { 
        this.busy = false;
        if(res.json().state) {
          console.log('Succeeded', res.json().data);
          this.success = true;
          this.result = res.json().data.code;
          this.trans_id = res.json().transaction.id;
        } else {
          console.log(res.json().data);
          this.error = true;
          this.msg = res.json().msg;
        }
      });
    } 

}
