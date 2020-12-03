import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksLocatorComponent } from './tasks-locator.component';
import { RouterModule } from '@angular/router';

describe('TasksLocatorComponent', () => {
  let component: TasksLocatorComponent;
  let fixture: ComponentFixture<TasksLocatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksLocatorComponent ],
      imports: [ RouterModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksLocatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
