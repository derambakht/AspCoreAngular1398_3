import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'customerGrade'
})
export class CustomerGradePipe implements PipeTransform {

  transform(customers: User[], grade:number): any {
    return customers.filter(q => q.grade >= grade);
  }

}
