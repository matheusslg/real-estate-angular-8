import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Type } from '../models/type';
import { environment } from '../../environments/environment';
import { UsefullService } from 'src/app/services/usefull.service';
import { Types } from '../models/types';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  typeSubject: Subject<any> = new Subject();
  typeList

  apiURL = environment.baseUri.mongo;
  
  constructor(
    private http: HttpClient,
    private usefullService: UsefullService
  ) { }

  getTypes(): Observable<Types> {
    return this.http.get<Types>(this.apiURL + '/types')
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getTypesActive(): Observable<Types> {
    return this.http.get<Types>(this.apiURL + '/types?active=true')
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getType(id): Observable<Type> {
    return this.http.get<Type>(this.apiURL + '/types/' + id)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  createType(type): Observable<Type> {
    return this.http.post<Type>(this.apiURL + '/types/create', JSON.stringify(type))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  updateType(id, type): Observable<Type> {
    return this.http.post<Type>(this.apiURL + '/types/' + id + '/update', JSON.stringify(type))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  disableType(id) {
    return this.http.post<Type>(this.apiURL + '/types/' + id + '/disable', null)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  enableType(id) {
    return this.http.post<Type>(this.apiURL + '/types/' + id + '/enable', null)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }
}
