import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Globals } from 'src/app/globals';
import { ToastrService } from 'ngx-toastr';
import { SlugTypeService } from 'src/app/services/slugType.service';
import { UsefullService } from 'src/app/services/usefull.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-slug-types-list',
  templateUrl: './slug-types-list.component.html',
  styleUrls: ['./slug-types-list.component.scss']
})
export class SlugTypesListComponent implements OnInit {

  slugTypePropertiesCount = []
  slugTypeList
  propertyList
  loadingData
  loadingToggle
  dtOptions

  constructor(
    private GLOBALS: Globals,
    private titleService: Title,
    private toastr: ToastrService,
    private slugTypeService: SlugTypeService,
    private usefullService: UsefullService
  ) {
    this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Listagem de Slugs');
  }

  ngOnInit() {
    this.dtOptions = this.GLOBALS.DATATABLES_OPTIONS('Listagem de slugs cadastradas no sistema');
    this.dtOptions.buttons.forEach(element => {
      element.exportOptions.columns = [0, 1, 2];
    });
    this.dtOptions.columnDefs = [{ "width": "10%", "targets": [3, 4] }, { "width": "5%", "targets": 0 }];
    this.refreshTable();
  }

  refreshTable() {
    this.loadingData = true;
    forkJoin([
      this.slugTypeService.getSlugTypes()
    ]).subscribe(resolvedPromises => {
      this.slugTypeList = this.usefullService.orderByLocale(resolvedPromises[0].data, 'description');
      this.loadingData = false;
    }, (error) => {
      console.log(error);
    });
  }

  toggleSlugType(slugType) {
    console.log(slugType);
    this.loadingToggle = true;
    if (slugType.active) {
      this.slugTypeService.disableSlugType(slugType._id).subscribe((resolvedPromise: any) => {
        if (resolvedPromise.success) {
          this.toastr.success('Slug desativado com sucesso!');
          this.refreshTable();
        } else {
          this.toastr.error('Ocorreu um erro ao desativar a slug. Contate um administrador para mais informações.');
        }
      }, (error) => {
        this.toastr.error(error.message);
        this.loadingToggle = false;
      }, () => {
        this.loadingToggle = false;
      });
    } else {
      this.slugTypeService.enableSlugType(slugType._id).subscribe((resolvedPromise: any) => {
        if (resolvedPromise.success) {
          this.toastr.success('Slug ativada com sucesso!');
          this.refreshTable();
        } else {
          this.toastr.error('Ocorreu um erro ao ativar a slug. Contate um administrador para mais informações.');
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
