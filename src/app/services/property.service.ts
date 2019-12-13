import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Property } from "../models/Property";
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UsefullService } from 'src/app/services/usefull.service';
import { ImageService } from './image.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  apiURL = environment.baseUri.mongo;

  constructor(
    private http: HttpClient,
    private usefullService: UsefullService,
    private imageService: ImageService,
    private toastr: ToastrService
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
    await this.http.post<Property>(this.apiURL + '/properties/' + property._id + '/remove', null).toPromise().then((resolvedPromise) => {
      let allImagesRemoved = true;
      property.images.forEach(image => {
        this.imageService.removeImage(image).then((resolvedPromise) => {
          console.log(resolvedPromise);
        }).catch((error) => {
          catchError(this.usefullService.handleError)
          allImagesRemoved = false;
        })
      })
      if (allImagesRemoved) {
        return this.http.post<Property>(this.apiURL + '/properties/' + property._id + '/remove', null).toPromise();
      } else {
        this.toastr.error('Não foi possível remover todas as imagens.');
      }
    }).catch((error) => {
      catchError(this.usefullService.handleError)
    })
  }

  enableProperty(id) {
    return this.http.post<Property>(this.apiURL + '/properties/' + id + '/enable', null)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

}