import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Property } from "../models/Property";
import { environment } from '../../environments/environment';
import { UsefullService } from 'src/app/services/usefull.service';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  apiURL = environment.baseUri.mongo;

  constructor(
    private http: HttpClient,
    private usefullService: UsefullService
  ) { }

  getProperties(limit?, skip?): Observable<Property> {
    return this.http.get<Property>(this.apiURL + '/properties' + (limit ? '?limit=' + limit : '') + (skip != null ? '&skip=' + skip : ''))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getPropertiesByCategory(categoryId, limit?, skip?): Observable<Property> {
    return this.http.get<Property>(this.apiURL + '/properties/category/' + categoryId + (limit ? '?limit=' + limit : '') + (skip != null ? '&skip=' + skip : ''))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getPropertiesByLocation(locationId, limit?, skip?): Observable<Property> {
    return this.http.get<Property>(this.apiURL + '/properties/location/' + locationId + (limit ? '?limit=' + limit : '') + (skip != null ? '&skip=' + skip : ''))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getPropertiesByType(typeId, limit?, skip?): Observable<Property> {
    return this.http.get<Property>(this.apiURL + '/properties/type/' + typeId + (limit ? '?limit=' + limit : '') + (skip != null ? '&skip=' + skip : ''))
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
    property.categories = property.categories.map(function (item) { return item._id; });
    property.locations = property.locations.map(function (item) { return item._id; });
    property.types = property.types.map(function (item) { return item._id; });
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

  updatePropertyImages(id, images): Observable<Property> {
    return this.http.post<Property>(this.apiURL + '/properties/' + id + '/updateImages', JSON.stringify({ images: images }))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  async disableProperty(id) {
    return this.http.post<Property>(this.apiURL + '/properties/' + id + '/disable', null)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  async removeProperty(property) {
    return await this.http.post<Property>(this.apiURL + '/properties/' + property._id + '/remove', null)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
      .toPromise()
  }

  enableProperty(id) {
    return this.http.post<Property>(this.apiURL + '/properties/' + id + '/enable', null)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

}