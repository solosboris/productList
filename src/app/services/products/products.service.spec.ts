import { Product, ProductsService } from './products.service';
import { Observable } from 'rxjs';
import { TestBed, async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ProductsService]
    });
    productsService = TestBed.get(ProductsService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it ('should successfully get products', () => {
    let products: Observable<Product []> = productsService.getProducts('', true);
    products.forEach(res => {
      res.forEach(prod => console.log(prod.id.concat(' ').concat(prod.description).concat(' ').concat(prod.priceO.toString())));
    });
    const httpRequest = httpTestingController.expectOne('https://s3-eu-west-1.amazonaws.com/fid-recruiting/fid-task-4-ffront-products.json');
    expect(httpRequest.request.method).toBe('GET');
    console.log('ProductsService ok');
    httpTestingController.verify();
  });
});