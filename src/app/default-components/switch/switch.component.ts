import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input() id: number;
  @Input() value: any;
  @Input() clickable: any;
  @Input() disabled: false
  @Output() clicked = new EventEmitter<any>();

  constructor() {
    this.clickable = true;
  }

  ngOnInit() {
  }

  changeValue() {
    this.clicked.emit(true);
  }

}