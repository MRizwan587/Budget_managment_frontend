import { Component, ViewChild, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'role', 'email', 'status', 'actions'];
  data: any[] = [];
  loading = false;

  totalUsers = 0;
  pageSize = 10;
  pageIndex = 0; // 0-based for paginator

  filterValues = { name: '', role: '', status: '' };


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadUsers();
  }

  ngAfterViewInit() {
    // optional: subscribe to paginator changes here if needed
  }

  loadUsers() {
    this.loading = true;

    // Send 1-based page index to backend
    const backendPage = this.pageIndex + 1;

    this.userService
      .getAllUsers(
    backendPage,
    this.pageSize,
    this.filterValues.name,
    this.filterValues.role,
    this.filterValues.status   // add this
  )
      .subscribe({
        next: (res: any) => {
          this.data = res.data;       // table rows
          this.totalUsers = res.total; // paginator length
          this.loading = false;

          // Sync paginator with component pageIndex
          if (this.paginator) {
            this.paginator.pageIndex = this.pageIndex;
            this.cdr.detectChanges();
          }
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  onPagination(event: any) {
    this.pageIndex = event.pageIndex; // keep 0-based
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  applyMultiFilter() {
    this.pageIndex = 0; // reset to first page
    if (this.paginator) this.paginator.firstPage();
    this.loadUsers();
  }

  toggleUserStatus(user: any, isActive: boolean) {
    const newStatus = isActive ? 'active' : 'inactive';
    this.userService.updateUserStatus(user._id, newStatus).subscribe({
      next: (res: any) => {
        user.status = res.user.status;
      },
    });
  }

  deleteUser(user: any) {
    // implement delete
  }
}
