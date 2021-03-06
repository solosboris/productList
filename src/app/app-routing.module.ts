import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { StartComponent } from './components/start/start.component';

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