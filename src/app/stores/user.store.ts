import { Injectable, signal } from '@angular/core';

export interface User {
  username?: string;
  firstName?: string;
  lastName?: string;
}

@Injectable({
  providedIn: 'root',
})

export class UserStore {
  private _user = signal<User | null>(null);

  readonly user = this._user.asReadonly();

  setUser(user: User) {
    this._user.set(user);
  }

  getUser() {
    return this._user();
  }

  clearUser() {
    this._user.set(null);
  }
}
