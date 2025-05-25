import { HeroComponent } from '@/app/components/hero/hero.component';
import { UpcomingMoviesComponent } from '@/app/components/upcoming-movies/upcoming-movies.component';
import { MoviesService } from '@/app/services/movies.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, UpcomingMoviesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesService.getUpcomingMovies(1).subscribe();
  }
}
