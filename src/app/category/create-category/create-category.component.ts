import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {

  name: string = '';
  userId: string | null = null;
  isEditMode: boolean = false;
  categoryId: string = ''; // id of category being edited

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const rawUser = localStorage.getItem('user');
    if (rawUser) {
      const user = JSON.parse(rawUser);
      this.userId = user.id;
    }
  }

  ngOnInit() {
  this.route.params.subscribe(params => {
    if (params['id']) {
      this.isEditMode = true;
      this.categoryId = params['id'];
      this.loadCategory(params['id']);  // load existing name
    }
  });
}


  loadCategory(id: string) {
  this.apiService.getCategoryById(id).subscribe({
    next: (res: any) => {
      this.name = res.category.name; // patch name
    },
    error: (err) => {
      alert(err.error.message || 'Failed to load category');
      this.router.navigate(['/dashboard/categories']);
    }
  });
}


 submitCategory() {
  if (!this.name.trim()) return;

  const payload = { name: this.name };

  if (this.isEditMode) {
    this.apiService.updateCategory(this.categoryId, payload).subscribe({
      next: () => this.router.navigate(['/dashboard/categories']),
      error: (err) => alert(err.error.message || 'Failed to update category')
    });
  } else {
    // normal create
    this.apiService.createCategory({ name: this.name, user: this.userId }).subscribe({
      next: () => this.router.navigate(['/dashboard/categories']),
      error: () => alert('Failed to create category')
    });
  }
}


 cancelEdit() {
  this.isEditMode = false;
  this.name = '';
  this.router.navigate(['/dashboard/categories']);
}

}
