import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../../../../services/weather.service';

interface Weather {
  icon: string;
  temperature: string | undefined;
  condition: string;
}

@Component({
  selector: 'app-weather-card',
  standalone: false,
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss',
})
export class WeatherCardComponent implements OnDestroy {
  private subscription: Subscription;
  weather?: Weather | undefined;

  constructor(private weatherService: WeatherService) {
    this.subscription = this.weatherService.weather$.subscribe({
      next: data => {
        this.weather = {
          icon: data?.current?.condition?.icon ? `https://${data?.current?.condition?.icon}` : '',
          temperature: data?.current?.temp_c ? `${data?.current?.temp_c}° C` : undefined,
          condition: data?.current?.condition?.text,
        };
      },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
