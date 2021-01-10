import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Import it up here
import { Router, ActivatedRoute } from '@angular/router';
import { CommoncallService } from '../commoncall/commoncall.service'

@Injectable({
  providedIn: 'root'
})
export class LoginhistoryService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiCall: CommoncallService
  ) { }
  userLoginDetails(data, header) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get(this.apiCall.baseUrl + "user/lastLogin/" + data, { headers: { 'authorization': header } });
  }
  userDeviceDetails(data, header) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get(this.apiCall.baseUrl + "user/deviceManagement/" + data, { headers: { 'authorization': header } });
  }
  userDeviceDeleteDetails(data,userId,header) {
    return new Promise((resolve, reject) => {
      this.apiCall.DeleteRequestHeader('user/removeIP/'+data+'/'+userId,header).subscribe(res => {
        return resolve(res)
      }, error => {
        return reject('Something went wrong!')
      })
    })
  }
}
