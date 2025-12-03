import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { TransactionsService } from 'src/app/core/services/transactions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  errorMessage = '';
  userData: any = null;
  userId: string | null = null;
  loading=false;
  recentTasks=[];
  IncomBalance=0;
  ExpenseBalance=0;
  tUsers=0;
  balance=0;
  noExpense=0;
  noIncome=0;

  recentTransactions: any[] = [];

  constructor(private router: Router, private userService: UserService, private transactionsService: TransactionsService) {
    const rawUser = localStorage.getItem('user');
    if (!rawUser) {
      this.errorMessage = 'User not found. Please login again.';
      return;
    }
    try {
      this.userData = JSON.parse(rawUser);
      this.userId = this.userData?._id ;

      if (!this.userId) {
        this.errorMessage = 'Invalid user data. Please login again.';
      }
    } catch (error) {
      this.errorMessage = 'Failed to parse user data.';
    }
  }

  ngOnInit(): void {
    this.loadSummary();
  }
  loadSummary(){
    this.transactionsService.summary().subscribe({
      next:(res) => {
        this.recentTransactions=res.transactionRecent;
        this.ExpenseBalance=res.stats.totalExpense;
        this.IncomBalance=res.stats.totalIncome;
        this.balance=res.stats.balance;
        this.noExpense=res.stats.expenseCount;
        this.noIncome=res.stats.incomeCount;
        this.tUsers=res.stats.totalUsers;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch user from database.';
        console.error(err);
      }
    })
  }

  getUser(id: string) {
    const getUserId = id;
    this.userService.getUser(getUserId).subscribe({
      next: (res) => {
        
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch user from database.';
        console.error(err);
      },
    });
  }

  navigateToUsers(){
    this.router.navigate(["/dashboard/users"]);
  }
  navigateToTransactions(){
    this.router.navigate(['dashboard/transactions']);
  }
}
