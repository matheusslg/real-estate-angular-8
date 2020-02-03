import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { Title } from '@angular/platform-browser';
import { Category } from 'src/app/models/category';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/admin/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories-post',
  templateUrl: './categories-post.component.html',
  styleUrls: ['./categories-post.component.scss']
})
export class CategoriesPostComponent implements OnInit {

  loading
  loadingFullscreen

  categoryForm
  submitted = false
  category
  categoryData
  categorySaved

  isChange
  categoryChangeData

  constructor(
    private GLOBALS: Globals,
    private titleService: Title,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {
    this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Cadastrar Categoria');
    this.category = new Category();
    this.categoryChangeData = new Category();
  }

  get f() { return this.categoryForm.controls; }

  ngOnInit() {
    this.setValidationForm();
    this.checkIfIsChange();
  }

  checkIfIsChange() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.loading = true;
        this.isChange = true;
        this.titleService.setTitle(this.GLOBALS.SYSTEM_TITLE + ' - Editar Categoria');
        this.categoryService.getCategory(params['id']).subscribe(resolvedPromise => {
          this.categoryChangeData = resolvedPromise.data;
          this.categoryChangeData._id = params['id'];
          this.categoryChangeData.controls['description'].setValue(this.categoryChangeData.description);
          this.categoryChangeData.controls['active'].setValue(this.categoryChangeData.active);
          this.loading = false;
        }, (error) => {
          console.log('error', error);
          this.toastr.error('Categoria não encontrada no banco de dados!');
          this.router.navigate(['/area-logada/categorias']);
        });
      }
    });
  }

  setValidationForm() {
    this.categoryForm = new FormGroup({
      'description': new FormControl(this.category.data.description, [Validators.required]),
      'active': new FormControl(this.category.data.active)
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.categoryForm.invalid) {
      return;
    }
    this.categoryData = this.categoryForm.value;
    this.categoryData.user = this.authService.getUserId(this.authService.getToken());
    if (!this.isChange) {
        this.loadingFullscreen = true;
        this.categoryService.createCategory(this.categoryData).subscribe((res: any) => {
          if (res.success) {
            this.categorySaved = res.result;
            this.toastr.success('Categoria cadastrada com sucesso!');
            this.router.navigate(['/area-logada/categorias']);
          }
        }, (error) => {
          console.log('error', error);
          if (error.type == 'unique') {
            this.toastr.error('Já existe uma categoria com este nome, por favor, tente outro nome.');
          } else {
            this.toastr.error('Ocorreu um erro ao cadastrar a categoria. Contate um administrador para mais informações.');
          }
          this.loadingFullscreen = false;
        }, () => {
          this.loadingFullscreen = false;
        });
    } else {
        this.loadingFullscreen = true;
        this.categoryService.updateCategory(this.categoryChangeData._id, this.categoryData).subscribe((res: any) => {
          if (res.success) {
            this.categorySaved = res.result;
            this.toastr.success('Categoria atualizada com sucesso!');
            this.router.navigate(['/area-logada/categorias']);
          }
        }, (error) => {
          console.log('error', error);
          if (error.type == 'unique') {
            this.toastr.error('Já existe uma categoria com este nome, por favor, tente outro nome.');
          } else {
            this.toastr.error('Ocorreu um erro ao atualizar a categoria. Contate um administrador para mais informações.');
          }
          this.loadingFullscreen = false;
        }, () => {
          this.loadingFullscreen = false;
        });
    }
  }

}
