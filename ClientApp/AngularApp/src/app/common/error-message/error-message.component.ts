import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from 'src/app/services/tools/validation.service';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent {

  @Input() control: FormControl;
 
  constructor() { }
   
  get errorMessage() {
    for (let propertyName in this.control.errors) {
     {
      if (this.control.errors.hasOwnProperty(propertyName)) {
        console.log(this.control.errors[propertyName]);
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    }    
    return null;
  }

}
