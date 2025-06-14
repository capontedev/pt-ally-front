import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../../../../services/weather.service';
import { Timezone } from '../../../../interfaces/timezone.interfaces';

@Component({
  selector: 'app-timezones-list',
  standalone: false,
  templateUrl: './timezones-list.component.html',
  styleUrl: './timezones-list.component.scss',
})
export class TimezonesListComponent implements OnDestroy {
  private subscription: Subscription;
  timezoneList: Timezone[] = [];

  constructor(private weatherService: WeatherService) {
    this.subscription = this.weatherService.weather$.subscribe({
      next: data => {
        if (data?.timezone) {
          this.timezoneList = [
            {
              tzId: data?.timezone?.tz_id,
              name: data?.timezone?.name,
              localtime: data?.timezone?.localtime,
            },
          ];

          this.weatherService.setTimezone(this.timezoneList[0]);
        }
      },
    });
  }

  handleTimezone(timezone: Timezone) {
    this.weatherService.setTimezone(timezone);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
