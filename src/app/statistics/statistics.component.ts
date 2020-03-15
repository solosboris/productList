import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products/products.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['../app.component.css'],
  providers: [ ProductsService ]
})
export class StatisticsComponent implements OnInit {

  topBrandLess40: string = '';
  sizes: string = '';
  priceSize32: string = '';

  constructor(private __productsService: ProductsService) { }

  ngOnInit(): void { 
    this.topBrandLess40 = this.__productsService.getBoldestBrandLess40();
    this.sizes = this.__productsService.getSizes();
    this.priceSize32 = this.__productsService.getPriceSize32();
  }
}