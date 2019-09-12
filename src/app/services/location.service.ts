import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '../models/location';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UsefullService } from 'src/app/services/usefull.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  apiURL = environment.baseUri.mongo;
  
  constructor(
    private http: HttpClient,
    private usefullService: UsefullService
  ) { }

  getLocations(): Observable<Location> {
    return this.http.get<Location>(this.apiURL + '/locations')
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getLocation(id): Observable<Location> {
    return this.http.get<Location>(this.apiURL + '/locations/' + id)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  createLocation(location): Observable<Location> {
    return this.http.post<Location>(this.apiURL + '/locations/create', JSON.stringify(location), this.usefullService.httpOptions)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  updateLocation(id, location): Observable<Location> {
    return this.http.post<Location>(this.apiURL + '/locations/' + id + '/update', JSON.stringify(location), this.usefullService.httpOptions)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  disableLocation(id) {
    return this.http.post<Location>(this.apiURL + '/locations/' + id + '/disable', this.usefullService.httpOptions)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  enableLocation(id) {
    return this.http.post<Location>(this.apiURL + '/locations/' + id + '/enable', this.usefullService.httpOptions)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }
}
