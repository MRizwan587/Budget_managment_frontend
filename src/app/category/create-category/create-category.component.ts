import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {

  
  name: string = '';
  userId: string | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    const rawUser = localStorage.getItem('user');
    if (rawUser) {
      const user = JSON.parse(rawUser);
      this.userId = user.id;
    }
  }

  createCategory() {
    if (!this.name.trim()) return;

    const payload = {
      name: this.name,
      user: this.userId   // For admin = null, for user = userId
    };

    this.apiService.createCategory(payload).subscribe({
      next: () => this.router.navigate(['/dashboard/categories']),
      error: () => alert('Failed to create category')
    });
  }

}
