import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Import it up here
import { CommonService } from '../../service/commonservice/common.service'
import { CommoncallService } from '../commoncall/commoncall.service'

@Injectable({
  providedIn: 'root'
})
export class AntiphishingService {

  constructor(
    private http: HttpClient,
    private localData: CommonService,
    private apiCall: CommoncallService
  ) { }
  antiPhishing(data) {
    return new Promise((resolve, reject) => {
      this.apiCall.postRequestHeader(data, 'user/enableAntiFishing', this.localData.getlocalData()['token']).subscribe(res => {
        return resolve(res);
      }, error => {
        if (error.status == 404) reject('Something went wrong')
      })
    })
  }
  antiPhishingUpdate(data) {
    return new Promise((resolve, reject) => {
      this.apiCall.putRequestHeader(data, 'user/updateAntiFishing', this.localData.getlocalData()['token']).subscribe(res => {
        return resolve(res);
      }, error => {
        if (error.status == 404) reject('Something went wrong')
      })
    })
  }
}