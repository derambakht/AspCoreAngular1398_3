import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OrderDetails } from 'src/app/models/sale/OrderDetails';
import { ValidationService } from 'src/app/services/tools/validation.service';

@Component({
  selector: 'app-order-info-with-reactive',
  templateUrl: './order-info-with-reactive.component.html',
  styleUrls: ['./order-info-with-reactive.component.css']
})
export class OrderInfoWithReactiveComponent implements OnInit {

  orderForm;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {

    var detailsArray = [];

   this.orderForm = this.fb.group({
     orderNumber:['', Validators.required],
     title:['', [Validators.required, Validators.minLength(3)]],
     details: this.fb.array(detailsArray)
   })
  }

  addRow() {
    const item = this.generateDetail(new OrderDetails());
    this.orderForm.controls.details.push(item);
  }

  generateDetail(data:OrderDetails): FormGroup {
    return this.fb.group({
      productId: [data.productId, Validators.required],
      itemCount: [data.itemCount, Validators.required],
      price: [data.price, Validators.required],
    })
  }

  saveData(){
    console.log(this.orderForm);
  }

}
