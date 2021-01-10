import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Import it up here
import { CommonService } from '../../service/commonservice/common.service';
import { CommoncallService } from '../../service/commoncall/commoncall.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotserviceService {

  constructor(
    private http: HttpClient,
    private localData: CommonService,
    private apiCall:CommoncallService,
  ) { }

  resetLink(data) {
    return new Promise((resolve,reject)=>{
      this.apiCall.postRequest({email:data},"user/forgotPassword").subscribe(res=>{
        resolve(res)
      }, error=>{
       reject("Email is not exist")
      })
    }) 
  }
  changePassword(data,header){
    return new Promise((resolve, reject) => {
      this.apiCall.putRequestHeader(data, "user/changePassword", header).subscribe(res => {
        resolve(res);
      }, error => {
        if(error.status==404) reject("Invalid password ")
        else if(error.status==406) reject("Password is not matching")
        else if(error.status==403) reject ("Use other password")
      });
    })
  }
  resetPassword(data,header){
    return new Promise((resolve,reject)=>{
      this.apiCall.postRequest(data,"user/resetPassword/"+header).subscribe(res=>{
        resolve(res)
      }, error=>{
       if(error.status==400) reject("Invalid password ")
        else if(error.status==500) reject("Something Goes wrong")
        else if(error.status==403) reject ("Use other password")
      })
    }) 
  }
}
