import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent {
  name: string = '';
  userId: string | null = null;
  isEditMode: boolean = false;
  categoryId: string = ''; 
  title = '';
  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    const rawUser = localStorage.getItem('user');
    if (rawUser) {
      const user = JSON.parse(rawUser);
      this.userId = user.id;
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.categoryId = params['id'];
        this.loadCategory(params['id']); 
      }
    });
    if (this.isEditMode == true) {
      this.title = 'Edit Category';
    } else {
      this.title = 'Create New Category';
    }
  }

  loadCategory(id: string) {
    this.categoriesService.getCategoryById(id).subscribe({
      next: (res: any) => {
        this.name = res.category.name; 
      },
      error: (err) => {
        this.snackBar.open(err.error.message || 'Failed to load category', 'close',{ duration: 3000, horizontalPosition: 'center',
  verticalPosition: 'top',});
        this.router.navigate(['/dashboard/categories']);
      },
    });
  }

  submitCategory() {
    if (!this.name.trim()) return;

    const payload = { name: this.name };

    if (this.isEditMode) {
      this.categoriesService
        .updateCategory(this.categoryId, payload)
        .subscribe({
          next: () => {
            this.snackBar.open(
         'Category updated',
          'Ok',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
            this.router.navigate(['/dashboard/categories'])},
          error: (err) =>
           this.snackBar.open(err.error.message || 'Failed to update category', 'close',{ duration: 3000, horizontalPosition: 'center',
  verticalPosition: 'top',})
          
        });
    } else {
     
      this.categoriesService
        .createCategory({ name: this.name, user: this.userId })
        .subscribe({
          next: () => {
            this.snackBar.open(
          'Category added',
          'Ok',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
            this.router.navigate(['/dashboard/categories'])
          },
          error: () => {
            this.snackBar.open(
          'Failed to create Category',
          'close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
          },
        });
    }
  }

  cancelEdit() {
    this.isEditMode = false;
    this.name = '';
    this.router.navigate(['/dashboard/categories']);
  }
}
