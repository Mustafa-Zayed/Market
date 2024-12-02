import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observer, Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit, OnDestroy {
  products: any;
  categories: any;
  subscriptions: Subscription[] = [];
  private productObserver: Observer<Object>;
  loading: boolean = false;
  
  constructor(private productService: ProductService, private categoryService:CategoryService) {
    this.productObserver = {
      next: (data) => {
        this.products = data;
        this.loading = false;
      },

      error: (err: Error) => {
        this.loading = false;
        console.log(err.message);
        alert('Failed to Get Products');
      },
      complete: () => console.log('Completed!'),
    };
  }

  ngOnInit(): void {
    // console.log('All Product Component');
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this.loading = true;
    let sub = this.productService.getAllProducts().subscribe(this.productObserver);

    this.subscriptions.push(sub);
  }
  
  getAllCategories() {
    this.loading = true;
    let sub = this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });

    this.subscriptions.push(sub);
  }

  // getByCategory(category: string) {
  //   this.loading = true;
  //   if (category === 'all') {
  //     this.getAllProducts();
  //     return;
  //   }
  //   let sub = this.categoryService.getByCategory(category).subscribe(this.productObserver);

  //   this.subscriptions.push(sub);
  // }

  getByCategory(event: any) {
    this.loading = true;
    let category = event.target.value;

    if (category === 'all') {
      this.getAllProducts();
      return;
    }
    let sub = this.categoryService.getByCategory(category).subscribe(this.productObserver);

    this.subscriptions.push(sub);
  }

  addToCart(event: { product: any, quantity: number }) {
    this.productService.addToCart(event);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
