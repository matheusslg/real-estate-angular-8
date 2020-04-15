import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/internal/operators/retry';

@Injectable({
  providedIn: 'root'
})
export class UsefullService {

  menuSubject: Subject<any> = new Subject();

  dollarSubject: Subject<any> = new Subject();
  dollarData

  constructor(
    private http: HttpClient
  ) { }

  handleError(error) {
    let errorRes = {};
    if (error instanceof HttpErrorResponse || error instanceof ErrorEvent) {
      if (error.error.error) {
        errorRes = {
          'message': error.error.message,
          'type': error.error.error.kind
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

  getDollar(): Observable<any> {
    return this.http.get<any>('https://economia.awesomeapi.com.br/json/USD-BRL')
      .pipe(
        retry(1)
      )
  }

}
