import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPerformanceComponent } from './team-performance.component';

describe('TeamPerformanceComponent', () => {
  let component: TeamPerformanceComponent;
  let fixture: ComponentFixture<TeamPerformanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamPerformanceComponent]
    });
    fixture = TestBed.createComponent(TeamPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
