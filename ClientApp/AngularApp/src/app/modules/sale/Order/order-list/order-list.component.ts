import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/sale/order.service';
import { Order } from 'src/app/models/sale/Order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [OrderService]
})
export class OrderListComponent implements OnInit {

  orders:Order[] = [];

  constructor(private orderService:OrderService) { }

  ngOnInit() {
    const items =  this.orderService.getAll();
    items[0].id = 999;
    console.log("old array");
    console.log(items);

    console.log("new array");
    const newItems = this.orderService.getAll();
    console.log(newItems);

    this.orders = this.orderService.getAll();
  }

}
