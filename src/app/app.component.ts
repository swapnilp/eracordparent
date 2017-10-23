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
  students = [{ Name:'item-1', Value:false},
           { Name:'item-2', Value:false}];
  isFirstChange = true;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, events: Events) {
    this.rootPage = MpinLoginPage;
    
    events.subscribe('user:login', (name) => {
      const user = JSON.parse(localStorage.getItem('userData'));
      this.studentName = user.name;
      this.slides.update();
    });
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngAfterViewInit() {
    this.slides.freeMode = true;
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
    this.navCtrl.setRoot(HostelPage);
  }goToDailyTeaches(params){
    if (!params) params = {};
    this.navCtrl.setRoot(DailyTeachesPage);
  }goToAccount(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AccountPage);
  }goToSetting(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SettingPage);
  }goToExams(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ExamsPage);
  }goToMpinLogin(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MpinLoginPage);
  }goToRegister(params){
    if (!params) params = {};
    this.navCtrl.setRoot(RegisterPage);
  }
}
