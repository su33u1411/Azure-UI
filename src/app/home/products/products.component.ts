import {Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppService, Product} from '../../service/app.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['#', 'productName', 'productDesc'];
  Products = new MatTableDataSource<Product>();
  product: Product = {
    productId: '',
    productDesc: '',
    productName: ''
  };
  saveButtonDisable: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('closeButton') closeButton: MatButton;

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.getProducts().subscribe(products => {
      this.appService.products = products;
      this.Products = new MatTableDataSource<Product>(products);
      this.Products.paginator = this.paginator;
    });
    this.saveButtonDisable = true;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.Products.filter = filterValue.trim().toLowerCase();
  }

  createProduct() {
    this.appService.createProduct(this.product.productName, this.product.productDesc).subscribe(response => {
      if (response.productId) {
        this.product.productName = '';
        this.product.productDesc = '';
        this.closeButton._elementRef.nativeElement.click();
        this.ngOnInit();
      } else {

      }
    });
  }

  enableSaveProduct() {
    if (this.product.productName && this.product.productDesc) {
      this.saveButtonDisable = false;
    } else {
      this.saveButtonDisable = true;
    }
  }
}
