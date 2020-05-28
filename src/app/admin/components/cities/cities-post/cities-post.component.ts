import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { Title } from '@angular/platform-browser';
import { City } from 'src/app/models/city';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/admin/services/auth.service';
import { CityService } from 'src/app/services/city.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cities-post',
  templateUrl: './cities-post.component.html',
  styleUrls: ['./cities-post.component.scss']
})
export class CitiesPostComponent implements OnInit {

  loading
  loadingFullscreen

  cityForm
  submitted = false
  city
  cityData
  citySaved

  isChange
  cityChangeData

  constructor(
    private GLOBALS: Globals,
    private titleService: Title,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private cityService: CityService,
    private activatedRoute: ActivatedRoute
  ) {
    this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Cadastrar Cidade');
    this.city = new City();
    this.cityChangeData = new City();
  }

  get f() { return this.cityForm.controls; }

  ngOnInit() {
    this.setValidationForm();
    this.checkIfIsChange();
  }

  checkIfIsChange() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.loading = true;
        this.isChange = true;
        this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Editar Cidade');
        this.cityService.getCity(params['id']).subscribe(resolvedPromise => {
          this.cityChangeData = resolvedPromise.data;
          this.cityChangeData._id = params['id'];
          this.cityForm.controls['description'].setValue(this.cityChangeData.description);
          this.cityForm.controls['uf'].setValue(this.cityChangeData.uf);
          this.cityForm.controls['active'].setValue(this.cityChangeData.active);
          this.loading = false;
        }, (error) => {
          console.log('error', error);
          this.toastr.error('Cidade não encontrada no banco de dados!');
          this.router.navigate(['/area-logada/cidades']);
        });
      }
    });
  }

  setValidationForm() {
    this.cityForm = new FormGroup({
      'description': new FormControl(this.city.data.description, [Validators.required]),
      'uf': new FormControl(this.city.data.uf, [Validators.required]),
      'active': new FormControl(this.city.data.active)
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.cityForm.invalid) {
      return;
    }
    this.cityData = this.cityForm.value;
    this.cityData.user = this.authService.getUserId(this.authService.getToken());
    if (!this.isChange) {
        this.loadingFullscreen = true;
        this.cityService.createCity(this.cityData).subscribe((res: any) => {
          if (res.success) {
            this.citySaved = res.result;
            this.toastr.success('Cidade cadastrada com sucesso!');
            this.router.navigate(['/area-logada/cidades']);
          }
        }, (error) => {
          console.log('error', error);
          if (error.type == 'unique') {
            this.toastr.error('Já existe uma cidade com este nome, por favor, tente outro nome.');
          } else {
            this.toastr.error('Ocorreu um erro ao cadastrar a cidade. Contate um administrador para mais informações.');
          }
          this.loadingFullscreen = false;
        }, () => {
          this.loadingFullscreen = false;
        });
    } else {
        this.loadingFullscreen = true;
        this.cityService.updateCity(this.cityChangeData._id, this.cityData).subscribe((res: any) => {
          if (res.success) {
            this.citySaved = res.result;
            this.toastr.success('Cidade atualizada com sucesso!');
            this.router.navigate(['/area-logada/cidades']);
          }
        }, (error) => {
          console.log('error', error);
          if (error.type == 'unique') {
            this.toastr.error('Já existe uma cidade com este nome, por favor, tente outro nome.');
          } else {
            this.toastr.error('Ocorreu um erro ao atualizar a cidade. Contate um administrador para mais informações.');
          }
          this.loadingFullscreen = false;
        }, () => {
          this.loadingFullscreen = false;
        });
    }
  }

}
