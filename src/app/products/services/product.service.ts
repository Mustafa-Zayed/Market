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

  addToCart(prod: any) {
    if (this.cartItems.find((item: { id: any }) => item.id === prod.id)) {
      alert('Item Already Added');
      return;
    }
    this.cartItems.push(prod);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    console.log(this.cartItems);
  }
}
