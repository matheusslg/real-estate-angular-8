import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { Title } from '@angular/platform-browser';
import { Location } from 'src/app/models/location';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/admin/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-locations-post',
  templateUrl: './locations-post.component.html',
  styleUrls: ['./locations-post.component.scss']
})
export class LocationsPostComponent implements OnInit {

  loading
  loadingFullscreen

  locationForm
  submitted = false
  location
  locationData
  locationSaved

  isChange
  locationChangeData

  constructor(
    private GLOBALS: Globals,
    private titleService: Title,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private locationService: LocationService,
    private activatedRoute: ActivatedRoute
  ) {
    this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Cadastrar Localização');
    this.location = new Location();
    this.locationChangeData = new Location();
  }

  get f() { return this.locationForm.controls; }

  ngOnInit() {
    this.setValidationForm();
    this.checkIfIsChange();
  }

  checkIfIsChange() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.loading = true;
        this.isChange = true;
        this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Editar Localização');
        this.locationService.getLocation(params['id']).subscribe(resolvedPromise => {
          this.locationChangeData = resolvedPromise.data;
          this.locationChangeData._id = params['id'];
          this.locationForm.controls['description'].setValue(this.locationChangeData.description);
          this.locationForm.controls['active'].setValue(this.locationChangeData.active);
          this.loading = false;
        }, (error) => {
          console.log('error', error);
          this.toastr.error('Localização não encontrada no banco de dados!');
          this.router.navigate(['/area-logada/localizacoes']);
        });
      }
    });
  }

  setValidationForm() {
    this.locationForm = new FormGroup({
      'description': new FormControl(this.location.data.description, [Validators.required]),
      'active': new FormControl(this.location.data.active)
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.locationForm.invalid) {
      return;
    }
    this.locationData = this.locationForm.value;
    this.locationData.user = this.authService.getUserId(this.authService.getToken());
    if (!this.isChange) {
        this.loadingFullscreen = true;
        this.locationService.createLocation(this.locationData).subscribe((res: any) => {
          if (res.success) {
            this.locationSaved = res.result;
            this.toastr.success('Localização cadastrada com sucesso!');
            this.router.navigate(['/area-logada/localizacoes']);
          }
        }, (error) => {
          console.log('error', error);
          if (error.type == 'unique') {
            this.toastr.error('Já existe uma localização com este nome, por favor, tente outro nome.');
          } else {
            this.toastr.error('Ocorreu um erro ao cadastrar a localização. Contate um administrador para mais informações.');
          }
          this.loadingFullscreen = false;
        }, () => {
          this.loadingFullscreen = false;
        });
    } else {
        this.loadingFullscreen = true;
        this.locationService.updateLocation(this.locationChangeData._id, this.locationData).subscribe((res: any) => {
          if (res.success) {
            this.locationSaved = res.result;
            this.toastr.success('Localização atualizada com sucesso!');
            this.router.navigate(['/area-logada/localizacoes']);
          }
        }, (error) => {
          console.log('error', error);
          if (error.type == 'unique') {
            this.toastr.error('Já existe uma localização com este nome, por favor, tente outro nome.');
          } else {
            this.toastr.error('Ocorreu um erro ao atualizar a localização. Contate um administrador para mais informações.');
          }
          this.loadingFullscreen = false;
        }, () => {
          this.loadingFullscreen = false;
        });
    }
  }

}
