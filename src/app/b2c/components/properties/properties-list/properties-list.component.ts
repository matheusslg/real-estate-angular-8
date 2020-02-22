import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { Globals } from 'src/app/globals';
import { NormalizeStringPipe } from 'src/app/b2c/pipes/normalize-string.pipe';
import { CategoryService } from 'src/app/services/category.service';
import { LocationService } from 'src/app/services/location.service';
import { TypeService } from 'src/app/services/type.service';
import { CityService } from 'src/app/services/city.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { UsefullService } from 'src/app/services/usefull.service';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit {

  @Output() filterCall = new EventEmitter()

  _filterData
  @Input()
  set filterData(data) {
    if (data) {

      this._filterData = data;
      this.loading = this._filterData.loading;

      if (this._filterData.resetPageCounter) {
        this.propertiesPageNumber = 1;
      }

      if (!this.loading) {

        this.propertyList = this._filterData.data;

        if (this.propertiesPageNumber === 1 && !this._filterData.firstCall) {
          this.usefullService.scrollTo('#cardBody');
        }

        if ((this._filterData.noMoreProperties === true) || (this._filterData.data && this._filterData.data.length === 0)) {
          this.noMoreProperties = true;
        } else {
          this.noMoreProperties = false;
        }

      }

    }
  }
  get filterData() { return this._filterData; }

  _routerParams
  @Input()
  set routerParams(data) {
    if (data) {
      this._routerParams = data;
      this.executeFiltering();
    }
  }
  get routerParams() { return this._routerParams; }

  propertyList

  loading
  propertyFeaturedList

  preUrlImages

  propertiesListNumber = 12
  propertiesLimitNumber
  propertiesPageNumber
  noMoreProperties = false

  categoryList
  locationList
  typeList
  cityList

  constructor(
    private categoryService: CategoryService,
    private locationService: LocationService,
    private typeService: TypeService,
    private cityService: CityService,
    private titleService: Title,
    private GLOBALS: Globals,
    private normalizeString: NormalizeStringPipe,
    public usefullService: UsefullService
  ) {
    this.preUrlImages = environment.baseUri.mongo;
  }

  ngOnInit() {
    this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE);
    this.propertiesLimitNumber = this.propertiesListNumber;
    this.propertiesPageNumber = 1;

    this.loading = true;
    forkJoin([
      this.categoryService.categorySubject,
      this.locationService.locationSubject,
      this.typeService.typeSubject,
      this.cityService.citySubject
    ]).subscribe(resolvedPromises => {
      this.categoryService.categoryList = resolvedPromises[0];
      this.locationService.locationList = resolvedPromises[1];
      this.typeService.typeList = resolvedPromises[2];
      this.cityService.cityList = resolvedPromises[3];

      this.categoryList = this.categoryService.categoryList;
      this.locationList = this.locationService.locationList;
      this.typeList = this.typeService.typeList;
      this.cityList = this.cityService.cityList;

      this.executeFiltering();

    }, (error) => {
      console.log(error);
    }, () => {
      this.loading = false;
    });
  }

  executeFiltering() {
    this.categoryList = this.categoryService.categoryList;
    this.locationList = this.locationService.locationList;
    this.typeList = this.typeService.typeList;
    this.cityList = this.cityService.cityList;

    if (this.categoryList && this.locationList && this.typeList && this.cityList) {

      this.categoryList.forEach(_category => {
        if (this.normalizeString.transform(_category.description) == this.routerParams) {
          this.resetSeeMoreData();
          this.loading = true;
          this.filterCall.emit({ page: 1, params: { type: 'category', data: _category } });
        }
      });

      this.locationList.forEach(_location => {
        if (this.normalizeString.transform(_location.description) == this.routerParams) {
          this.resetSeeMoreData();
          this.loading = true;
          this.filterCall.emit({ page: 1, params: { type: 'location', data: _location } });
        }
      });

      this.typeList.forEach(_type => {
        if (this.normalizeString.transform(_type.description) == this.routerParams) {
          this.resetSeeMoreData();
          this.loading = true;
          this.filterCall.emit({ page: 1, params: { type: 'type', data: _type } });
        }
      });

      this.cityList.forEach(_city => {
        if (this.normalizeString.transform(_city.description) == this.routerParams) {
          this.resetSeeMoreData();
          this.loading = true;
          this.filterCall.emit({ page: 1, params: { type: 'city', data: _city } });
        }
      });

    }
  }

  resetSeeMoreData() {
    this.propertiesPageNumber = 1;
    this.noMoreProperties = false;
  }

  seeMore() {
    this.propertiesPageNumber++;
    this.filterCall.emit({ page: this.propertiesPageNumber, loadMore: true });
  }

}
