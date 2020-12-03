import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDocumentComponent } from './tasks-document.component';
import { RouterModule } from '@angular/router';

describe('TasksDocumentComponent', () => {
  let component: TasksDocumentComponent;
  let fixture: ComponentFixture<TasksDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksDocumentComponent ],
      imports: [ RouterModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
