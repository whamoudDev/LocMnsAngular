import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEditionGestionnaireComponent } from './ajouteditiongestionnaire.component';

describe('AjoutgestionnaireComponent', () => {
  let component: AjoutEditionGestionnaireComponent;
  let fixture: ComponentFixture<AjoutEditionGestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjoutEditionGestionnaireComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AjoutEditionGestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
