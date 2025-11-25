import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAuthenticatorComponent } from './verify-authenticator.component';

describe('VerifyAuthenticatorComponent', () => {
  let component: VerifyAuthenticatorComponent;
  let fixture: ComponentFixture<VerifyAuthenticatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyAuthenticatorComponent]
    });
    fixture = TestBed.createComponent(VerifyAuthenticatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
