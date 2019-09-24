import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Property } from "src/app/models/Property";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Globals } from 'src/app/globals';
import { LocationService } from 'src/app/services/location.service';
import { TypeService } from 'src/app/services/type.service';
import { Category } from 'src/app/models/category';
import { Location } from 'src/app/models/location';
import { Type } from 'src/app/models/type';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-properties-post',
  templateUrl: './properties-post.component.html',
  styleUrls: ['./properties-post.component.scss']
})
export class PropertiesPostComponent implements OnInit {

  categoryList
  locationList
  typeList

  loading
  loadingCategory
  loadingLocation
  loadingType

  propertyForm
  priceRadioValue = '1'
  submitted = false
  property

  constructor(
    private GLOBALS: Globals,
    private titleService: Title,
    private toastr: ToastrService,
    private config: NgSelectConfig,
    private categoryService: CategoryService,
    private locationService: LocationService,
    private typeService: TypeService
  ) {
    this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Cadastrar Propriedade');
    this.config.notFoundText = this.GLOBALS.STRING_TEXT_NOT_FOUND;
    this.property = new Property();
  }

  get f() { return this.propertyForm.controls; }

  ngOnInit() {
    this.getData();
    this.setValidationForm();
  }

  getData() {
    this.loading = true;
    forkJoin([
      this.categoryService.getCategories(),
      this.locationService.getLocations(),
      this.typeService.getTypes()
    ]).subscribe(resolvedPromises => {
      this.categoryList = resolvedPromises[0].data;
      this.locationList = resolvedPromises[1].data;
      this.typeList = resolvedPromises[2].data;
    }, (error) => {
      console.log(error);
    }, ()=> {
      this.loading = false;
    });
  }

  setValidationForm() {
    this.propertyForm = new FormGroup({
      'title': new FormControl(this.property.data.title, [Validators.required]),
      'description': new FormControl(this.property.data.description, [Validators.required]),
      'categories': new FormControl(this.property.data.categories, [Validators.required]),
      'locations': new FormControl(this.property.data.locations, [Validators.required]),
      'types': new FormControl(this.property.data.types, [Validators.required]),
      'city': new FormControl(this.property.data.city, [Validators.required]),
      'priceRadio': new FormControl(this.priceRadioValue),
      'priceNumber': new FormControl({ 'value': this.property.data.priceNumber, 'disabled': this.priceRadioValue == '2' }, [Validators.required]),
      'priceCustom': new FormControl({ 'value': this.property.data.priceCustom, 'disabled': this.priceRadioValue == '1' }, [Validators.required]),
      'active': new FormControl(this.property.data.active)
    });
  }

  addCategory = (name) => {
    return new Promise((resolve) => {
      this.loadingCategory = true;
      let category = new Category();
      category.data.description = name;
      this.categoryService.createCategory(category.data).subscribe((resolvedPromise: any) => {
        resolve(resolvedPromise.result);
        this.toastr.success('Categoria adicionada com sucesso!');
        this.loadingCategory = false;
      }, (error) => {
        if (error.type == 'unique') {
          this.toastr.error(this.GLOBALS.STRING_TEXT_DUPLICATE_ITEM);
        } else {
          this.toastr.error(error.message);
        }
        this.loadingCategory = false;
      })
    })
  }

  addLocation = (name) => {
    return new Promise((resolve) => {
      this.loadingLocation = true;
      let location = new Location();
      location.data.description = name;
      this.locationService.createLocation(location.data).subscribe((resolvedPromise: any) => {
        resolve(resolvedPromise.result);
        this.toastr.success('Localização adicionada com sucesso!');
        this.loadingLocation = false;
      }, (error) => {
        if (error.type == 'unique') {
          this.toastr.error(this.GLOBALS.STRING_TEXT_DUPLICATE_ITEM);
        } else {
          this.toastr.error(error.message);
        }
        this.loadingLocation = false;
      })
    })
  }

  addType = (name) => {
    return new Promise((resolve) => {
      this.loadingType = true;
      let type = new Type();
      type.data.description = name;
      this.typeService.createType(type.data).subscribe((resolvedPromise: any) => {
        resolve(resolvedPromise.result);
        this.toastr.success('Tipo adicionado com sucesso!');
        this.loadingType = false;
      }, (error) => {
        if (error.type == 'unique') {
          this.toastr.error(this.GLOBALS.STRING_TEXT_DUPLICATE_ITEM);
        } else {
          this.toastr.error(error.message);
        }
        this.loadingType = false;
      })
    })
  }

  priceRadioChanged() {
    if (this.propertyForm.controls.priceRadio.value == '1') {
      this.propertyForm.get('priceCustom').disable();
      this.propertyForm.get('priceNumber').enable();
    } else {
      this.propertyForm.get('priceNumber').disable();
      this.propertyForm.get('priceCustom').enable();
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.propertyForm.invalid) {
      return;
    }
    console.log('Submited!', this.propertyForm.value);
  }

}
