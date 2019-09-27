import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent implements OnInit {

  constructor(
    public GLOBALS: Globals
  ) { }

  ngOnInit() {
  }

}
