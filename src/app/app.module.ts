import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
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
import { EracordPaymentPage } from '../pages/eracord-payment/eracord-payment';
import { OrganisationPaymentPage } from '../pages/organisation-payment/organisation-payment';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    EracordPaymentPage,
    OrganisationPaymentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    EracordPaymentPage,
    OrganisationPaymentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}