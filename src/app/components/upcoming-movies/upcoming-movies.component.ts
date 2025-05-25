import { MoviesStore } from '@/app/stores/movies.store';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ArticleCardComponent } from '../article-card/article-card.component';

@Component({
  selector: 'app-upcoming-movies',
  imports: [CommonModule, ArticleCardComponent],
  templateUrl: './upcoming-movies.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./upcoming-movies.component.css'],
})
export class UpcomingMoviesComponent {
  readonly movies;
  constructor(private moviesStore: MoviesStore) {
    // Inject the MoviesStore service
    this.movies = this.moviesStore.movies;
  }

  get upcomingMovies() {
    return this.movies().upcomingMovies.data.map((movie) => ({
      ...movie,
      category: 'movie'
    }));
  }

}