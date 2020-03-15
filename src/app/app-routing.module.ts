import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StartComponent } from './start/start.component';

export const routes: Routes = [
  {path: 'prodsListApp', component: AppComponent},
  {path: 'productList', component: ProductlistComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: 'start', component: StartComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }