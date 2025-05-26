import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-users`);
  }

  getLiburuak(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-liburuak`);
  }

  getLiburuaById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-liburua/${id}`);
  }

  sortuNotifikazioa(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sortu-notifikazioa`, payload);
  }

  getNotifikazioak(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-notifikazioak/${id}`);
  }

  onartuEskaera(
    notifikazioa_id: number,
    liburu_id: number,
    saltzaile_id: number
  ): Observable<any> {
    const body = { notifikazioa_id, liburu_id, saltzaile_id };
    console.log('Sending request to accept notification:', body);
    return this.http.post(`${this.apiUrl}/onartu-eskaera`, body);
  }

  ukatuEskaera(notifikazioId: number): Observable<any> {
    const body = { notifikazioId };
    return this.http.post(`${this.apiUrl}/ukatu-eskaera`, body);
  }
}
