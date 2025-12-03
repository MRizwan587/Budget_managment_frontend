import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
 menuList: any[] = [];
constructor(private router: Router, private userService: UserService){}
ngOnInit(): void {
  const role = localStorage.getItem('role')?.replace(/"/g, '').toLowerCase();

  this.menuList = [
    { name: 'Dashboard', link: '/dashboard/home', icon: 'dashboard' },
    { name: 'Transactions', link: '/dashboard/transactions', icon: 'payment' },
    { name: 'Categories', link: '/dashboard/categories', icon: 'payment' },
    ...(role === 'admin' ? [{ name: 'Users', link: '/dashboard/users', icon: 'group' }] : [])
  ];
}
}
