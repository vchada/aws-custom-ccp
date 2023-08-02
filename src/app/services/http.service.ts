import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) {}

  httpPost(url: string, body: any) {    
    return this.http.post(url, body)
  }

  httpGet(url: string, body?: any) {    
    return this.http.get(url, { params: body })
  }
}
