import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-article-card-shimmers',
  imports: [CommonModule],
  templateUrl: './article-card-shimmers.component.html',
  styleUrl: './article-card-shimmers.component.css'
})
export class ArticleCardShimmersComponent {
  readonly shimmers = Array.from({ length: 10 }, (_, i) => i + 1);

}
