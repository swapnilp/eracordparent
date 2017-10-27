import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { StudentsPage } from '../students/students';

@Component({
  selector: 'page-daily-teaches',
  templateUrl: 'daily-teaches.html'
})
export class DailyTeachesPage {
  studentID : any;
  daily_teachs = [];
  loading = this.loadingController.create({
    spinner: 'bubbles',
    content: "Please wait..."
  });  
  
  constructor(public navCtrl: NavController, public params: NavParams, public authService: AuthService, public loadingController: LoadingController) {
    this.loading.present();
    this.studentID = params.get('studentID');
    this.getDailyTeaches()
  }

  getDailyTeaches() {
    this.authService.getApiData('daily_teaches', "", this.studentID).then((result) => {
      this.daily_teachs = result['daily_teaches'];
      this.loading.dismiss();
    });
  }
  
  goToStudent(params){
    if (!params) params = {};
    this.navCtrl.setRoot(StudentsPage);
  }
}
