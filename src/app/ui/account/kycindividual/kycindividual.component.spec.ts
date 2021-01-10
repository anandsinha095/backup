import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycindividualComponent } from './kycindividual.component';

describe('KycindividualComponent', () => {
  let component: KycindividualComponent;
  let fixture: ComponentFixture<KycindividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycindividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycindividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
