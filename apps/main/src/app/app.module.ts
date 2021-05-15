import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandlingModule } from '@nx-workspace/core';

import { AppComponent } from './app.component';
import { AppService } from './app.service';

@NgModule({
  imports: [
    BrowserModule,
    ErrorHandlingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule
  ],
  declarations: [AppComponent],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
