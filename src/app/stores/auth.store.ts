import { environment } from '@/environments/environment';
import { Injectable, signal } from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private _token = signal<string | null>(localStorage.getItem(environment.tokenKey));

  readonly token = this._token.asReadonly();

  setToken(token: string) {
    localStorage.setItem(environment.tokenKey, token);
    this._token.set(token);
  }

  clearToken() {
    localStorage.removeItem(environment.tokenKey);
    this._token.set(null);
  }

  isAuthenticated() {
    return !!this._token();
  }
}
