import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/accessRight/user.service';
import { User } from 'src/app/models/accessRight/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users:User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(result => {
      this.users = result;
      console.log(this.users);
    })
  }

}
