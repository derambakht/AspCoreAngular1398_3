import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  @Input() info: User;
  @Output() remove = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    console.log(this.info);
  }

  removeItem(id){
    //alert(id);
    this.remove.emit(id);
  }

}
