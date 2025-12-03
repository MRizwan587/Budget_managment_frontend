import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from './material/material.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { RoleDirective } from './directives/role.directive';

@NgModule({
  declarations: [SidebarComponent, MainLayoutComponent, HeaderComponent, CurrencyFormatPipe, RoleDirective],
  imports: [CommonModule, RouterModule, CoreRoutingModule, MaterialModule],
  exports: [SidebarComponent, MainLayoutComponent, HeaderComponent, CurrencyFormatPipe],
})
export class CoreModule {}
