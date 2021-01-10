import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Import it up here
import { Router, ActivatedRoute } from '@angular/router';
import {CommoncallService} from '../commoncall/commoncall.service'
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiCall:CommoncallService
  ) { }


  getlocalData() {
    let obj = {}
    obj['mainData'] = localStorage.getItem('dataSource')
    obj['userId'] = localStorage.getItem('userId')
    obj['token'] = localStorage.getItem('token')
    obj['userMail'] = localStorage.getItem('userMail')
    obj['gauth'] = localStorage.getItem('gauth')
    obj['smsAuth'] = localStorage.getItem('smsAuth')
    obj['firstName'] = localStorage.getItem('firstName')
    obj['lastName'] = localStorage.getItem('lastName')
    obj['antiPhishing'] = localStorage.getItem('antiFishingCodeStatus')
    obj['secondPassword'] = localStorage.getItem('secondPasswordStatus')
    return obj;
  }
  setLocalData(sourceData) {
    localStorage.setItem('dataSource', JSON.stringify(sourceData));
    localStorage.setItem('userId', sourceData['data']['_id']);
    localStorage.setItem('token', sourceData['data']['jwt']);
    localStorage.setItem('userMail',sourceData['data']['email']);
    localStorage.setItem('firstName', sourceData['data']['firstName']);
    localStorage.setItem('lastName',sourceData['data']['lastName']);

    if (sourceData['data']['twoFaPopulate']) {
      localStorage.setItem('gauth', sourceData['data']['twoFaPopulate']['enableDisbaleGAuth'])
      localStorage.setItem('smsAuth', sourceData['data']['twoFaPopulate']['enableDisbaleSmsAuth'])
    }
    else if(sourceData['data']['twoFaPopulate'] === undefined) {
      localStorage.setItem('gauth', "false")
      localStorage.setItem('smsAuth',"false")
    }
    
    if(sourceData['data']['settingPopulate']) {
      localStorage.setItem('antiFishingCodeStatus', sourceData['data']['settingPopulate']['antiFishingCodeStatus'])
      localStorage.setItem('secondPasswordStatus', sourceData['data']['settingPopulate']['secondPasswordStatus'])
    }
    else if(sourceData['data']['settingPopulate'] === undefined) {
      localStorage.setItem('antiFishingCodeStatus', "false")
      localStorage.setItem('secondPasswordStatus',"false")
    return
    }

  }
  checkLogin() {
    if (localStorage.getItem('token')) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
    }
  }
  userInfo(data,header) {    
    let headers =new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get(this.apiCall.baseUrl+"user/userInfo/"+data,{ headers: { 'authorization': header }});  

  }

}
