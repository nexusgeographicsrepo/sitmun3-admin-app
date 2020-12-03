import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDownloadComponent } from './tasks-download.component';
import { RouterModule } from '@angular/router';

describe('TasksDownloadComponent', () => {
  let component: TasksDownloadComponent;
  let fixture: ComponentFixture<TasksDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksDownloadComponent ],
      imports: [ RouterModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
