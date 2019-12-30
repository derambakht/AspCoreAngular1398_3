import { Component, OnInit, ViewChild ,
  ViewChildren,QueryList } from '@angular/core';
import { Order } from 'src/app/models/sale/Order';
import { OrderDetails } from 'src/app/models/sale/OrderDetails';
import { OrderDetailsInfoComponent } from '../../OrderDetails/order-details-info/order-details-info.component';
import { OrderService } from 'src/app/services/sale/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {
  order:Order = new Order();
  @ViewChild(OrderDetailsInfoComponent, {static: false}) child: OrderDetailsInfoComponent;
  @ViewChildren('detail') detailsList:QueryList<OrderDetailsInfoComponent>;

  constructor(private orderService: OrderService,
    private router:Router) { }

  ngOnInit() {
  }

  addRow(){
    const details = new OrderDetails();
    this.order.orderDetailsList.push(details);
  }

  removeRowInParent(item){
    console.log(item);
    const index = this.order.orderDetailsList.indexOf(item);
    this.order.orderDetailsList.splice(index, 1);
  }

  save(){
    //console.log(this.order);
    console.log(this.child);
    console.log(this.detailsList);

    this.orderService.add(this.order);
    this.router.navigate(["/sale"]);
  }

}
