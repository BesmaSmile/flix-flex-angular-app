import { Injectable, signal } from '@angular/core';
import { PaginatedData } from '@/app/types/paginated-data';

interface TvShows {
  topRatedTvShows: PaginatedData,
  infinitePopularTvShows: PaginatedData,
  popularTvShows: PaginatedData,
  tvShowDetails: {
    data: any,
    loading: boolean | null,
    error?: string | null,
  },
  tvShowsSearchResults: PaginatedData,
}

const initialState: TvShows = {
  infinitePopularTvShows: {
    data: [],
    page: 0,
    totalPages: 1,
    loading: false,
    error: null,
  },
  topRatedTvShows: {
    data: [],
    page: 0,
    totalPages: 1,
    loading: false,
    error: null,
  },
  popularTvShows: {
    data: [],
    page: 0,
    totalPages: 0,
    loading: false,
    error: null,
  },
  tvShowDetails: {
    data: {},
    loading: null,
    error: null,
  },
  tvShowsSearchResults: {
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

export class TvShowsStore {
  private _tvShows = signal<TvShows>(initialState);

  readonly tvShows = this._tvShows.asReadonly();

  set(data: any) {
    this._tvShows.set({
      ...this._tvShows(),
      ...data,
    });
  }

  get(): TvShows {
    return this.tvShows();
  }

  clear() {
    this._tvShows.set(initialState);
  }
}
