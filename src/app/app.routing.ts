import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyComponent } from './buy/buy.component';
import { HelpComponent } from './help/help.component';

const appRoutes: Routes = [ 
  { path: '', component: BuyComponent },
  { path: 'help', component: HelpComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);