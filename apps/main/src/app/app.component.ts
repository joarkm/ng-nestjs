import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Message } from '@nx-workspace/api-interfaces';
import { take } from 'rxjs/operators';

@Component({
  selector: 'nx-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');

  data: Message;

  constructor(private http: HttpClient) {}

  public useModule(moduleId: number): void {
    this.http.get<Message>(`api/module${moduleId}`).pipe(take(1)).subscribe(message => { this.data = message; });
  }
}
