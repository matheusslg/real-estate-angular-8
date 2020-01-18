import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[closeMobileMenu]'
})
export class CloseMobileMenuDirective {

  @Input()
  public menu: any;

  constructor(private element: ElementRef) { }

  @HostListener("click")
  private onClick() {
    this.menu.classList.remove("show");
  }

}
