// rating-stars.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-stars.component.html',
})
export class RatingStarsComponent {
  @Input() value = 0;

  get fullStars(): number[] {
    return Array(Math.floor(this.value)).fill(0);
  }

  get hasHalfStar(): boolean {
    const decimal = this.value - Math.floor(this.value);
    return decimal >= 0.25 && decimal < 0.75;
  }

  get emptyStars(): number[] {
    const total = 5;
    const filled = Math.floor(this.value) + (this.hasHalfStar ? 1 : 0);
    return Array(total - filled).fill(0);
  }
}
