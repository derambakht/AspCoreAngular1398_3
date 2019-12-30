import { Component, OnInit, Input, Output ,EventEmitter } from '@angular/core';
import { OrderDetails } from 'src/app/models/sale/OrderDetails';

@Component({
  selector: 'order-details-info',
  templateUrl: './order-details-info.component.html',
  styleUrls: ['./order-details-info.component.css']
})
export class OrderDetailsInfoComponent implements OnInit {
  @Input() info: OrderDetails;
  @Output() removeRow = new EventEmitter<OrderDetails>();
  constructor() { }

  ngOnInit() {
  }

  remove() {
    this.removeRow.emit(this.info);
  }

}
