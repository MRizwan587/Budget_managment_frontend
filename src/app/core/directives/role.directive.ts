import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective {

  constructor(private userService: UserService, private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set appRole(role: any){

   const userRole= this.userService.getRole();
    if (userRole === role) {
      
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      
      this.viewContainer.clear();
    }
  }

}
