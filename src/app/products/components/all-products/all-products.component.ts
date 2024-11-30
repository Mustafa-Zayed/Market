import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit, OnDestroy {
  products: any;
  subscriptions: Subscription[] = [];
  private observer: Observer<Object>;

  constructor(private productService: ProductService) {
    this.observer = {
      next: (data) => {
        this.products = data;
      },

      error: (err: Error) => {
        console.log(err.message);
        alert('Failed to Get Products');
      },
      complete: () => console.log('Completed!'),
    };
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    let sub = this.productService.getAllProducts().subscribe(this.observer);

    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
