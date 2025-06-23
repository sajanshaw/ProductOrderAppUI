// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { OrderListComponent } from './orders/order-list/order-list.component';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'orders', component: OrderListComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' }
];
