import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptActionRendererComponent } from './prompt-action-renderer.component';

describe('PromptActionRendererComponent', () => {
  let component: PromptActionRendererComponent;
  let fixture: ComponentFixture<PromptActionRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromptActionRendererComponent]
    });
    fixture = TestBed.createComponent(PromptActionRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
