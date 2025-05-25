import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorsService } from './errors.service';
import { ApiService } from './api.service';
import { TvShowsStore } from '@/app/stores/tv-shows.store';


@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  constructor(
    private apiService: ApiService,
    private tvShowsStore: TvShowsStore,
    private errorsService: ErrorsService
  ) { }

  getTopRatedTvShows(page: number): Observable<any> {
    this.tvShowsStore.set({
      topRatedTvShows: {
        ...this.tvShowsStore.get()?.topRatedTvShows,
        loading: true,
        error: null,
      }
    });
    return this.apiService.get(`/tv-shows/top-rated?page=${page}`).pipe(
      tap((res: any) => {

        this.tvShowsStore.set({
          topRatedTvShows: {
            loading: false,
            data: res.results,
            page,
            totalPages: res.total_pages
          },
        });
      }),
      catchError((error) => {
        this.tvShowsStore.set({
          topRatedTvShows: {
            ...this.tvShowsStore.get().topRatedTvShows,
            loading: false,
            error: error.message,
          },
        });
        return error;
      }),
    );
  }

  getPopularTvShows(page: number): Observable<any> {
    this.tvShowsStore.set({
      popularTvShows: {
        ...this.tvShowsStore.get().popularTvShows,
        loading: true,
        error: null,
      }
    });
    return this.apiService.get(`/tv-shows/popular?page=${page}`).pipe(
      tap((res: any) => {
        this.tvShowsStore.set({
          popularTvShows: {
            loading: false,
            data: res.results,
            page,
            totalPages: res.total_pages
          },
        });

      }),
      catchError((error) => {
        this.tvShowsStore.set({
          popularTvShows: {
            ...this.tvShowsStore.get().popularTvShows,
            loading: false,
            error: error.message,
          },
        });
        return error;
      }),
    );
  }

  getTvShowDetails(id: number): Observable<any> {
    this.tvShowsStore.set({
      tvShowDetails: {
        ...this.tvShowsStore.get().tvShowDetails,
        loading: true,
        error: null,
      }
    });
    return this.apiService.get(`/tv-shows/${id}`).pipe(
      tap((res: any) => {
        if (res?.status === 200) {
          this.tvShowsStore.set({
            tvShowDetails: {
              loading: false,
              data: res.data,
            },
          });
        }
      }),
      catchError((error) => {
        this.tvShowsStore.set({
          tvShowDetails: {
            ...this.tvShowsStore.get().tvShowDetails,
            loading: false,
            error: error.message,
          },
        });
        return error;
      }),
    );
  }

  searchTvShows(page: number, query: string): Observable<any> {
    this.tvShowsStore.set({
      tvShowsSearchResults: {
        ...this.tvShowsStore.get().tvShowsSearchResults,
        loading: true,
        error: null,
      }
    });
    return this.apiService.get(`/tv-shows/search?page=${page}&query=${query}`).pipe(
      tap((res: any) => {
        if (res?.status === 200) {
          this.tvShowsStore.set({
            tvShowsSearchResults: {
              loading: false,
              data: res.data.results,
              page,
              totalPages: res.data.total_pages
            },
          });
        }
      }),
      catchError((error) => {
        this.tvShowsStore.set({
          tvShowsSearchResults: {
            ...this.tvShowsStore.get().tvShowsSearchResults,
            loading: false,
            error: error.message,
          },
        });
        return error;
      }),
    );
  }
}
