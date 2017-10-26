import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HostelPage } from '../hostel/hostel';
import { DailyTeachesPage } from '../daily-teaches/daily-teaches';
import { AccountPage } from '../account/account';
import { SettingPage } from '../setting/setting';
import { ExamsPage } from '../exams/exams';

@Component({
  selector: 'page-students',
  templateUrl: 'students.html'
})
export class StudentsPage {
  students = [];
  constructor(public navCtrl: NavController) {
    const user = JSON.parse(localStorage.getItem('userData'));
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
      'studentID': params.studentID
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
}
