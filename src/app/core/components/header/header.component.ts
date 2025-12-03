import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
constructor(private userService: UserService){}


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
    this.userService.logout();
  }
}
