import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
//let apiUrl = 'http://localhost:3000/parents/';
let apiUrl = 'http://192.168.1.101:3000/parents/';
let serverUrl = 'http://192.168.1.101:3000/api/v1/parents/';

@Injectable()
export class AuthService {

  constructor(public http: Http, public events: Events) {
  }
  
  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      
      this.http.post(apiUrl + type+ ".json" , credentials, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
      
    });
  }

  getPostData(credentials, type) {
    return new Promise((resolve, reject) => {
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      
      this.http.post(serverUrl + type+ ".json" , credentials, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
      
    });
  }
  
  getApiData(url, params, student_id = null, pageObj) {
    let self = this;
    return new Promise((resolve, reject) => {
      const user = JSON.parse(localStorage.getItem('userData'));
      if(user) {
      
        let req_params = "&authorization_token="+ user.token;
        
        if(student_id) {
          req_params  = req_params  + "&student_id=" + student_id;
        }
        
        let paramsKeys = Object.keys(params);
        for(let key of paramsKeys) {
          req_params  = req_params +"&"+ key + "=" +params[key]
        }
        this.http.get(serverUrl + url+ ".json?" + req_params)
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            localStorage.setItem('userData', null);
            if(url !== 'hostels' && pageObj.loading) {
              
              pageObj.loading.dismiss();
            }
            self.events.publish('user:unauth', "Swapnil Patil");
            resolve(err.json());
          });
      }else {
        reject({});
      }
    });
  }

}
