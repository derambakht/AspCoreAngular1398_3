import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './temp/home/home.component';
import { ProductListComponent } from './temp/product-list/product-list.component';
import { CustomerListComponent } from './temp/customer-list/customer-list.component';
import { PostListComponent } from './temp/post-list/post-list.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { NotPermissionComponent } from './common/not-permission/not-permission.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { LoginComponent } from './common/login/login.component';
import { CustomCanActivate } from './helpers/CustomCanActivate';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [CustomCanActivate]},
  // { path: 'login', component: LoginComponent},
  { path: 'products', component: ProductListComponent,
  //canActivate: [NgxPermissionsGuard],
  canActivate: [CustomCanActivate],
  data: {
    permissions: {
      only: 'ADMIN',
      redirectTo: '/denied'
    }
  }
},
  { path: 'customers', component: CustomerListComponent},
  // { path: 'users', component: UserListComponent},
  // { path: 'user/add', component: UserInfoComponent},
  // { path: 'user/:id', component: UserInfoComponent},
  { path: 'posts', component: PostListComponent},
  //lazy loading
  { path: 'base', loadChildren: () => import('./modules/base/base.module').then(m => m.BaseModule) },
  { path: 'sale' , canActivate: [CustomCanActivate],
  data: {
    permissions: {
      redirectTo: '/denied'
    }
  },
  loadChildren: () => import('./modules/sale/sale.module').then(m => m.SaleModule) },
  { path: 'denied', component: NotPermissionComponent},
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
