import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isNullOrUndefined } from '../shared/utils/core.utils';

import { HttpErrorMessage } from './http-error-message';

const ServerNotResponding = 'ServerNotResponding';

@Injectable()
export class HttpErrorMessageService {

    constructor() { }

    public parseHttpErrorMessage(responseError: HttpErrorResponse): HttpErrorMessage {

        if (responseError.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('HttpErrorMessageService.Client side error occured', responseError.error);
        }

        const errMsg = this.extractErrorMessage(responseError);

        console.log('HttpErrorMessageService.Extracted error message', errMsg);

        return {
            errorMessage: errMsg,
            statusCode: responseError.status
        };
    }

    private extractErrorMessage(error: HttpErrorResponse): string {
        let errMsg = '';
        if (error.error) {
            if (error.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('An client side error occurred:', error.error.message);
            }
            console.log('type of error', typeof (error.error));
            if (!isNullOrUndefined(error.error.message) && error.error.message !== '') {
                errMsg = error.error.message;
            }
        }

        if (!errMsg) {
          errMsg = error.message;
        }

        if (isNullOrUndefined(error.status)) {
          return ServerNotResponding;
        } else {
          errMsg = `${error.status} ${error.statusText}: ${errMsg}`;
        }

        return errMsg;
    }

}
