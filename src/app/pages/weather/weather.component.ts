import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather',
  standalone: false,
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {
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
