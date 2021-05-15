import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorMessageService } from './http-error-message.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [HttpErrorMessageService]
})
export class ErrorHandlingModule { }
