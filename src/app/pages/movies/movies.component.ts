import { ArticleCardComponent } from '@/app/components/article-card/article-card.component';
import { PaginatedListComponent } from '@/app/components/paginated-list/paginated-list.component';
import { MoviesService } from '@/app/services/movies.service';
import { MoviesStore } from '@/app/stores/movies.store';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, PaginatedListComponent, ArticleCardComponent],
  templateUrl: './movies.component.html',
})
export class MoviesComponent {
  readonly title = 'Movies';
  readonly movies;

  constructor(private moviesService: MoviesService, private moviesStore: MoviesStore) {
    this.movies = this.moviesStore.movies;
  }

  get page() {
    return this.movies().popularMovies.page;
  }
  get totalPages() {
    return this.movies().popularMovies.totalPages;
  }
  get loading() {
    return this.movies().popularMovies.loading;
  }
  get error() {
    return this.movies().popularMovies.error;
  }
  get moviesList() {
    return this.movies().popularMovies.data.map((movie: any) => ({
      ...movie,
      category: 'movie',
    }));
  }
  ngOnInit() {
    if (this.movies().popularMovies.data.length === 0) {
      this.loadMovies(1);
    }
  }

  loadMovies(page: number) {
    this.moviesService.getPopularMovies(page).subscribe();
  }
}
