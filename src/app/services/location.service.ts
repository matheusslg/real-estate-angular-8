import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '../models/location';
import { environment } from '../../environments/environment';
import { UsefullService } from 'src/app/services/usefull.service';
import { Locations } from '../models/locations';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  locationSubject: Subject<any> = new Subject();
  locationList

  apiURL = environment.baseUri.mongo;
  
  constructor(
    private http: HttpClient,
    private usefullService: UsefullService
  ) { }

  getLocations(): Observable<Locations> {
    return this.http.get<Locations>(this.apiURL + '/locations')
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getLocationsActive(): Observable<Locations> {
    return this.http.get<Locations>(this.apiURL + '/locations?active=true')
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
    return this.http.post<Location>(this.apiURL + '/locations/create', JSON.stringify(location))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  updateLocation(id, location): Observable<Location> {
    return this.http.post<Location>(this.apiURL + '/locations/' + id + '/update', JSON.stringify(location))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  disableLocation(id) {
    return this.http.post<Location>(this.apiURL + '/locations/' + id + '/disable', null)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  enableLocation(id) {
    return this.http.post<Location>(this.apiURL + '/locations/' + id + '/enable', null)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }
}
