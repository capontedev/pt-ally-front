import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasks(userId?: number): Observable<Task[]> {
    let url = this.apiUrl;
    if (userId) {
      url += `?userId=${userId}`;
    }
    return this.http.get<Task[]>(url);
  }
}
