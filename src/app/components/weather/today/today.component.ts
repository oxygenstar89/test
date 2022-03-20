import { Component, OnInit, Input } from '@angular/core';
import { SingleDay } from './../weather.model';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent {
  @Input() currentDayData: SingleDay;
  @Input() cityName: string;

  date = new Date();
  today = this.date.toLocaleString('en-us', {weekday:'long'});
  time = `${this.date.getHours()}:${this.date.getMinutes()}`

}
