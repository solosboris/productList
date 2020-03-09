import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface Product {
  id: string,
  brand: string,
  description: string,
  priceO: number,
  priceR: number,
  url: string,
  images: string[],
  sizes: string[]
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private __prodHttpServiceURL: string = 'https://s3-eu-west-1.amazonaws.com/fid-recruiting/fid-task-4-ffront-products.json';

  constructor(private __httpClient: HttpClient) { }

  public getProducts(size?: string, orderByPrice: boolean = false): Observable<Product []> {
    return this.__httpClient.get<Product []>(this.__prodHttpServiceURL).pipe(
      filter((value, index) => (size && size.length !== 0 ? value[index].sizes.includes(size) : true)),
      map(prod => orderByPrice ? prod.sort((item1,item2) => item1.priceO - item2.priceO) : prod)
    );
  }
}