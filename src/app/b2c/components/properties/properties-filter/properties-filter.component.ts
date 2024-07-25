import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Filter } from 'src/app/models/filter';
import { LocationService } from 'src/app/services/location.service';
import { CategoryService } from 'src/app/services/category.service';
import { TypeService } from 'src/app/services/type.service';
import { CityService } from 'src/app/services/city.service';
import { PropertyService } from 'src/app/services/property.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-properties-filter',
  templateUrl: './properties-filter.component.html',
  styleUrls: ['./properties-filter.component.scss']
})
export class PropertiesFilterComponent implements OnInit, AfterViewInit {

  @Input() type: String
  @Output() dataEmitter = new EventEmitter();

  filterCounters
  _propertyList
  @Input()
  set propertyList(data) {
    if (data) {
      this._propertyList = data.res;
    }
  }
  get propertyList() { return this._propertyList; }

  _filterCall
  @Input()
  set filterCall(data) {
    if (data) {

      this._filterCall = data;

      if (!this._filterCall.params) {
        this.callFilter(null, this._filterCall.page, this._filterCall.loadMore, null, this._filterCall.firstCall);
      } else {
        switch (this._filterCall.params.type) {
          case 'category':
            this.filter.categories = [];
            this.filter.categories.push(this._filterCall.params.data._id);
            this.callFilter();
            break;
          case 'location':
            this.filter.locations = [];
            this.filter.locations.push(this._filterCall.params.data._id);
            this.callFilter();
            break;
          case 'type':
            this.filter.types = [];
            this.filter.types.push(this._filterCall.params.data._id);
            this.callFilter();
            break;
          case 'city':
            this.filter.cities = [];
            this.filter.cities.push(this._filterCall.params.data._id);
            this.callFilter();
            break;
          case 'reset':
            this.filter = new Filter();
            this.callFilter();
            break;
        }
      }

    }
  }
  get filterCall() { return this._filterCall; }

  filter
  filterCache
  filterChanged: Subject<string> = new Subject();
  canResetAgain = true
  isFiltering = false

  loading

  categoryList
  locationList
  typeList
  cityList

  showPriceRange
  priceRange = {
    step: 1,
    min: null,
    max: null
  };

  allCount = 0
  hectareCount = 0
  sojaCount = 0
  cityCount = []
  categoryCount = []
  locationCount = []
  typeCount = []

  isMobile: boolean = false;

  constructor(
    private propertyService: PropertyService,
    private locationService: LocationService,
    private categoryService: CategoryService,
    private typeService: TypeService,
    private cityService: CityService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver
  ) {
    this.filter = new Filter();
    this._propertyList = [];
  }

  ngAfterViewInit() { // Executes every time that user goes back to a component with PropertiesFilterComponent to get all needed data
    this.breakpointObserver
      .observe(['(max-width: 990px)'])
      .subscribe((state: BreakpointState) => {
        this.isMobile = state.matches;
        this.toggleCollapse();
      });

    if (!this.loading) { // Prevent to exec with ngOnInit
      this.categoryList = this.categoryService.categoryList;
      this.locationList = this.locationService.locationList;
      this.typeList = this.typeService.typeList;
      this.cityList = this.cityService.cityList;
    }

  }

  ngOnInit() {
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

      //this.subscribeFields(); // TODO

    }, (error) => {
      console.log(error);
    }, () => {
      this.loading = false;
    });
  }

  subscribeFields() {
    this.filterChanged.pipe(
      debounceTime(750),
      distinctUntilChanged()
    ).subscribe(x => this.execFilter());
  }

  toggleCollapse(): void {
    if (this.isMobile) {
      (<any>$('.collapse')).collapse('hide');
    } else {
      (<any>$('.collapse')).collapse('show');
    }
  }

  handleCounters() {
    this.categoryList = this.categoryService.categoryList;
    this.locationList = this.locationService.locationList;
    this.typeList = this.typeService.typeList;
    this.cityList = this.cityService.cityList;
    if (this.categoryList && this.locationList && this.typeList && this.cityList) {

      this.categoryList.forEach(_category => {
        if (!(_category._id in this.filterCounters.categories)) {
          this.filterCounters.categories[_category._id] = { count: 0 };
        }
      });

      this.locationList.forEach(_location => {
        if (!(_location._id in this.filterCounters.locations)) {
          this.filterCounters.locations[_location._id] = { count: 0 };
        }
      });

      this.typeList.forEach(_type => {
        if (!(_type._id in this.filterCounters.types)) {
          this.filterCounters.types[_type._id] = { count: 0 };
        }
      });

      this.cityList.forEach(_city => {
        if (!(_city._id in this.filterCounters.cities)) {
          this.filterCounters.cities[_city._id] = { count: 0 };
        }
      });

    }
  }

  priceRangeChanged(event) {
    this.filter.priceMin = event.value.from;
    this.filter.priceMax = event.value.to;
  }

  onChangeCategories(event, category: any) {
    if (!this.filter.categories.includes(category._id)) {
      this.filter.categories.push(category._id);
    } else {
      const index: number = this.filter.categories.indexOf(category._id);
      if (index !== -1) {
        this.filter.categories.splice(index, 1);
      }
    }
    this.filterTimeout();
  }

  onChangeLocations(event, location: any) {
    if (!this.filter.locations.includes(location._id)) {
      this.filter.locations.push(location._id);
    } else {
      const index: number = this.filter.locations.indexOf(location._id);
      if (index !== -1) {
        this.filter.locations.splice(index, 1);
      }
    }
    this.filterTimeout();
  }

  onChangeTypes(event, type: any) {
    if (!this.filter.types.includes(type._id)) {
      this.filter.types.push(type._id);
    } else {
      const index: number = this.filter.types.indexOf(type._id);
      if (index !== -1) {
        this.filter.types.splice(index, 1);
      }
    }
    this.filterTimeout();
  }

  onChangeCities(event, city: any) {
    if (!this.filter.cities.includes(city._id)) {
      this.filter.cities.push(city._id);
    } else {
      const index: number = this.filter.cities.indexOf(city._id);
      if (index !== -1) {
        this.filter.cities.splice(index, 1);
      }
    }
    this.filterTimeout();
  }

  warnMessage() {
    this.toastr.warning('Modifique os valores do filtro lateral para efetuar uma nova filtragem.', 'Aviso');
  }

  filterTimeout() {
    setTimeout(() => {
      this.execFilter();
    }, 500)
  }

  execFilter() {
    if (JSON.stringify(this.filterCache) !== JSON.stringify(this.filter)) {
      this.callFilter();
      this.dataEmitter.emit({ loading: true, resetPageCounter: true });
    } else {
      this.warnMessage();
    }
  }

  resetFilter() {
    if (this.canResetAgain) {
      this.filter = new Filter();
      this.callFilter(null, null, null, true);
      this.dataEmitter.emit({ resetPageCounter: true });
      this.canResetAgain = false;
    } else {
      this.toastr.warning('Você limpou o filtro recentemente, por favor, aguarde para limpar novamente.', 'Aviso');
    }
  }

  callFilter(limit?, page?, loadMore?, reset?, firstCall?) {

    this.dataEmitter.emit({ loading: true });

    this.propertyService.getPropertiesFilter(
      limit ? limit : 16,
      page ? page : 1,
      this.filter.title,
      this.filter.address,
      this.filter.locations,
      this.filter.categories,
      this.filter.types,
      this.filter.cities,
      this.filter.bedroomsMin,
      this.filter.bedroomsMax,
      this.filter.toiletsMin,
      this.filter.toiletsMax,
      this.filter.garageMin,
      this.filter.garageMax,
      this.filter.priceType,
      this.filter.priceMin,
      this.filter.priceMax,
      this.filter.sizeType,
      this.filter.sizeMin,
      this.filter.sizeMax,
      this.filter.featured === false ? undefined : this.filter.featured
    ).subscribe(resolvedPromise => {

      this.filterCache = JSON.parse(JSON.stringify(this.filter));

      this.isFiltering = 
        this.filterCache.categories.length > 0 || 
        this.filterCache.locations.length > 0 || 
        this.filterCache.types.length > 0 || 
        this.filterCache.cities.length > 0;

      this.filterCounters = resolvedPromise.counters;
      let newProperties = resolvedPromise.data;

      if (reset) {
        setTimeout(() => {
          this.canResetAgain = true;
        }, 5000);
      }

      if (newProperties.length > 0 && this._propertyList.length > 0 && page > 1) { // new properties loaded
        newProperties.forEach(_new => {
          this._propertyList.push(_new);
        });
        if (newProperties.length < 12) {
          this.dataEmitter.emit({ data: this._propertyList, loading: false, noMoreProperties: true, isFiltering: this.isFiltering });
        } else {
          this.dataEmitter.emit({ data: this._propertyList, loading: false, noMoreProperties: false, isFiltering: this.isFiltering });
        }
      } else if (!page) { // first call filter or new parameters
        this._propertyList = newProperties;
        if (newProperties.length < 12) {
          this.dataEmitter.emit({ data: this._propertyList, loading: false, noMoreProperties: true, firstCall: firstCall, isFiltering: this.isFiltering });
        } else {
          this.dataEmitter.emit({ data: this._propertyList, loading: false, noMoreProperties: false, firstCall: firstCall, isFiltering: this.isFiltering });
        }
      } else if (page && loadMore && newProperties.length === 0) { // no more properties to show
        this.dataEmitter.emit({ data: this._propertyList, loading: false, noMoreProperties: true, isFiltering: this.isFiltering });
      }

      this.handleCounters();

    });

  }

}
