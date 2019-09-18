import { Directive, ElementRef, HostListener } from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[adminMenuDropdown]'
})
export class SidebarAdminMenuDropdownDirective {

  constructor() {
    $('#collapse-icon').addClass('fa-chevron-left');
  }

  @HostListener('click') onMouseEnter() {
    $('.menu-collapsed').toggleClass('d-none');
    $('.sidebar-submenu').toggleClass('d-none');
    $('.submenu-icon').toggleClass('d-none');
    $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');
    var SeparatorTitle = $('.sidebar-separator-title');
    if (SeparatorTitle.hasClass('d-flex')) {
      SeparatorTitle.removeClass('d-flex');
    } else {
      SeparatorTitle.addClass('d-flex');
    }
    $('#collapse-icon').toggleClass('fa-chevron-left fa-chevron-right');

  }

}
