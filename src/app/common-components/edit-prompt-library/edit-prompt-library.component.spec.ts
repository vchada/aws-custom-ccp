import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPromptLibraryComponent } from './edit-prompt-library.component';

describe('EditPromptLibraryComponent', () => {
  let component: EditPromptLibraryComponent;
  let fixture: ComponentFixture<EditPromptLibraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPromptLibraryComponent]
    });
    fixture = TestBed.createComponent(EditPromptLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
