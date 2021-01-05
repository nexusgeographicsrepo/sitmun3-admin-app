import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksLocatorFormComponent } from './tasks-locator-form.component';

describe('TasksLocatorFormComponent', () => {
  let component: TasksLocatorFormComponent;
  let fixture: ComponentFixture<TasksLocatorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksLocatorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksLocatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
