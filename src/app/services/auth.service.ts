import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthStore } from '@/app/stores/auth.store';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { UserStore } from '../stores/user.store';
import { ErrorsService } from './errors.service';
import { Router } from '@angular/router';

export interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,
    private errorsService: ErrorsService,
    private authStore: AuthStore,
    private userStore: UserStore,
    private router: Router) { }

  login(payload: LoginPayload): Observable<any> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, payload).pipe(
      tap((res) => {
        this.authStore.setToken(res.token);
      }),
      catchError((error) => {
        this.errorsService.handleUserErrors(error);
      }),
      /*switchMap(() => this.http.get('/api/me')), // récupère les infos utilisateur
      tap((user: any) => {
        this.userStore.setUser(user);
      }),*/
      switchMap(() => of(void 0))
    );
  }

  logout() {
    this.authStore.clearToken();
    this.userStore.clearUser();
    this.router.navigate(['/login']);
  }
}
