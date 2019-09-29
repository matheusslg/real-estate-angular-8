import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../../services/property.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit {

  loading
  propertyList

  preUrlImages

  constructor(
    private propertyService: PropertyService
  ) { 
    this.preUrlImages = environment.baseUri.mongo;
  }

  ngOnInit() {
    this.loading = true;
    this.propertyService.getProperties().subscribe((resolvedPromise) => {
      this.propertyList = resolvedPromise.data;
      this.loading = false;
    })
  }

}
