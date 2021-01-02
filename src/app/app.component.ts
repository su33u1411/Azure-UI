import { Component } from '@angular/core';
import {AppService} from './service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'azure';
  constructor(public appService: AppService) {
  }
}
