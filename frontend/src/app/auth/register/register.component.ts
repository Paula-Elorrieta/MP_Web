import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { QueryService } from '../../services/query.service';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  user = {
    user_id: null,
    userId: 0,
    izena_abizena: '',
    email: '',
    pasahitza: '',
    erabiltzailea: '',
    jaiotza_data: new Date(),
    helbidea: '',
  };

  allUsers: User[] = [];
  maxData: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private queryService: QueryService
  ) {
    const today = new Date();
    this.maxData = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.queryService.getUsers().subscribe(
      (response) => {
        this.allUsers = response.users;
      },
      (error) => {
        console.error('Errorea erabiltzaileak jasotzean:', error);
      }
    );
  }

  erregistratu() {
    if (!this.user.izena_abizena) {
      alert('Izena eta abizena sartu behar dituzu.');
    }
    if (!this.user.email) {
      alert('Emaila sartu behar duzu.');
    }

    if (!this.user.pasahitza) {
      alert('Pasahitza sartu behar duzu.');
    }

    if (!this.user.erabiltzailea) {
      alert('Erabiltzailea sartu behar duzu.');
    }

    if (!this.user.jaiotza_data) {
      alert('Jaiotza data sartu behar duzu.');
    }

    for (const user of this.allUsers) {
      if (user.erabiltzailea == this.user.erabiltzailea) {
        alert('Erabiltzaile hori jada existitzen da.');
        return;
      }
    }

    this.authService.erregistratu(this.user).subscribe(
      (response) => {
        const user = response.user;
        localStorage.setItem('user', JSON.stringify(user));

        this.router.navigate(['/pages/home']);

        this.user.izena_abizena = '';
        this.user.email = '';
        this.user.pasahitza = '';
        this.user.erabiltzailea = '';
        this.user.jaiotza_data = new Date();
        this.user.helbidea = '';
      },
      (error) => {
        console.error('Errorea erregistratzean:', error);
        alert('Errorea erregistratzean');

        this.user.izena_abizena = '';
        this.user.email = '';
        this.user.pasahitza = '';
        this.user.erabiltzailea = '';
        this.user.jaiotza_data = new Date();
        this.user.helbidea = '';
      }
    );
  }
}
