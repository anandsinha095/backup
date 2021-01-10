import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycindividualresubmitComponent } from './kycindividualresubmit.component';

describe('KycindividualresubmitComponent', () => {
  let component: KycindividualresubmitComponent;
  let fixture: ComponentFixture<KycindividualresubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycindividualresubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycindividualresubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
