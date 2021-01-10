import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here
import { CommoncallService } from '../../service/commoncall/commoncall.service';
import { CommonService } from '../../service/commonservice/common.service'
import { Router, ActivatedRoute } from '@angular/router';
import { SmsauthService } from '../../service/smsauthservice/smsauth.service';
import { EncryptService } from '../../service/encryptservice/encrypt.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  service: any;
  userMail: any;
  userPassword:any;


  constructor(private http: HttpClient,
    private apiCall: CommoncallService,
    private router: Router,
    private crypt: EncryptService,
    private setLocalStoreage: CommonService,
    private sendSms: SmsauthService,
    private toastr:ToastrService) { }


  signInApiCall(data) {
    let email = this.encrypt(data.email)
    return new Promise((resolve, reject) => {
      this.apiCall.postRequest(data, "user/signIn").subscribe(res => {
        if (res['data']['twoFaPopulate'] == undefined || res['data']['twoFaPopulate']['enableDisbaleSmsAuth'] == false && res['data']['twoFaPopulate']['enableDisbaleGAuth'] == false) {
          this.setLocalStoreage.setLocalData(res)
          this.toastr.success("Welcome to cypherchange", "login successfully")
          return resolve(this.router.navigate(['/account/']))
        }
        else if (res['data']['twoFaPopulate']['enableDisbaleGAuth'] == true) {
          this.toastr.warning("Gauth OTP ", "")
          this.router.navigate(["verify/" +0])
          this.service=res;
          this.userPassword=data.password;
          return resolve(res)
        }
        else if (res['data']['twoFaPopulate']['enableDisbaleSmsAuth'] == true){
         this.sendSms.resendSmsAuth(res['data']['_id'],res['data']['jwt'])
         this.toastr.success("OTP sent", "")
          this.router.navigate(["verify/" +1])
          this.userPassword=data.password
          this.service=res;
          return resolve(res)
        } 
        return resolve(res);    
      }, error => {
        if (error.status == 404) return reject("Invalid Credentials")
        else if (error.status == 461) {
          this.router.navigate(['/mailverify/' + email])
          return reject("Your Mail Id is not verified.")
        }
        else if (error.status == 460) {
          this.router.navigate(['/unauthorised/' + email])
          return reject("Your IP is unauthorised")
        }
      });
    })
  }
  encrypt(email) {
    let encryptData = this.crypt.set('123456*1@#$#@$^@1ERF', email);
    let userEmail = encryptData.toString().replace('+', 'xMl3Jk').replace('/', 'Por21Ld').replace('=', 'Ml32');
    return userEmail;
  }
}
