import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Timezone } from '../../../../interfaces/timezone.interfaces';
import { WeatherService } from '../../../../services/weather.service';

@Component({
  selector: 'app-clock-card',
  standalone: false,
  templateUrl: './clock-card.component.html',
  styleUrl: './clock-card.component.scss',
})
export class ClockCardComponent implements OnDestroy {
  private subscription: Subscription;
  timezone?: Timezone | undefined;

  constructor(private weatherService: WeatherService) {
    this.subscription = this.weatherService.timezone$.subscribe({
      next: data => {
        if (data) {
          this.timezone = {
            tzId: data.tzId,
            name: data.name,
            localtime: data.localtime,
          };
        }
      },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
