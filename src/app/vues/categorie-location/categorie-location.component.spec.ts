import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieLocationComponent } from './categorie-location.component';

describe('CategorieLocationComponent', () => {
  let component: CategorieLocationComponent;
  let fixture: ComponentFixture<CategorieLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
