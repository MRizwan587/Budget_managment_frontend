import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-create-transactions',
  templateUrl: './create-transactions.component.html',
  styleUrls: ['./create-transactions.component.css'],
})
export class CreateTransactionsComponent {
  categoryList: any[] = [];
  loading = false;

  transactionForm = this.fb.group({
    amount: ['', Validators.required],
    category: ['', Validators.required],
    type: ['expense', Validators.required],
    description: [''],
  });

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.apiService.getAllCategories().subscribe({
      next: (res: any) => {
        console.log("catagories fetched: ", res);
        
        this.categoryList = res || [];
      },
      error: (err) => {
        console.error('Category Fetch Error:', err);
      },
    });
  }

  onSubmit() {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.apiService.createTransaction(this.transactionForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.transactionForm.reset();
        this.router.navigate(['dashboard/transactions']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Create Transaction Error:', err);
        alert(err.error?.message || 'Failed to create transaction');
      },
    });
  }
}
