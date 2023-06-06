import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeLocationComponent } from './liste-location.component';

describe('ListeLocationComponent', () => {
  let component: ListeLocationComponent;
  let fixture: ComponentFixture<ListeLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
