import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Globals } from 'src/app/globals';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from 'src/app/services/location.service';
import { UsefullService } from 'src/app/services/usefull.service';
import { PropertyService } from 'src/app/services/property.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent implements OnInit {

  locationPropertiesCount = []
  locationList
  propertyList
  loadingData
  loadingToggle
  dtOptions

  constructor(
    private GLOBALS: Globals,
    private titleService: Title,
    private toastr: ToastrService,
    private locationService: LocationService,
    private propertyService: PropertyService,
    private usefullService: UsefullService
  ) {
    this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Listagem de Localizações');
  }

  ngOnInit() {
    this.dtOptions = this.GLOBALS.DATATABLES_OPTIONS('Listagem de localizações cadastradas no sistema');
    this.dtOptions.buttons.forEach(element => {
      element.exportOptions.columns = [0, 1, 2];
    });
    this.dtOptions.columnDefs = [{ "width": "10%", "targets": [4, 5] }, { "width": "5%", "targets": 0 }];
    this.refreshTable();
  }

  refreshTable() {
    this.loadingData = true;
    forkJoin([
      this.locationService.getLocations(),
      this.propertyService.getPropertiesActive()
    ]).subscribe(resolvedPromises => {
      this.locationList = this.usefullService.orderByLocale(resolvedPromises[0].data, 'description');
      this.propertyList = resolvedPromises[1].data;
      this.propertiesByLocationCount();
      this.loadingData = false;
    }, (error) => {
      console.log(error);
    });
  }

  propertiesByLocationCount() {
    this.locationList.forEach(_location => {
      this.locationPropertiesCount[_location._id] = 0;
    });
    this.propertyList.forEach(_property => {
      _property.locations.forEach(_location => {
        this.locationPropertiesCount[_location._id]++;
      });
    });
  }

  toggleLocation(location) {
    console.log(location);
    this.loadingToggle = true;
    if (location.active) {
      this.locationService.disableLocation(location._id).subscribe((resolvedPromise: any) => {
        if (resolvedPromise.success) {
          this.toastr.success('Localização desativada com sucesso!');
          this.refreshTable();
        } else {
          this.toastr.error('Ocorreu um erro ao desativar a localização. Contate um administrador para mais informações.');
        }
      }, (error) => {
        this.toastr.error(error.message);
        this.loadingToggle = false;
      }, () => {
        this.loadingToggle = false;
      });
    } else {
      this.locationService.enableLocation(location._id).subscribe((resolvedPromise: any) => {
        if (resolvedPromise.success) {
          this.toastr.success('Localização ativada com sucesso!');
          this.refreshTable();
        } else {
          this.toastr.error('Ocorreu um erro ao ativar a localização. Contate um administrador para mais informações.');
        }
      }, (error) => {
        this.toastr.error(error.message);
        this.loadingToggle = false;
      }, () => {
        this.loadingToggle = false;
      });
    }
  }

}
