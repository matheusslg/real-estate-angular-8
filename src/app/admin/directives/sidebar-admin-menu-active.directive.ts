import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSidebarAdminMenuActive]'
})
export class SidebarAdminMenuActiveDirective {

  constructor(private _ren: Renderer2, private _el: ElementRef) { }

  @HostListener('click') onClick() {
    if (this._el.nativeElement.classList.contains('main-item')) {
      if (this._el.nativeElement.classList.contains('main-item-single')) {
        (<any>$('.sidebar-submenu')).collapse('hide');
      }
      //$('.main-item').removeClass('active');
      //$('.sub-item').removeClass('active');
      //this._ren.addClass(this._el.nativeElement, 'active');
    } else {
      //$('.sub-item').removeClass('active');
      //this._ren.addClass(this._el.nativeElement, 'active');
    }
  }
}
