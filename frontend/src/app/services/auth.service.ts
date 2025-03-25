import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001';
  private readonly userKey = 'user';

  constructor(private http: HttpClient) {}

  login(erabiltzailea: string, pasahitza: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { erabiltzailea, pasahitza });
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
    window.location.href = '/auth/login';
  }

  getErabiltzaileLogueatua(): User {
    const user = localStorage.getItem(this.userKey);
    return user
      ? JSON.parse(user)
      : {
          userId: 0,
          erabiltzailea: '',
          email: '',
          izena_abizena: '',
          pasahitza: '',
          jaiotza_data: new Date(),
        };
  }

  erregistratu(user: User): Observable<any> {
    const userWithoutId = { ...user }; // Kopia bat egin erabiltzaile objektuari
    delete userWithoutId.userId; // Ezabatu id-a, zerbitzariak bere id-a jasoko du
    console.log(userWithoutId);
    return this.http.post(`${this.apiUrl}/erregistratu`, userWithoutId);
  }
}
