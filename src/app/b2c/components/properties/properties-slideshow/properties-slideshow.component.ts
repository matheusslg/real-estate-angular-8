import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PropertyDescriptionLimitPipe } from 'src/app/b2c/property-description-limit.pipe';
import { IImage } from 'ng-simple-slideshow/src/app/modules/slideshow/IImage';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-properties-slideshow',
  templateUrl: './properties-slideshow.component.html',
  styleUrls: ['./properties-slideshow.component.scss']
})
export class PropertiesSlideshowComponent implements OnInit {

  loading

  @Output() propertyFeaturedListEmitter = new EventEmitter()
  propertyFeaturedList
  propertyFeaturedImages: (string | IImage)[] = []

  constructor(
    private propertyService: PropertyService,
    private propertyDescriptionLimit: PropertyDescriptionLimitPipe
  ) { }

  ngOnInit() { 
    this.propertyService.getPropertiesFeatured().subscribe((res: any) => {
      this.propertyFeaturedList = res.data;
      if (this.propertyFeaturedList.length > 0) {
        this.propertyFeaturedList.forEach(_property => {
          this.propertyFeaturedImages.push({
            url: environment.baseUri.mongo + '/' + _property.images[0].filePath,
            href: environment.baseUri.website + '/imoveis/' + _property._id,
            caption: this.propertyDescriptionLimit.transform(_property.description)
          })
        });
        this.propertyFeaturedListEmitter.emit(this.propertyFeaturedList);
        setTimeout(() => {
          $('.slideshow-container').addClass('custom-slideshow');
        }, 0)
      }
    }, (error) => {
      console.log(error);
    });
  }

}
