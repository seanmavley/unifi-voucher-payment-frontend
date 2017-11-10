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
        this.busy = false;
        if(res.json().state) {
          console.log('Succeeded', res.json().data);
          this.success = true;
          this.result = res.json().data.code;
        } else {
          console.log(res.json().data);
          this.error = true;
          this.msg = res.json().msg;
        }
      });
    } 
  };