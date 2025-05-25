import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';
//import { RatingStarsComponent } from '../rating-stars/rating-stars.component';


import moment from 'moment';
import { environment } from '@/environments/environment';
import { RatingStarsComponent } from '../rating-stars/rating-stars.component';

interface Article {
  id: number;
  category: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  title: string;
  name: string;
  release_date?: string;
  first_air_date?: string;
}

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, RouterModule, FavoriteButtonComponent, RatingStarsComponent],
  templateUrl: './article-card.component.html',
})
export class ArticleCardComponent {
  @Input() article!: Article;



  get imagePath() {
    return this.article.poster_path ? `${environment.imgUrl}/${this.article.poster_path}` : '';
  }

  get title() {
    return this.article.category === 'movie' ? this.article.title : this.article.name;
  }

  get formattedDate() {
    const date = this.article.category === 'movie' ? this.article.release_date : this.article.first_air_date;
    return date ? moment(date).format('MMM DD, YYYY') : '';
  }
}
