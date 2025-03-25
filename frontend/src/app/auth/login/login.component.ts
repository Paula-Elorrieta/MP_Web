import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user = {
    erabiltzailea: '',
    pasahitza: '',
  };

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (!this.user.erabiltzailea) {
      console.log('Erabiltzailea sartu mesedez');
      return;
    }

    if (!this.user.pasahitza) {
      console.log('Pasahitza sartu mesedez');
      return;
    }

    this.authService
      .login(this.user.erabiltzailea, this.user.pasahitza)
      .subscribe(
        (response) => {
          const user = response.user;
          localStorage.setItem('user', JSON.stringify(user));

          this.router.navigate(['/pages/home']);
          this.user.erabiltzailea = '';
          this.user.pasahitza = '';
        },
        (error) => {
          console.error('Errorea loginean:', error);
          alert('Erabiltzailea edo pasahitz okerra');

          this.user.erabiltzailea = '';
          this.user.pasahitza = '';
        }
      );
  }

  gonbidatuSartu(event: Event) {
    event.preventDefault();
    this.user.erabiltzailea = 'gonbidatua';
    this.user.pasahitza = 'gonbidatua';
    const user = this.user;
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/pages/home']);
  }
}
