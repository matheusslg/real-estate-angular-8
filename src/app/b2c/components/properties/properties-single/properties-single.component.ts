import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { Property } from 'src/app/models/Property';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-properties-single',
  templateUrl: './properties-single.component.html',
  styleUrls: ['./properties-single.component.scss']
})
export class PropertiesSingleComponent implements OnInit {

  loading

  property
  preUrlImages

  constructor(
    private GLOBALS: Globals,
    private titleService: Title,
    private toastr: ToastrService,
    private router: Router,
    private propertyService: PropertyService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { 
    this.property = new Property();
    this.preUrlImages = environment.baseUri.mongo;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.loading = true;
        this.propertyService.getProperty(params['id']).subscribe(resolvedPromise => {
          this.loading = false;
          this.property = resolvedPromise.data;
          this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - ' + this.property.title);
          console.log('property', this.property);
        }, (error) => {
          console.log('error', error);
          this.toastr.error('Propriedade não encontrada no banco de dados!');
          this.router.navigate(['/propriedades']);
        });
      }
    });
  }

}
