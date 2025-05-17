
import { NavbarComponent } from '@/app/components/navbar/navbar.component';
import { UserService } from '@/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe();
  }
}
