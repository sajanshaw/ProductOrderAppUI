import { ProductService } from '../product.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [CommonModule]
})
export class ProductListComponent {
  products: any[] = [];

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    debugger;
    this.service.getAll().subscribe((data: any) => {
      this.products = data;
    });
  }
}
