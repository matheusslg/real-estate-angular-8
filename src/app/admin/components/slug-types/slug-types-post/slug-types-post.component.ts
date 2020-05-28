import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { Title } from '@angular/platform-browser';
import { SlugType } from 'src/app/models/slugType';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/admin/services/auth.service';
import { SlugTypeService } from 'src/app/services/slugType.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-slug-types-post',
  templateUrl: './slug-types-post.component.html',
  styleUrls: ['./slug-types-post.component.scss']
})
export class SlugTypesPostComponent implements OnInit {

  loading
  loadingFullscreen

  slugTypeForm
  submitted = false
  slugType
  slugTypeData
  slugTypeSaved

  isChange
  slugTypeChangeData
  typeList

  constructor(
    private GLOBALS: Globals,
    private titleService: Title,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private slugTypeService: SlugTypeService,
    private activatedRoute: ActivatedRoute
  ) {
    this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Cadastrar Slug');
    this.slugType = new SlugType();
    this.slugTypeChangeData = new SlugType();
    this.typeList = GLOBALS.SLUG_TYPES();
  }

  get f() { return this.slugTypeForm.controls; }

  ngOnInit() {
    this.setValidationForm();
    this.checkIfIsChange();
  }

  checkIfIsChange() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.loading = true;
        this.isChange = true;
        this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Editar Slug');
        this.slugTypeService.getSlugType(params['id']).subscribe(resolvedPromise => {
          this.slugTypeChangeData = resolvedPromise.data;
          this.slugTypeChangeData._id = params['id'];
          this.slugTypeForm.controls['description'].setValue(this.slugTypeChangeData.description);
          this.slugTypeForm.controls['slug'].setValue(this.slugTypeChangeData.slug);
          this.slugTypeForm.controls['type'].setValue(this.slugTypeChangeData.type);
          this.slugTypeForm.controls['active'].setValue(this.slugTypeChangeData.active);
          this.loading = false;
        }, (error) => {
          console.log('error', error);
          this.toastr.error('Slug não encontrado no banco de dados!');
          this.router.navigate(['/area-logada/slugs']);
        });
      }
    });
  }

  setValidationForm() {
    this.slugTypeForm = new FormGroup({
      'description': new FormControl(this.slugType.data.description, [Validators.required]),
      'type': new FormControl(this.slugType.data.type, [Validators.required]),
      'slug': new FormControl(this.slugType.data.slug, [Validators.required]),
      'active': new FormControl(this.slugType.data.active)
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.slugTypeForm.invalid) {
      return;
    }
    this.slugTypeData = this.slugTypeForm.value;
    this.slugTypeData.user = this.authService.getUserId(this.authService.getToken());
    if (!this.isChange) {
        this.loadingFullscreen = true;
        this.slugTypeService.createSlugType(this.slugTypeData).subscribe((res: any) => {
          if (res.success) {
            this.slugTypeSaved = res.result;
            this.toastr.success('Slug cadastrada com sucesso!');
            this.router.navigate(['/area-logada/slugs']);
          }
        }, (error) => {
          console.log('error', error);
          if (error.type == 'unique') {
            this.toastr.error('Já existe uma slug com este nome, por favor, tente outro nome.');
          } else {
            this.toastr.error('Ocorreu um erro ao cadastrar a slug. Contate um administrador para mais informações.');
          }
          this.loadingFullscreen = false;
        }, () => {
          this.loadingFullscreen = false;
        });
    } else {
        this.loadingFullscreen = true;
        this.slugTypeService.updateSlugType(this.slugTypeChangeData._id, this.slugTypeData).subscribe((res: any) => {
          if (res.success) {
            this.slugTypeSaved = res.result;
            this.toastr.success('Slug atualizada com sucesso!');
            this.router.navigate(['/area-logada/slugs']);
          }
        }, (error) => {
          console.log('error', error);
          if (error.type == 'unique') {
            this.toastr.error('Já existe uma slug com este nome, por favor, tente outro nome.');
          } else {
            this.toastr.error('Ocorreu um erro ao atualizar a slug. Contate um administrador para mais informações.');
          }
          this.loadingFullscreen = false;
        }, () => {
          this.loadingFullscreen = false;
        });
    }
  }

}
