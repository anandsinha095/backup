import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorisedComponent } from './authorised.component';

describe('AuthorisedComponent', () => {
  let component: AuthorisedComponent;
  let fixture: ComponentFixture<AuthorisedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorisedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
