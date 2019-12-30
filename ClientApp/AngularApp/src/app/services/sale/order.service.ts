import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/sale/Order';

// @Injectable({
//   providedIn: 'root'
// })
export class OrderService {
 orders:Order[] = [{
    id:1,
    orderNumber :101,
    title:"test",
    orderDetailsList:[{
      id:1,
      itemCount:5,
      price:500,
      orderId:1,
      productId:101,
    },
    {
      id:2,
      itemCount:50,
      price:900,
      orderId:1,
      productId:101,
    },
    {
      id:3,
      itemCount:5,
      price:500,
      orderId:1,
      productId:101,
    }]
  },
  {
    id:2,
    orderNumber :201,
    title:"test22222",
    orderDetailsList:[
      {
        id:2,
        itemCount:50,
        price:900,
        orderId:1,
        productId:101,
      },
      {
        id:3,
        itemCount:5,
        price:500,
        orderId:1,
        productId:101,
      }
    ]
  }];
  constructor() { }

  getAll() {
    //return [...this.orders];
    //const newArray = Object.assign([], this.orders);

    //deep copy
    const newArray = JSON.parse(JSON.stringify( this.orders ));
    return newArray;
  }

  getAllWithRef(){
    return this.orders;
  }

  add(item:Order){
    this.orders = [...this.orders, item];
  }

  getById(id:number):Order{
    return this.orders.find(q => q.id == id);
  }


}
