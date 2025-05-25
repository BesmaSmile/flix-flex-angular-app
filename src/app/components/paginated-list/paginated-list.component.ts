import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ArticleCardShimmersComponent } from '../article-card-shimmers/article-card-shimmers.component';
@Component({
  selector: 'app-paginated-list',
  imports: [CommonModule, MatPaginatorModule, ArticleCardShimmersComponent],
  templateUrl: './paginated-list.component.html',
  styleUrl: './paginated-list.component.css'
})
export class PaginatedListComponent {
  @Input() title!: string;
  @Input() page!: number;
  @Input() totalPages!: number;
  @Input() loading: boolean = false;
  @Input() error?: string | null = null;

  @Output() pageChange = new EventEmitter<number>();

  onPageClick(event: PageEvent) {
    this.pageChange.emit(event.pageIndex + 1);
  }

}
