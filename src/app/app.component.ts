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

  constructor(public purchase: PurchaseService) {

  }

  onTest() {
    let x = 1;
    let myInterval = setInterval((doPing) => {
      console.log('I was logged after 3 seconds');
      x += 1;
      if (x > 5) {
        clearInterval(myInterval);
        console.log('Canceled interval callbacks');
      }
    }, 3000);

  }

  onSubmit(data) {
    console.log(data);
    this.busy = true;
    this.purchase
    .buy(data.name, data.network, data.phone_number, data.internet_package)
      .subscribe((res) => {
        console.log(res.json());

        // if response is back via 0000
        if (res.json().state) {
          console.log('Successfully went through', res.json().data.ResponseCode);
          this.busy = false;
        }

        // otherwise
        if (!res.json().state) {
          if(res.json().data.ResponseCode === '0001') {
            console.log('pending data, will begin ping now')

            /**
            * Make requests to /callback/get endpoint every 15 seconds
            * If a transaction is found, cancel the interval, otherwise, keep
            * checking every 15 seconds.
            */
            let pollInterval = setInterval((doPing) => {
              let trans_id = res.json().data.Data.TransactionId;
              this.purchase.callback(trans_id)
                .subscribe((res) => {
                  // Callback request found and logged
                  // Therefore we can make a conclusion
                  if (res.json().status === 400) { // means transaction failed
                    console.log('Forgetti. Failed request');
                    console.log(res.json().error);
                    clearInterval(pollInterval); // stop polling
                  }

                  // We got the code generated. We're a go
                  if (res.json().status === 200) {
                    console.log('Good, here is your code');
                    clearInterval(pollInterval);
                  }

                  // the purchase call to the api would still be happening,
                  // because we assume a 404 each time. We only clear the interval
                })
            }, 15000)
          } else {
            console.log('stop everything, it was an error');
          }
        }
    })  
  };
}
