import { Component, OnInit } from '@angular/core';
import{CommonService} from '../../service/commonservice/common.service'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
 publicNav=true;
 localDataSource:any;
 userFirstName:string;
 userLastName:string;
  constructor(
    private localdata:CommonService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.localDataSource= this.localdata.getlocalData();
    this.userFirstName=this.localDataSource['firstName']
    this.userLastName=this.localDataSource['lastName']
      if(this.localDataSource['token']){
          this.publicNav=false
      }
      else{
        this.publicNav=true;
      }
     
  }
  logout(){
    
  localStorage.clear();
  this.router.navigate(['/login']);
  }

}
