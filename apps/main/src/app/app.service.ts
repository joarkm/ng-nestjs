import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from '@nx-workspace/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { HttpBaseService, HttpErrorMessage, HttpErrorMessageService } from '@nx-workspace/core';
import { catchError, tap } from 'rxjs/operators';
import { MyUiNotificationHelper } from 'my-ui';

@Injectable()
export class AppService extends HttpBaseService {

  constructor(private http: HttpClient, httpErrorMessageService: HttpErrorMessageService, private notificationHelper: MyUiNotificationHelper) {
    super(httpErrorMessageService);
  }

  public getDataFromModule(moduleId: number): Observable<Message> {
    return this.http.get<Message>(`api/module${moduleId}`).pipe(
      catchError(this.handleError.bind(this)),
      tap((message: Message) => {
        this.notificationHelper.notifySuccess(message.message, 5);
      }),
      catchError((error: HttpErrorMessage) => {
        this.notificationHelper.notifyError(error.errorMessage);
        return of(null);
      })
    );
  }
}
