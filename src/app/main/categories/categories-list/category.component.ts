import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  categories: any[] = [];
  userId: any = '';
  role: any = '';
  isLoading = false;
  errorMessage = '';

  constructor(private categoriesService: CategoriesService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const rawUser = localStorage.getItem('user');
    if (rawUser) {
      const user = JSON.parse(rawUser);
      this.userId = user._id;
    }

    this.role = localStorage.getItem('role')?.replace(/"/g, '').toLowerCase();

    this.getCategories();
  }


  loadCategories() {
    this.isLoading = true;

    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load categories.';
        this.isLoading = false;
      },
    });
  }

  deleteCategory(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return;

    this.categoriesService.deleteCategory(id).subscribe({
      next: () => {
        this.categories = this.categories.filter((c) => c._id !== id);
      },
      error: () => {
         this.snackBar.open('Failed to delete category', 'close',{ duration: 3000, horizontalPosition: 'center',
  verticalPosition: 'top',});
      },
    });
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((res: any) => {
      this.categories = res.data.map((cat: any) => ({
        ...cat,
        canShow: this.checkUserAccess(cat),
      }));
    });
  }

  checkUserAccess(cat: any): boolean {
    if (this.role === 'admin') return true;
    return cat.user === this.userId;
  }
}
