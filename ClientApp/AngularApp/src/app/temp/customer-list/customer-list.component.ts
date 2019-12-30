import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {

  users:User[];

  constructor(private _userService:UserService) { }

  ngOnInit() {
    this.users = this._userService.getAllUser();
  }

  removeChild(id){
    console.log(id);
    alert('call from child id : ' + id);
  }

}
