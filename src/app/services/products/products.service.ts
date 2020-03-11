import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

export interface Product {
  id: string,
  brand: string,
  description?: string,
  priceO: number,
  priceR?: number,
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

  private __getAllProducts(): Observable<Product[]> {
    return this.__httpClient.get<Product[]>(this.__prodHttpServiceURL)
      .pipe(catchError(this.handleError<Product[]>('__getAllProducts', [])));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} has failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }  

  public getProducts(size?: string, orderByPrice: boolean = false): Observable<Product[]> {
    let filtered: Product[] = [];
    let toFilter: boolean = size && size.length != 0;
    this.__getAllProducts().subscribe(products => products.forEach(prod => {
                                                      if ((toFilter && prod.sizes.includes(size)) || (!toFilter)) {
                                                        filtered.push(prod);
                                                      }
                                                    }));
    return of(filtered).pipe(map(prods => orderByPrice ? prods.sort((prod1, prod2) => prod1.priceO - prod2.priceO) : prods));
  }

  public getBoldestBrandLess40(): string {
    let prodMap = new Map();
    this.__getAllProducts().pipe(filter((prods, index) => prods[index].priceO < 40))
      .subscribe(products =>
          products.forEach(prod => prodMap.set(prod.brand, prodMap.has(prod.brand) ? prodMap.get(prod.brand) + 1 : 1)));
    let brand: string = null;
    for (let entry of prodMap.entries()) {
        brand = brand ? (entry[1] < prodMap.get(brand) ? brand : entry[0]) : entry[0];
    }
    return brand ? brand.concat(': ').concat(prodMap.get(brand).toString()) : 'no size less 40';
  }

  public getSizes(): string {
    let prodMap = new Map();
    this.__getAllProducts().subscribe(products =>
          products.forEach(prod => prodMap.set(prod.brand,
                                               (prodMap.has(prod.brand) ? prodMap.get(prod.brand) : 0) + prod.sizes.length)));
    let brand: string = null;
    for (let brandCount of prodMap.entries()) {
        brand = brand ? (brandCount[1] < prodMap.get(brand) ? brand : brandCount[0]) : brandCount[0];
    }          
    return brand ? brand.concat(': ').concat(prodMap.get(brand).toString()) : 'no sizes mapping';
  }

  public getPriceSize32(): string {
    let prodPrice = new Map();
    let prodCount = new Map();

    this.__getAllProducts().subscribe(products => products.forEach(product => {
      if (product.sizes.includes('32')) {
        let isBrand: boolean = prodPrice.has(product.brand);
        prodPrice.set(product.brand, (isBrand ? prodPrice.get(product.brand) : 0) + product.priceO);
        prodCount.set(product.brand, (isBrand ? prodCount.get(product.brand) : 0) + 1);
      }
    }));

    let lowestAvgBrand: string = null;
    let avgPrice: number;
    for (let entry of prodPrice.entries()) {
        if (lowestAvgBrand) {
          let tmpAvgPrice: number = prodPrice.get(entry[0]) / prodCount.get(entry[0]);
          if (avgPrice > tmpAvgPrice) {
            avgPrice = tmpAvgPrice;
            lowestAvgBrand = entry[0];
          }
        } else {
          lowestAvgBrand = entry[0];
          avgPrice = prodPrice.get(lowestAvgBrand) / prodCount.get(lowestAvgBrand);
        }
    }          
    return (lowestAvgBrand && avgPrice) ? lowestAvgBrand.concat(': ').concat(avgPrice.toString()) : 'no for 32nd sizes';
  }
}