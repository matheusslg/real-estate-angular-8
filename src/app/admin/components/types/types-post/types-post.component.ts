import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { Title } from '@angular/platform-browser';
import { Type } from 'src/app/models/type';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/admin/services/auth.service';
import { TypeService } from 'src/app/services/type.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SlugTypeService } from 'src/app/services/slugType.service';

@Component({
  selector: 'app-types-post',
  templateUrl: './types-post.component.html',
  styleUrls: ['./types-post.component.scss']
})
export class TypesPostComponent implements OnInit {

  loading
  loadingFullscreen

  typeForm
  submitted = false
  type
  typeData
  typeSaved

  isChange
  typeChangeData

  slugList

  constructor(
    private GLOBALS: Globals,
    private titleService: Title,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private typeService: TypeService,
    private slugTypeService: SlugTypeService,
    private activatedRoute: ActivatedRoute
  ) {
    this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Cadastrar Modalidade');
    this.type = new Type();
    this.typeChangeData = new Type();
  }

  get f() { return this.typeForm.controls; }

  ngOnInit() {
    this.getSlugs();
    this.setValidationForm();
    this.checkIfIsChange();
  }

  checkIfIsChange() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.loading = true;
        this.isChange = true;
        this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Editar Modalidade');
        this.typeService.getType(params['id']).subscribe(resolvedPromise => {
          this.typeChangeData = resolvedPromise.data;
          this.typeChangeData._id = params['id'];
          this.typeForm.controls['description'].setValue(this.typeChangeData.description);
          this.typeForm.controls['slugType'].setValue(this.typeChangeData.slugType);
          this.typeForm.controls['active'].setValue(this.typeChangeData.active);
          this.loading = false;
        }, (error) => {
          console.log('error', error);
          this.toastr.error('Modalidade não encontrada no banco de dados!');
          this.router.navigate(['/area-logada/modalidades']);
        });
      }
    });
  }

  getSlugs() {
    this.loading = true;
    this.slugTypeService.getSlugTypes().subscribe(resolvedPromise => {
      this.slugList = resolvedPromise.data;
      this.loading = false;
    }, (error) => {
      console.log('error', error);
      this.toastr.error('Ocorreu um erro ao trazer a listagem de slugs!');
      this.router.navigate(['/area-logada/localizacoes']);
    });
  }

  setValidationForm() {
    this.typeForm = new FormGroup({
      'description': new FormControl(this.type.data.description, [Validators.required]),
      'slugType': new FormControl(this.type.data.slugType),
      'active': new FormControl(this.type.data.active)
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.typeForm.invalid) {
      return;
    }
    this.typeData = this.typeForm.value;
    this.typeData.user = this.authService.getUserId(this.authService.getToken());
    if (!this.isChange) {
        this.loadingFullscreen = true;
        this.typeService.createType(this.typeData).subscribe((res: any) => {
          if (res.success) {
            this.typeSaved = res.result;
            this.toastr.success('Modalidade cadastrada com sucesso!');
            this.router.navigate(['/area-logada/modalidades']);
          }
        }, (error) => {
          console.log('error', error);
          if (error.type == 'unique') {
            this.toastr.error('Já existe uma modalidade com este nome, por favor, tente outro nome.');
          } else {
            this.toastr.error('Ocorreu um erro ao cadastrar a modalidade. Contate um administrador para mais informações.');
          }
          this.loadingFullscreen = false;
        }, () => {
          this.loadingFullscreen = false;
        });
    } else {
        this.loadingFullscreen = true;
        this.typeService.updateType(this.typeChangeData._id, this.typeData).subscribe((res: any) => {
          if (res.success) {
            this.typeSaved = res.result;
            this.toastr.success('Modalidade atualizada com sucesso!');
            this.router.navigate(['/area-logada/modalidades']);
          }
        }, (error) => {
          console.log('error', error);
          if (error.type == 'unique') {
            this.toastr.error('Já existe uma modalidade com este nome, por favor, tente outro nome.');
          } else {
            this.toastr.error('Ocorreu um erro ao atualizar a modalidade. Contate um administrador para mais informações.');
          }
          this.loadingFullscreen = false;
        }, () => {
          this.loadingFullscreen = false;
        });
    }
  }

}
