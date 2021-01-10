import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommoncallService {
  baseUrl = "http://192.168.1.183:5000/api/v1/";
  constructor(private http: HttpClient) { }

  postRequest(data, url) {
    return this.http.post(this.baseUrl + url, data);
  }
  postRequestHeader(data, url, header) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data; charset=utf-8');
    return this.http.post(this.baseUrl + url, data, { headers: { 'authorization': header } });
  }
  putRequestHeader(data, url, header) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.put(this.baseUrl + url, data, { headers: { 'authorization': header } });
  }
  getRequest(data) {
    return this.http.get(this.baseUrl + data);
  }
  getRequestHeader(data, header) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get(this.baseUrl + data, { headers: { 'authorization': header } });
  }
  DeleteRequestHeader(url, header) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.delete(this.baseUrl + url, { headers: { 'authorization': header } });
  }
}
