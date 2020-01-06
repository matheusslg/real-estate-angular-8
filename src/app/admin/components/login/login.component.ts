import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData
  loginForm
  showPassword

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { 
    this.loginData = { email: undefined, password: undefined }
  }

  ngOnInit() {
    if (!this.authService.isTokenExpired()) {
      this.router.navigate(['/area-logada']);
      return;
    }
    this.setValidationForm();
  }

  setValidationForm() {
    this.loginForm = new FormGroup({
      'email': new FormControl(this.loginData.email, [Validators.required]),
      'password': new FormControl(this.loginData.password, [Validators.required])
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginData = this.loginForm.value;
    this.authService.login(this.loginData).subscribe((res: any) => {
      this.authService.setToken(res.token);
      window.localStorage.setItem('userData', JSON.stringify(res.data));
      this.toastr.success('Usuário logado com sucesso!');
      this.router.navigate(['/area-logada']);
    }, (error) => {
        this.toastr.error(error.message);
    });
  }

}
