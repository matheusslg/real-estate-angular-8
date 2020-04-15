import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../models/tag';
import { environment } from '../../environments/environment';
import { UsefullService } from 'src/app/services/usefull.service';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  tagSubject: Subject<any> = new Subject();
  tagList

  apiURL = environment.baseUri.mongo;
  
  constructor(
    private http: HttpClient,
    private usefullService: UsefullService
  ) { }

  getTags(): Observable<Tag> {
    return this.http.get<Tag>(this.apiURL + '/tags')
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getTagsActive(): Observable<Tag> {
    return this.http.get<Tag>(this.apiURL + '/tags?active=true')
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getTag(id): Observable<Tag> {
    return this.http.get<Tag>(this.apiURL + '/tags/' + id)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  createTag(tag): Observable<Tag> {
    return this.http.post<Tag>(this.apiURL + '/tags/create', JSON.stringify(tag))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  updateTag(id, tag): Observable<Tag> {
    return this.http.post<Tag>(this.apiURL + '/tags/' + id + '/update', JSON.stringify(tag))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  disableTag(id) {
    return this.http.post<Tag>(this.apiURL + '/tags/' + id + '/disable', null)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  enableTag(id) {
    return this.http.post<Tag>(this.apiURL + '/tags/' + id + '/enable', null)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }
}
