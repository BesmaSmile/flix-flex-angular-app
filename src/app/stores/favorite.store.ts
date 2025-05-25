// favorite.store.ts
import { Injectable, signal } from '@angular/core';

interface Favorite {
  data: any[],
  loading: boolean,
  error?: string | null,
}

const initialState: Favorite = {
  data: [],
  loading: false,
  error: null,
};

@Injectable({
  providedIn: 'root',
})
export class FavoriteStore {
  private _favorites = signal<Favorite>(initialState);

  readonly favorites = this._favorites.asReadonly();

  setFavorites(favorites: Favorite) {
    this._favorites.set(favorites);
  }

  getFavorites() {
    return this._favorites();
  }

  clearFavorites() {
    this._favorites.set(initialState);
  }

  addToFavorites(article: any) {
    const current = this._favorites();
    if (!current.data.some(a => a.id === article.id && a.category === article.category)) {
      this._favorites.set({ ...current, data: [...current.data, article] });
    }
  }

  removeFromFavorites(id: number) {
    const current = this._favorites();
    this._favorites.set({ ...current, data: current.data.filter(a => a.id !== id) });
  }

  isFavorite(id: number, category: string) {
    return this._favorites().data?.some(a => a.id === id && a.category === category);
  }
}
