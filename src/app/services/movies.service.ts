import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { environment } from '@/environments/environment';
import { ErrorsService } from './errors.service';
import { MoviesStore } from '@/app/stores/movies.store';

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
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
    return this.http.get(`${this.apiUrl}/movies/upcoming?page=${page}`).pipe(
      tap((res: any) => {
        if (res?.status === 200) {
          this.moviesStore.set({
            upcomingMovies: {
              loading: false,
              data: res.data.results,
              page,
              totalPages: res.data.total_pages
            },
          });
        }
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
    return this.http.get(`${this.apiUrl}/movies/popular?page=${page}`).pipe(
      tap((res: any) => {
        if (res?.status === 200) {
          this.moviesStore.set({
            popularMovies: {
              loading: false,
              data: res.data.results,
              page,
              totalPages: res.data.total_pages
            },
          });
        }
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
    return this.http.get(`${this.apiUrl}/movies/popular?page=${infinitePopularMovies.page + 1}`).pipe(
      tap((res: any) => {
        if (res?.status === 200) {
          this.moviesStore.set({
            popularMovies: {
              loading: false,
              data: [...infinitePopularMovies.data, ...res.data.results],
              page: infinitePopularMovies.page + 1,
              totalPages: res.data.total_pages
            },
          });
        }
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
    return this.http.get(`${this.apiUrl}/movies/${id}`).pipe(
      tap((res: any) => {
        if (res?.status === 200) {
          this.moviesStore.set({
            movieDetails: {
              loading: false,
              data: res.data,
            },
          });
        }
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
    return this.http.get(`${this.apiUrl}/movies/search?page=${page}&query=${query}`).pipe(
      tap((res: any) => {
        if (res?.status === 200) {
          this.moviesStore.set({
            moviesSearchResults: {
              loading: false,
              data: res.data.results,
              page,
              totalPages: res.data.total_pages
            },
          });
        }
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
