import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthStore } from '@/app/stores/auth.store';
import { filter } from 'rxjs/operators';
import { NgIf, NgFor } from '@angular/common';
import { User, UserStore } from '@/app/stores/user.store';
import { AuthService } from '@/app/services/auth.service';
import { UserService } from '@/app/services/user.service';
import { Observable } from 'rxjs';
import { FavoriteService } from '@/app/services/favorite.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf, NgFor],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {


  readonly user;
  currentPath;

  readonly paths = [
    { path: '/home', name: 'Home' },
    { path: '/movies', name: 'Movies' },
    { path: '/tv-shows', name: 'TV Shows' },
    { path: '/favorites', name: 'My Favorites' },
    { path: '/search', name: 'Search' }
  ];

  mode = computed(() => this.currentPath === '/home' ? 'dark' : 'light');

  constructor(
    private authService: AuthService,
    private userservice: UserService,
    private favoriteService: FavoriteService,
    private authStore: AuthStore,
    private userStore: UserStore,
    private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentPath = event.urlAfterRedirects || event.url;
        this.mode = computed(() => this.currentPath === '/home' ? 'dark' : 'light');
      });

    this.user = this.userStore.user;
    this.currentPath = this.router.url

  }

  get isAuthenticated() {
    return this.authStore.isAuthenticated();
  }



  isCurrentPath(path: string) {
    return path === this.currentPath;
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    if (this.isAuthenticated) {
      this.userservice.getProfile().subscribe();
      this.favoriteService.getFavorites().subscribe();
    }
  }
}

