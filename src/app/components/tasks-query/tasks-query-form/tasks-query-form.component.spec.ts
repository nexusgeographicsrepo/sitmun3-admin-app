import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksQueryFormComponent } from './tasks-query-form.component';

describe('TasksQueryFormComponent', () => {
  let component: TasksQueryFormComponent;
  let fixture: ComponentFixture<TasksQueryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksQueryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksQueryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
