import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './categories-list/category.component';
import { CreateCategoryComponent } from './create-category/create-category.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },

  {
    path: '',
    component: CategoryComponent,
  },
  {
    path: 'create-category',
    component: CreateCategoryComponent,
  },
  {
    path: 'create-category/:id',
    component: CreateCategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
