export interface Order {
  id: string;
  customerName: string;
  productIds: string[];
  orderDate: string; // ISO string
}