import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Property } from "../models/Property";
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UsefullService } from 'src/app/services/usefull.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

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
    return this.http.post<Property>(this.apiURL + '/properties/create', JSON.stringify(property))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  updateProperty(id, property): Observable<Property> {
    return this.http.post<Property>(this.apiURL + '/properties/' + id + '/update', JSON.stringify(property))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  disableProperty(id) {
    return this.http.post<Property>(this.apiURL + '/properties/' + id + '/disable', null)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  enableProperty(id) {
    return this.http.post<Property>(this.apiURL + '/properties/' + id + '/enable', null)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

}