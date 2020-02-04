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
  loadingRemove
  dtOptions

  constructor(
    private GLOBALS: Globals,
    private titleService: Title,
    private toastr: ToastrService,
    private propertyService: PropertyService,
    private imageService: ImageService
  ) {
    this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Listagem de Imóveis');
  }

  ngOnInit() {
    this.dtOptions = this.GLOBALS.DATATABLES_OPTIONS('Listagem de imóveis cadastrados no sistema');
    this.dtOptions.buttons.forEach(element => {
      element.exportOptions.columns = [0, 1, 2, 3, 4];
    });
    this.refreshTable();
  }

  refreshTable() {
    this.loadingPropertyList = true;
    this.propertyService.getPropertiesActive().subscribe((resolvedPromise) => {
      this.propertyList = resolvedPromise.data;
      this.loadingPropertyList = false;
    })
  }

  removeProperty(property) {
    console.log(property);
    this.loadingRemove = true;
    this.propertyService.removeProperty(property).then((resolvedPromise: any) => {
      if (resolvedPromise.success) {
        let allImagesRemoved = true;
        property.images.forEach(image => {
          this.imageService.removeImage(image).then((resolvedPromiseImage) => {
            console.log(resolvedPromiseImage);
          }).catch((error) => {
            this.toastr.error(error.message);
            allImagesRemoved = false;
          })
        })
        if (allImagesRemoved) {
          console.log(resolvedPromise);
          this.toastr.success('Imóvel removido com sucesso!');
          this.refreshTable();
        } else {
          this.toastr.error('Não foi possível remover todas as imagens. Contate um administrador para mais informações.');
        }
      } else {
        this.toastr.error('Ocorreu um erro ao remover o imóvel. Contate um administrador para mais informações.');
      }
    }).catch((error) => {
      this.toastr.error(error.message);
    }).finally(() => {
      this.loadingRemove = false;
    });
  }

}
