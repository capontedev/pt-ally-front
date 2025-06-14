import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather.component';
import { ClockCardComponent } from './components/clock-card/clock-card.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { CountryInfoComponent } from './components/country-info/country-info.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TimezonesListComponent } from './components/timezones-list/timezones-list.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherComponent,
  },
];

@NgModule({
  declarations: [
    ClockCardComponent,
    CountriesListComponent,
    CountryInfoComponent,
    TasksListComponent,
    TimezonesListComponent,
    WeatherCardComponent,
    WeatherComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class WeatherModule {}
