import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here
import { CommoncallService } from '../../service/commoncall/commoncall.service';
import { CommonService } from '../../service/commonservice/common.service'
import { Router, ActivatedRoute } from '@angular/router';
import { TwoFaService } from '../../service/twofa/two-fa.service'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SecondPasswordService {

  constructor(private http: HttpClient,
    private apiCall: CommoncallService,
    private router: Router,
    private setLocalStoreage: CommonService,
    private twoFaService:TwoFaService,
    private toastr: ToastrService) { }

    setSecondPassword(reqData,serviceType){
      console.log('secondpassword>>>>>>>>>>>>>', reqData,serviceType)
    
    }

}
