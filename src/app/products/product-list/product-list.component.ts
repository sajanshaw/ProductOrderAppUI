import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;

  showProductModal = false;
  editingProduct: Product | null = null;
  productFormModel: Product = { id: '', name: '', price: 0, category: '' };

  showDeleteModal = false;
  productToDelete: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  openAddProduct() {
    this.editingProduct = null;
    this.productFormModel = { id: '', name: '', price: 0, category: '' };
    this.showProductModal = true;
  }

  openEditProduct(product: Product) {
    this.editingProduct = product;
    this.productFormModel = { ...product };
    this.showProductModal = true;
  }

  closeProductModal() {
    this.showProductModal = false;
  }

  saveProduct() {
    this.isLoading = true;
    if (this.editingProduct) {
      this.productService.updateProduct(this.productFormModel).subscribe({
        next: () => {
          this.loadProducts();
          this.closeProductModal();
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
    } else {
      this.productService.addProduct(this.productFormModel).subscribe({
        next: () => {
          this.loadProducts();
          this.closeProductModal();
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
    }
  }

  confirmDelete(product: Product) {
    this.productToDelete = product;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.productToDelete = null;
  }

  deleteProduct() {
    if (this.productToDelete) {
      this.isLoading = true;
      this.productService.deleteProduct(this.productToDelete.id).subscribe({
        next: () => {
          this.loadProducts();
          this.closeDeleteModal();
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
    }
  }
}