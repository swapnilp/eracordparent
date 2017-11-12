import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PaymentHistoryPage } from '../payment-history/payment-history';
import { ApplyCouponPage } from '../apply-coupon/apply-coupon';

@Component({
  selector: 'page-eracord-payment',
  templateUrl: 'eracord-payment.html'
})
export class EracordPaymentPage {

  constructor(public navCtrl: NavController, public params: NavParams) {
  }

  
  goToPaymentHistory() {
    this.navCtrl.push(PaymentHistoryPage);
  } goToApplyCoupon() {
    this.navCtrl.push(ApplyCouponPage);
  }  
}
