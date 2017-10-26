import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-daily-teaches',
  templateUrl: 'daily-teaches.html'
})
export class DailyTeachesPage {
  studentID : any;
  daily_teachs = [];

  constructor(public navCtrl: NavController, public params: NavParams, public authService: AuthService) {
    this.studentID = params.get('studentID');
    this.getDailyTeaches()
  }

  getDailyTeaches() {
    this.authService.getApiData('daily_teaches', "", this.studentID).then((result) => {
      this.daily_teachs = result['daily_teaches'];
    });
  }
  
}
