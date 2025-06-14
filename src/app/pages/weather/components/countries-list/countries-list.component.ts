import { AfterViewInit, Component } from '@angular/core';
import { WeatherService } from '../../../../services/weather.service';

interface Country {
  code: string;
  codeWeather: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-countries-list',
  standalone: false,
  templateUrl: './countries-list.component.html',
  styleUrl: './countries-list.component.scss',
})
export class CountriesListComponent implements AfterViewInit {
  selectedCountry: Country | null = null;

  countries: Country[] = [
    {
      code: 'MX',
      codeWeather: 'Mexico',
      name: 'México',
      flag: 'https://flagcdn.com/w40/mx.png',
    },
    {
      code: 'VE',
      codeWeather: 'Venezuela',
      name: 'Venezuela',
      flag: 'https://flagcdn.com/w40/ve.png',
    },
    {
      code: 'PE',
      codeWeather: 'Peru',
      name: 'Perú',
      flag: 'https://flagcdn.com/w40/pe.png',
    },
  ];

  constructor(private weatherService: WeatherService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onSelectCountry(this.countries[0]);
    });
  }

  onSelectCountry(country: Country): void {
    this.selectedCountry = country;
    this.weatherService.searchWeather(country.codeWeather);
  }
}
