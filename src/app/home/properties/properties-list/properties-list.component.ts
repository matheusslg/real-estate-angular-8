import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../../services/property.service';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit {

  propertyList

  constructor(
    private propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.propertyService.getProperties().subscribe((resolvedPromise) => {
      this.propertyList = resolvedPromise.data;
    })
  }

}
