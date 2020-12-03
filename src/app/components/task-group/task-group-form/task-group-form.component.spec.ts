import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGroupFormComponent } from './task-group-form.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material-module';

describe('TaskGroupFormComponent', () => {
  let component: TaskGroupFormComponent;
  let fixture: ComponentFixture<TaskGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskGroupFormComponent ],
      imports: [ RouterModule.forRoot([]), MaterialModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
