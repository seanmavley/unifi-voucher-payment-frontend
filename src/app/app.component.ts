import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PurchaseService } from './purchase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  busy: boolean;
  name: string;
  network: string;
  phone_number: number;
  internet_package: string;

  result: any;

  trans_id: string;
  error: boolean;
  msg: string;
  success: boolean;

  constructor(public purchase: PurchaseService) { }

  onSubmit(data) {
    console.log(data);
    this.busy = true;
    this.purchase
    .buy(data.name, data.network, data.phone_number, data.internet_package)
      .subscribe((res) => {
        console.log(res.json());

        if (res.json().state) { // response '0000'
          console.log('Successfully went through', res.json().data.ResponseCode);
          this.busy = false;
          this.success = true;
          this.result = res.json().data.code;
        } else if (res.json().data.ResponseCode === '0001') {

            /**
            * Make requests to /callback/get endpoint every N seconds
            * If a transaction is found, cancel interval
            * keep checking every N seconds for .
            */

            let poll_counter = 0;

            let pollInterval = setInterval((doPing) => {
              let transaction_id = res.json().data.Data.TransactionId;
              
              poll_counter += 1;
              console.log(poll_counter);

              if (poll_counter === 3) {
                clearInterval(pollInterval);
                console.log('Stopping polling after 5th attempt');
                this.error = true;
                this.msg = 'We got no response back with regards to your payment. Contact support now.'
                this.trans_id = transaction_id;
              }

              this.purchase.callback(transaction_id)
                .subscribe((res) => {
                  if (res.json().status === 400) { // means transaction failed
                    console.log('Forgetti. Failed request');
                    console.log(res.json().error);
                    clearInterval(pollInterval); // stop polling
                    this.error = true;
                    this.msg = 'Transaction Failed.';
                    this.trans_id = transaction_id;
                  }

                  if (res.json().status === 200) {
                    console.log('Good, here is your code');
                    clearInterval(pollInterval);
                    this.success = true;
                    this.result = res.json().data.code;
                    this.trans_id = transaction_id;
                  }

                  // api polling still happens. We assume 404 each time
                  // because we assume a 404 each time.
                })
            }, 20000)
          } else {
            console.log('stop everything, it was an error');
            this.busy = false;
            this.error = true;
            this.msg = 'Transaction failed.';
            this.trans_id = res.json().data.Data.TransactionId
          }
      });
    } 
  };