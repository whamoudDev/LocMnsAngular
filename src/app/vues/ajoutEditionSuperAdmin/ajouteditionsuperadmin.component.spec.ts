import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEditionSuperAdminComponent } from './ajouteditionsuperadmin.component';

describe('AjouteditionsuperadminComponent', () => {
  let component: AjoutEditionSuperAdminComponent;
  let fixture: ComponentFixture<AjoutEditionSuperAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjoutEditionSuperAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AjoutEditionSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
