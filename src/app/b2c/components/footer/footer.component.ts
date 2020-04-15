import { Component, OnInit } from '@angular/core';
import { UsefullService } from 'src/app/services/usefull.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    public usefullService: UsefullService
  ) { }

  ngOnInit() {
  }

}
