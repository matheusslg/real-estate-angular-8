import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { Globals } from 'src/app/globals';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'admin-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit {

  propertyList
  loadingPropertyList
  dtOptions

  constructor(
    private GLOBALS: Globals,
    private titleService: Title,
    private propertyService: PropertyService
  ) { 
    this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Listagem de Propriedades');
  }

  ngOnInit() {
    this.dtOptions = this.GLOBALS.DATATABLES_OPTIONS('Listagem de propriedades cadastradas no sistema');
    this.dtOptions.buttons.forEach(element => {
      element.exportOptions.columns = [0, 1, 2, 3, 4, 5];
    });
    this.loadingPropertyList = true;
    this.propertyService.getProperties().subscribe((resolvedPromise) => {
      this.propertyList = resolvedPromise.data;
      this.loadingPropertyList = false;
    })
  }
}
