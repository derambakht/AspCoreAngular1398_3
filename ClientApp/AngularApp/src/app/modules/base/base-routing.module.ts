import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityListComponent } from './City/city-list/city-list.component';
import { CityInfoComponent } from './City/city-info/city-info.component';
import { UserListComponent } from './User/user-list/user-list.component';
import { UserInfoComponent } from './User/user-info/user-info.component';


const routes: Routes = [
  {path:'', component:CityListComponent},
  {path:'cities', component:CityListComponent},
  {path:'city/add', component:CityInfoComponent},
  {path:'city/edit/:id', component:CityInfoComponent},
  { path: 'users', component: UserListComponent},
  { path: 'user/add', component: UserInfoComponent},
  { path: 'user/:id', component: UserInfoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
