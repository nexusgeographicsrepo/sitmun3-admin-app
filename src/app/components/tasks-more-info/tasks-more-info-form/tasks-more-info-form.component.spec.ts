import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksMoreInfoFormComponent } from './tasks-more-info-form.component';

describe('TasksMoreInfoFormComponent', () => {
  let component: TasksMoreInfoFormComponent;
  let fixture: ComponentFixture<TasksMoreInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksMoreInfoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksMoreInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
