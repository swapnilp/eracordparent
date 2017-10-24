import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Slides, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HostelPage } from '../pages/hostel/hostel';
import { DailyTeachesPage } from '../pages/daily-teaches/daily-teaches';
import { AccountPage } from '../pages/account/account';
import { SettingPage } from '../pages/setting/setting';
import { ExamsPage } from '../pages/exams/exams';
import { MpinLoginPage } from '../pages/mpin-login/mpin-login';
import { RegisterPage } from '../pages/register/register';
import { EracordPage } from '../pages/eracord/eracord';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  @ViewChild(Slides) slides: Slides;
  rootPage:any = EracordPage;
  studentName = "Name";
  students = [];
  isFirstChange = true;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, events: Events) {
    this.rootPage = MpinLoginPage;
    
    events.subscribe('user:login', (name) => {
      const user = JSON.parse(localStorage.getItem('userData'));
      let self = this;
      this.studentName = user.name;
      this.students = user.students;
      if(this.students.length > 0) {
        setTimeout(function(){
          self.slides.update();
        }, 2000);
      }
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
      this.slides.freeMode = true;
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
      'studentID': params.studentID
    });
  }goToMpinLogin(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MpinLoginPage);
  }goToRegister(params){
    if (!params) params = {};
    this.navCtrl.setRoot(RegisterPage);
  }
}
