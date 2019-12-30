import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductListComponent } from './temp/product-list/product-list.component';
import { HomeComponent } from './temp/home/home.component';
import { CustomerListComponent } from './temp/customer-list/customer-list.component';
import { CustomerDetailComponent } from './temp/customer-detail/customer-detail.component';
import { PostListComponent } from './temp/post-list/post-list.component';
//import { BaseModule } from './modules/base/base.module';

import { NgxUiLoaderModule, NgxUiLoaderRouterModule , NgxUiLoaderHttpModule,
   NgxUiLoaderConfig, POSITION,SPINNER,PB_DIRECTION } from  'ngx-ui-loader';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { CustomerGradePipe } from './custom-pipes/customer-grade.pipe';
import { NumberToPersianPipe } from './custom-pipes/number-to-persian.pipe';
import { ErrorMessageComponent } from './common/error-message/error-message.component';
import { SharedModule } from './modules/shared/shared.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NotPermissionComponent } from './common/not-permission/not-permission.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './modules/custom-material-module/custom-material-module.module';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SidebarMenuComponent } from './layout/sidebar-menu/sidebar-menu.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { LoginComponent } from './common/login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { JwtInterceptor } from './helpers/JwtInterceptor';
import { ErrorInterceptor } from './helpers/ErrorInterceptor';
import { RainBowDirective } from './directives/rain-bow.directive';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor:'red',
  bgsColor: 'red',
  pbColor:'red',
  overlayColor:"rgba(189, 194, 226, .8)",
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.ballSpin,
  pbDirection: PB_DIRECTION.rightToLeft, // progress bar direction
  pbThickness: 5, // progress bar thickness
};

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    HomeComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    PostListComponent,
    CustomerGradePipe,
    NumberToPersianPipe,
    NotPermissionComponent,
    NotFoundComponent,
    MainLayoutComponent,
    SidebarMenuComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    SimpleNotificationsModule.forRoot(),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
    SharedModule,
    NgxPermissionsModule.forRoot(),
    BrowserAnimationsModule,
    CustomMaterialModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  // exports:[ErrorMessageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
