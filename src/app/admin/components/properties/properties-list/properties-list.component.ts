import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { Globals } from 'src/app/globals';
import { Title } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
    private propertyService: PropertyService,
    private imageService: ImageService
  ) {
    this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Listagem de Propriedades');
  }

  ngOnInit() {
    this.dtOptions = this.GLOBALS.DATATABLES_OPTIONS('Listagem de propriedades cadastradas no sistema');
    this.dtOptions.buttons.forEach(element => {
      element.exportOptions.columns = [0, 1, 2, 3, 4, 5];
    });
    this.refreshTable();
  }

  refreshTable() {
    this.loadingPropertyList = true;
    this.propertyService.getProperties().subscribe((resolvedPromise) => {
      this.propertyList = resolvedPromise.data;
      this.loadingPropertyList = false;
    })
  }

  removeProperty(property) {
    console.log(property);
    this.propertyService.removeProperty(property).then(resolvedPromise => {
      this.toastr.success('Propriedade removida com sucesso!');
      this.refreshTable();
    }).catch((error) => {
      this.toastr.error(error.message);
    })
  }
  
}
