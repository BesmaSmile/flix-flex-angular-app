import { MatTabsModule } from '@angular/material/tabs';
import { ArticleCardComponent } from '@/app/components/article-card/article-card.component';
import { PaginatedListComponent } from '@/app/components/paginated-list/paginated-list.component';
import { FavoriteService } from '@/app/services/favorite.service';
import { FavoriteStore } from '@/app/stores/favorite.store';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, MatTabsModule, PaginatedListComponent, ArticleCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  readonly title = 'Movies';
  readonly favorites;
  readonly pageSize = 20;
  selectedMoviesPage = 1;
  selectedTvShowsPage = 1;

  constructor(private favoriteStore: FavoriteStore, private favoriteService: FavoriteService) {
    this.favorites = this.favoriteStore.favorites;
  }

  get loading() {
    return this.favorites().loading;
  }
  get error() {
    return this.favorites().error;
  }
  get favoriteMovies() {
    const favoriteMovies = this.favorites().data.filter((article) => article.category === 'movie');
    return {
      page: this.selectedMoviesPage,
      totalPages: Math.ceil(favoriteMovies.length / this.pageSize),
      data: favoriteMovies.slice((this.selectedMoviesPage - 1) * this.pageSize, this.selectedMoviesPage * this.pageSize),
    }

  }

  get favoriteTvShows() {
    const favoriteTvShows = this.favorites().data.filter((article) => article.category === 'tv-show');
    return {
      page: this.selectedTvShowsPage,
      totalPages: Math.ceil(favoriteTvShows.length / this.pageSize),
      data: favoriteTvShows.slice((this.selectedTvShowsPage - 1) * this.pageSize, this.selectedTvShowsPage * this.pageSize),
    }
  }

  setMoviesPage(page: number) {
    this.selectedMoviesPage = page;
  }

  setTvShowsPage(page: number) {
    this.selectedTvShowsPage = page;
  }

}
