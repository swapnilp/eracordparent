import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { HostelPage } from '../hostel/hostel';
import { DailyTeachesPage } from '../daily-teaches/daily-teaches';
import { AccountPage } from '../account/account';
import { SettingPage } from '../setting/setting';
import { ExamsPage } from '../exams/exams';
import { EracordPaymentPage } from '../eracord-payment/eracord-payment';

@Component({
  selector: 'page-students',
  templateUrl: 'students.html'
})
export class StudentsPage {
  students = [];
  payment:any;
  constructor(public navCtrl: NavController, public params: NavParams, public alertCtrl: AlertController) {
    const user = JSON.parse(localStorage.getItem('userData'));
    this.payment = params.get('payment');
    if(this.payment === "Urgent") {
      this.onlyPay();
    } else if(this.payment !== "None" && this.payment !== undefined) {
      this.mightPay();
    }
      
    this.students = user.students;
  }
  

  goToHostel(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HostelPage, {
      'studentID': params.studentId
    });
  }goToDailyTeaches(params){
    if (!params) params = {};
    this.navCtrl.setRoot(DailyTeachesPage, {
      'studentID': params.studentId
    });
  }goToAccount(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AccountPage, {
      'studentID': params.studentId
    });
  }goToSetting(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SettingPage, {
      'studentID': params['studentID']
    });
  }goToExams(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ExamsPage, {
      'studentID': params['studentId']
    });
  }

  mightPay() {
    let confirm = this.alertCtrl.create({
      title: 'Unlock Account ?',
      message: 'You have limited period offer. Please Unlock your account to continue your services.',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Pay Later',
          handler: () => {
            
          }
        },
        {
          text: 'Pay now',
          handler: () => {
            this.navCtrl.setRoot(EracordPaymentPage);
          }
        }
      ]
    });
    confirm.present();
  }

  onlyPay() {
    let confirm = this.alertCtrl.create({
      title: 'Unlock Account ?',
      message: 'You have limited period offer. Please Unlock your account to continue your services.',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Pay now',
          handler: () => {
            this.navCtrl.setRoot(EracordPaymentPage);
          }
        }
      ]
    });
    confirm.present();
  }
}
