import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from '../models/image';
import { environment } from '../../environments/environment';
import { UsefullService } from 'src/app/services/usefull.service';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';

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

  async removeImage(image) {
    return await this.http.post<Image>(this.apiURL + '/images/' + image._id + '/remove', JSON.stringify(image)).toPromise();
  }
}
