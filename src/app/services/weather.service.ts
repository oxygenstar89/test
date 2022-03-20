import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private currentTabSubject$ = new BehaviorSubject<any>(0);
  currentTab = this.currentTabSubject$.asObservable();

  cities = [
    {
      name: 'Gothenburg',
      lat: 57.7092518,
      lng: 11.9661051,
    },
    {
      name: 'Wrocław',
      lat: 51.1271647,
      lng: 16.9218246,
    },
    {
      name: 'Warszawa',
      lat: 52.2330653,
      lng: 20.9211128,
    },
    {
      name: 'Opole',
      lat: 50.6788299,
      lng: 17.8362461,
    },
    {
      name: 'Łódź',
      lat: 51.7732033,
      lng: 19.4105533,
    },
  ];

  constructor(private http: HttpClient) {
  }

  public getWeather(lat: number, lng: number) {
    return this.http.get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lng}`);
  }

  setTab(data) {
    this.currentTabSubject$.next(data);
  }
}
