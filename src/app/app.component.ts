import { Component } from '@angular/core';
import { CategoryService } from './services/category.service';
import { LocationService } from './services/location.service';
import { TypeService } from './services/type.service';
import { TagService } from './services/tag.service';
import { Globals } from './globals';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = this.GLOBALS.SYSTEM_TITLE;

  constructor(
    private GLOBALS: Globals,
    private categoryService: CategoryService,
    private locationService: LocationService,
    private typeService: TypeService,
    private tagService: TagService
  ) { }

  ngOnInit(): void {
    forkJoin([
      this.categoryService.getCategories(),
      this.locationService.getLocations(),
      this.typeService.getTypes(),
      this.tagService.getTags()
    ]).subscribe(resolvedPromises => {
      this.categoryService.categorySubject.next(resolvedPromises[0]);
      this.locationService.locationSubject.next(resolvedPromises[1]);
      this.typeService.typeSubject.next(resolvedPromises[2]);
      this.tagService.tagSubject.next(resolvedPromises[3]);
    }, (error) => {
      console.log(error);
    }, () => {
      this.categoryService.categorySubject.complete();
      this.locationService.locationSubject.complete();
      this.typeService.typeSubject.complete();
      this.tagService.tagSubject.complete();
    });
  }

}
