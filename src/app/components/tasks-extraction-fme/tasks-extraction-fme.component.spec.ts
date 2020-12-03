import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksExtractionFmeComponent } from './tasks-extraction-fme.component';
import { RouterModule } from '@angular/router';

describe('TasksExtractionFmeComponent', () => {
  let component: TasksExtractionFmeComponent;
  let fixture: ComponentFixture<TasksExtractionFmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksExtractionFmeComponent ],
      imports: [ RouterModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksExtractionFmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
