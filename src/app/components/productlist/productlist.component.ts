import { Component, OnInit } from '@angular/core';
import { ProductsService, Product } from '../../services/products/products.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['../../app.component.css'],
  providers: [ ProductsService ]
})
export class ProductlistComponent implements OnInit {

  public prods: Product[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void { }

  onSubmit(size: string) {
    this.prods = [];
    this.productsService.getProducts(size).subscribe(products => products.forEach(prod => { this.prods.push(prod); }));
  }
}