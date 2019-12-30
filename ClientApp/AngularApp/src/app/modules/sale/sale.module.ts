import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale-routing.module';
import { OrderInfoComponent } from './Order/order-info/order-info.component';
import { OrderListComponent } from './Order/order-list/order-list.component';
import { OrderDetailsInfoComponent } from './OrderDetails/order-details-info/order-details-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderInfoWithReactiveComponent } from './Order/order-info-with-reactive/order-info-with-reactive.component';
import { OrderDetailsInfoReactiveComponent } from './OrderDetails/order-details-info-reactive/order-details-info-reactive.component';
import { ErrorMessageComponent } from 'src/app/common/error-message/error-message.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [OrderInfoComponent, OrderListComponent,
     OrderDetailsInfoComponent, OrderInfoWithReactiveComponent,
      OrderDetailsInfoReactiveComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SaleRoutingModule,
    SharedModule
  ],
  // exports:[ErrorMessageComponent]
})
export class SaleModule { }
