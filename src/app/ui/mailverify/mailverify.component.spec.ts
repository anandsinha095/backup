import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailverifyComponent } from './mailverify.component';

describe('MailverifyComponent', () => {
  let component: MailverifyComponent;
  let fixture: ComponentFixture<MailverifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailverifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
