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

  error: boolean;
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
        } else {
            if(res.json().data.ResponseCode === '0001') {
            /**
            * Make requests to /callback/get endpoint every 15 seconds
            * If a transaction is found, cancel the interval, otherwise, keep
            * checking every 15 seconds.
            */
            let pollInterval = setInterval((doPing) => {
              let trans_id = res.json().data.Data.TransactionId;
              this.purchase.callback(trans_id)
                .subscribe((res) => {
                  if (res.json().status === 400) { // means transaction failed
                    console.log('Forgetti. Failed request');
                    console.log(res.json().error);
                    clearInterval(pollInterval); // stop polling
                    this.error = true;
                  }

                  if (res.json().status === 200) {
                    console.log('Good, here is your code');
                    clearInterval(pollInterval);
                    this.success = true;
                  }

                  // api polling still happens. We assume 404 each time
                  // because we assume a 404 each time.
                })
            }, 15000)
          } else {
            console.log('stop everything, it was an error');
            this.busy = false;
            this.error = true;
          }
      }
    })  
  };
}
