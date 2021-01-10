import { Injectable } from '@angular/core';
import { CommonService } from '../../service/commonservice/common.service';
import { CommoncallService } from '../../service/commoncall/commoncall.service';

@Injectable({
  providedIn: 'root'
})
export class GetcoinService {
header:any;
  constructor( private localdata: CommonService,
    private apiCall:CommoncallService) {
      this.header=this.localdata.getlocalData()['token']
     }
   getCryptoAddress(url){
     console.log('api>>>>>>>>>>>>>>',url)
    return new Promise((resolve, reject) => {
      this.apiCall.getRequestHeader(url, this.header).subscribe(res => {
        console.log('address>>>>',res)
      return resolve(res);       
      }, error => {
        if(error) return reject("Something went wrong!")
      })
    });
  }
}