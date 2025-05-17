import { HeroComponent } from '@/app/components/hero/hero.component';
import { MainLayoutComponent } from '@/app/layouts/main-layout/main-layout.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, MainLayoutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
