import { Component, OnInit } from '@angular/core';
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
import { IImage } from 'ng-simple-slideshow/src/app/modules/slideshow/IImage';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit {

  loading
  propertyList
  propertyFeaturedList
  propertyFeaturedImages: (string | IImage)[] = []
  cardTitle
  selectedFilter = {
    data: null,
    type: null
  }

  preUrlImages

  propertiesListNumber = 8
  propertiesLimitNumber
  propertiesSkipNumber
  scrollCounter = 0
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
    public usefullService: UsefullService
  ) {
    this.preUrlImages = environment.baseUri.mongo;
    this.cardTitle = 'Todos os imóveis';
  }

  ngOnInit() {
    this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE);
    this.propertiesLimitNumber = this.propertiesListNumber;
    this.propertiesSkipNumber = 0;

    // When route changes
    this.activatedRoute.params.subscribe(params => {
      this.routerParams = params['description'];
      // Executes every time that user goes back to Home Page to reset propertyList
      if (!this.routerParams) {
        forkJoin([
          this.propertyService.getPropertiesActive(this.propertiesLimitNumber, this.propertiesSkipNumber),
          this.propertyService.getPropertiesFeatured()
        ]).subscribe(resolvedPromises => {
          this.propertyList = resolvedPromises[0].data;
          this.propertyFeaturedList = resolvedPromises[1].data;
          if (this.propertyFeaturedList.length > 0) {
            this.propertyFeaturedList.forEach(_property => {
              this.propertyFeaturedImages.push({
                url: environment.baseUri.mongo + '/' + _property.images[0].filePath,
                href: environment.baseUri.website + '/imoveis/' + _property._id,
                caption: _property.description
              })
            });
          }
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
          this.resetInfinityScrollData();
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
          this.resetInfinityScrollData();
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
          this.resetInfinityScrollData();
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
          this.resetInfinityScrollData();
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

  resetInfinityScrollData() {
    this.propertiesSkipNumber = 0;
    this.scrollCounter = 0;
    this.noMoreProperties = false;
  }

  onScroll() {
    console.log('Scroll Triggered');
    if (!this.routerParams) {
      this.scrollCounter++;
      if (this.scrollCounter != 1) {
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
          this.scrollCounter++;
          if (this.scrollCounter != 1) {
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
          this.scrollCounter++;
          if (this.scrollCounter != 1) {
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
          this.scrollCounter++;
          if (this.scrollCounter != 1) {
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
          this.scrollCounter++;
          if (this.scrollCounter != 1) {
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
