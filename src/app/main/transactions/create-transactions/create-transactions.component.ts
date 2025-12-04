import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { TransactionsService } from 'src/app/core/services/transactions.service';
import { ICategory } from 'src/app/core/models/category';
@Component({
  selector: 'app-create-transactions',
  templateUrl: './create-transactions.component.html',
  styleUrls: ['./create-transactions.component.css'],
})
export class CreateTransactionsComponent {
  categoryList: any[] = [];
  filteredCategories: any[] = [];
  loading = false;

  transactionForm = this.fb.group({
    amount: ['', Validators.required],
    category: [null as ICategory | null, Validators.required],
    type: ['', Validators.required],
    description: [''],
  });

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchCategories();

    // Enable typing filter
    this.transactionForm.get('category')?.valueChanges.subscribe((value) => {
      this.filterCategories(value);
    });
  }

  fetchCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (res: any) => {
        this.categoryList = res.data || [];
        this.filteredCategories = this.categoryList; // initial load
      },
      error: (err) => {
        console.error('Category Fetch Error:', err);
      },
    });
  }

  filterCategories(value: any) {
    const inputValue = typeof value === 'string' ? value : value?.name;

    const filterValue = inputValue?.toLowerCase() || '';

    this.filteredCategories = this.categoryList.filter((cat) =>
      cat.name.toLowerCase().includes(filterValue)
    );
  }
  displayCategory(cat: any) {
    return cat?.name || '';
  }

  onSubmit() {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    const formValue = this.transactionForm.value;

    const payload = {
      amount: formValue.amount,
      category: formValue.category?._id,
      type: formValue.type,
      description: formValue.description,
    };
    console.log(payload);
    

    this.loading = true;

      console.log(payload);
      
    this.transactionService.createTransaction(payload).subscribe({
      next: (res) => {
        this.loading = false;
        this.transactionForm.reset();
        this.snackBar.open(
          'Transaction Created',
          'Ok',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
        this.router.navigate(['dashboard/transactions']);
      },
      error: (err) => {
        this.loading = false;

        this.snackBar.open(
          err.error?.message || 'Failed to create transaction',
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
