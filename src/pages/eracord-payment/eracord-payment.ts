import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PaymentHistoryPage } from '../payment-history/payment-history';
import { ApplyCouponPage } from '../apply-coupon/apply-coupon';
import { InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";
import { AlertService } from '../../providers/alert-service/alert-service';

@Component({
  selector: 'page-eracord-payment',
  templateUrl: 'eracord-payment.html'
})
export class EracordPaymentPage {
  browser:any;
  constructor(public navCtrl: NavController, public params: NavParams, private inAppBrowser: InAppBrowser, public alertService: AlertService) {
  }

  payNow() {
    const url = "https://eracord.com/eracord_payment/10"
    const options: InAppBrowserOptions = {
      zoom: 'no'
    };
    this.browser = this.inAppBrowser.create(url, '_self', options);
    this.browser.close();
    browser.on('exit').subscribe(
      () => {
        this.alertService.warning("Closed");
      },
      err => {
        console.log("InAppBrowser Loadstop Event Error: " + err);
      });
  }
  
  
  goToPaymentHistory() {
    this.navCtrl.push(PaymentHistoryPage);
  } goToApplyCoupon() {
    this.navCtrl.push(ApplyCouponPage);
  }  
}
