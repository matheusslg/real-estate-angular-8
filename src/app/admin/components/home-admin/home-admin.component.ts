import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  loadingProperties

  propertyCount

  constructor(
    private propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.loadingProperties = true;
    this.propertyService.getProperties().subscribe(res => {
      this.propertyCount = res.count;
      this.loadingProperties = false;
    });
  }

}
