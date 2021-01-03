import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppService, Product} from '../../service/app.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['#', 'productName', 'productDesc'];
  Products = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.getProducts().subscribe(products => {
      this.Products = new MatTableDataSource<Product>(products);
      this.Products.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.Products.filter = filterValue.trim().toLowerCase();
  }
}
