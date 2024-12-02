import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartItems: any = [];

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`${environment.API_URL}/products`);
  }

  addToCart(event: { product: any; quantity: number }) {
    let item = this.cartItems.find(
      (item: { product: any; quantity: number }) =>
        item.product.id === event.product.id
    );

    if (item) item.quantity += event.quantity;
    else this.cartItems.push(event);

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    console.log(this.cartItems);
  }
}
