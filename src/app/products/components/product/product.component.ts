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
  prodQuantity: number = 0;

  constructor() {}

  ngOnInit(): void {
    // console.log('Product Component');
  }

  addToCartClick(clickedProd: any) {
    this.onAddToCart.emit({
      product: clickedProd,
      quantity: this.prodQuantity,
    }); //this.prod works as well
    this.addBtnFlag = false;
  }
}
