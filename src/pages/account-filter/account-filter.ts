import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AccountPage } from '../account/account';
import { AuthService } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the AccountFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-filter',
  templateUrl: 'account-filter.html',
})
export class AccountFilterPage {
  studentID:any;
  filterData: any = {};
  loading:any;
  
  constructor(public navCtrl: NavController, public params: NavParams, public authService: AuthService, public loadingController: LoadingController) {
    this.loading = this.loadingController.create({
      spinner: 'bubbles',
      content: "Please wait..."
    });
    this.loading.present();
    this.studentID = params.get('studentID');
    if(params.get('filter')) {
      this.filterData = params.get('filter');
    }
    
    if(this.filterData.transactionType === undefined) {
      this.filterData.transactionType = "all";
    }

    if(this.filterData.startDate === undefined) {
      this.filterData.startDate = "";
    }
    if(this.filterData.endDate === undefined) {
      this.filterData.endDate = "";
    }
    if(this.loading) {
      this.loading.dismiss();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountFilterPage');
  }

  apply() {
    let hasFilter = !(this.filterData.startDate == '' && this.filterData.endDate == '' && this.filterData.transactionType === 'all')
    if(this.filterData.startDate === "") {
      delete(this.filterData.startDate);
    }
    if(this.filterData.endDate === "") {
      delete(this.filterData.endDate);
    }

    this.navCtrl.setRoot(AccountPage, {
      'studentID': this.studentID,
      'filter': this.filterData,
      'hasFiltered': hasFilter
    });
  }

  back() {
    this.navCtrl.pop();
  }
  
  clear() {
    this.filterData = {};
    this.filterData.startDate = "";
    this.filterData.endDate = "";
    this.filterData.transactionType = "all";
  }

}
