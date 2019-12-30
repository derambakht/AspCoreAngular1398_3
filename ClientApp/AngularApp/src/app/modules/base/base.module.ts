import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { CityListComponent } from './City/city-list/city-list.component';
import { CityInfoComponent } from './City/city-info/city-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UserInfoComponent } from './User/user-info/user-info.component';
import { UserListComponent } from './User/user-list/user-list.component';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [CityListComponent, CityInfoComponent, UserInfoComponent, UserListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BaseRoutingModule,
    SharedModule,
    NgxDropzoneModule,
  ]
})
export class BaseModule { }
