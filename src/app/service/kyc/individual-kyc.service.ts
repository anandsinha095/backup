import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here
import { CommoncallService } from '../commoncall/commoncall.service';
import { CommonService } from '../../service/commonservice/common.service'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class IndividualKycService {

  constructor(private http:HttpClient,
    private apiCall:CommoncallService,
    private toastr:ToastrService,
    private localData:CommonService) { }

    individualKyc(data) {
      console.log("come to hit service==>>",data)
      return new Promise((resolve, reject) => {
        this.apiCall.postRequestHeader(data, "kyc/submitIndividualKyc",this.localData.getlocalData()['token']).subscribe(res => {
          console.log('resss',res)
          resolve(res)
        }, error => {
          console.log('>>>>>>>>>>>>?????????????',error.status)
          this.toastr.error('error')
          // else if (error.status == 400) reject('Bad request')
          // else if (error.status == 500) reject('Something went wrong')
        })
      })
    }
    resubmitIndividualKyc(data) {
      console.log("come to hit service==>>",data)
      return new Promise((resolve, reject) => {
        this.apiCall.putRequestHeader(data, "kyc/reSubmitIndividualKYC",this.localData.getlocalData()['token']).subscribe(res => {
          console.log('resss',res)
          resolve(res)
        }, error => {
          console.log('>>>>>>>>>>>>?????????????',error.status)
          this.toastr.error('error')
          // else if (error.status == 400) reject('Bad request')
          // else if (error.status == 500) reject('Something went wrong')
        })
      })
    }
    corporateKyc(data) {
      console.log("come to hit service==>>",data)
      return new Promise((resolve, reject) => {
        this.apiCall.postRequestHeader(data, "kyc/submitCorporateKyc",this.localData.getlocalData()['token']).subscribe(res => {
          console.log('resss',res)
          resolve(res)
        }, error => {
          console.log('>>>>>>>>>>>>?????????????',error.status)
          this.toastr.error('error')
          // else if (error.status == 400) reject('Bad request')
          // else if (error.status == 500) reject('Something went wrong')
        })
      })
    }
    resubitCorporateKyc(data) {
      console.log("come to hit service==>>",data)
      return new Promise((resolve, reject) => {
        this.apiCall.putRequestHeader(data, "kyc/reSubmitCorporateKYC",this.localData.getlocalData()['token']).subscribe(res => {
          console.log('resss',res)
          resolve(res)
        }, error => {
          console.log('>>>>>>>>>>>>?????????????',error.status)
          this.toastr.error('error')
          // else if (error.status == 400) reject('Bad request')
          // else if (error.status == 500) reject('Something went wrong')
        })
      })
    }
}
