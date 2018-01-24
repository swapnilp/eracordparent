import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  studentID : any;
  notifications = [];
  loading = this.loadingController.create({
    spinner: 'bubbles',
    content: "Please wait..."
  });  
  page = 2;
  isLoading= false;
  totalCount = 0;
  filter: any= {};
  isFltered:any = false;
  
  constructor(public navCtrl: NavController, public params: NavParams, public authService: AuthService, public loadingController: LoadingController) {
    this.loading.present();
    this.studentID = params.get('studentID');
    this.filter = params.get('filter');
    this.isFltered = params.get('hasFiltered');
    this.getNotifications(1);
  }
  
  getNotifications(page, scroll = null) {
    this.isLoading = true;
    this.authService.getApiData('notifications', {page: page}, this.studentID, this).then((result) => {
      this.totalCount = result['total_count'];
      if(result['notifications']){
        if(result['notifications'].length == 0 && scroll) {
          scroll.enable(false);
        }
        for(let notification of result['notifications']) {
          setTimeout(() => {
            this.notifications.push(notification);
          }, 500);

        }
        if(this.loading) {
          this.loading.dismiss();
        }
        this.isLoading = false;
        if(scroll){ 
          scroll.complete();
        }
      }
    });
  }

  doInfinite(infiniteScroll) {
    if(!this.isLoading) {
      this.getNotifications(this.page, infiniteScroll);
      this.page++;
    }
  }

  goToStudent(params){
    if (!params) params = {};
    this.navCtrl.setRoot('StudentsPage');
  }

  filterNotification() {
    //this.navCtrl.push(ExamFilterPage, {
    //  'studentID': this.studentID,
    //  'filter': this.filter
    //});
  }
}
