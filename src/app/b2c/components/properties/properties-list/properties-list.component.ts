import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../../../services/property.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Globals } from 'src/app/globals';
import { NormalizeStringPipe } from 'src/app/b2c/pipes/normalize-string.pipe';
import { FilterPropertiesPipe } from 'src/app/b2c/pipes/filter-properties.pipe';
import { forkJoin } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { LocationService } from 'src/app/services/location.service';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit {

  loading
  propertyList
  filterValue
  cardTitle
  selectedFilter

  preUrlImages

  constructor(
    private propertyService: PropertyService,
    private categoryService: CategoryService,
    private locationService: LocationService,
    private typeService: TypeService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private GLOBALS: Globals,
    private normalizeString: NormalizeStringPipe,
    private filterProperties: FilterPropertiesPipe
  ) {
    this.preUrlImages = environment.baseUri.mongo;
    this.cardTitle = 'Todos os imóveis';
  }

  ngOnInit() {
    this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE);
    this.loading = true;
    this.propertyService.getProperties().subscribe((resolvedPromise) => {
      this.propertyList = resolvedPromise.data;
      this.checkIfIsFilter();
      this.loading = false;
    })
  }

  checkIfIsFilter() {
    this.activatedRoute.params.subscribe(params => {
      this.filterValue = [];
      let description = params['description'];
      if (description) {
        this.filterValue.push(description);
        this.propertyList.forEach(_property => {
          _property.categories.forEach(_category => {
            if (this.normalizeString.transform(_category.description) == description) {
              this.selectedFilter = _category;
            }
          });
          _property.locations.forEach(_location => {
            if (this.normalizeString.transform(_location.description) == description) {
              this.selectedFilter = _location;
            }
          });
          _property.types.forEach(_types => {
            if (this.normalizeString.transform(_types.description) == description) {
              this.selectedFilter = _types;
            }
          });
        });
        if (this.filterProperties.transform(this.propertyList, this.filterValue).length == 0) {
          this.loading = true;
          forkJoin([
            this.categoryService.getCategories(),
            this.locationService.getLocations(),
            this.typeService.getTypes()
          ]).subscribe(resolvedPromises => {
            let categoryList = resolvedPromises[0].data;
            let locationList = resolvedPromises[1].data;
            let typeList = resolvedPromises[2].data;
            categoryList.forEach(_category => {
              if (this.normalizeString.transform(_category.description) == description) {
                this.selectedFilter = _category;
              }
            });
            locationList.forEach(_location => {
              if (this.normalizeString.transform(_location.description) == description) {
                this.selectedFilter = _location;
              }
            });
            typeList.forEach(_type => {
              if (this.normalizeString.transform(_type.description) == description) {
                this.selectedFilter = _type;
              }
            });
            this.cardTitle = 'Filtrando por: ' +this.selectedFilter.description;
          }, (error) => {
            console.log(error);
          }, () => {
            this.loading = false;
          });
          // this.cardTitle = 'Filtrando por: ' + description.charAt(0).toUpperCase() + description.slice(1);
        } else {
          this.cardTitle = 'Filtrando por: ' + this.selectedFilter.description;
        }
      }
    });
  }

  onScroll() {
    console.log('scroll');
  }

}
