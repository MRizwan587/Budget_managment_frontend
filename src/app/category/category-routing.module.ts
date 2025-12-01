import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CreateCategoryComponent } from './create-category/create-category.component';

const routes: Routes = [

   {
        path: '',
        redirectTo: '', // Redirects '/auth' to '/auth/login'
        pathMatch: 'full'
      },
    
      // 2. Login Path: Handles the '/auth/login' route.
      {
        path: '',
        component: CategoryComponent
      },
      {
        path: 'create-category',
        component: CreateCategoryComponent
      },
      {
        path: 'create-category/:id',
        component: CreateCategoryComponent
      },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
