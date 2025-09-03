import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User, CreateUserDto } from '../models/user.model';

const API_BASE = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private base = `${API_BASE}/users`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.base).pipe(catchError(this.handleError));
  }

  createUser(dto: CreateUserDto): Observable<User> {
    return this.http.post<User>(this.base, dto).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.error('API Error', err);
    return throwError(() => new Error(err.message || 'Error comunicándose con la API'));
  }
}
