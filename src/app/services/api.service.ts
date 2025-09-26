import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7217/api';

  constructor(private http: HttpClient) { }

  get<T>(endpoint: string, options: {headers?: HttpHeaders, withCredentials?: boolean}): Observable<T>{
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, options);
  }

 post<T>(endpoint: string, body: any, options?: { headers?: HttpHeaders, withCredentials?: boolean }): Observable<T> {
  return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, options);
 }
  put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
  return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, { headers });
  }

  delete<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { headers });
  }
}
