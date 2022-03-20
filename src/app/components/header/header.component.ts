import { Component } from '@angular/core';
import { WeatherService } from './../../services/weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  activeIndex = 0;

  constructor(public  weather: WeatherService) { }

  switchCity(cityIndex: number) {
    this.activeIndex = cityIndex;
    this.weather.setTab(cityIndex);
  }

}
