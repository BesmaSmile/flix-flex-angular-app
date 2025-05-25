import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorsService } from './errors.service';
import { UserStore } from '@/app/stores/user.store';
import { ApiService } from './api.service';

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService, private userStore: UserStore, private errorsService: ErrorsService) { }

  register(payload: RegisterPayload): Observable<any> {
    return this.apiService.post('/user/register', payload).pipe(
      catchError((error) => {
        this.errorsService.handleUserErrors(error);
      }),
    );
  }

  getProfile(): Observable<any> {
    return this.apiService.get('/user/me').pipe(
      tap((res: any) => {
        this.userStore.setUser(res);
      }),
      catchError((error) => {
        this.errorsService.handleGeneralError(error);
      }),
    );
  }
}
