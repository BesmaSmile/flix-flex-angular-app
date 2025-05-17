import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '@/app/components/search-bar/search-bar.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './hero.component.html',
})
export class HeroComponent { }
