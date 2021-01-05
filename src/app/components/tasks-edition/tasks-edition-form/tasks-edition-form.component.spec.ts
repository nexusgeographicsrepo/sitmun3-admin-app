import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksEditionFormComponent } from './tasks-edition-form.component';

describe('TasksEditionFormComponent', () => {
  let component: TasksEditionFormComponent;
  let fixture: ComponentFixture<TasksEditionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksEditionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksEditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
