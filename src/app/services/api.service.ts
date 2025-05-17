import { environment } from '@/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(environment.tokenKey);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  get<T>(url: string, options: object = {}) {
    return this.http.get<T>(`${this.baseUrl}${url}`, {
      headers: this.getHeaders(),
      ...options
    });
  }

  post<T>(url: string, body: any, options: object = {}) {
    return this.http.post<T>(`${this.baseUrl}${url}`, body, {
      headers: this.getHeaders(),
      ...options
    });
  }

  put<T>(url: string, body: any, options: object = {}) {
    return this.http.put<T>(`${this.baseUrl}${url}`, body, {
      headers: this.getHeaders(),
      ...options
    });
  }

  delete<T>(url: string, options: object = {}) {
    return this.http.delete<T>(`${this.baseUrl}${url}`, {
      headers: this.getHeaders(),
      ...options
    });
  }
}
