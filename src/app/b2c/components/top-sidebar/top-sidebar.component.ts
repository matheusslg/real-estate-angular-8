import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { LocationService } from 'src/app/services/location.service';
import { TypeService } from 'src/app/services/type.service';
import { UsefullService } from 'src/app/services/usefull.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-top-sidebar',
  templateUrl: './top-sidebar.component.html',
  styleUrls: ['./top-sidebar.component.scss']
})
export class TopSidebarComponent implements OnInit {

  loading

  whatsAppAdvise = true

  categoryList
  locationList
  typeList

  constructor(
    private categoryService: CategoryService,
    private locationService: LocationService,
    private typeService: TypeService,
    public usefullService: UsefullService
  ) { 
    this.whatsAppAdvise = false;
  }

  ngOnInit() {
    this.loading = true;
    forkJoin([
      this.categoryService.categorySubject,
      this.locationService.locationSubject,
      this.typeService.typeSubject
    ]).subscribe(resolvedPromises => {
      this.categoryList = this.usefullService.orderByLocale(resolvedPromises[0].data, 'description');
      this.locationList = this.usefullService.orderByLocale(resolvedPromises[1].data, 'description');
      this.typeList = this.usefullService.orderByLocale(resolvedPromises[2].data, 'description');
    }, (error) => {
      console.log(error);
    }, () => {
      this.whatsAppAdvise = true;
      this.loading = false;
    });
  }

  openWhatsApp() {
    window.open('https://wa.me/5555999225333', '_blank');
  }

}
