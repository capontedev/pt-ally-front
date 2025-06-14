import { Component, Input } from '@angular/core';
import { User } from '../../../../interfaces/user.interface';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() users: User[] = [];
}
