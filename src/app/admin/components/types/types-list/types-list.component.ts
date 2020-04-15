import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Globals } from 'src/app/globals';
import { ToastrService } from 'ngx-toastr';
import { TypeService } from 'src/app/services/type.service';
import { UsefullService } from 'src/app/services/usefull.service';
import { PropertyService } from 'src/app/services/property.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-types-list',
  templateUrl: './types-list.component.html',
  styleUrls: ['./types-list.component.scss']
})
export class TypesListComponent implements OnInit {

  typePropertiesCount = []
  typeList
  propertyList
  loadingData
  loadingToggle
  dtOptions

  constructor(
    private GLOBALS: Globals,
    private titleService: Title,
    private toastr: ToastrService,
    private typeService: TypeService,
    private propertyService: PropertyService,
    private usefullService: UsefullService
  ) {
    this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Listagem de Modalidades');
  }

  ngOnInit() {
    this.dtOptions = this.GLOBALS.DATATABLES_OPTIONS('Listagem de modalidades cadastradas no sistema');
    this.dtOptions.buttons.forEach(element => {
      element.exportOptions.columns = [0, 1, 2];
    });
    this.dtOptions.columnDefs = [{ "width": "10%", "targets": [3, 4] }, { "width": "5%", "targets": 0 }];
    this.refreshTable();
  }

  refreshTable() {
    this.loadingData = true;
    forkJoin([
      this.typeService.getTypes(),
      this.propertyService.getPropertiesActive()
    ]).subscribe(resolvedPromises => {
      this.typeList = this.usefullService.orderByLocale(resolvedPromises[0].data, 'description');
      this.propertyList = resolvedPromises[1].data;
      this.propertiesByTypeCount();
      this.loadingData = false;
    }, (error) => {
      console.log(error);
    });
  }

  propertiesByTypeCount() {
    this.typeList.forEach(_type => {
      this.typePropertiesCount[_type._id] = 0;
    });
    this.propertyList.forEach(_property => {
      _property.types.forEach(_type => {
        this.typePropertiesCount[_type._id]++;
      });
    });
  }

  toggleType(type) {
    console.log(type);
    this.loadingToggle = true;
    if (type.active) {
      this.typeService.disableType(type._id).subscribe((resolvedPromise: any) => {
        if (resolvedPromise.success) {
          this.toastr.success('Modalidade desativada com sucesso!');
          this.refreshTable();
        } else {
          this.toastr.error('Ocorreu um erro ao desativar a modalidade. Contate um administrador para mais informações.');
        }
      }, (error) => {
        this.toastr.error(error.message);
        this.loadingToggle = false;
      }, () => {
        this.loadingToggle = false;
      });
    } else {
      this.typeService.enableType(type._id).subscribe((resolvedPromise: any) => {
        if (resolvedPromise.success) {
          this.toastr.success('Modalidade ativada com sucesso!');
          this.refreshTable();
        } else {
          this.toastr.error('Ocorreu um erro ao ativar a modalidade. Contate um administrador para mais informações.');
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
