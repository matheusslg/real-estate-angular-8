import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-properties-home',
  templateUrl: './properties-home.component.html',
  styleUrls: ['./properties-home.component.scss']
})
export class PropertiesHomeComponent implements OnInit {

  propertyList
  propertyFeaturedList
  filterData
  filterCall

  constructor() { }

  ngOnInit() {
  }

}
