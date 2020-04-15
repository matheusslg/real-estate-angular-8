import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Globals } from 'src/app/globals';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { UsefullService } from 'src/app/services/usefull.service';
import { PropertyService } from 'src/app/services/property.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  categoryPropertiesCount = []
  categoryList
  propertyList
  loadingData
  loadingToggle
  dtOptions

  constructor(
    private GLOBALS: Globals,
    private titleService: Title,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private propertyService: PropertyService,
    private usefullService: UsefullService
  ) {
    this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Listagem de Categorias');
  }

  ngOnInit() {
    this.dtOptions = this.GLOBALS.DATATABLES_OPTIONS('Listagem de categorias cadastradas no sistema');
    this.dtOptions.buttons.forEach(element => {
      element.exportOptions.columns = [0, 1, 2];
    });
    this.dtOptions.columnDefs = [{ "width": "10%", "targets": [3, 4] }, { "width": "5%", "targets": 0 }];
    this.refreshTable();
  }

  refreshTable() {
    this.loadingData = true;
    forkJoin([
      this.categoryService.getCategories(),
      this.propertyService.getPropertiesActive()
    ]).subscribe(resolvedPromises => {
      this.categoryList = this.usefullService.orderByLocale(resolvedPromises[0].data, 'description');
      this.propertyList = resolvedPromises[1].data;
      this.propertiesByCategoryCount();
      this.loadingData = false;
    }, (error) => {
      console.log(error);
    });
  }

  propertiesByCategoryCount() {
    this.categoryList.forEach(_category => {
      this.categoryPropertiesCount[_category._id] = 0;
    });
    this.propertyList.forEach(_property => {
      _property.categories.forEach(_category => {
        this.categoryPropertiesCount[_category._id]++;
      });
    });
  }

  toggleCategory(category) {
    console.log(category);
    this.loadingToggle = true;
    if (category.active) {
      this.categoryService.disableCategory(category._id).subscribe((resolvedPromise: any) => {
        if (resolvedPromise.success) {
          this.toastr.success('Categoria desativada com sucesso!');
          this.refreshTable();
        } else {
          this.toastr.error('Ocorreu um erro ao desativar a categoria. Contate um administrador para mais informações.');
        }
      }, (error) => {
        this.toastr.error(error.message);
        this.loadingToggle = false;
      }, () => {
        this.loadingToggle = false;
      });
    } else {
      this.categoryService.enableCategory(category._id).subscribe((resolvedPromise: any) => {
        if (resolvedPromise.success) {
          this.toastr.success('Categoria ativada com sucesso!');
          this.refreshTable();
        } else {
          this.toastr.error('Ocorreu um erro ao ativar a categoria. Contate um administrador para mais informações.');
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
