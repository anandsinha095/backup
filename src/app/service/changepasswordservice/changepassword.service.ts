import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Import it up here
import { CommonService } from '../../service/commonservice/common.service'

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {

  constructor(
    private http: HttpClient,
    private localData: CommonService
  ) { }
  changePassword(data) {
  //   let localStoreData = this.localData.getlocalData();
  //   let url = "http://192.168.1.124:5000/api/v1/user/changePassword";
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  //  return this.http.put(url, data, {
  //     headers: { 'authorization': localStoreData['token'] }
    // });
  }
}
