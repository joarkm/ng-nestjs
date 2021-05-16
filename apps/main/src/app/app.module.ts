import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ErrorHandlingModule } from '@nx-workspace/core';
import { NotificationModule } from 'my-ui';

import { AppComponent } from './app.component';
import { AppService } from './app.service';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ErrorHandlingModule,
    HttpClientModule,
    NotificationModule
  ],
  declarations: [AppComponent],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
