import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent implements OnInit {

  websiteUrl

  constructor() { 
    this.websiteUrl = environment.baseUri.website;
  }

  ngOnInit() {
  }

}
