import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SlugType } from '../models/slugType';
import { environment } from '../../environments/environment';
import { UsefullService } from 'src/app/services/usefull.service';
import { SlugTypes } from '../models/slugTypes';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SlugTypeService {

  slugTypeSubject: Subject<any> = new Subject();
  slugTypeList

  apiURL = environment.baseUri.mongo;
  
  constructor(
    private http: HttpClient,
    private usefullService: UsefullService
  ) { }

  getSlugTypes(): Observable<SlugTypes> {
    return this.http.get<SlugTypes>(this.apiURL + '/slugTypes')
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getSlugTypesActive(): Observable<SlugTypes> {
    return this.http.get<SlugTypes>(this.apiURL + '/slugTypes?active=true')
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getSlugType(id): Observable<SlugType> {
    return this.http.get<SlugType>(this.apiURL + '/slugTypes/' + id)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  createSlugType(slugType): Observable<SlugType> {
    return this.http.post<SlugType>(this.apiURL + '/slugTypes/create', JSON.stringify(slugType))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  updateSlugType(id, slugType): Observable<SlugType> {
    return this.http.post<SlugType>(this.apiURL + '/slugTypes/' + id + '/update', JSON.stringify(slugType))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  disableSlugType(id) {
    return this.http.post<SlugType>(this.apiURL + '/slugTypes/' + id + '/disable', null)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  enableSlugType(id) {
    return this.http.post<SlugType>(this.apiURL + '/slugTypes/' + id + '/enable', null)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }
}
