import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  totalRecords: number = 0;
  recordsPerPage: number = 10;
  startRecord: number = 1;
  endRecord: number = 10;
  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  constructor(private userService: UserService) {
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe(searchTerm => {
      this.currentPage = 1;
      this.loadUsers();
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.currentPage, this.recordsPerPage, this.searchTerm).subscribe({
      next: response => {
        this.users = response.data;
        this.totalPages = response.meta.totalPages;
        this.totalRecords = response.meta.total;
        this.startRecord = (this.currentPage - 1) * this.recordsPerPage + 1;
        this.endRecord = Math.min(this.currentPage * this.recordsPerPage, this.totalRecords);
      },
      error: error => {
        console.error('Error al cargar usuarios:', error);
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadUsers();
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.searchSubject.next(searchTerm);
  }
}
