import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: { product: any; quantity: number }[] = [];
  totalPrice: number = 0;
  cartSentSuccessfully: boolean = false;

  // Properties to hold modal data
  @ViewChild('modalId') modalElement!: ElementRef;
  deleteModalProd: any = null;
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
      (item: { product: any; quantity: number }) =>
        item.product.id === event.product.id
    );
    this.cartItems[index].quantity += 1;

    this.updateTotalAndLocalStorage();
    console.log(this.cartItems);
  }

  minus(event: any) {
    const index = this.cartItems.findIndex(
      (item: { product: any; quantity: number }) =>
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

  showDeleteOrClearCartModal(delOrClearCartFlag: string, product?: any) {
    this.delOrClearCartFlag = delOrClearCartFlag;

    this.deleteModalProd = product;
  
    const modal = new (window as any).bootstrap.Modal(this.modalElement.nativeElement);
    modal.show();
  }

  deleteProductFromCart() {
    this.cartItems = this.cartItems.filter(
      (item: { product: any; quantity: number }) =>
        item.product.id !== this.deleteModalProd.id
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
    this.cartService.sendCart(this.cartItems).subscribe(next => {
      console.log(next);
      // this.clearCart();
      setTimeout(() => {
        this.cartSentSuccessfully = false;
      }, 3000);
      this.cartSentSuccessfully = true;
    });
  }

  ngOnDestroy(): void {
    // localStorage.removeItem('cartItems');
    // this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    // console.log(this.cartItems);
  }
}
