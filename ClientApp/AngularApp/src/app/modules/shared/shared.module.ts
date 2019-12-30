import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from 'src/app/common/error-message/error-message.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormsModule } from '@angular/forms';
import { RainBowDirective } from 'src/app/directives/rain-bow.directive';


@NgModule({
  declarations: [ErrorMessageComponent, RainBowDirective],
  imports:[CommonModule, FormsModule],
  exports:[
    ErrorMessageComponent,
    RainBowDirective,
  ]
})
export class SharedModule { }
