import { Component, OnInit } from '@angular/core';
import {AppService, Order} from '../../service/app.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  Orders: Order[] = [];
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getOrders().subscribe(orders => {
      this.Orders = orders;
    });
  }

}
