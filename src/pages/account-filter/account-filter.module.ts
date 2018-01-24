import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountFilterPage } from './account-filter';

@NgModule({
  declarations: [
    AccountFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountFilterPage),
  ],
  exports: [
    AccountFilterPage
  ],
})
export class AccountFilterPageModule {}
