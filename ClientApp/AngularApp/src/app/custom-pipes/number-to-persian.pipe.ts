import { Pipe, PipeTransform } from '@angular/core';
import { PersianNumberService } from '../services/tools/persian-number.service';

@Pipe({
    name: 'numberToPersian'
})
export class NumberToPersianPipe implements PipeTransform {

    constructor(private persianNumberService: PersianNumberService) { }

    transform(inputValue: string): string {
        try {
            var number = this.persianNumberService.toEngNumber(inputValue);
            return this.persianNumberService.toPersianWord(inputValue);
        }
        catch(e){
            return `${inputValue} is not valid number!`;
        }
      
  }
}