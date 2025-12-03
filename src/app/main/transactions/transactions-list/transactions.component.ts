import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TransactionsService } from 'src/app/core/services/transactions.service';
import { CategoriesService } from 'src/app/core/services/categories.service';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent {
  dataSource: any[] = [];
  displayedColumns = [
    'date',
    'category',
    'type',
    'amount',
    'description',
    'actions',
  ];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  filters = {
    startDate: '',
    endDate: '',
    type: '',
    category: '',
    minAmount: '',
    maxAmount: '',
  };

  pageIndex = 0;
  pageSize = 10;
  totalRecords = 0;

  categoryList: any[] = [];

  constructor(
    private transactionsService: TransactionsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.range.valueChanges.subscribe((val: any) => {
      if (val.start) {
        this.filters.startDate = val.start.toISOString().split('T')[0];
      } else {
        this.filters.startDate = '';
      }

      if (val.end) {
        this.filters.endDate = val.end.toISOString().split('T')[0];
      } else {
        this.filters.endDate = '';
      }

      this.applyFilters();
    });

    this.loadTransactions();
    this.fetchCategories();
  }

  onDateRangeChange(event: any) {
    const start = event.value?.start;
    const end = event.value?.end;
    this.filters.startDate = start
      ? new Date(start).toISOString().split('T')[0]
      : '';

    this.filters.endDate = end ? new Date(end).toISOString().split('T')[0] : '';

    this.applyFilters();
  }

  fetchCategories() {
    this.categoriesService.getCategories().subscribe((res: any) => {
      this.categoryList = res.data || [];
    });
  }

  loadTransactions() {
    const params = this.buildQueryParams();

    this.transactionsService.getTransactions(params).subscribe({
      next: (res: any) => {
        this.dataSource = res.data;
        this.totalRecords = res.totalRecords;
      },
      error: (err) => console.error('Error fetching transactions:', err),
    });
  }

  applyFilters() {
    this.pageIndex = 0;
    this.loadTransactions();
  }

  onPagination(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTransactions();
  }

  buildQueryParams() {
    let params: any = {
      page: this.pageIndex + 1,
      limit: this.pageSize,
    };

    if (this.filters.startDate) params.startDate = this.filters.startDate;
    if (this.filters.endDate) params.endDate = this.filters.endDate;

    if (this.filters.type) params.type = this.filters.type;
    if (this.filters.category) params.category = this.filters.category;

    if (this.filters.minAmount) params.minAmount = this.filters.minAmount;
    if (this.filters.maxAmount) params.maxAmount = this.filters.maxAmount;

    return params;
  }
}
