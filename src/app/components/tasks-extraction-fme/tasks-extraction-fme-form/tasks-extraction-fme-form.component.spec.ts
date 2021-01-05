import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksExtractionFmeFormComponent } from './tasks-extraction-fme-form.component';

describe('TasksExtractionFmeFormComponent', () => {
  let component: TasksExtractionFmeFormComponent;
  let fixture: ComponentFixture<TasksExtractionFmeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksExtractionFmeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksExtractionFmeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
