import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  imports: [CommonModule]
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];

  constructor(private service: OrderService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((data: any) => {
      this.orders = data;
    });
  }
}
