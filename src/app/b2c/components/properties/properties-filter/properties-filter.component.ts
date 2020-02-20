import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Filter } from 'src/app/models/filter';
import { LocationService } from 'src/app/services/location.service';
import { CategoryService } from 'src/app/services/category.service';
import { TypeService } from 'src/app/services/type.service';
import { CityService } from 'src/app/services/city.service';
import { PropertyService } from 'src/app/services/property.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-properties-filter',
  templateUrl: './properties-filter.component.html',
  styleUrls: ['./properties-filter.component.scss']
})
export class PropertiesFilterComponent implements OnInit, AfterViewInit {

  @Input() type: String
  @Output() dataEmitter = new EventEmitter();

  propertyListForFilter
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
    if (data && data.page) {
      this._filterCall = data;
      this.callFilter(null, this._filterCall.page, this._filterCall.loadMore);
    }
  }
  get filterCall() { return this._filterCall; }

  filter
  filterCache
  canResetAgain = true

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
  featuredCount = 0;

  constructor(
    private propertyService: PropertyService,
    private locationService: LocationService,
    private categoryService: CategoryService,
    private typeService: TypeService,
    private cityService: CityService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
    this.filter = new Filter();
    this._propertyList = [];
    this.propertyListForFilter = [];
  }

  ngAfterViewInit() {
    // Executes every time that user goes back to a component with PropertiesFilterComponent to get all needed data
    if (!this.loading) {
      this.loading = true;
      this.cdr.detectChanges();
      this.propertyService.getPropertiesActive().subscribe(resolvedPromise => {
        this.propertyListForFilter = resolvedPromise.data;
        this.categoryList = this.categoryService.categoryList;
        this.locationList = this.locationService.locationList;
        this.typeList = this.typeService.typeList;
        this.cityList = this.cityService.cityList;

        this.handleRangeData();
        this.handleItemsCount();
      }, (error) => {
        console.log(error);
      }, () => {
        this.loading = false;
      });
    }
  }

  ngOnInit() {
    this.loading = true;
    forkJoin([
      this.categoryService.categorySubject,
      this.locationService.locationSubject,
      this.typeService.typeSubject,
      this.cityService.citySubject,
      this.propertyService.getPropertiesActive()
    ]).subscribe(resolvedPromises => {
      this.categoryService.categoryList = resolvedPromises[0];
      this.locationService.locationList = resolvedPromises[1];
      this.typeService.typeList = resolvedPromises[2];
      this.cityService.cityList = resolvedPromises[3];

      this.categoryList = this.categoryService.categoryList;
      this.locationList = this.locationService.locationList;
      this.typeList = this.typeService.typeList;
      this.cityList = this.cityService.cityList;
      this.propertyListForFilter = resolvedPromises[4].data;

      this.handleRangeData();
      this.handleItemsCount();
    }, (error) => {
      console.log(error);
    }, () => {
      this.loading = false;
    });
  }

  // NOT IMPLEMENTED
  handleRangeData() {
    this.allCount = 0;
    this.hectareCount = 0;
    this.sojaCount = 0;

    let valuePrices = [];
    let hectarePrices = [];
    let sojaPrices = [];

    this.showPriceRange = false;

    // By Value check
    this.propertyListForFilter.forEach(_property => {
      if (_property.priceNumber > 0) {
        valuePrices.push(_property.priceNumber);
        this.allCount++;
      }
    });
    //this.showPriceRange.all = valuePrices.length > 0 && typeof Math.max.apply(null, valuePrices) === 'number';
    valuePrices.sort((a, b) => a - b);
    valuePrices = valuePrices.filter((el, i, a) => i === a.indexOf(el));
    if (this.filter.priceType === 'all') {
      //this.priceRange.max = Math.max.apply(null, valuePrices);
      this.priceRange.max = 0;
      this.priceRange.min = 0;
      this.priceRange.step = 50000;
      //this.priceRangeChanged({ value: { from: this.priceRange.min, to: this.priceRange.max } });
    }

    // By Hectare check
    this.propertyListForFilter.forEach(_property => {
      this.propertyListForFilter.forEach(_property => {
        if (_property.priceCustom && _property.priceCustom.match(/\d+/g) && _property.priceCustom.indexOf('R$') !== -1) {
          hectarePrices.push(_property.priceCustom.split(',')[0].replace(/[^\w\s]/gi, '').match(/\d+/g).map(Number)[0]);
          this.hectareCount++;
        }
      });
    });
    //this.showPriceRange.hectare = hectarePrices.length > 0 && typeof Math.max.apply(null, hectarePrices) === 'number';
    hectarePrices.sort((a, b) => a - b);
    hectarePrices = hectarePrices.filter((el, i, a) => i === a.indexOf(el));
    if (this.filter.priceType === 'hectare') {
      //this.priceRange.max = Math.max.apply(null, hectarePrices);
      this.priceRange.max = 0;
      this.priceRange.min = 0;
      this.priceRange.step = 50000;
      //this.priceRangeChanged({ value: { from: this.priceRange.min, to: this.priceRange.max } });
    }

    // By Soja check
    this.propertyListForFilter.forEach(_property => {
      if (_property.priceCustom && _property.priceCustom.match(/\d+/g) && _property.priceCustom.indexOf('R$') === -1) {
        sojaPrices.push(_property.priceCustom.replace(/[^\w\s]/gi, '').match(/\d+/g).map(Number)[0]);
        this.sojaCount++;
      }
    });
    //this.showPriceRange.soja = sojaPrices.length > 0 && typeof Math.max.apply(null, sojaPrices) === 'number';
    sojaPrices.sort((a, b) => a - b);
    sojaPrices = sojaPrices.filter((el, i, a) => i === a.indexOf(el));
    if (this.filter.priceType === 'soja') {
      //this.priceRange.max = Math.max.apply(null, sojaPrices);
      this.priceRange.max = 0;
      this.priceRange.min = 0;
      this.priceRange.step = 50000;
      //this.priceRangeChanged({ value: { from: this.priceRange.min, to: this.priceRange.max } });
    }

    this.showPriceRange = true;
  }

  handleItemsCount() {
    this.categoryList = this.categoryService.categoryList;
    this.locationList = this.locationService.locationList;
    this.typeList = this.typeService.typeList;
    this.cityList = this.cityService.cityList;

    this.featuredCount = 0;

    if (this.categoryList && this.locationList && this.typeList && this.cityList) {

      this.categoryList.forEach(_category => {
        this.categoryCount[_category._id] = 0;
      });

      this.locationList.forEach(_location => {
        this.locationCount[_location._id] = 0;
      });

      this.typeList.forEach(_type => {
        this.typeCount[_type._id] = 0;
      });

      this.cityList.forEach(_city => {
        this.cityCount[_city._id] = 0;
      });

      this.propertyListForFilter.forEach(_property => {

        _property.categories.forEach(_category => {
          this.categoryCount[_category._id]++;
        });
        _property.locations.forEach(_category => {
          this.locationCount[_category._id]++;
        });
        _property.types.forEach(_category => {
          this.typeCount[_category._id]++;
        });
        this.cityCount[_property.city._id]++;

        if (_property.featured) {
          this.featuredCount++;
        }

        /*if (_property.priceNumber > 0) {
          this.allCount++;
        } else if (_property.priceCustom && _property.priceCustom.match(/\d+/g) && _property.priceCustom.indexOf('R$') !== -1) {
          this.hectareCount++;
        } else if (_property.priceCustom && _property.priceCustom.match(/\d+/g) && _property.priceCustom.indexOf('R$') === -1) {
          this.sojaCount++;
        } else {
          if (this.filter.priceType == 'hectare' && _property.priceCustom.indexOf('R$') === -1 && _property.priceCustom.indexOf('soja') === -1) {
            _property.locations.forEach(function (_location) {
              if (_location.description.toLowerCase().indexOf('rural') !== -1) {
                this.hectareCount++;
              }
            });
          } else if (this.filter.priceType == 'soja' && _property.priceCustom.indexOf('R$') === -1 && _property.priceCustom.indexOf('soja') === -1) {
            _property.locations.forEach(function (_location) {
              if (_location.description.toLowerCase().indexOf('rural') !== -1) {
                this.sojaCount++;
              }
            });
          } else if (this.filter.priceType == 'all') { // is Urban
            this.allCount++;
          }
        }*/

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
      this.dataEmitter.emit({ resetPageCounter: true });
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

  callFilter(limit?, page?, loadMore?, reset?) {
    this.dataEmitter.emit({ data: null, loading: true });

    this.propertyService.getPropertiesFilter(
      limit ? limit : 12,
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

      this.propertyListForFilter = resolvedPromise.all;
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
        this.dataEmitter.emit({ data: this._propertyList, loading: false, noMoreProperties: false });
      } else if (!page) { // first call filter or new parameters
        this._propertyList = newProperties;
        this.dataEmitter.emit({ data: this._propertyList, loading: false, noMoreProperties: false });
      } else if (page && loadMore && newProperties.length === 0) { // no more properties to show
        this.dataEmitter.emit({ data: this._propertyList, loading: false, noMoreProperties: true });
      }

      this.handleItemsCount();
      this.handleRangeData();
    });
  }

}
