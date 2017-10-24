import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-exams',
  templateUrl: 'exams.html'
})
export class ExamsPage {
  studentID : any;
  constructor(public navCtrl: NavController, public params: NavParams) {
    this.studentID = params.get('studentID');
  }
  
}
