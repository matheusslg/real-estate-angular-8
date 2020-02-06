import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city';
import { environment } from '../../environments/environment';
import { UsefullService } from 'src/app/services/usefull.service';
import { Cities } from '../models/cities';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  citySubject: Subject<any> = new Subject();
  cityList

  apiURL = environment.baseUri.mongo;

  constructor(
    private http: HttpClient,
    private usefullService: UsefullService
  ) { }

  getCities(): Observable<Cities> {
    return this.http.get<Cities>(this.apiURL + '/cities')
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getCitiesActive(): Observable<Cities> {
    return this.http.get<Cities>(this.apiURL + '/cities?active=true')
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getCity(id): Observable<City> {
    return this.http.get<City>(this.apiURL + '/cities/' + id)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError),
      )
  }

  createCity(city): Observable<City> {
    return this.http.post<City>(this.apiURL + '/cities/create', JSON.stringify(city))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  updateCity(id, city): Observable<City> {
    return this.http.post<City>(this.apiURL + '/cities/' + id + '/update', JSON.stringify(city))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  disableCity(id) {
    return this.http.post<City>(this.apiURL + '/cities/' + id + '/disable', null)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  enableCity(id) {
    return this.http.post<City>(this.apiURL + '/cities/' + id + '/enable', null)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }
}
