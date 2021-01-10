import { Component, OnInit } from '@angular/core';
import { ResendMailService } from '../../service/mailservice/resend-mail.service';
import { EncryptService } from '../../service/encryptservice/encrypt.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-unauthorised',
  templateUrl: './unauthorised.component.html',
  styleUrls: ['./unauthorised.component.scss']
})
export class UnauthorisedComponent implements OnInit {
  emailId: any;
  resendMailIp: any;
  id:any
  constructor(
    private resendMailIP: ResendMailService,
    private route: ActivatedRoute,
    private crypt: EncryptService,
    private toastr:ToastrService
  ) { }

  ngOnInit() {
    /*--------------------@@@ decrypting Email id @@@----------------------*/
    let decrypt = this.route.snapshot.paramMap.get('email');
    let decryptData = decrypt.toString().replace('xMl3Jk', '+').replace('Por21Ld', '/').replace('Ml32', '=');
    this.id = this.crypt.get('123456*1@#$#@$^@1ERF', decryptData)
     console.log('email', this.id)
    this.emailId = { emailId: this.id}
   
  }
  async send() {
    try {
     await  this.resendMailIP.resendMailIP(this.emailId)
     this.toastr.success('Authorize required','Mail resent') 
    }
    catch(e){
     this.toastr.error(e,'Opps!')  
    }
  }
}
