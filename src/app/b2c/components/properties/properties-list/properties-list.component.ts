import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PropertyService } from '../../../../services/property.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Globals } from 'src/app/globals';
import { NormalizeStringPipe } from 'src/app/b2c/pipes/normalize-string.pipe';
import { CategoryService } from 'src/app/services/category.service';
import { LocationService } from 'src/app/services/location.service';
import { TypeService } from 'src/app/services/type.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { UsefullService } from 'src/app/services/usefull.service';
import { CityService } from 'src/app/services/city.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit {

  @Output() propertyListEmitter = new EventEmitter()
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
        if (this.propertiesPageNumber === 1) {
          this.usefullService.scrollTo('#cardBody');
        }
        if (this._filterData.noMoreProperties === true) {
          this.noMoreProperties = true;
          this.noMorePropertiesToShow();
        } else if (this._filterData.data && this._filterData.data.length === 0) {
          this.noMoreProperties = true;
        } else {
          this.noMoreProperties = false;
        }
      }
    }
  }
  get filterData() { return this._filterData; }

  loading
  propertyList
  propertyFeaturedList
  cardTitle
  selectedFilter = {
    data: null,
    type: null
  }

  preUrlImages

  propertiesListNumber = 12
  propertiesLimitNumber
  propertiesSkipNumber
  propertiesPageNumber
  seeMoreCounter = 0
  noMoreProperties = false

  categoryList
  locationList
  typeList
  cityList

  routerParams

  constructor(
    private propertyService: PropertyService,
    private categoryService: CategoryService,
    private locationService: LocationService,
    private typeService: TypeService,
    private cityService: CityService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private GLOBALS: Globals,
    private normalizeString: NormalizeStringPipe,
    private toastr: ToastrService,
    public usefullService: UsefullService
  ) {
    this.preUrlImages = environment.baseUri.mongo;
    this.cardTitle = 'Imóveis';
  }

  ngOnInit() {
    this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE);
    this.propertiesLimitNumber = this.propertiesListNumber;
    this.propertiesSkipNumber = 0;
    this.propertiesPageNumber = 1;

    // When route changes
    this.activatedRoute.params.subscribe(params => {
      this.routerParams = params['description'];
      // Executes every time that user goes back to Home Page to reset propertyList
      if (!this.routerParams) {
        this.propertyService.getPropertiesActive(this.propertiesLimitNumber, this.propertiesSkipNumber).subscribe(resolvedPromise => {
          this.propertyList = resolvedPromise.data;
          this.propertyListEmitter.emit({ res: this.propertyList });
        }, (error) => {
          console.log(error);
        }, () => {
          this.loading = false;
        });
      } else {
        this.executeFiltering();
      }
    });

    // Executes only when load first time Home Page
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

      this.activatedRoute.params.subscribe(params => {
        this.routerParams = params['description'];
        if (this.routerParams) {
          this.executeFiltering();
        }
      });

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
          this.selectedFilter.data = _category;
          this.selectedFilter.type = 'category';
          this.resetSeeMoreData();
          this.loading = true;
          this.propertyService.getPropertiesByCategory(_category._id, this.propertiesLimitNumber, this.propertiesSkipNumber).subscribe((resolvedPromise) => {
            this.propertyList = resolvedPromise.data;
            this.loading = false;
            this.usefullService.scrollTo('#cardBody');
          });
        }
      });

      this.locationList.forEach(_location => {
        if (this.normalizeString.transform(_location.description) == this.routerParams) {
          this.selectedFilter.data = _location;
          this.selectedFilter.type = 'location';
          this.resetSeeMoreData();
          this.loading = true;
          this.propertyService.getPropertiesByLocation(_location._id, this.propertiesLimitNumber, this.propertiesSkipNumber).subscribe((resolvedPromise) => {
            this.propertyList = resolvedPromise.data;
            this.loading = false;
            this.usefullService.scrollTo('#cardBody');
          });
        }
      });

      this.typeList.forEach(_type => {
        if (this.normalizeString.transform(_type.description) == this.routerParams) {
          this.selectedFilter.data = _type;
          this.selectedFilter.type = 'type';
          this.resetSeeMoreData();
          this.loading = true;
          this.propertyService.getPropertiesByType(_type._id, this.propertiesLimitNumber, this.propertiesSkipNumber).subscribe((resolvedPromise) => {
            this.propertyList = resolvedPromise.data;
            this.loading = false;
            this.usefullService.scrollTo('#cardBody');
          });
        }
      });

      this.cityList.forEach(_city => {
        if (this.normalizeString.transform(_city.description) == this.routerParams) {
          this.selectedFilter.data = _city;
          this.selectedFilter.type = 'city';
          this.resetSeeMoreData();
          this.loading = true;
          this.propertyService.getPropertiesByCity(_city._id, this.propertiesLimitNumber, this.propertiesSkipNumber).subscribe((resolvedPromise) => {
            this.propertyList = resolvedPromise.data;
            this.loading = false;
            this.usefullService.scrollTo('#cardBody');
          });
        }
      });

      this.cardTitle = 'Filtrando por: ' + this.selectedFilter.data.description;

    }
  }

  resetSeeMoreData() {
    this.propertiesSkipNumber = 0;
    this.propertiesPageNumber = 1;
    this.seeMoreCounter = 0;
    this.noMoreProperties = false;
  }

  noMorePropertiesToShow() {
    this.toastr.warning('Não há mais imóveis para serem mostrados.', 'Aviso');
  }

  seeMore() {
    console.log('See More Triggered');
    if (this._filterData) {
      // call more properties from filter
      this.propertiesPageNumber++;
      this.filterCall.emit({ page: this.propertiesPageNumber, loadMore: true });
    } else if (!this.routerParams) {
      this.seeMoreCounter++;
      if (this.seeMoreCounter != 1) {
        this.propertiesSkipNumber = this.propertiesLimitNumber + this.propertiesSkipNumber;
      } else {
        this.propertiesSkipNumber = this.propertiesLimitNumber;
      }
      if (!this.noMoreProperties) {
        this.loading = true;
        this.propertyService.getPropertiesActive(this.propertiesLimitNumber, this.propertiesSkipNumber).subscribe((resolvedPromise: any) => {
          let newProperties = resolvedPromise.data;
          if (newProperties.length == 0) {
            this.noMoreProperties = true;
            this.noMorePropertiesToShow();
          } else {
            newProperties.forEach(_property => {
              this.propertyList.push(_property);
            });
          }
          this.loading = false;
        })
      }
    } else {
      switch (this.selectedFilter.type) {
        case 'category':
          this.seeMoreCounter++;
          if (this.seeMoreCounter != 1) {
            this.propertiesSkipNumber = this.propertiesLimitNumber + this.propertiesSkipNumber;
          } else {
            this.propertiesSkipNumber = this.propertiesLimitNumber;
          }
          if (!this.noMoreProperties) {
            this.loading = true;
            this.propertyService.getPropertiesByCategory(this.selectedFilter.data._id, this.propertiesLimitNumber, this.propertiesSkipNumber).subscribe((resolvedPromise: any) => {
              let newProperties = resolvedPromise.data;
              if (newProperties.length == 0) {
                this.noMoreProperties = true;
                this.noMorePropertiesToShow();
              } else {
                newProperties.forEach(_property => {
                  this.propertyList.push(_property);
                });
              }
              this.loading = false;
            })
          }
          break;
        case 'location':
          this.seeMoreCounter++;
          if (this.seeMoreCounter != 1) {
            this.propertiesSkipNumber = this.propertiesLimitNumber + this.propertiesSkipNumber;
          } else {
            this.propertiesSkipNumber = this.propertiesLimitNumber;
          }
          if (!this.noMoreProperties) {
            this.loading = true;
            this.propertyService.getPropertiesByLocation(this.selectedFilter.data._id, this.propertiesLimitNumber, this.propertiesSkipNumber).subscribe((resolvedPromise: any) => {
              let newProperties = resolvedPromise.data;
              if (newProperties.length == 0) {
                this.noMoreProperties = true;
                this.noMorePropertiesToShow();
              } else {
                newProperties.forEach(_property => {
                  this.propertyList.push(_property);
                });
              }
              this.loading = false;
            })
          }
          break;
        case 'type':
          this.seeMoreCounter++;
          if (this.seeMoreCounter != 1) {
            this.propertiesSkipNumber = this.propertiesLimitNumber + this.propertiesSkipNumber;
          } else {
            this.propertiesSkipNumber = this.propertiesLimitNumber;
          }
          if (!this.noMoreProperties) {
            this.loading = true;
            this.propertyService.getPropertiesByType(this.selectedFilter.data._id, this.propertiesLimitNumber, this.propertiesSkipNumber).subscribe((resolvedPromise: any) => {
              let newProperties = resolvedPromise.data;
              if (newProperties.length == 0) {
                this.noMoreProperties = true;
                this.noMorePropertiesToShow();
              } else {
                newProperties.forEach(_property => {
                  this.propertyList.push(_property);
                });
              }
              this.loading = false;
            })
          }
          break;
        case 'city':
          this.seeMoreCounter++;
          if (this.seeMoreCounter != 1) {
            this.propertiesSkipNumber = this.propertiesLimitNumber + this.propertiesSkipNumber;
          } else {
            this.propertiesSkipNumber = this.propertiesLimitNumber;
          }
          if (!this.noMoreProperties) {
            this.loading = true;
            this.propertyService.getPropertiesByCity(this.selectedFilter.data._id, this.propertiesLimitNumber, this.propertiesSkipNumber).subscribe((resolvedPromise: any) => {
              let newProperties = resolvedPromise.data;
              if (newProperties.length == 0) {
                this.noMoreProperties = true;
                this.noMorePropertiesToShow();
              } else {
                newProperties.forEach(_property => {
                  this.propertyList.push(_property);
                });
              }
              this.loading = false;
            })
          }
          break;
      }
    }
  }

}
