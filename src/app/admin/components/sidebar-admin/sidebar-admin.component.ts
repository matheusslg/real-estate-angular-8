import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent implements OnInit {

  websiteUrl

  constructor(
    public GLOBALS: Globals
  ) { 
    this.websiteUrl = environment.baseUri.website;
  }

  ngOnInit() {
  }

}
