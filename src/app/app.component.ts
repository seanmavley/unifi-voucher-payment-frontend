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

  onSubmit(data) {
    console.log(data);
    this.busy = true;
    this.purchase
    .buy(data.name, data.network, data.phone_number, data.internet_package)
      .subscribe((res) => {
        console.log(res.json());
        this.busy = false;
    })  

  };
}
