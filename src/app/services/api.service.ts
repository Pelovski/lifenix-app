import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7217/api';

  constructor(private http: HttpClient) { }

  get<T>(endpoint: string, headers?: HttpHeaders): Observable<T>{
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {headers});
  }

  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T>{
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, {headers});
  }

  put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
  return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, { headers });
  }

  delete<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { headers });
  }
}
