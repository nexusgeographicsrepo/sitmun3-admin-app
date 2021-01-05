import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksThematicFormComponent } from './tasks-thematic-form.component';

describe('TasksThematicFormComponent', () => {
  let component: TasksThematicFormComponent;
  let fixture: ComponentFixture<TasksThematicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksThematicFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksThematicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
