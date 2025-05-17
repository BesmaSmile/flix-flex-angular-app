import { Injectable, signal } from '@angular/core';
import { PaginatedData } from '@/app/types/paginated-data';

interface Movies {
  upcomingMovies: PaginatedData,
  infinitePopularMovies: PaginatedData,
  popularMovies: PaginatedData,
  movieDetails: {
    data: any,
    loading: boolean | null,
    error?: string | null,
  },
  moviesSearchResults: PaginatedData,
}

const initialState: Movies = {
  infinitePopularMovies: {
    data: [],
    page: 0,
    totalPages: 1,
    loading: false,
    error: null,
  },
  upcomingMovies: {
    data: [],
    page: 0,
    totalPages: 1,
    loading: false,
    error: null,
  },
  popularMovies: {
    data: [],
    page: 0,
    totalPages: 0,
    loading: false,
    error: null,
  },
  movieDetails: {
    data: {},
    loading: null,
    error: null,
  },
  moviesSearchResults: {
    data: [],
    page: 0,
    totalPages: 1,
    loading: false,
    error: null,
  },
}

@Injectable({
  providedIn: 'root',
})

export class MoviesStore {
  private _movies = signal<Movies>(initialState);

  readonly movies = this._movies.asReadonly();

  set(data: any) {
    this._movies.set({
      ...this._movies(),
      ...data,
    });
  }

  get(): Movies {
    return this.movies();
  }

  clear() {
    this._movies.set(initialState);
  }
}
