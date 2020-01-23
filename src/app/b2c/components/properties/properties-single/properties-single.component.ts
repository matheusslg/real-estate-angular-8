import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Globals } from 'src/app/globals';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { Property } from 'src/app/models/Property';
import { environment } from 'src/environments/environment';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { UsefullService } from 'src/app/services/usefull.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-properties-single',
  templateUrl: './properties-single.component.html',
  styleUrls: ['./properties-single.component.scss']
})
export class PropertiesSingleComponent implements OnInit {

  loading

  property
  preUrlImages

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  whatsAppMessage

  constructor(
    private GLOBALS: Globals,
    private titleService: Title,
    private toastr: ToastrService,
    private router: Router,
    private propertyService: PropertyService,
    private activatedRoute: ActivatedRoute,
    private usefullService: UsefullService,
    private sanitizer: DomSanitizer,
    private location: Location,
    private deviceService: DeviceDetectorService
  ) {
    this.property = new Property();
    this.preUrlImages = environment.baseUri.mongo;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.loading = true;
        this.propertyService.getProperty(params['id']).subscribe(resolvedPromise => {
          if (!resolvedPromise.data) {
            this.redirect();
          } else {
            this.loading = false;
            this.property = resolvedPromise.data;

            this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - ' + this.property.title);
            this.whatsAppMessage = encodeURIComponent('Olá, você poderia me passar mais informações sobre o imóvel "' + this.property.title + '" localizado em ' + (this.property.address ? this.property.address : this.property.city) + ' que vi no site? (' + this.GLOBALS.SYSTEM_URL + 'imoveis/' + this.property._id + ')');

            if (this.deviceService.isDesktop()) {
              this.usefullService.scrollTo();
            } else {
              setTimeout(() => {
                this.usefullService.scrollTo('#backButton');
              }, 0);
            }

            this.galleryOptions = [
              {
                width: '100%',
                height: '600px',
                thumbnailsColumns: 6,
                imageAnimation: NgxGalleryAnimation.Slide,
                previewCloseOnClick: true,
                previewCloseOnEsc: true,
                previewZoom: true
              },
              {
                breakpoint: 990,
                width: '100%',
                height: '450px',
                thumbnailsColumns: 4,
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 10,
                thumbnailMargin: 5,
                previewCloseOnClick: false,
                previewCloseOnEsc: false,
                previewZoom: true,
                imageSwipe: true,
                thumbnailsSwipe: true,
                previewSwipe: true
              }
            ];

            this.galleryImages = [];
            this.property.images.forEach(_image => {
              this.galleryImages.push({
                small: this.preUrlImages + '/' + _image.filePath,
                medium: this.preUrlImages + '/' + _image.filePath,
                big: this.preUrlImages + '/' + _image.filePath
              })
            });

          }
        }, (error) => {
          console.log('error', error);
          this.redirect();
        });
      }
    });
  }

  redirect() {
    this.toastr.error('Imóvel não encontrado no banco de dados!');
    this.router.navigate(['/']);
  }

}
