import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Slides, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser} from "@ionic-native/in-app-browser";

import { HostelPage } from '../pages/hostel/hostel';
import { DailyTeachesPage } from '../pages/daily-teaches/daily-teaches';
import { AccountPage } from '../pages/account/account';
import { SettingPage } from '../pages/setting/setting';
import { ExamsPage } from '../pages/exams/exams';
import { MpinLoginPage } from '../pages/mpin-login/mpin-login';
import { RegisterPage } from '../pages/register/register';
import { EracordPage } from '../pages/eracord/eracord';
import { StudentsPage } from '../pages/students/students';
import { EracordPaymentPage } from '../pages/eracord-payment/eracord-payment';
import { Device } from '@ionic-native/device';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  @ViewChild(Slides) slides: Slides;
  rootPage:any = EracordPage;
  students = [];
  isFirstChange = true;
  payment:any = "";
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, events: Events, private device: Device, private inAppBrowser: InAppBrowser, public alertCtrl: AlertController) {
    
    if(localStorage.getItem('mobile') && localStorage.getItem('deviceId')) {
      this.rootPage = MpinLoginPage;
    } else {
      let deviceid = this.device.uuid;
      localStorage.setItem('deviceId', deviceid);
      this.rootPage = EracordPage;
    }
    
    events.subscribe('user:login', (name) => {
      let self = this;
      const user = JSON.parse(localStorage.getItem('userData'));
      this.payment = localStorage.getItem('paymentPriority');
      let updatePriority = user.update_priority;
      debugger
      this.students = user.students;
      //if(this.students.length > 0 && self.slides) {
      //  setTimeout(function(){
      //    self.slides.update();
      //    self.navCtrl.setRoot(StudentsPage);
      //  }, 2000);
      //}
      if(updatePriority.priority == "Urgent") {
        self.hasUpdate(updatePriority.update_url);
      } else {
        self.navCtrl.setRoot(StudentsPage, {payment: this.payment});
      }
    });

    events.subscribe('user:unauth', (name) => {
      this.navCtrl.setRoot(MpinLoginPage);
    });
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngAfterViewInit() {
    if(this.slides) {
      //this.slides.freeMode = true;
    }
  }
  
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    this.slides.slideTo(currentIndex, 0, false);
  }
  
  onSlideDrag() {
    if (this.isFirstChange) {
      this.isFirstChange = false;
      this.slideChanged();
    }
  }

  onMousedown() {
    this.isFirstChange = true;
  }

  hasUpdate(url) {
    let self = this;
    let confirm = this.alertCtrl.create({
      title: 'Update App !!',
      message: 'Please update app for getting new features. ',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Not Now',
          handler: () => {
            self.navCtrl.setRoot(StudentsPage, {payment: this.payment});
          }
        },
        {
          text: 'Update Now',
          handler: () => {
            this.inAppBrowser.create(url, '_system');
            self.navCtrl.setRoot(StudentsPage, {payment: this.payment});
          }
        }
      ]
    });
    confirm.present();
  }
  
  goToHostel(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HostelPage, {
      'studentID': params.studentID
    });
  }goToDailyTeaches(params){
    if (!params) params = {};
    this.navCtrl.setRoot(DailyTeachesPage, {
      'studentID': params.studentID
    });
  }goToAccount(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AccountPage, {
      'studentID': params.studentID
    });
  }goToSetting(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SettingPage, {
      'studentID': params.studentID
    });
  }goToExams(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ExamsPage, {
      'studentID': params['studentId']
    });
  }goToMpinLogin(params){
    if (!params) params = {};
    localStorage.removeItem('userData');
    this.navCtrl.setRoot(MpinLoginPage);
  }goToRegister(params){
    if (!params) params = {};
    this.navCtrl.setRoot(RegisterPage);
  }goToStudent(params){
    if (!params) params = {};
    this.navCtrl.setRoot(StudentsPage);
  }goToUnlock(params){
    if (!params) params = {};
    this.navCtrl.setRoot(EracordPaymentPage);
  }
}
