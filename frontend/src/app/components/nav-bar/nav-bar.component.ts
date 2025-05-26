import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BilaketaComponent } from '../bilaketa/bilaketa.component';
import { HizkuntzaSelectComponent } from '../hizkuntza-select/hizkuntza-select.component';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink,
    HizkuntzaSelectComponent,
    BilaketaComponent,
    CommonModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  constructor(private router: Router) {}

  erabiltzailea: boolean = false;
  userlog: any = null;
  ngOnInit(): void {
    this.userlog = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') as string)
      : null;

    if (this.userlog.user_id) {
      this.erabiltzailea = true;
    }
  }

  ikusiNotfikazioak(id: number) {
    this.router.navigate(['/pages/notifikazioak', id]);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }
}
