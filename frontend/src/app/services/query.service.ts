import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
	return this.http.get(`${this.apiUrl}/get-users`);
  }

}
