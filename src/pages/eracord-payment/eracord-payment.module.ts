import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EracordPaymentPage } from './eracord-payment';

@NgModule({
  declarations: [
    EracordPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(EracordPaymentPage),
  ],
  exports: [
    EracordPaymentPage,
  ],
})
export class EracordPaymentPageModule {}
