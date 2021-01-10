import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResendMailService } from '../../service/mailservice/resend-mail.service';
import { EncryptService } from '../../service/encryptservice/encrypt.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mailverify',
  templateUrl: './mailverify.component.html',
  styleUrls: ['./mailverify.component.scss']
})
export class MailverifyComponent implements OnInit {
  isLoggedIn = true;
   emailId:any 
   id:any
  
  constructor(private route: ActivatedRoute,
    private resend: ResendMailService,
    private router: Router,
    private crypt:EncryptService,
    private toastr:ToastrService) {}
  
  ngOnInit() {    
    /*--------------------@@@ decrypting Email id @@@----------------------*/
     let decrypt= this.route.snapshot.paramMap.get('email');
     let decryptData = decrypt.toString().replace('xMl3Jk', '+' ).replace('Por21Ld', '/').replace('Ml32', '=');
     this.id = this.crypt.get('123456*1@#$#@$^@1ERF', decryptData)
      this.emailId = {emailId: this.id}
      console.log('email', this.emailId)
    }
    async send(){
      try {
        await this.resend.resendMail(this.emailId)
        this.toastr.success('Check & Verify your Mail Id','Confirmation mail resent!')
      }
      catch(e){
        this.toastr.error(e,'Opps!')
      }
    }
}
