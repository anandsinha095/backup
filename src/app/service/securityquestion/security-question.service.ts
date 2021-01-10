import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Import it up here
import { CommonService } from '../../service/commonservice/common.service';
import { CommoncallService } from '../../service/commoncall/commoncall.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityQuestionService {

  constructor(private http: HttpClient,
    private localdata: CommonService,
    private apiCall:CommoncallService)  { }

    gettingSecurityQuestion(id){
      return new Promise((resolve,reject)=>{
        this.apiCall.getRequestHeader('sq/getSecurityQuestionAnswer/'+id,this.localdata.getlocalData()['token']).subscribe(res=>{
          resolve(res)
        },error=>{
          reject("Somthing went Wrong!")
        })
      })
    }
}
