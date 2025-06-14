import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
  Subject,
  switchMap,
} from 'rxjs';
import {
  TimezoneLocation,
  WeatherCurrent,
  WeatherLocation,
  WeatherResponse,
} from '../interfaces/weather.interface';
import { environment } from '../../environments/environment';
import { Timezone } from '../interfaces/timezone.interfaces';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = environment.apiWeather;
  private baseUrl = environment.baseUrlWeather;

  private searchSubject = new Subject<string>();
  public weather$: Observable<WeatherResponse>;
  private timezoneSubject = new BehaviorSubject<Timezone | null>(null);

  get timezone$() {
    return this.timezoneSubject.asObservable();
  }

  constructor(private http: HttpClient) {
    this.weather$ = this.searchSubject.pipe(
      distinctUntilChanged(),
      switchMap(location =>
        combineLatest([this.getCurrentWeather(location), this.getCurrentTimezone(location)]),
      ),
      map(([weather, { location }]) => ({
        ...weather,
        timezone: location,
      })),
      shareReplay(1),
    );
  }

  searchWeather(location: string): void {
    this.searchSubject.next(location);
  }

  setTimezone(timezone: Timezone): void {
    this.timezoneSubject.next(timezone);
  }

  private getCurrentWeather(
    location: string,
  ): Observable<{ location: WeatherLocation; current: WeatherCurrent }> {
    return this.http.get<{ location: WeatherLocation; current: WeatherCurrent }>(
      `${this.baseUrl}/current.json`,
      {
        params: {
          key: this.apiKey,
          q: location,
        },
      },
    );
  }

  private getCurrentTimezone(location: string): Observable<TimezoneLocation> {
    return this.http.get<TimezoneLocation>(`${this.baseUrl}/timezone.json`, {
      params: {
        key: this.apiKey,
        q: location,
      },
    });
  }
}
