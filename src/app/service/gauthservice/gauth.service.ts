import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Import it up here
import { CommonService } from '../../service/commonservice/common.service';
import { CommoncallService } from '../../service/commoncall/commoncall.service';
@Injectable({
  providedIn: 'root'
})
export class GauthService {

  id: any = [];
  sourceData: any = [];
  auth: any;
    constructor(private http: HttpClient,
    private localdata: CommonService,
    private apiCall:CommoncallService) { }

    /* Generating QR code  */
  gauth(data,header) {
    return new Promise((resolve,reject)=>{
      this.apiCall.postRequestHeader(data,'qr/generateQrCode',header).subscribe(res=>{
        return resolve(res)
      },error=>{
        reject("Something went wrong") 
      })
    })
  }

/* Verifying Gauth and Enabling  */

  gauthVerify(data,header){
    console.log('verify>>>>>>>>>>>>>>???????????????????????????',data,header)
   return new Promise((resolve,reject)=>{
     this.apiCall.postRequestHeader(data,'qr/verifyQrCode',header).subscribe(res=>{
      return resolve(res);
     },
     error => {
      if (error.status == 404)  reject("Invalid Password")
      else if (error.status == 481)  reject("Invalid Gauth")
    })
   });
  }

/* verify while login */

  gauthVerifyOtp(data,header) {
    return new Promise((resolve, reject) => {
      this.apiCall.postRequestHeader(data, "user/save_LoginLog_If_TwoFA_Enable", header).subscribe(res => {
        return resolve(res);
      }, error => {
        if (error.status == 481) return reject("Invalid OTP")
      })
    });
  }
  
/* Disable Gauth  */
  gauthDisable(data,header) {
    return new Promise((resolve,reject)=>{
      this.apiCall.putRequestHeader(data,'qr/disableGAuth',header).subscribe(res=>{
       return resolve(res)
      },error=>{
        if (error.status == 404)  reject("Invalid Password")
        else if (error.status == 481)  reject("Invalid Gauth") 
      })
    });
  }
  verifyGauthCode(data,header) {
    console.log('gauth >>>>>>>>>',data)
    return new Promise((resolve,reject)=>{
      this.apiCall.postRequestHeader(data,'qr/verifyGauthCode',header).subscribe(res=>{
       return resolve(res)
      },error=>{
        if (error.status == 404)  reject("Invalid Password")
        else if (error.status == 481)  reject("Invalid Gauth") 
      })
    });
  }
  

}
