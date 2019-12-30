import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'order-details-info-reactive',
  templateUrl: './order-details-info-reactive.component.html',
  styleUrls: ['./order-details-info-reactive.component.css']
})
export class OrderDetailsInfoReactiveComponent implements OnInit {
  @Input() detailsForm:FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
