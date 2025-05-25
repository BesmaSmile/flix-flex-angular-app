import { Component, Input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteStore } from '@/app/stores/favorite.store';
import { FavoriteService } from '@/app/services/favorite.service';
import { NotificationService } from '@/app/services/notification.service';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-button.component.html',
})
export class FavoriteButtonComponent {
  @Input() article!: {
    id: number;
    category: string;
    overview?: string;
    poster_path?: string | null;
    vote_average?: number;
    title?: string;
    name?: string;
    release_date?: string;
    first_air_date?: string;
  };

  constructor(private favoriteStore: FavoriteStore, private favoriteService: FavoriteService, private notificationService: NotificationService) { }

  readonly isFavorite = computed(() =>
    this.favoriteStore.isFavorite(this.article?.id, this.article?.category)
  );

  handleFavoriteClick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();

    const { id, category } = this.article;

    if (this.favoriteStore.isFavorite(id, category)) {
      this.favoriteService.removeFromFavorites(id, category).subscribe({
        next: () => {
          this.notificationService.showSuccess('Success', 'Removed from favorites');
        },
        error: (error) => {
          console.error('Error removing from favorites:', error);
          this.notificationService.showError('Error', 'Failed to remove from favorites');
        }
      });

    } else {
      this.favoriteService.addToFavorites(this.article).subscribe({
        next: () => {
          this.notificationService.showSuccess('Success', 'Added to favorites');
        },
        error: (error) => {
          console.error('Error adding to favorites:', error);
          this.notificationService.showError('Error', 'Failed to add to favorites');
        }
      });
    }
  }
}
