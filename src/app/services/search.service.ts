import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchTermSubject: Subject<any> = new Subject();

  constructor() { }
}
