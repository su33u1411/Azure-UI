import {Component, OnInit, ViewChild} from '@angular/core';
import {AppService, Order, Product} from '../../service/app.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatButton} from '@angular/material/button';
import * as _moment from 'moment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'productName', 'orderCharge', 'orderType', 'orderPoc'];
  Orders = new MatTableDataSource<Order>();
  order: Order = {
    orderPoc: '',
    orderType: '',
    orderCharge: 0,
    orderId: 0,
    orderTs: '',
    productName: '',
    quantityUnit: '',
    orderQuantity: 0
  };
  saveButtonDisable = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('closeButton') closeButton: MatButton;


  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.getOrders().subscribe(orders => {
      this.Orders = new MatTableDataSource<Order>(orders);
      this.Orders.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.Orders.filter = filterValue.trim().toLowerCase();
  }

  enableSaveOrder() {
    if (this.order.productName &&
      this.order.orderCharge &&
      this.order.orderQuantity &&
      this.order.quantityUnit &&
      this.order.orderType &&
      this.order.orderPoc) {
      this.saveButtonDisable = false;
    } else {
      this.saveButtonDisable = true;
    }
  }

  createOrder() {
    this.appService.createOrder(
      this.order.productName,
      this.order.orderCharge,
      this.order.orderQuantity,
      this.order.quantityUnit,
      _moment(new Date()).format('YYYY-MM-DDTHH:mm') + ':00.0+03:00',
      this.order.orderType,
      this.order.orderPoc).subscribe(response => {
      if (response.orderId) {
        this.order.productName = '';
        this.order.orderCharge = 0.00;
        this.order.orderQuantity = 0.00;
        this.order.quantityUnit = '';
        this.order.orderTs = '';
        this.order.orderType = '';
        this.order.orderPoc = '';
        this.closeButton._elementRef.nativeElement.click();
        this.ngOnInit();
      } else {

      }
    });
  }
}
