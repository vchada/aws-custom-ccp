import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationInformationComponent } from './verification-information.component';

describe('VerificationInformationComponent', () => {
  let component: VerificationInformationComponent;
  let fixture: ComponentFixture<VerificationInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationInformationComponent]
    });
    fixture = TestBed.createComponent(VerificationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
