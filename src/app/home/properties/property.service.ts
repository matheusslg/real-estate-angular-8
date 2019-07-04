import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Property } from './models/property';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UsefullService } from 'src/app/services/usefull.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  // Define API
  apiURL = environment.baseUri.mongo;
  constructor(
    private http: HttpClient,
    private usefullService: UsefullService
  ) { }

  getProperties(): Observable<Property> {
    return this.http.get<Property>(this.apiURL + '/properties')
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getProperty(id): Observable<Property> {
    return this.http.get<Property>(this.apiURL + '/properties/' + id)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  createProperty(property): Observable<Property> {
    return this.http.post<Property>(this.apiURL + '/properties/create', JSON.stringify(property), this.usefullService.httpOptions)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  updateProperty(id, property): Observable<Property> {
    return this.http.post<Property>(this.apiURL + '/properties/' + id + '/update', JSON.stringify(property), this.usefullService.httpOptions)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  disableProperty(id) {
    return this.http.post<Property>(this.apiURL + '/properties/' + id + '/disable', this.usefullService.httpOptions)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  enableProperty(id) {
    return this.http.post<Property>(this.apiURL + '/properties/' + id + '/enable', this.usefullService.httpOptions)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

}