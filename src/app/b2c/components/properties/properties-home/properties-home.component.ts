import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-properties-home',
  templateUrl: './properties-home.component.html',
  styleUrls: ['./properties-home.component.scss']
})
export class PropertiesHomeComponent implements OnInit, AfterViewInit {

  propertyList
  propertyFeaturedList
  filterData
  filterCall

  routerParams

  formUrl = "https://forms.gle/2Z2R4MFaY4CFZmPB7"

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.filterCall = { firstCall: true }; // Populate propertyList on PropertiesListComponent calling filter from PropertiesFilterComponent
    this.cdr.detectChanges();
  }

}
