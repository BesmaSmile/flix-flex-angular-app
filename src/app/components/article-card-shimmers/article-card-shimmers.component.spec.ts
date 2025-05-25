import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCardShimmersComponent } from './article-card-shimmers.component';

describe('ArticleCardShimmersComponent', () => {
  let component: ArticleCardShimmersComponent;
  let fixture: ComponentFixture<ArticleCardShimmersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCardShimmersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleCardShimmersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
