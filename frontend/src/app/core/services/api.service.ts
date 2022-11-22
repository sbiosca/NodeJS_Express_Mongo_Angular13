import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,  throwError } from 'rxjs';


import { catchError } from 'rxjs/operators';

//const baseUrl = 'http://localhost:3000/api/';
const baseUrl = 'http://192.168.54.20:3000/api/';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${baseUrl}${path}`, { params }).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    console.log(`${baseUrl}${"User/"+path}`, )
    console.log(path)
    // return this.http.put(`${environment.url}${path}`,JSON.stringify(body)).pipe(catchError(this.formatErrors));
    return this.http.put(`${baseUrl}${path}`,body/* JSON.stringify(body) */).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${baseUrl}${path}`,body/* JSON.stringify(body) */).pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${baseUrl}${path}`).pipe(catchError(this.formatErrors));
  }
}
