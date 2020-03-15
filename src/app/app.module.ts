import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductsService } from './services/products/products.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatisticsComponent } from './statistics/statistics.component';
import { StartComponent } from './start/start.component';

@NgModule({
  declarations: [ AppComponent, ProductlistComponent, StatisticsComponent, StartComponent ],
  imports: [
    AppRoutingModule, BrowserModule, HttpClientModule,
    RouterModule.forRoot(routes), FormsModule,
    CommonModule, FlexLayoutModule,
    MatIconModule, MatButtonModule, MatInputModule,
    MatCardModule, MatFormFieldModule, BrowserAnimationsModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/prodsListApp' },
              { provide: ProductsService, useClass: ProductsService }],
  bootstrap: [AppComponent]
})
export class AppModule { }