import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Property } from "src/app/models/Property";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Globals } from 'src/app/globals';
import { LocationService } from 'src/app/services/location.service';
import { TypeService } from 'src/app/services/type.service';
import { TagService } from 'src/app/services/tag.service';
import { Category } from 'src/app/models/category';
import { Location } from 'src/app/models/location';
import { Type } from 'src/app/models/type';
import { Tag } from 'src/app/models/tag';
import { ToastrService } from 'ngx-toastr';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { PropertyService } from 'src/app/services/property.service';
import { AuthService } from 'src/app/admin/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { environment } from 'src/environments/environment';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';


@Component({
  selector: 'app-properties-post',
  templateUrl: './properties-post.component.html',
  styleUrls: ['./properties-post.component.scss']
})
export class PropertiesPostComponent implements OnInit {

  categoryList
  locationList
  typeList
  tagList
  cityList

  loading
  loadingCategory
  loadingLocation
  loadingType
  loadingTag
  loadingCity
  loadingImages
  loadingFullscreen

  propertyForm
  priceRadioValue = '1'
  submitted = false
  property
  propertyData
  propertyImages = []
  propertySaved

  isChange
  propertyChangeData

  uploadImages: BehaviorSubject<boolean> = new BehaviorSubject(false);
  retryUpload: BehaviorSubject<boolean> = new BehaviorSubject(false);
  propertySavedId: BehaviorSubject<string> = new BehaviorSubject('undefined');
  uploadImagesCounter = 0
  uploadedImages
  uploaderProgress
  allImagesOk = true

  url

  constructor(
    private GLOBALS: Globals,
    private titleService: Title,
    private toastr: ToastrService,
    private config: NgSelectConfig,
    private router: Router,
    private authService: AuthService,
    private propertyService: PropertyService,
    private categoryService: CategoryService,
    private locationService: LocationService,
    private cityService: CityService,
    private imageService: ImageService,
    private typeService: TypeService,
    private tagService: TagService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Cadastrar Imóvel');
    this.property = new Property();
    this.propertyChangeData = new Property();
    this.url = environment.baseUri.mongo;
    this.uploadedImages = [];
  }

  get f() { return this.propertyForm.controls; }

  ngOnInit() {
    this.getData();
    this.setValidationForm();
    this.checkIfIsChange();
  }

  checkIfIsChange() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.loading = true;
        this.isChange = true;
        this.propertyChangeData.images = [];
        this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Editar Imóvel');
        this.propertyService.getProperty(params['id']).subscribe(resolvedPromise => {
          this.propertyChangeData = resolvedPromise.data;
          this.propertyChangeData._id = params['id'];
          console.log('this.propertyChangeData', this.propertyChangeData);
          this.propertyForm.controls['title'].setValue(this.propertyChangeData.title);
          this.propertyForm.controls['description'].setValue(this.propertyChangeData.description);
          this.propertyForm.controls['address'].setValue(this.propertyChangeData.address);
          this.propertyForm.controls['bedrooms'].setValue(this.propertyChangeData.bedrooms);
          this.propertyForm.controls['toilets'].setValue(this.propertyChangeData.toilets);
          this.propertyForm.controls['garage'].setValue(this.propertyChangeData.garage);
          this.propertyForm.controls['size'].setValue(this.propertyChangeData.size);
          this.propertyForm.controls['categories'].setValue(this.propertyChangeData.categories);
          this.propertyForm.controls['locations'].setValue(this.propertyChangeData.locations);
          this.propertyForm.controls['tags'].setValue(this.propertyChangeData.tags);
          this.propertyForm.controls['types'].setValue(this.propertyChangeData.types);
          this.propertyForm.controls['city'].setValue(this.propertyChangeData.city);
          this.propertyForm.controls['geolocation'].setValue(this.propertyChangeData.geolocation);
          this.propertyForm.controls['priceRadio'].setValue(this.propertyChangeData.priceNumber > 0 ? '1' : '2');
          this.propertyForm.controls['priceNumber'].setValue(this.propertyChangeData.priceNumber);
          this.propertyForm.controls['priceCustom'].setValue(this.propertyChangeData.priceCustom);
          this.propertyForm.controls['active'].setValue(this.propertyChangeData.active);
          this.propertyForm.controls['featured'].setValue(this.propertyChangeData.featured);
          this.propertyForm.controls['advise'].setValue(this.propertyChangeData.advise);
          this.property.data.active = this.propertyChangeData.active;
          this.property.data.featured = this.propertyChangeData.featured;
          if (this.propertyChangeData.priceNumber > 0) {
            this.priceRadioValue = '1';
            this.propertyForm.controls['priceCustom'].disable();
            this.propertyForm.controls['priceNumber'].enable();
          } else {
            this.priceRadioValue = '2';
            this.propertyForm.controls['priceNumber'].disable();
            this.propertyForm.controls['priceCustom'].enable();
          }
          this.loading = false;
        }, (error) => {
          console.log('error', error);
          this.toastr.error('Imóvel não encontrado no banco de dados!');
          this.router.navigate(['/area-logada/imoveis']);
        });
      }
    });
  }

  getData() {
    forkJoin([
      this.categoryService.getCategories(),
      this.locationService.getLocations(),
      this.typeService.getTypes(),
      this.tagService.getTags(),
      this.cityService.getCities()
    ]).subscribe(resolvedPromises => {
      this.categoryList = resolvedPromises[0].data;
      this.locationList = resolvedPromises[1].data;
      this.typeList = resolvedPromises[2].data;
      this.tagList = resolvedPromises[3].data;
      this.cityList = resolvedPromises[4].data;
    }, (error) => {
      console.log(error);
    });
  }

  setValidationForm() {
    this.propertyForm = new FormGroup({
      'title': new FormControl(this.property.data.title, [Validators.required]),
      'description': new FormControl(this.property.data.description, [Validators.required]),
      'address': new FormControl(this.property.data.address, null),
      'bedrooms': new FormControl(this.property.data.bedrooms, null),
      'toilets': new FormControl(this.property.data.toilets, null),
      'garage': new FormControl(this.property.data.garage, null),
      'size': new FormControl(this.property.data.size, null),
      'categories': new FormControl(this.property.data.categories, [Validators.required]),
      'locations': new FormControl(this.property.data.locations, [Validators.required]),
      'types': new FormControl(this.property.data.types, [Validators.required]),
      'tags': new FormControl(this.property.data.tags, [Validators.required]),
      'city': new FormControl(this.property.data.city, [Validators.required]),
      'geolocation': new FormControl(this.property.data.geolocation, null),
      'priceRadio': new FormControl(this.priceRadioValue),
      'priceNumber': new FormControl({ 'value': this.property.data.priceNumber, 'disabled': this.priceRadioValue == '2' }, [Validators.required]),
      'priceCustom': new FormControl({ 'value': this.property.data.priceCustom, 'disabled': this.priceRadioValue == '1' }, [Validators.required]),
      'active': new FormControl(this.property.data.active),
      'featured': new FormControl(this.property.data.featured),
      'advise': new FormControl(this.property.data.advise)
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

  addTag = (name) => {
    return new Promise((resolve) => {
      this.loadingTag = true;
      let tag = new Tag();
      tag.data.description = name;
      this.tagService.createTag(tag.data).subscribe((resolvedPromise: any) => {
        resolve(resolvedPromise.result);
        this.toastr.success('Tag adicionada com sucesso!');
        this.loadingTag = false;
      }, (error) => {
        if (error.type == 'unique') {
          this.toastr.error(this.GLOBALS.STRING_TEXT_DUPLICATE_ITEM);
        } else {
          this.toastr.error(error.message);
        }
        this.loadingTag = false;
      })
    })
  }

  addCity = (name) => {
    return new Promise((resolve) => {
      this.loadingCity = true;
      let city = new City();
      city.data.description = name;
      this.cityService.createCity(city.data).subscribe((resolvedPromise: any) => {
        resolve(resolvedPromise.result);
        this.toastr.success('Cidade adicionada com sucesso!');
        this.loadingCity = false;
      }, (error) => {
        if (error.type == 'unique') {
          this.toastr.error(this.GLOBALS.STRING_TEXT_DUPLICATE_ITEM);
        } else {
          this.toastr.error(error.message);
        }
        this.loadingCity = false;
      })
    })
  }

  addImage(data) {
    if (data.success) {
      this.propertyImages.push(data.result._id);
      if (this.uploaderProgress === 100) {
        this.loadingImages = false;
        this.updatePropertyImages();
      }
    } else {
      this.allImagesOk = false;
      this.loadingImages = false;
      this.toastr.error('Ocorreu um erro no envio de uma imagem!');
    }
  }

  removeImage(image) {
    this.imageService.removeImage(image).then((res: any) => {
      if (res.success) {
        this.removeImageFromProperty(image);
      }
    }).catch((error) => {
      this.toastr.error('Ocorreu um erro ao excluir a imagem selecionada!');
    })
  }

  uploaderData(data) {
    if (data.queue) {
      this.uploadImagesCounter = data.queue.length;
    } else {
      this.uploaderProgress = data;
    }
  }

  updatePropertyImages() {
    if (this.isChange) {
      this.propertyImages = this.propertyImages.concat(this.propertyChangeData.images);
    }
    this.propertyService.updatePropertyImages(this.propertySaved._id, this.propertyImages).subscribe((res: any) => {
      if (res.success) {
        this.allImagesOk = true;
      }
    }, (error) => {
      console.log('error', error);
      this.allImagesOk = false;
      this.toastr.error('Ocorreu um erro ao cadastrar as imagens!');
    }, () => {
      if (!this.isChange) {
        this.toastr.success('Imóvel cadastrado com sucesso!');
      } else {
        this.toastr.success('Imóvel atualizado com sucesso!');
      }
      this.router.navigate(['/area-logada/imoveis']);
    });
  }

  removeImageFromProperty(image) {
    let index = this.propertyChangeData.images.indexOf(image);
    if (index > -1) {
      this.propertyChangeData.images.splice(index, 1);
    }
    this.propertyService.updatePropertyImages(this.propertyChangeData._id, this.propertyChangeData.images).subscribe((res: any) => {
      this.toastr.success('Imagem removida com sucesso!');
    }, (error) => {
      console.log('error', error);
      this.toastr.error('Ocorreu um erro ao excluir a imagem!');
    });
  }

  getBackgroundImage(image) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.url + '/' + image})`);
  }

  openImage(image) {
    window.open(this.url + '/' + image, "_blank");
  }

  droppedFile(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.propertyChangeData.images, event.previousIndex, event.currentIndex);
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
    this.propertyData = this.propertyForm.value;
    this.propertyData.user = this.authService.getUserId(this.authService.getToken());
    if (!this.isChange) {
      if (this.allImagesOk) {
        this.loadingFullscreen = true;
        this.propertyService.createProperty(this.propertyData).subscribe((res: any) => {
          if (res.success) {
            this.propertySaved = res.result;
            this.propertySavedId.next(this.propertySaved._id);
            if (this.uploadImagesCounter > 0) {
              this.uploadImages.next(true);
              this.loadingImages = true;
            } else {
              this.toastr.success('Imóvel cadastrado com sucesso!');
              this.router.navigate(['/area-logada/imoveis']);
            }
          }
        }, (error) => {
          console.log('error', error);
          this.toastr.error('Ocorreu um erro ao cadastrar o imóvel!');
        }, () => {
          this.loadingFullscreen = false;
        });
      } else {
        this.retryUpload.next(true);
      }
    } else {
      if (this.allImagesOk) {
        this.propertyData.images = this.propertyImages.concat(this.propertyChangeData.images);
        console.log(this.propertyData);
        this.loadingFullscreen = true;
        this.propertyService.updateProperty(this.propertyChangeData._id, this.propertyData).subscribe((res: any) => {
          if (res.success) {
            this.propertySaved = res.result;
            this.propertySavedId.next(this.propertySaved._id);
            if (this.uploadImagesCounter > 0) {
              this.uploadImages.next(true);
              this.loadingImages = true;
            } else {
              this.toastr.success('Imóvel atualizado com sucesso!');
              this.router.navigate(['/area-logada/imoveis']);
            }
          }
        }, (error) => {
          console.log('error', error);
          this.toastr.error('Ocorreu um erro ao atualizar o imóvel!');
        }, () => {
          this.loadingFullscreen = false;
        });
      } else {
        this.retryUpload.next(true);
      }
    }
  }

}
