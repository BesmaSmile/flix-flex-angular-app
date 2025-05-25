import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { environment } from '@/environments/environment';
import { ErrorsService } from './errors.service';
import { MoviesStore } from '@/app/stores/movies.store';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private apiService: ApiService,
    private moviesStore: MoviesStore,
    private errorsService: ErrorsService
  ) { }

  getUpcomingMovies(page: number): Observable<any> {
    this.moviesStore.set({
      upcomingMovies: {
        ...this.moviesStore.get()?.upcomingMovies,
        loading: true,
        error: null,
      }
    });
    return this.apiService.get(`/movies/upcoming?page=${page}`).pipe(
      tap((res: any) => {

        this.moviesStore.set({
          upcomingMovies: {
            loading: false,
            data: res.results,
            page,
            totalPages: res.total_pages
          },
        });
      }),
      catchError((error) => {
        this.moviesStore.set({
          upcomingMovies: {
            ...this.moviesStore.get().upcomingMovies,
            loading: false,
            error: error.message,
          },
        });
        return error;
      }),
    );
  }

  getPopularMovies(page: number): Observable<any> {
    this.moviesStore.set({
      popularMovies: {
        ...this.moviesStore.get().popularMovies,
        loading: true,
        error: null,
      }
    });
    return this.apiService.get(`/movies/popular?page=${page}`).pipe(
      tap((res: any) => {
        this.moviesStore.set({
          popularMovies: {
            loading: false,
            data: res.results,
            page,
            totalPages: res.total_pages
          },
        });

      }),
      catchError((error) => {
        this.moviesStore.set({
          popularMovies: {
            ...this.moviesStore.get().popularMovies,
            loading: false,
            error: error.message,
          },
        });
        return error;
      }),
    );
  }

  loadMorePopularMovies(): Observable<any> {
    const infinitePopularMovies = this.moviesStore.get().infinitePopularMovies;
    this.moviesStore.set({
      infinitePopularMovies: {
        ...infinitePopularMovies,
        loading: true,
        error: null,
      }
    });
    return this.apiService.get(`/movies/popular?page=${infinitePopularMovies.page + 1}`).pipe(
      tap((res: any) => {
        this.moviesStore.set({
          popularMovies: {
            loading: false,
            data: [...infinitePopularMovies.data, ...res.results],
            page: infinitePopularMovies.page + 1,
            totalPages: res.total_pages
          },
        });
      }),
      catchError((error) => {
        this.moviesStore.set({
          infinitePopularMovies: {
            ...infinitePopularMovies,
            loading: false,
            error: error.message,
          },
        });
        return error;
      }),
    );
  }

  getMovieDetails(id: number): Observable<any> {
    this.moviesStore.set({
      movieDetails: {
        ...this.moviesStore.get().movieDetails,
        loading: true,
        error: null,
      }
    });
    return this.apiService.get(`/movies/${id}`).pipe(
      tap((res: any) => {
        this.moviesStore.set({
          movieDetails: {
            loading: false,
            data: res,
          },
        });
      }),
      catchError((error) => {
        this.moviesStore.set({
          movieDetails: {
            ...this.moviesStore.get().movieDetails,
            loading: false,
            error: error.message,
          },
        });
        return error;
      }),
    );
  }

  searchMovies(page: number, query: string): Observable<any> {
    this.moviesStore.set({
      moviesSearchResults: {
        ...this.moviesStore.get().moviesSearchResults,
        loading: true,
        error: null,
      }
    });
    return this.apiService.get(`/movies/search?page=${page}&query=${query}`).pipe(
      tap((res: any) => {
        this.moviesStore.set({
          moviesSearchResults: {
            loading: false,
            data: res.results,
            page,
            totalPages: res.total_pages
          },
        });
      }),
      catchError((error) => {
        this.moviesStore.set({
          moviesSearchResults: {
            ...this.moviesStore.get().moviesSearchResults,
            loading: false,
            error: error.message,
          },
        });
        return error;
      }),
    );
  }
}
