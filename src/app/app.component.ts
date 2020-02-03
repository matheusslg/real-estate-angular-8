import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { LocationService } from './services/location.service';
import { TypeService } from './services/type.service';
import { TagService } from './services/tag.service';
import { Globals } from './globals';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UsefullService } from './services/usefull.service';
declare let gtag:Function;
declare let fbq:Function;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = this.GLOBALS.SYSTEM_TITLE;

  constructor(
    private GLOBALS: Globals,
    private router: Router,
    private categoryService: CategoryService,
    private locationService: LocationService,
    private typeService: TypeService,
    private tagService: TagService,
    private deviceService: DeviceDetectorService,
    private usefullService: UsefullService
  ) {
    router.events.subscribe((val: RoutesRecognized) => {
      if (val instanceof NavigationEnd) {
        gtag('config', 'UA-45569438-2', { 'page_path': val.url });
        fbq('track', 'PageView');
      }
      if ((val.urlAfterRedirects && val.urlAfterRedirects.indexOf('/imoveis') == -1) || this.deviceService.isDesktop()) {
        this.usefullService.scrollTop();
      }
    });
  }

  ngOnInit(): void {
    forkJoin([
      this.categoryService.getCategoriesActive(),
      this.locationService.getLocationsActive(),
      this.typeService.getTypesActive(),
      this.tagService.getTagsActive()
    ]).subscribe(resolvedPromises => {
      this.categoryService.categorySubject.next(resolvedPromises[0].data);
      this.locationService.locationSubject.next(resolvedPromises[1].data);
      this.typeService.typeSubject.next(resolvedPromises[2].data);
      this.tagService.tagSubject.next(resolvedPromises[3].data);

      // Store data on service
      this.categoryService.categoryList = resolvedPromises[0].data;
      this.locationService.locationList = resolvedPromises[1].data;
      this.typeService.typeList = resolvedPromises[2].data;
      this.tagService.tagList = resolvedPromises[3].data;
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
