import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from './../../services/weather.service';
import { City, SingleDay } from './weather.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(public weather: WeatherService) { }
  currentCity: City;
  nextWeekData: SingleDay[];
  todayData: SingleDay;
  isLoading = true;
  isError = false;

  ngOnInit(): void {
    this.fetchData(0);
    const currentTabSubscription = this.weather.currentTab.subscribe(index => {
      this.isLoading = true;
      this.fetchData(index);
    })
    this.subscriptions.push(currentTabSubscription);
  }

  fetchData(index: number) {
    this.currentCity = this.weather.cities[index];
    this.getWeatherData(this.currentCity.lat, this.currentCity.lng);
  }

  getWeatherData(lat: number, lng: number) {
    this.weather.getWeather(lat, lng).subscribe(
      (response: any) => {
        this.processData(response?.properties);
      },
      () => {
        this.isError = true;
        this.isLoading = false;
      }
    );
  }

  processData(properties): void {
    const arrayOfDays = this.splitToDaysArray(properties);
    const neededData = this.getNeededData(arrayOfDays);
    this.todayData = neededData?.[0];
    this.nextWeekData = neededData.slice(1);
    this.isLoading = false;
  }

  splitToDaysArray(properties) {
    const days = [[],[],[],[],[],[],[],[]];
    let iteratedDate = properties.meta.updated_at.substring(0,10);
    let i = 0;
    properties.timeseries.map(data => {
      if (iteratedDate !== data.time.substring(0,10))  {
        i++;
        iteratedDate = data.time.substring(0,10);
      }
      days?.[i]?.push(data);
    });
    return days;
  }

  getNeededData(arrayOfDays) {
    const usefulData = [];
    arrayOfDays.map(day => {
      const allTemperatures = [];
      const allWindSpeeds = [];
      day.map(processedData => {
        allTemperatures.push(processedData.data.instant.details.air_temperature);
        allWindSpeeds.push(processedData.data.instant.details.wind_speed);
      });
      const singleDayData: SingleDay = {
        data: day[0].time.substring(0,10),
        dayName: new Date(day[0].time.substring(0,10)).toLocaleString('en-us', {weekday:'short'}),
        minTemp: Math.round(Math.min(...allTemperatures)),
        maxTemp: Math.round(Math.max(...allTemperatures)),
        windSpeedAverage: Math.round(allWindSpeeds.reduce((prev, curr) => prev + curr) / allWindSpeeds.length),
      }
      usefulData.push(singleDayData);
    });
    return usefulData;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
