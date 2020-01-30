import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { SearchService } from 'src/app/services/search.service';
import { environment } from 'src/environments/environment';
import { UsefullService } from 'src/app/services/usefull.service';

@Component({
  selector: 'app-properties-search',
  templateUrl: './properties-search.component.html',
  styleUrls: ['./properties-search.component.scss']
})
export class PropertiesSearchComponent implements OnInit {

  loading

  propertyList
  searchTerm
  cardTitle

  preUrlImages

  constructor(
    private activatedRoute: ActivatedRoute,
    private propertyService: PropertyService,
    private searchService: SearchService,
    private usefullService: UsefullService
  ) {
    this.preUrlImages = environment.baseUri.mongo;
  }

  ngOnInit() {
    this.loading = true;
    this.propertyService.getProperties().subscribe(resolvedPromise => {
      this.propertyList = resolvedPromise.data;
      this.loading = false;
    });

    this.activatedRoute.params.subscribe(params => {
      if (params['term']) {
        this.searchTerm = params['term'];
        this.cardTitle = 'Buscando por: ' + this.searchTerm;
      }
    });
  }

}
