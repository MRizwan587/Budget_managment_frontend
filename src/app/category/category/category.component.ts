import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  
  categories: any[] = [];
  userId: any= '';
  role : any='';
  isLoading = false;
  errorMessage = '';

  constructor(private apiService: ApiService, ) {
   
  }

  ngOnInit(): void {
     const rawUser = localStorage.getItem('user');
    if (rawUser) {
      const user = JSON.parse(rawUser);
      this.userId = user._id;
      
    }
    
  this.role = localStorage.getItem('role')?.replace(/"/g, "").toLowerCase();

  this.getCategories();
  }
  

  loadCategories() {
    this.isLoading = true;

    this.apiService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load categories.';
        this.isLoading = false;
      }
    });
  }

  deleteCategory(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return;

    this.apiService.deleteCategory(id).subscribe({
      next: () => {
        this.categories = this.categories.filter(c => c._id !== id);
      },
      error: () => {
        alert('Failed to delete category');
      }
    });
  }

 getCategories() {
  this.apiService.getCategories().subscribe((res: any) => {
    this.categories = res.data.map((cat: any) => ({
      ...cat,
      canShow: this.checkUserAccess(cat)  // compute ONCE
    }));
  });
}

checkUserAccess(cat: any): boolean {
  // admin → show all
  if (this.role === 'admin') return true;

  // user → show only their categories
  return cat.user === this.userId;
}
}
