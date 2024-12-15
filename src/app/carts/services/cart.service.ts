import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  sendCart(cartItems: { product: any; quantity: number }[]) {
    let prodsIdAndQuantity: { productId: number; quantity: number }[] =[];

    // cartItems.forEach((item) =>
    //   prodsIdAndQuantity.push({
    //     productId: item.product.id,
    //     quantity: item.quantity,
    //   })
    // );
    prodsIdAndQuantity = cartItems.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }))
    // console.log(prodsIdAndQuantity);
    // console.log(cartItems);

    let body = {
      userId:5, // suppose to be the user token got from login, keep it static for now
      date:new Date(),
      products:prodsIdAndQuantity
    }
    // console.log(body);

    return this.http.post(`${environment.API_URL}/carts`, (body));
  }
}
