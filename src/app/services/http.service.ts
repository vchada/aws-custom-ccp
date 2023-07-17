import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer your_token'); // Replace with your actual authorization token

  constructor(private http: HttpClient) {}

  httpPost(url: string, body: any) {    
    return this.http.post(url, body, { headers: this.headers })
  }

  httpGet(url: string, body?: any) {    
    return this.http.get(url, { headers: this.headers, params: body })
  }
}
