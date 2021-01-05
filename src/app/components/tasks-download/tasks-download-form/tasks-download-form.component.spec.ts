import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDownloadFormComponent } from './tasks-download-form.component';

describe('TasksDownloadFormComponent', () => {
  let component: TasksDownloadFormComponent;
  let fixture: ComponentFixture<TasksDownloadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksDownloadFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksDownloadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
