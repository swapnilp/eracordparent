import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { HostelPage } from '../hostel/hostel';
import { DailyTeachesPage } from '../daily-teaches/daily-teaches';
import { AccountPage } from '../account/account';
import { SettingPage } from '../setting/setting';
import { ExamsPage } from '../exams/exams';
import { EracordPaymentPage } from '../eracord-payment/eracord-payment';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-students',
  templateUrl: 'students.html'
})
export class StudentsPage {
  students = [];
  payment:any;
  isReload: any = false;
  loading: any;
  
  constructor(public navCtrl: NavController, public params: NavParams, public alertCtrl: AlertController, public loadingController: LoadingController, public authService: AuthService) {
    this.isReload = params.get('reload');
    if(this.isReload) {
      this.getStudents();
    } else {
      const user = JSON.parse(localStorage.getItem('userData'));
      this.students = user.students;
    }
    this.payment = params.get('payment');
    if(this.payment === "Urgent") {
      this.onlyPay();
    } else if(this.payment !== "None" && this.payment !== undefined && this.payment !== "Soft") {
      this.mightPay();
    }
      

  }

  getStudents() {
    this.loading = this.loadingController.create({
      spinner: 'bubbles',
      content: "Please wait..."
    });  
    this.loading.present();
    
    this.authService.getApiData('students', {}, null, this).then((result) => {
      if(result['success']){
        this.students = result['students'];
        const userData = JSON.parse(localStorage.getItem('userData'));
        userData.students = this.students;
        localStorage.setItem('userData', JSON.stringify(userData));
        if(this.loading) {
          this.loading.dismiss();
        }
      }
    });
  }
  

  goToHostel(params){
    if (!params) params = {};
    this.navCtrl.push(HostelPage, {
      'studentID': params.studentId
    });
  }goToDailyTeaches(params){
    if (!params) params = {};
    this.navCtrl.push(DailyTeachesPage, {
      'studentID': params.studentId
    });
  }goToAccount(params){
    if (!params) params = {};
    this.navCtrl.push(AccountPage, {
      'studentID': params.studentId
    });
  }goToSetting(params){
    if (!params) params = {};
    this.navCtrl.push(SettingPage, {
      'studentID': params['studentID']
    });
  }goToExams(params){
    if (!params) params = {};
    this.navCtrl.push(ExamsPage, {
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
