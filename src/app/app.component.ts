import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
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
import { Events } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage:any = EracordPage;
  studentName = "Name";
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, events: Events) {
    this.rootPage = MpinLoginPage;
    
    events.subscribe('user:login', (name) => {
      const user = JSON.parse(localStorage.getItem('userData'));
      this.studentName = user.name;
    });
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
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
