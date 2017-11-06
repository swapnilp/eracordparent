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
  page = 2;
  isLoading= false;
  totalCount = 0;
  
  constructor(public navCtrl: NavController, public params: NavParams, public authService: AuthService, public loadingController: LoadingController) {
    this.loading.present();
    this.studentID = params.get('studentID');
    this.getDailyTeaches(1)
  }

  getDailyTeaches(page, scroll = null) {
    this.isLoading = true;
    let self = this;
    this.authService.getApiData('daily_teaches', {page: page}, this.studentID, this).then((result) => {
      this.totalCount = result['total_count'];
      if(result['daily_teaches']) {
        if(result['daily_teaches'].length == 0 && scroll) {
          scroll.enable(false);
        }
        for(let daily_teach of result['daily_teaches']) {
          setTimeout(() => {
            this.daily_teachs.push(daily_teach);
          }, 500);
          
        }
        if(self.loading) {
          self.loading.dismiss();
        }
        this.isLoading = false;
        if(scroll){ 
          scroll.complete();
        }
      }
    });
  }
  
  goToStudent(params){
    if (!params) params = {};
    this.navCtrl.setRoot(StudentsPage);
  }

  doInfinite(infiniteScroll) {
    if(!this.isLoading) {
      this.getDailyTeaches(this.page, infiniteScroll);
      this.page++;
    }
  }
}
