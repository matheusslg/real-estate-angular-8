import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'admin-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit {

  propertyList
  loadingPropertyList

  constructor(
    private propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.loadingPropertyList = true;
    this.propertyService.getProperties().subscribe((resolvedPromise) => {
      this.propertyList = resolvedPromise.data;
      this.loadingPropertyList = false;
    })
  }
}
