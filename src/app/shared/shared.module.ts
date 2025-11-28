import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    LoaderComponent,
    ConfirmDialogComponent,
    CurrencyFormatPipe,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    LoaderComponent,
    ConfirmDialogComponent,
    CurrencyFormatPipe,
    DateFormatPipe
  ]
})
export class SharedModule { }
