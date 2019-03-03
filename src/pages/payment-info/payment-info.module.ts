import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentInfoPage } from './payment-info';

@NgModule({
  declarations: [
    PaymentInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentInfoPage),
  ],
  exports: [
    PaymentInfoPage,
  ],
})
export class PaymentInfoPageModule {}

