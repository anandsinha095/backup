import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycCorporateComponent } from './kyc-corporate.component';

describe('KycCorporateComponent', () => {
  let component: KycCorporateComponent;
  let fixture: ComponentFixture<KycCorporateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycCorporateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
