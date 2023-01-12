import { NgModule, ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostingItemComponent } from './components/posting-item/posting-item.component';
import { ShowProductComponent } from './components/show-product/show-product.component';
import { UpdateItemComponent } from './components/update-item/update-item.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'item', component: PostingItemComponent },
  { path: 'update-item/:prouduct_id', component: UpdateItemComponent },
  { path: 'show-item/:prouduct_id', component: ShowProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
