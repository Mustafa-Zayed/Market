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

  constructor() {}

  ngOnInit(): void {
    // console.log('Product Component');
  }

  addToCartClick(clickedProd: any) {
    this.onAddToCart.emit(clickedProd); //this.prod works as well
  }
}
