import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '../../services/products/products.service';
import { StatisticsComponent } from './statistics.component';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
      declarations: [ StatisticsComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#1 should getBoldestBrandLess40', () => {
    component.ngOnInit();
    expect(component.topBrandLess40 !== 'no size less 40').toBeTruthy();
  });

  it('#2 should getBoldestBrandLess40', () => {
    component.ngOnInit();
    expect(component.topBrandLess40.indexOf(':') > 0).toBeTruthy();
  });

  it('#1 should getSizes', () => {
    component.ngOnInit();
    expect(component.sizes !== 'no sizes mapping').toBeTruthy();
  });

  it('#2 should getSizes', () => {
    component.ngOnInit();
    expect(component.sizes.indexOf('max sized') == 0).toBeTruthy();
  });

  it('#1 should getPriceSize32', () => {
    component.ngOnInit();
    expect(component.priceSize32 !== 'no for 32nd sizes').toBeTruthy();
  });

  it('#2 should getPriceSize32', () => {
    component.ngOnInit();
    expect(component.priceSize32.indexOf(':') > 0).toBeTruthy();
  });
});