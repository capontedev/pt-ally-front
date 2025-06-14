import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { id: 'weather', label: 'Weather', icon: '🌤️' },
    { id: 'users', label: 'Usuarios', icon: '⬆️' },
    { id: 'login', label: 'Salir', icon: '🚪' },
  ];
  activeItem: string = this.navItems[0].id;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const urlSegments = event.url.split('/');
        this.activeItem = urlSegments[urlSegments.length - 1];
      });
  }

  handleNavClick(navItem: NavItem): void {
    if (navItem.id === 'login') {
      this.authService.logout();
      this.router.navigate([navItem.id]);
    } else {
      this.router.navigate(['/dashboard', navItem.id]);
    }
    this.activeItem = navItem.id;
  }
}
