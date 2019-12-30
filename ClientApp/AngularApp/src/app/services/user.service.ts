import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users:User[] = [
    new User(1,"ali", "rezaei", "0011442255", 4, 654698765654),
    new User(2,"reza", "rezaei", "0011442255", 3, 3213465897),
    new User(3,"omid", "rezaei", "0011442255", 2, 21321564),
    new User(4,"navid", "rezaei", "0011442255", 1, 32198756456),
    new User(5,"hamid", "rezaei", "0011442255", 5, 65413265),
  ];

  constructor() { }

  public getAllUser():User[]{
    return this.users;
  }

  public getUser(id:number):User{
    return this.users.find(q => q.id == id);
  }

  public removeUser(id:number):void{
    this.users = this.users.filter(q => q.id != id);
  }

  public addUser(item:User):void {
    this.users.push(item);
  }

  public updateUser(item:User):void {
    const index = this.users.findIndex(q => q.id == item.id);
    this.users[index].firstName = item.firstName;
    this.users[index].lastName = item.lastName;
    this.users[index].nationalCode = item.nationalCode;
  }

}
