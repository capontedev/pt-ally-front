import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TableComponent } from './components/table/table.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
];

@NgModule({
  declarations: [UsersComponent, PaginationComponent, TableComponent, ToolbarComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UsersModule {}
