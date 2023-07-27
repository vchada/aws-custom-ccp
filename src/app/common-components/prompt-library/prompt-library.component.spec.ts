import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptLibraryComponent } from './prompt-library.component';

describe('PromptLibraryComponent', () => {
  let component: PromptLibraryComponent;
  let fixture: ComponentFixture<PromptLibraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromptLibraryComponent]
    });
    fixture = TestBed.createComponent(PromptLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
