import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorsService } from './errors.service';
import { ApiService } from './api.service';
import { FavoriteStore } from '@/app/stores/favorite.store';


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private apiService: ApiService, private favoriteStore: FavoriteStore, private errorsService: ErrorsService) { }


  getFavorites(): Observable<any> {
    this.favoriteStore.setFavorites({
      ...this.favoriteStore.getFavorites(),
      loading: true,
      error: null,
    });
    return this.apiService.get('/favorite').pipe(
      tap((res: any) => {
        this.favoriteStore.setFavorites({
          data: res,
          loading: false,
          error: null,
        });
      }),
      catchError((error) => {
        this.errorsService.handleGeneralError(error);
      }),
    );
  }

  addToFavorites(payload: any): Observable<any> {
    return this.apiService.post('/favorite/add', payload).pipe(
      tap((res: any) => {
        this.favoriteStore.addToFavorites(res);
      }),
      catchError((error) => {
        this.errorsService.handleGeneralError(error);
      }),
    );
  }

  removeFromFavorites(id: number, category: string): Observable<any> {
    return this.apiService.post('/favorite/remove', { id, category }).pipe(
      tap(() => {
        this.favoriteStore.removeFromFavorites(id);
      }),
      catchError((error) => {
        this.errorsService.handleGeneralError(error);
      }),
    );
  }
}
