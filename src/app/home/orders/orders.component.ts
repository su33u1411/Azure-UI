import {Component, OnInit, ViewChild} from '@angular/core';
import {AppService, Order, Product} from '../../service/app.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'productName', 'orderCharge', 'orderType', 'orderPoc'];
  Orders = new MatTableDataSource<Order>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

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

}
