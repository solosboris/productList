import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Product } from './product';
import { simulatedLocalProducts } from './productsArray';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  /**
   * Note that if you do use this API key,
   * it will only work if the URL in
   * your browser is "localhost"
   */
  private prodHttpServiceURL = 'http://s3-eu-west-1.amazonaws.com/fid-recruiting/fid-task-4-ffront-products.json';

  constructor(private httpClient: HttpClient) { }

  private getAllProducts(): Observable<Product[]> {
    /*
    return this.httpClient.get<Product[]>(this.prodHttpServiceURL)
      .pipe(tap(_ => console.log('fetched the products from '.concat(this.prodHttpServiceURL))),
            catchError(this.handleError<Product[]>('getAllProducts', [])));
    */
    return of(simulatedLocalProducts);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} has failed - ${error.message}`);
      // keep the app running by returning an empty result.
      return of(result as T);
    };
  }

  public getProducts(size?: string, orderByPrice: boolean = false): Observable<Product[]> {
    const filtered: Product[] = [];
    const toFilter: boolean = size && size.length !== 0;
    this.getAllProducts().subscribe(products => products.forEach(prod => {
                                                      if ((toFilter && prod.sizes.includes(size)) || (!toFilter)) {
                                                        filtered.push(prod);
                                                      }
                                                    }));
    return of(filtered).pipe(map(prods => orderByPrice ? prods.sort((prod1, prod2) => prod1.priceO - prod2.priceO) : prods));
  }

  public getBoldestBrandLess40(): string {
    const prodMap = new Map();
    this.getAllProducts().pipe(filter((prods, index) => prods[index].priceO < 40))
      .subscribe(products =>
          products.forEach(prod => prodMap.set(prod.brand, prodMap.has(prod.brand) ? prodMap.get(prod.brand) + 1 : 1)));
    let brand: string = null;
    for (let entry of prodMap.entries()) {
        brand = brand ? (entry[1] < prodMap.get(brand) ? brand : entry[0]) : entry[0];
    }
    return brand ? brand.concat(': ').concat(prodMap.get(brand).toString()) : 'no size less 40';
  }

  public getSizes(): string {
    const prodMap = {};
    this.getAllProducts().subscribe(products =>
          products.forEach(prod => { prodMap[prod.brand] = prodMap[prod.brand] ? prodMap[prod.brand] : [];
                                     prod.sizes.forEach(size => prodMap[prod.brand].push(size));
                                   }));
    const brandSizes = {};
    Object.keys(prodMap).forEach(brand => {
      if (prodMap.hasOwnProperty(brand)) {
        const sizesUnique: string[] = [];
        prodMap[brand].forEach(size => {
          if (!sizesUnique.includes(size.toString())) {
              sizesUnique.push(size.toString());
          }
        });
        brandSizes[brand] = sizesUnique;
      }
    });
    let brandMax: string = null;
    Object.keys(brandSizes).forEach(brand => {
        brandMax = brandSizes.hasOwnProperty(brand) ?
                    (brandMax ? (brandSizes[brand].length > brandSizes[brandMax].length ? brand : brandMax) :
                                 brand) :
                    brandMax;
    });
    return brandMax ?
            'max sized '.concat(brandMax)
              .concat(': ').concat(brandSizes[brandMax].toString())
              .concat(' ').concat(brandSizes[brandMax].length.toString()) : 'no sizes mapping';
  }

  public getPriceSize32(): string {
    const prodPrice = new Map();
    const prodCount = new Map();

    this.getAllProducts().subscribe(products => products.forEach(product => {
      if (product.sizes.includes('32')) {
        const isBrand: boolean = prodPrice.has(product.brand);
        prodPrice.set(product.brand, (isBrand ? prodPrice.get(product.brand) : 0) + product.priceO);
        prodCount.set(product.brand, (isBrand ? prodCount.get(product.brand) : 0) + 1);
      }
    }));

    let lowestAvgBrand: string = null;
    let avgPrice: number;
    for (let entry of prodPrice.entries()) {
        if (lowestAvgBrand) {
          const tmpAvgPrice: number = prodPrice.get(entry[0]) / prodCount.get(entry[0]);
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
