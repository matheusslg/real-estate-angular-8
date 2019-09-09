import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router,
    ) {}

  canActivateChild() {
    if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
      return true;  
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
