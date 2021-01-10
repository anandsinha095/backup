import { Injectable, OnInit } from '@angular/core';
import { CommonService } from '../../service/commonservice/common.service';
import { BehaviorSubject } from 'rxjs';
import * as io from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  results
  withdraw
  balance
  private resultsObservable = new BehaviorSubject<any>(null)
  private withdrawObservable = new BehaviorSubject<any>(null)
  private balanceObservable = new BehaviorSubject<any>(null)
  private url = 'http://192.168.1.183:5000';
  private socket;
  constructor(private localData: CommonService,
  ) {
    this.results = this.resultsObservable.asObservable();
    this.withdraw=this.withdrawObservable.asObservable();
    this.balance=this.balanceObservable.asObservable();
    this.socket = io(this.url);
    let a = this.socket.connect()
    setInterval(() => {
      this.socket.emit('getDepositHistory', this.localData.getlocalData()['token'])
      this.socket.emit('getWithDrawHistory', this.localData.getlocalData()['token'])
      this.socket.emit('getBalanceHistory', this.localData.getlocalData()['token'])
    }, 2000)
    this.socket.on('sendDepositHistory', (data) => {
      console.log('deposit',data)
      this.resultsObservable.next(data);
    });
    this.socket.on('sendWithDrawHistory', (data) => {
    console.log('withdraw',data)
      this.withdrawObservable.next(data);
    });
    this.socket.on('sendBalanceHistory', (data) => {
      console.log('balance',data)
      this.balanceObservable.next(data);
    });
  }
}
