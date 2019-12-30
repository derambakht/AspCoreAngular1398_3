import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './Order/order-list/order-list.component';
import { OrderInfoComponent } from './Order/order-info/order-info.component';
import { OrderInfoWithReactiveComponent } from './Order/order-info-with-reactive/order-info-with-reactive.component';


const routes: Routes = [
  {path:'', component:OrderListComponent},
  {path:'orders/add', component:OrderInfoComponent},
  {path:'orders/edit/:id', component:OrderInfoComponent},
  {path:'orders/add-reactive', component:OrderInfoWithReactiveComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
