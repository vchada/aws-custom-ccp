import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueStatisticsComponent } from './queue-statistics.component';

describe('QueueStatisticsComponent', () => {
  let component: QueueStatisticsComponent;
  let fixture: ComponentFixture<QueueStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueueStatisticsComponent]
    });
    fixture = TestBed.createComponent(QueueStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
