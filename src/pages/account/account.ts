import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { StudentsPage } from '../students/students';
import { AccountFilterPage } from '../account-filter/account-filter';
import { StudentPaymentPage } from '../student-payment/student-payment';

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
  page = 2;
  isLoading = true;
  totalCount = 0;
  filter: any= {};
  isFltered:any = false;
  
  constructor(public navCtrl: NavController, public params: NavParams, public authService: AuthService, public loadingController: LoadingController) {
    this.loading.present();
    this.studentID = params.get('studentID');
    this.filter = params.get('filter');
    this.isFltered = params.get('hasFiltered');
    this.getBalance();
  }

  getBalance() {
    this.authService.getApiData('accounts', "", this.studentID, this).then((result) => {
      if(result['success']) {
        this.balance = result['balance'];
        this.getTransactions(1);
      }
    });
  }

  getTransactions(page, scroll = null) {
    this.isLoading = true;
    let self = this;
    this.authService.getApiData('accounts/get_transactions', {page: page}, this.studentID, this).then((result) => {
      self.totalCount = result['total_count'];
      if(result['transactions']) {
        if(result['transactions'].length == 0 && scroll) {
          scroll.enable(false);
        }
        for(let transaction of result['transactions']) {
          setTimeout(() => {
            this.transactions.push(transaction);
          }, 500);
        }
        if(self.loading) {
          self.loading.dismiss();
        }
        this.isLoading = false;
        if(scroll){ 
          scroll.complete();
        }
      }
    });
  }
  
  goToStudent(params){
    if (!params) params = {};
    this.navCtrl.setRoot(StudentsPage);
  }

  doInfinite(infiniteScroll) {
    if(!this.isLoading) {
      this.getTransactions(this.page, infiniteScroll);
      this.page++;
    }
  }

  filterAccount() {
    this.navCtrl.push(AccountFilterPage, {
      'studentID': this.studentID,
      'filter': this.filter
    });
  }

  payOnline() {
    this.navCtrl.push(StudentPaymentPage, {
      'studentID': this.studentID
    })
    
  }

}
