import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCottonComponent } from './product-cotton.component';

describe('ProductCottonComponent', () => {
  let component: ProductCottonComponent;
  let fixture: ComponentFixture<ProductCottonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCottonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCottonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
