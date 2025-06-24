import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order.model';
import { ProductService } from '../../products/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  categories: ProductCategory[] = [];
  isLoading = false;

  showOrderModal = false;
  editingOrder: Order | null = null;
  orderFormModel: Order = { id: '', customerName: '', productIds: [], orderDate: new Date().toISOString() };

  showDeleteModal = false;
  orderToDelete: Order | null = null;

  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadOrders();
    this.loadCategories();
  }

  loadOrders() {
    this.isLoading = true;
    this.orderService.getOrders().subscribe({
      next: orders => {
        this.orders = orders;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadCategories() {
    this.isLoading = true;
    this.orderService.getCategories().subscribe({
      next: (categories: string[]) => {
        this.categories = categories.map(id => ({ id, name: id }));
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  openAddOrder() {
    this.editingOrder = null;
    this.orderFormModel = { id: '', customerName: '', productIds: [], orderDate: new Date().toISOString() };
    this.showOrderModal = true;
  }

  openEditOrder(order: Order) {
    this.editingOrder = order;
    this.orderFormModel = { ...order, productIds: [...order.productIds] };
    this.showOrderModal = true;
  }

  closeOrderModal() {
    this.showOrderModal = false;
  }

  saveOrder() {
    this.isLoading = true;
    if (this.editingOrder) {
      this.orderService.updateOrder(this.orderFormModel).subscribe({
        next: () => {
          this.loadOrders();
          this.closeOrderModal();
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
    } else {
      this.orderService.addOrder(this.orderFormModel).subscribe({
        next: () => {
          this.loadOrders();
          this.closeOrderModal();
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
    }
  }

  confirmDelete(order: Order) {
    this.orderToDelete = order;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.orderToDelete = null;
  }

  deleteOrder() {
    if (this.orderToDelete) {
      this.isLoading = true;
      this.orderService.deleteOrder(this.orderToDelete.id).subscribe({
        next: () => {
          this.loadOrders();
          this.closeDeleteModal();
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
    }
  }

  getCategoryNameById(id: string): string {
    const cat = this.categories.find(c => c.id === id);
    return cat ? cat.name : id;
  }
}

export interface ProductCategory {
  id: string;
  name: string;
}