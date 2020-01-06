import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../../../services/property.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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
    private propertyService: PropertyService,
    private router: Router,
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

  test(param) {
    console.log(param);
    this.router.navigate(['/propriedades', param, 'detalhes']);
  }

}
