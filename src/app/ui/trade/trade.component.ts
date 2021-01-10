import { Component, OnInit ,AfterViewInit } from '@angular/core';
import { CryptoDataService} from '../../service/cryptodataservice/crypto-data.service';
// import { ngEmbed } from 'chart.js';
declare const TradingView: any;


@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit, AfterViewInit {
  users:any;
  cryptoReq: any;
  limit = true;
  market= false;
  stopLimit= false;
  activeOrder=true;
  closedOrder=false;
  history=true;
  currentMarket=false;
  widgetHeight=630;
  widgetWidth=925;
  innerWidth: any;
  innerHeight:any;
  //limitOn:boolean = false;
  //marketOn:boolean = false;s
  //stopLimitOn:boolean = false;
  constructor(private cryptodata: CryptoDataService) {
   }
  
  ngAfterViewInit() {

   /*------------ @@@@@@@@@@@ Tradview chart  @@@@@@@@@@@-------------------*/ 
    new TradingView.widget({
      "container_id": "myWidgetContainer",
      "width":this.widgetWidth,
      "height":this.widgetHeight,
      "symbol": "BITFINEX:BTCUSD",
      "interval": "D", 
      "timezone": "Etc/UTC",
      "theme": "light",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "hide_side_toolbar": false,
      "allow_symbol_change": true,
       "watchlist": [
    "KRAKEN:ETHUSD",
    "KRAKEN:BCHUSD",
    "KRAKEN:LTCUSD",
    "BITFINEX:EOSUSD",
    "BITFINEX:TRXUSD"
  ],
  "studies": [
    "DoubleEMA@tv-basicstudies",
    "MASimple@tv-basicstudies"
  ],

  }); 
  }
  ngOnInit() {
      this.cryptodata.getUsers().subscribe(cryptodata => {
      this.users = cryptodata;
      
    });
      this.cryptodata.getCrypt().subscribe(cryptodata=>{
        this.cryptoReq=cryptodata;
       }
      );

  /*---------------@@@@@@@@@@@@@ Force responsive  chart @@@@@@@@@@@@ -----------------*/
      this.innerWidth = window.innerWidth;
      this.innerHeight = window.innerHeight;
      console.log(innerWidth);
       if(innerWidth<=1440){
       this.widgetWidth=600;
       this.widgetHeight=600;
       }
       if(innerWidth<=740){
        this.widgetWidth=300;
        this.widgetHeight=300;
        } 
  }
   
  tradeOption(test){

    if(test=='limit'){
     this.limit = true;
     this.market=false;   
     this.stopLimit=false; 
      }
   else if (test=='market'){
    this.limit = false;
    this.market=true;   
    this.stopLimit=false;
   } 
   else if (test=='stopLimit'){
    this.limit = false;
    this.market=false;   
    this.stopLimit=true;
   } 
 }

 orderOption(order){
  if(order=='activeOrder'){
   this.activeOrder = true;
   this.closedOrder=false;   
    }
 else if (order=='closedOrder'){
  this.activeOrder = false;
  this.closedOrder=true; 
 } 
}
marketing(details){
  if(details=='history'){
    this.currentMarket = false;
   this.history= true;  
    }
 else if (details=='currentMarket'){
  this.currentMarket = true;
  this.history=false;  
 } 
}

}
