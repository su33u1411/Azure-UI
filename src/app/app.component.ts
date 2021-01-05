import {Component, OnInit} from '@angular/core';
import {AppService} from './service/app.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'azure';
  isSpinnerEnable: Subject<boolean> = this.appService.isSpinnerEnable;

  constructor(public appService: AppService) {
  }
}
