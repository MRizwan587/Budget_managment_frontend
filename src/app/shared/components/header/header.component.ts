import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
constructor(private authService: AuthService){}


  userName='';
  userRole='';
ngOnInit(): void {  
  const user = localStorage.getItem("user");

  if (user) {
    
    const parsedUser = JSON.parse(user);
    this.userName = parsedUser.name;  
    this.userRole = parsedUser.role;  
  }
}
  logout(): void{
    this.authService.logout();
  }
}
