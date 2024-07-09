import { Component, OnInit } from "@angular/core";
import { UsefullService } from "src/app/services/usefull.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  currentYear: number;

  constructor(public usefullService: UsefullService) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {}
}
