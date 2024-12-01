import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: any = [];
  loading: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // console.log('Cart Component');
    this.loading = true;
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    console.log(this.cartItems);
    // this.loading = false;
  }

  ngOnDestroy(): void {
    localStorage.removeItem('cartItems');
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    console.log(this.cartItems);
  }
}
