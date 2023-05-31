import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetourProlongationComponent } from './retour-prolongation.component';

describe('RetourProlongationComponent', () => {
  let component: RetourProlongationComponent;
  let fixture: ComponentFixture<RetourProlongationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetourProlongationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetourProlongationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
