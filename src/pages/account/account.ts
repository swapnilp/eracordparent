import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})

export class AccountPage {
  studentID : any;
  balance: any = 0;
  transactions:any = [];
  loading = this.loadingController.create({
    spinner: 'bubbles',
    content: "Please wait..."
  });  

  constructor(public navCtrl: NavController, public params: NavParams, public authService: AuthService, public loadingController: LoadingController) {
    this.loading.present();
    this.studentID = params.get('studentID');
    this.getBalance();
  }

  getBalance() {
    this.authService.getApiData('accounts', "", this.studentID).then((result) => {
      if(result['success']) {
        this.balance = result['balance'];
        this.getTransactions();
      }
    });
  }

  getTransactions() {
    this.authService.getApiData('accounts/get_transactions', "", this.studentID).then((result) => {
      if(result['success']) {
        this.transactions = result['transactions'];
      }
      this.loading.dismiss();
    });
  }
  
}
