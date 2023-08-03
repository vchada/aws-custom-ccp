import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
      .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) {}

  httpPost(url: string, body: any) {    
    return this.http.post(url, body, {headers: this.headers})
  }

  httpPut(url: string, body: any) {    
    return this.http.put(url, body, {headers: this.headers})
  }

  httpGet(url: string, body?: any) {    
    return this.http.get(url, { headers: this.headers, params: body })
  }
}
