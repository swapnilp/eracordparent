import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PaymentHistoryPage } from '../payment-history/payment-history';
import { ApplyCouponPage } from '../apply-coupon/apply-coupon';
import { InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";

@Component({
  selector: 'page-eracord-payment',
  templateUrl: 'eracord-payment.html'
})
export class EracordPaymentPage {
  browser:any;
  constructor(public navCtrl: NavController, public params: NavParams, private inAppBrowser: InAppBrowser) {
  }

  payNow() {
    const url = "https://eracord.com"
    const options: InAppBrowserOptions = {
      zoom: 'no'
    };
    browser = this.inAppBrowser.create(url, '_self', options);
    
    //browser.on('exit').subscribe(
    //  () => {
    //    this.close_event=true;
    //  },
    //  err => {
    //    console.log("InAppBrowser Loadstop Event Error: " + err);
    //  });
  }
  
  
  goToPaymentHistory() {
    this.navCtrl.push(PaymentHistoryPage);
  } goToApplyCoupon() {
    this.navCtrl.push(ApplyCouponPage);
  }  
}
