import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'weather',
        loadChildren: () => import('../weather/weather.module').then(m => m.WeatherModule),
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule),
      },
      {
        path: '',
        redirectTo: 'weather',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [SidebarComponent, DashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
