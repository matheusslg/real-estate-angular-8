import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
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
    if (!this.authService.isTokenExpired(this.authService.getToken()) && this.authService.isAdmin(this.authService.getToken())) {
      return true;  
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
