import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsefullService {

  constructor() { }

  handleError(error) {
    let errorRes = {};
    if (error instanceof HttpErrorResponse || error instanceof ErrorEvent) {
      if (error.error.error) {
        errorRes = {
          'message': error.error.message,
          'type': error.error.error.errors.description.kind
        }
      } else {
        errorRes = error.error
      }
    } else {
      errorRes = {
        'message': error.message,
        'status': error.status
      }
    }
    console.log(errorRes);
    return throwError(errorRes);
  }

}
