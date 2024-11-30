import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', component: CartComponent },
  { path: '', redirectTo: 'cart' , pathMatch: 'full' },
  { path: 'cart', component: CartComponent }
]

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CartsModule { }
