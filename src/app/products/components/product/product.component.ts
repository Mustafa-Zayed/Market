import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input()
  prod: any;

  @Output()
  onAddToCart: EventEmitter<any> = new EventEmitter<any>();

  addBtnFlag: boolean = false;
  prodQuantity: number = 1;

  constructor() {}

  ngOnInit(): void {
    // console.log('Product Component');
  }

  addToCartClick(clickedProd: any) {
    if (this.prodQuantity < 1) return;
    this.onAddToCart.emit({
      product: clickedProd,
      quantity: this.prodQuantity,
    }); //this.prod works as well
    this.addBtnFlag = false;
  }
}
