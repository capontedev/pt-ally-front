import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../../../../interfaces/task.interface';
import { TaskService } from '../../../../services/task.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../interfaces/user.interface';

@Component({
  selector: 'app-tasks-list',
  standalone: false,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent implements OnDestroy, AfterViewInit {
  private subscription?: Subscription;
  taskList: Task[] = [];
  currentUser?: User | null;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
  ) {}

  ngAfterViewInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    this.subscription = this.taskService.getTasks(this.currentUser?.id).subscribe({
      next: data => {
        this.taskList = data;
      },
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
