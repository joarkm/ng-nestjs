import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '@nx-workspace/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { HttpBaseService, HttpErrorMessageService } from '@nx-workspace/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppService extends HttpBaseService {

  constructor(private http: HttpClient, httpErrorMessageService: HttpErrorMessageService) {
    super(httpErrorMessageService);
  }

  public getDataFromModule(moduleId: number): Observable<Message> {
    return this.http.get<Message>(`api/module${moduleId}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }
}
