import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-hostel',
  templateUrl: 'hostel.html'
})
export class HostelPage {
  studentID : any;
  hostelName = "";
  roommates:any = [];
  
  constructor(public navCtrl: NavController, public params: NavParams, public authService: AuthService) {
    this.studentID = params.get('studentID');
    this.getHostel()
  }
  
  getHostel() {
    this.authService.getApiData('hostels', "", this.studentID).then((result) => {
      if(result['hostel']) {
        this.hostelName = result['hostel'].name;
        if(result['hostel_room']) {
          this.roommates = result['hostel_room'].students;
        }
      }
    });
  }  
}
