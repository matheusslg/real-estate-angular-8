import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from '../models/image';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UsefullService } from 'src/app/services/usefull.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  apiURL = environment.baseUri.mongo;
  
  constructor(
    private http: HttpClient,
    private usefullService: UsefullService
  ) { }

  getImages(): Observable<Image> {
    return this.http.get<Image>(this.apiURL + '/images')
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getImage(id): Observable<Image> {
    return this.http.get<Image>(this.apiURL + '/images/' + id)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  createImage(image): Observable<Image> {
    return this.http.post<Image>(this.apiURL + '/images/create', JSON.stringify(image))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  updateImage(id, image): Observable<Image> {
    return this.http.post<Image>(this.apiURL + '/images/' + id + '/update', JSON.stringify(image))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  removeImage(id) {
    return this.http.post<Image>(this.apiURL + '/images/' + id + '/remove', null)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }
}
