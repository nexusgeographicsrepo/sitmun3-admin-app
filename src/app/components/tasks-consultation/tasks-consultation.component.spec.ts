import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksConsultationComponent } from './tasks-consultation.component';
import { RouterModule } from '@angular/router';

describe('TasksConsultationComponent', () => {
  let component: TasksConsultationComponent;
  let fixture: ComponentFixture<TasksConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksConsultationComponent ],
      imports: [ RouterModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
