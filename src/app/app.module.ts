import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Device } from '@ionic-native/device';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { AuthService } from '../providers/auth-service/auth-service';
import { EracordPage } from '../pages/eracord/eracord';
import { NewParentPage } from '../pages/new-parent/new-parent';
import { RegisterParentPage } from '../pages/register-parent/register-parent';
import { MpinLoginPage } from '../pages/mpin-login/mpin-login';
import { RegisterPage } from '../pages/register/register';
import { ExamsPage } from '../pages/exams/exams';
import { DailyTeachesPage } from '../pages/daily-teaches/daily-teaches';
import { HostelPage } from '../pages/hostel/hostel';
import { AccountPage } from '../pages/account/account';
import { SettingPage } from '../pages/setting/setting';
import { StudentsPage } from '../pages/students/students';
import { EracordPaymentPage } from '../pages/eracord-payment/eracord-payment';
import { ExamFilterPage } from '../pages/exam-filter/exam-filter';
import { AccountFilterPage } from '../pages/account-filter/account-filter';
import { DailyTeachesFilterPage } from '../pages/daily-teaches-filter/daily-teaches-filter';
import { OrganisationPaymentPage } from '../pages/organisation-payment/organisation-payment';
import { PaymentHistoryPage } from '../pages/payment-history/payment-history';
import { ApplyCouponPage } from '../pages/apply-coupon/apply-coupon';
import { DeleteStudentPage } from '../pages/delete-student/delete-student';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertService } from '../providers/alert-service/alert-service';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '41af3a73'
  },
  'push': {
    'sender_id': '32839642830',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    EracordPage,
    NewParentPage,
    RegisterParentPage,
    MpinLoginPage,
    RegisterPage,
    ExamsPage,
    DailyTeachesPage,
    HostelPage,
    AccountPage,
    SettingPage,
    StudentsPage,
    EracordPaymentPage,
    ExamFilterPage,
    PaymentHistoryPage,
    ApplyCouponPage,
    DeleteStudentPage,
    DailyTeachesFilterPage,
    AccountFilterPage,
    OrganisationPaymentPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EracordPage,
    NewParentPage,
    RegisterParentPage,
    MpinLoginPage,
    RegisterPage,
    ExamsPage,
    DailyTeachesPage,
    HostelPage,
    AccountPage,
    SettingPage,
    StudentsPage,
    EracordPaymentPage,
    ExamFilterPage,
    PaymentHistoryPage,
    ApplyCouponPage,
    DeleteStudentPage,
    DailyTeachesFilterPage,
    AccountFilterPage,
    OrganisationPaymentPage
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    Device,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AlertService
  ]
})
export class AppModule {}
