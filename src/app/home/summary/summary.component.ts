import {Component, OnInit} from '@angular/core';
import * as _moment from 'moment';
import {AppService} from '../../service/app.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  netAmount: number;
  fromDate: any;
  toDate: any;
  isCalculateButtonDisabled = true;

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
  }

  setFromDate(value) {
    if (value) {
      this.fromDate = _moment(value).format('YYYY-MM-DD ') + '01:00:00.0';
      this.validateCalculateButton();
    }
  }

  setToDate(value) {
    if (value) {
      this.toDate = _moment(value).format('YYYY-MM-DD ') + '01:00:00.0';
      this.validateCalculateButton();
    }
  }

  calculateAmount() {
    this.appService.getNetAmount(this.fromDate, this.toDate).subscribe(response => {
      this.netAmount = response;
    });
  }

  validateCalculateButton() {
    if (this.toDate && this.fromDate) {
      this.isCalculateButtonDisabled = false;
    } else {
      this.isCalculateButtonDisabled = true;
    }
  }
}
