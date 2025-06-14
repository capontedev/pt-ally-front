import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
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
  private searchSubject = new Subject<string>();
  public users$: Observable<PaginatedResponse<User>>;

  constructor(private http: HttpClient) {
    this.users$ = this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(search => this.getUsers(1, 10, search))
    );
  }

  searchUsers(search: string): void {
    this.searchSubject.next(search);
  }

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
