import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  searchText: string = '';

  constructor(private router: Router) { }

  handleSearchClick() {
    if (this.searchText.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { query: this.searchText.trim() },
      });
    }
  }
}
