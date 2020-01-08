import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsefullService {

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

  orderByLocale(arr, property) {
    return arr.sort(function (a, b) {
      return a[property].localeCompare(b[property]);
    });
  }

}
