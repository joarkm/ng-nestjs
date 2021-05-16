import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { HttpErrorMessageService } from "./http-error-message.service";

export class HttpBaseService {
    constructor(private httpErrorMessageService: HttpErrorMessageService) {}

    protected handleError(error: HttpErrorResponse): Observable<any> {
        console.error('Server error:', error);
        const parsedError = this.httpErrorMessageService.parseHttpErrorMessage(error);
        return throwError(parsedError);
    }
}