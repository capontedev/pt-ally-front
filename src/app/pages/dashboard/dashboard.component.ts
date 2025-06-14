import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private subscription: Subscription;

  constructor(private weatherService: WeatherService) {
    this.subscription = this.weatherService.weather$.subscribe({
      error: () => {
        alert('Error al obtener el clima');
      },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
