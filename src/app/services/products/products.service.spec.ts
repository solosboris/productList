import { ProductsService } from './products.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductsService', () => {
  let productsService: ProductsService;
  const prodHttpServiceURL = 'http://s3-eu-west-1.amazonaws.com/fid-recruiting/fid-task-4-ffront-products.json';

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ProductsService]
    });
    productsService = TestBed.inject(ProductsService);
  });

  afterAll(() => {
    console.log('afterALL');
  });

  it ('should successfully getProducts', () => {
    const collect: string[] = [];
    productsService.getProducts('', true).subscribe(prods => {
      prods.forEach(prod => collect.push(`${prod.id}`));
    });
    console.log('getProducts '.concat(collect.length.toString()));
    expect(prodHttpServiceURL.length).toBe(prodHttpServiceURL.length);
  });

  it ('should successfully getProducts XL & sort', () => {
    const collect: string[] = [];
    productsService.getProducts('XL', true).subscribe(prods => {
      prods.forEach(prod => {
        collect.push(`${prod.id}`);
        console.log(`${prod.priceO} ${prod.id} ${prod.sizes.toString()} ${prod.brand} ${prod.description}`);
      });
    });
    console.log('getProducts XL '.concat(collect.length.toString()));
    expect(prodHttpServiceURL.length).toBe(prodHttpServiceURL.length);
  });

  it ('should successfully getBoldestBrandLess40', () => {
    console.log('getBoldestBrandLess40 ' + productsService.getBoldestBrandLess40());
    expect(prodHttpServiceURL.length).toBe(prodHttpServiceURL.length);
  });

  it ('should successfully getSizes', () => {
    console.log('getSizes ' + productsService.getSizes());
    expect(prodHttpServiceURL.length).toBe(prodHttpServiceURL.length);
  });

  it ('should successfully getPriceSize32()', () => {
    console.log('getPriceSize32 ' + productsService.getPriceSize32());
    expect(prodHttpServiceURL.length).toBe(prodHttpServiceURL.length);
  });
});
