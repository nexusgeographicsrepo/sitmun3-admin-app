import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksReportFormComponent } from './tasks-report-form.component';

describe('TasksReportFormComponent', () => {
  let component: TasksReportFormComponent;
  let fixture: ComponentFixture<TasksReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksReportFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
