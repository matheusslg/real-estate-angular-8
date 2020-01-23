import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';


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

  scrollTo(element?) {
    if (!element) {
      $('html, body').animate({
        scrollTop: $('#top').offset().top - 10
      }, 500);
    } else {
      $('html, body').animate({
        scrollTop: $(element).offset().top - 10
      }, 500);
    }
  }

  scrollTop(position?) {
    setTimeout(() => {
      window.scrollTo({
        top: position ? position : 0,
        behavior: 'smooth',
      })
    }, 0);
  }

}
