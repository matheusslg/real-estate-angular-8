import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Property } from "../models/Property";
import { environment } from '../../environments/environment';
import { UsefullService } from 'src/app/services/usefull.service';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Properties } from '../models/properties';

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

  getPropertiesActive(limit?, skip?): Observable<Property> {
    return this.http.get<Property>(this.apiURL + '/properties' + '?active=true' + (limit ? '&limit=' + limit : '') + (skip != null ? '&skip=' + skip : ''))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getPropertiesFeatured(limit?, skip?): Observable<Property> {
    return this.http.get<Property>(this.apiURL + '/properties' + '?active=true&featured=true' + (limit ? '&limit=' + limit : '') + (skip != null ? '&skip=' + skip : ''))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getPropertiesByCategory(categoryId, limit?, skip?): Observable<Property> {
    return this.http.get<Property>(this.apiURL + '/properties/category/' + categoryId + '?active=true' + (limit ? '&limit=' + limit : '') + (skip != null ? '&skip=' + skip : ''))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getPropertiesByLocation(locationId, limit?, skip?): Observable<Property> {
    return this.http.get<Property>(this.apiURL + '/properties/location/' + locationId + '?active=true' + (limit ? '&limit=' + limit : '') + (skip != null ? '&skip=' + skip : ''))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getPropertiesByType(typeId, limit?, skip?): Observable<Property> {
    return this.http.get<Property>(this.apiURL + '/properties/type/' + typeId + '?active=true' + (limit ? '&limit=' + limit : '') + (skip != null ? '&skip=' + skip : ''))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getPropertiesByCity(cityId, limit?, skip?): Observable<Property> {
    return this.http.get<Property>(this.apiURL + '/properties/city/' + cityId + '?active=true' + (limit ? '&limit=' + limit : '') + (skip != null ? '&skip=' + skip : ''))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getPropertiesFilter(limit?, page?, title?, address?, locations?, categories?, types?, cities?, bedroomsMin?, bedroomsMax?, toiletsMin?, toiletsMax?, garageMin?, garageMax?, priceType?, priceMin?, priceMax?, sizeType?, sizeMin?, sizeMax?, featured?): Observable<Properties> { 
    return this.http.get<Properties>(this.apiURL + '/properties/filter' + '?active=true' + (limit ? '&limit=' + limit : '') + (page != null ? '&page=' + page : '') + (title != null ? '&title=' + title : '') + (address != null ? '&address=' + address : '') + (locations.length > 0 ? '&locations=' + locations : '') + (categories.length > 0 ? '&categories=' + categories : '') + (types.length > 0 ? '&types=' + types : '') + (cities.length > 0 ? '&cities=' + cities : '') + (bedroomsMin != null ? '&bedroomsMin=' + bedroomsMin : '') + (bedroomsMax != null ? '&bedroomsMax=' + bedroomsMax : '') + (toiletsMin != null ? '&toiletsMin=' + toiletsMin : '') + (toiletsMax != null ? '&toiletsMax=' + toiletsMax : '') + (garageMin != null ? '&garageMin=' + garageMin : '') + (garageMax != null ? '&garageMax=' + garageMax : '') + (priceType != null ? '&priceType=' + priceType : '') + (priceMin != null ? '&priceMin=' + priceMin : '') + (priceMax != null ? '&priceMax=' + priceMax : '') + (sizeType != null ? '&sizeType=' + sizeType : '') + (sizeMin != null ? '&sizeMin=' + sizeMin : '') + (sizeMax != null ? '&sizeMax=' + sizeMax : '') + (featured != null ? '&featured=' + featured : ''))
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