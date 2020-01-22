import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { environment } from '../../environments/environment';
import { UsefullService } from 'src/app/services/usefull.service';
import { Categories } from '../models/categories';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categorySubject: Subject<any> = new Subject();
  categoryList

  apiURL = environment.baseUri.mongo;

  constructor(
    private http: HttpClient,
    private usefullService: UsefullService
  ) { }

  getCategories(): Observable<Categories> {
    return this.http.get<Categories>(this.apiURL + '/categories')
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  getCategory(id): Observable<Category> {
    return this.http.get<Category>(this.apiURL + '/categories/' + id)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError),
        // map(res => {
        //   debugger
        //   let teste: Category = new Category()
        //   teste.count = 0
        //   teste.data = {
        //     _id: 'TESTE',
        //     description: 'string;',
        //     active: false,
        //   }
        //   return teste
        // }),
        // tap((next)=>{
        //   debugger
        // },(error)=>{
        //   debugger
        // },
        // ()=>{
        //   debugger
        // })
      )
  }

  createCategory(category): Observable<Category> {
    return this.http.post<Category>(this.apiURL + '/categories/create', JSON.stringify(category))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  updateCategory(id, category): Observable<Category> {
    return this.http.post<Category>(this.apiURL + '/categories/' + id + '/update', JSON.stringify(category))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  disableCategory(id) {
    return this.http.post<Category>(this.apiURL + '/categories/' + id + '/disable', null)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  enableCategory(id) {
    return this.http.post<Category>(this.apiURL + '/categories/' + id + '/enable', null)
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }
}
