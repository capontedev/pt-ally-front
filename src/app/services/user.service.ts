import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  User,
  PaginatedResponse,
  LoginRequest,
  CreateUserRequest,
} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getUsers(
    page: number = 1,
    limit: number = 10,
    search?: string,
  ): Observable<PaginatedResponse<User>> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PaginatedResponse<User>>(this.apiUrl, { params });
  }

  createUser(userData: CreateUserRequest): Observable<User> {
    return this.http.post<User>(this.apiUrl, userData);
  }
}
