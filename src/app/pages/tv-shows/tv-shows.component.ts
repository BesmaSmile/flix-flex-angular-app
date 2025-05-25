import { ArticleCardComponent } from '@/app/components/article-card/article-card.component';
import { PaginatedListComponent } from '@/app/components/paginated-list/paginated-list.component';
import { TvShowsService } from '@/app/services/tv-shows.service';
import { TvShowsStore } from '@/app/stores/tv-shows.store';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tv-shows',
  imports: [CommonModule, PaginatedListComponent, ArticleCardComponent],
  templateUrl: './tv-shows.component.html',
})
export class TvShowsComponent {
  readonly title = 'TV Shows';
  readonly tvShows;

  constructor(private tvShowsService: TvShowsService, private tvShowsStore: TvShowsStore) {
    this.tvShows = this.tvShowsStore.tvShows;
  }

  get page() {
    return this.tvShows().popularTvShows.page;
  }
  get totalPages() {
    return this.tvShows().popularTvShows.totalPages;
  }
  get loading() {
    return this.tvShows().popularTvShows.loading;
  }
  get error() {
    return this.tvShows().popularTvShows.error;
  }
  get tvShowsList() {
    return this.tvShows().popularTvShows.data.map((movie: any) => ({
      ...movie,
      category: 'tv-show',
    }));;
  }
  ngOnInit() {
    if (this.tvShows().popularTvShows.data.length === 0) {
      this.tvShowsService.getPopularTvShows(1).subscribe();
    }
  }

  loadTvShows(page: number) {
    this.tvShowsService.getPopularTvShows(page).subscribe();
  }
}
