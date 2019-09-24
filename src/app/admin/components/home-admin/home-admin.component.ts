import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { Globals } from 'src/app/globals';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  loadingProperties

  propertyCount

  constructor(
    private GLOBALS: Globals,
    private titleService: Title,
    private propertyService: PropertyService
  ) { 
    this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Painel Administrativo');
  }

  ngOnInit() {
    this.loadingProperties = true;
    this.propertyService.getProperties().subscribe(res => {
      this.propertyCount = res.count;
      this.loadingProperties = false;
    });
  }

}
