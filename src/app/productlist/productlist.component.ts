import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService, Product } from '../services/products/products.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['../app.component.css'],
  providers: [ ProductsService ]
})
export class ProductlistComponent implements OnInit {

  public prods: Product[] = [];

  constructor(private __productsService: ProductsService) { }

  ngOnInit(): void { }

  onSubmit(size) {
    console.log('size '.concat(size));
    this.prods = [];
    this.__productsService.getProducts(size).subscribe(products => products.forEach(prod => { this.prods.push(prod); }));
    this.prods.forEach(prod => {
      console.log(`${prod.brand} ${prod.description} ${prod.priceO}\n${prod.url}\n${prod.images.toString()}\n${prod.sizes.toString()}`);
    });
  }
}