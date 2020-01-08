import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../../../services/property.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit {

  loading
  propertyList
  filterValue
  cardTitle

  preUrlImages

  constructor(
    private propertyService: PropertyService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.preUrlImages = environment.baseUri.mongo;
    this.cardTitle = 'Todos os imóveis';
  }

  ngOnInit() {
    this.loading = true;
    this.propertyService.getProperties().subscribe((resolvedPromise) => {
      this.propertyList = resolvedPromise.data;
      this.checkIfIsFilter();
      this.loading = false;
    })
  }

  checkIfIsFilter() {
    this.activatedRoute.params.subscribe(params => {
      this.filterValue = [];
      if (params['description']) {
        this.filterValue.push(params['description']);
        this.cardTitle = 'Lista filtrada'
      }
    });
  }

  onScroll() {
    console.log('scroll');
  }

}
