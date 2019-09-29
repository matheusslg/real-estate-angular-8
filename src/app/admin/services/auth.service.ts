import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsefullService } from 'src/app/services/usefull.service';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME: string = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.baseUri.mongo

  constructor(
    private http: HttpClient,
    private usefullService: UsefullService
  ) { }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  isAdmin(token: string) {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) return null;
    return decoded.isAdmin;
  }

  getUserId(token: string) {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) return null;
    return decoded.id;
  }

  login(loginData): Observable<null> {
    return this.http.post<null>(this.apiURL + '/auth/login', JSON.stringify(loginData))
      .pipe(
        retry(1),
        catchError(this.usefullService.handleError)
      )
  }

  logout() {
    window.localStorage.removeItem('token');
  }
}
