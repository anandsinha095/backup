import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResendMailService } from '../../service/mailservice/resend-mail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(private resend: ResendMailService,
    private router: Router,
    private route:ActivatedRoute,
    private toastr:ToastrService) { }

  async ngOnInit() {
    try {
        let token= await this.route.snapshot.paramMap.get('id');   
       let res = await this.resend.mailconfirmation('user/verifyEmail/'+token)
       localStorage.clear();
      }
      catch(e){
        this.toastr.error(e,'Opps!')
      }
    }

}
