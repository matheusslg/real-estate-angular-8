import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-properties-filtering',
  templateUrl: './properties-filtering.component.html',
  styleUrls: ['./properties-filtering.component.scss']
})
export class PropertiesFilteringComponent implements OnInit {

  propertyList
  propertyFeaturedList
  filterData
  filterCall

  routerParams

  constructor(
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.routerParams = params['description'];
      this.cdr.detectChanges();
    });
  }

}
