import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { RecaptchaModule } from 'ng-recaptcha';

import { PurchaseService } from './providers/purchase.service';
import { HttpModule } from '@angular/http';
import { BuyComponent } from './buy/buy.component';
import { HelpComponent } from './help/help.component';

import { AppRouting } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    BuyComponent,
    HelpComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RecaptchaModule.forRoot(),
    HttpModule,
    AppRouting
  ],
  providers: [PurchaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
