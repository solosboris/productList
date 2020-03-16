import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['../../app.component.css'],
  providers: [ ProductsService ]
})
export class StatisticsComponent implements OnInit {

  topBrandLess40 = '';
  sizes = '';
  priceSize32 = '';

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.topBrandLess40 = this.productsService.getBoldestBrandLess40();
    this.sizes = this.productsService.getSizes();
    this.priceSize32 = this.productsService.getPriceSize32();
  }
}