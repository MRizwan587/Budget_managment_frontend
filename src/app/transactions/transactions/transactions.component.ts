import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent {

  dataSource: any[] = [];
  displayedColumns = ['date', 'category', 'type', 'amount', 'description', 'actions'];

  filters = {
    month: '',
    type: '',
    category: '',
    minAmount: '',
    maxAmount: ''
  };

  pageIndex = 0;
  pageSize = 10;
  totalRecords = 0;

  categoryList: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadTransactions();
    this.fetchCategories();
  }

  fetchCategories() {
    this.apiService.getCategories().subscribe((res: any) => {
      
      this.categoryList = res.data || [];
    });
  }

  loadTransactions() {
    const params = this.buildQueryParams();

    this.apiService.getTransactions(params).subscribe({
      next: (res: any) => {
        this.dataSource = res.data;
        this.totalRecords = res.totalRecords;
      },
      error: (err) => console.error('Error fetching transactions:', err)
    });
  }

  applyFilters() {
    this.pageIndex = 0;   // reset pagination
    this.loadTransactions();
  }

  onPagination(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTransactions();
  }

  // ⚡ FIXED FUNCTION
  buildQueryParams() {
    let params: any = {};

    // add pagination
    params.page = this.pageIndex + 1;  
    params.limit = this.pageSize;

    // add only non-empty filters
    Object.entries(this.filters).forEach(([key, value]) => {
      if (value) {
        params[key] = value.toString();  // ensures no object is sent
      }
    });

    return params;
  }
}
