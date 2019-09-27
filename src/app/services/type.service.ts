import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Type } from '../models/type';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UsefullService } from 'src/app/services/usefull.service';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  apiURL = environment.baseUri.mongo;
  
  constructor(
    private http: HttpClient,
    private usefullService: UsefullService
  ) { }

  getTypes(): Observable<Type> {
    return this.http.get<Type>(this.apiURL + '/types')
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
