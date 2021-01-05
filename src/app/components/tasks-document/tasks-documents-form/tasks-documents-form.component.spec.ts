import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDocumentsFormComponent } from './tasks-documents-form.component';

describe('TasksDocumentsFormComponent', () => {
  let component: TasksDocumentsFormComponent;
  let fixture: ComponentFixture<TasksDocumentsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksDocumentsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksDocumentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
