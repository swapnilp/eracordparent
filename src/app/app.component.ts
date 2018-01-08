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
import { FeedbackPage } from '../pages/feedback/feedback';
import { Device } from '@ionic-native/device';
import { AlertService } from '../providers/alert-service/alert-service';
import { AuthService } from '../providers/auth-service/auth-service';
import { Push, PushObject, PushOptions } from '@ionic-native/push';


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
  parentName: any= "";
  mobile: any = "";
  backButtonPressedOnceToExit:any = false;
  
  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, events: Events, private device: Device, private inAppBrowser: InAppBrowser, public alertCtrl: AlertController, public alertService: AlertService, public push: Push, public authService: AuthService) {
    
    if(localStorage.getItem('mobile') && localStorage.getItem('deviceId') && localStorage.getItem('deviceId') !== null) {
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
      this.students = user.students;
      this.parentName = user.name;
      this.mobile = localStorage.getItem('mobile');
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
      
      platform.registerBackButtonAction(() => {
        if (this.backButtonPressedOnceToExit) {
          this.platform.exitApp();
        } else if (this.navCtrl.canGoBack()) {
          this.navCtrl.pop({});
        } else {
          this.alertService.backBtn();
          this.backButtonPressedOnceToExit = true;
          setTimeout(() => {
            
            this.backButtonPressedOnceToExit = false;
          },2000)
        }
      });
      if(localStorage.getItem('pushId') == null){
        this.pushsetup();
      }
      splashScreen.hide();
    });
  }

  pushsetup() {
    const options: PushOptions = {
      android: {
        senderID: '32839642830',
        sound: true,
        vibrate: true,
        icon: 'file://assets/img/icon.png',
        forceShow: true
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      if (notification && notification.additionalData.foreground) {
        let youralert = this.alertCtrl.create({
          title: 'Notification from Eracord',
          message: notification.message
        });
        youralert.present();
      }
    });
    pushObject.on('registration').subscribe((registration: any) => {

      let device_id = localStorage.getItem('deviceId')
      var data = "&push_token[device_id]=" + device_id + "&push_token[registration_id]=" + registration['registrationId'] + "&push_token[registration_type]=" + registration['registrationType'] + "&push_token[os]=android";
      this.authService.getPostData(data,'parent/resgister_firebase').then((result) => {
        localStorage.setItem('pushId', registration['registrationId']);
      });
    });
    
    pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
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
  }goToFeedback(params){
    if (!params) params = {};
    this.navCtrl.push(FeedbackPage);
  }
}
