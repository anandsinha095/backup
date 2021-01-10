import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here

@Injectable({
  providedIn: 'root'
})
export class CryptoDataService {

  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get('https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=18')
  }

  getCrypt() {
    return this.http.get('https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=8')
  }
}

