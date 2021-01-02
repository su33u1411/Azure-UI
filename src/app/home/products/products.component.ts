import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppService, Product} from '../../service/app.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  Products: Product[];
  dtOptions: DataTables.Settings = {
    pageLength: 5,
    lengthChange: false
  };
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.getProducts().subscribe(products => {
      this.Products = products;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
