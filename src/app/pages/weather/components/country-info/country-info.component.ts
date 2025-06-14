import { Component, OnDestroy } from '@angular/core';
import { WeatherService } from '../../../../services/weather.service';
import { Subscription } from 'rxjs';

interface CountryInfo {
  name?: string;
  capital?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
}

@Component({
  selector: 'app-country-info',
  standalone: false,
  templateUrl: './country-info.component.html',
  styleUrl: './country-info.component.scss',
})
export class CountryInfoComponent implements OnDestroy {
  private subscription: Subscription;
  countryInfo?: CountryInfo;

  constructor(private weatherService: WeatherService) {
    this.subscription = this.weatherService.weather$.subscribe({
      next: data => {
        this.countryInfo = {
          name: data?.location?.country,
          capital: data?.location?.name,
          region: data?.location?.region,
          latitude: data?.location?.lat,
          longitude: data?.location?.lon,
        };
      },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
