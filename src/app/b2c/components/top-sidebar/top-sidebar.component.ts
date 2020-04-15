import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { LocationService } from 'src/app/services/location.service';
import { TypeService } from 'src/app/services/type.service';
import { UsefullService } from 'src/app/services/usefull.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CityService } from 'src/app/services/city.service';
declare let fbq:Function;
declare let gtag:Function;
declare let Tawk_API:Function;

@Component({
  selector: 'app-top-sidebar',
  templateUrl: './top-sidebar.component.html',
  styleUrls: ['./top-sidebar.component.scss']
})
export class TopSidebarComponent implements OnInit {

  loading
  whatsAppAdvise

  categoryList
  locationList
  typeList
  cityList

  selectedSubNav

  searchTerm

  constructor(
    private categoryService: CategoryService,
    private locationService: LocationService,
    private typeService: TypeService,
    private cityService: CityService,
    private router: Router,
    private toastr: ToastrService,
    public usefullService: UsefullService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.whatsAppAdvise = false;
    forkJoin([
      this.categoryService.categorySubject,
      this.locationService.locationSubject,
      this.typeService.typeSubject,
      this.cityService.citySubject
    ]).subscribe(resolvedPromises => {
      this.categoryList = this.usefullService.orderByLocale(resolvedPromises[0], 'description');
      this.locationList = this.usefullService.orderByLocale(resolvedPromises[1], 'description');
      this.typeList = this.usefullService.orderByLocale(resolvedPromises[2], 'description');
      this.cityList = this.usefullService.orderByLocale(resolvedPromises[3], 'description');
      this.whatsAppAdvise = true;
    }, (error) => {
      console.log(error);
    }, () => {
      this.loading = false;
    });

    // Set Active Subnav Menu
    this.usefullService.menuSubject.subscribe(res => {
      this.selectedSubNav = res;
    });
  }

  search() {
    if (this.searchTerm && this.searchTerm !== '') {
      this.router.navigate(['/buscar', this.searchTerm]);
    } else {
      this.toastr.warning('Você deve preencher o campo de busca para realizar uma pesquisa.', 'Atenção')
    }
  }

  openWhatsApp() {
    window.open('https://wa.me/5555999225333', '_blank');
  }

  openChat() {
    (<any>$('#contactModal')).modal('hide');
    (<any>Tawk_API).toggle();
  }

  trackWhatsApp() {
    gtag('event', 'conversion', {
      'send_to': 'AW-1026588755/-QfXCOOThMQBENOAwukD',
      'currency': 'BRL'
    });
    fbq('track', 'WhatsAppClick');
  }

  trackChat() {
    gtag('event', 'conversion', {
      'send_to': 'AW-1026588755/-QfXCOOThMQBENOAwukD',
      'currency': 'BRL'
    });
    fbq('track', 'ChatClick');
  }

  trackMessenger() {
    gtag('event', 'conversion', {
      'send_to': 'AW-1026588755/-QfXCOOThMQBENOAwukD',
      'currency': 'BRL'
    });
    fbq('track', 'MessengerClick');
  }

}
