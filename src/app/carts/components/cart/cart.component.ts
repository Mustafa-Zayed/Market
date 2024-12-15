import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { IProduct } from 'src/app/products/models/iproduct';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: { product: IProduct; quantity: number }[] = [];
  totalPrice: number = 0;
  cartSentSuccessfully: boolean = false;
  subscriptions: Subscription[] = [];

  // Properties to hold modal data
  @ViewChild('modalId') modalElement!: ElementRef;
  deleteModalProd: IProduct | undefined;
  delOrClearCartFlag: string = '';

  constructor(private cartService :CartService) {}

  ngOnInit(): void {
    // console.log('Cart Component');
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.calcTotalPrice();
    console.log(this.cartItems);
  }

  calcTotalPrice() {
    let total = 0;
    this.cartItems.forEach((item: any) => {
      total += item.quantity * item.product.price;
    });
    this.totalPrice = total;
  }
  
  updateTotalAndLocalStorage() {
    this.calcTotalPrice();
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  plus(event: any) {
    const index = this.cartItems.findIndex(
      (item: { product: IProduct; quantity: number }) =>
        item.product.id === event.product.id
    );
    this.cartItems[index].quantity += 1;

    this.updateTotalAndLocalStorage();
    console.log(this.cartItems);
  }

  minus(event: any) {
    const index = this.cartItems.findIndex(
      (item: { product: IProduct; quantity: number }) =>
        item.product.id === event.product.id
    );
    this.cartItems[index].quantity -= 1;

    this.updateTotalAndLocalStorage();
    console.log(this.cartItems);
  }

  addAmount(index: number) {
    this.cartItems[index].quantity += 1;

    this.updateTotalAndLocalStorage();
    console.log(this.cartItems);
  }
  
  minsAmount(index: number) {
    this.cartItems[index].quantity -= 1;

    this.updateTotalAndLocalStorage()
    console.log(this.cartItems);
  }

  showDeleteOrClearCartModal(delOrClearCartFlag: string, product?: IProduct) {
    this.delOrClearCartFlag = delOrClearCartFlag;

    this.deleteModalProd = product;
  
    const modal = new (window as any).bootstrap.Modal(this.modalElement.nativeElement);
    modal.show();
  }

  deleteProductFromCart() {
    this.cartItems = this.cartItems.filter(
      (item: { product: IProduct; quantity: number }) =>
        item.product.id !== this.deleteModalProd?.id
    )

    this.updateTotalAndLocalStorage();
    console.log(this.cartItems);
  }

  clearCart(){
    this.cartItems = [];

    this.updateTotalAndLocalStorage();
    console.log(this.cartItems);
  }

  sendCart(){
    let sub = this.cartService.sendCart(this.cartItems).subscribe(next => {
      console.log(next);
      // this.clearCart();
      setTimeout(() => {
        this.cartSentSuccessfully = false;
      }, 3000);
      this.cartSentSuccessfully = true;
    });

    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    // localStorage.removeItem('cartItems');
    // this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    // console.log(this.cartItems);
  }
}
