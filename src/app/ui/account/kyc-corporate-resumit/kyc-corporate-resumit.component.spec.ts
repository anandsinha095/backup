import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycCorporateResumitComponent } from './kyc-corporate-resumit.component';

describe('KycCorporateResumitComponent', () => {
  let component: KycCorporateResumitComponent;
  let fixture: ComponentFixture<KycCorporateResumitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycCorporateResumitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycCorporateResumitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
