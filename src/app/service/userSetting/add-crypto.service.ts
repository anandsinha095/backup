import { Injectable } from '@angular/core';
import { CommonService } from '../../service/commonservice/common.service';
import { CommoncallService } from '../../service/commoncall/commoncall.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AddCryptoService {
  header: any;
  constructor(private localdata: CommonService,
    private apiCall: CommoncallService,
    private toastr: ToastrService,) {
    this.header = this.localdata.getlocalData()['token']
  }
  addCryptoAddress(data) {
    return new Promise((resolve, reject) => {
      this.apiCall.postRequestHeader(data, 'coin/wd/addWithDrawAddress', this.header).subscribe(res => {
        this.toastr.success('great','Coin Added Successfully')
        return resolve(res);
      }, error => {
        this.toastr.error("Something went wrong!")
      })
    });
  }
  getWithdrwalAddesss(cryptoId,userId) {
    return new Promise((resolve, reject) => {
      this.apiCall.getRequestHeader('coin/wd/getWithDrawAddress/'+cryptoId+'/'+userId, this.header).subscribe(res => {
        console.log('api data ???>>', res['data'])
        let mainData:any=[]=res['data'];
        console.log('api data >>>>>>>>>>>>>>>>>>', res['data'])
        // for (let i = 0; i < mainData.length; i++){
        //   let group = mainData[i];
        //   console.log('adressscxkjdhssdfh>>>>>',group)
        // }
        return resolve(mainData);
      }, error => {
        if (error) return reject("Something went wrong!")
      })
    });
  }
  withdraw(data){
    console.log('datat>>>>>>??????????',data)
    return new Promise((resolve, reject) => {
      this.apiCall.postRequestHeader(data,'coin/eth/withDrawEthereum', this.header).subscribe(res => {
        console.log('withdrawal data ???>>', res)
        let mainData=res;
        return resolve(mainData);
      }, error => {
        if (error) return reject("Something went wrong!")
      })
    });
  }
  setFee(coin,userId){
    return new Promise((resolve, reject) => {
      this.apiCall.putRequestHeader(coin,'coin/wd/setCurrencyType/'+userId,this.header).subscribe(res => {
        return resolve(res);
      }, error => {
         return reject("Something went wrong!")
      })
    });
  }
  removeUserWithdrawalAddress(coinId,userId,address){
    return new Promise((resolve, reject) => {
      this.apiCall.DeleteRequestHeader('coin/wd/deleteWithDrawAddres/'+coinId+'/'+userId+'/'+address,this.header).subscribe(res => {
        this.toastr.success('Address is successfully deleted','Deleted')
        return resolve(res);
      }, error => {
         return reject("Something went wrong!")
      })
    });
  }
}
