import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreesFormComponent } from './trees-form.component';

describe('TreesFormComponent', () => {
  let component: TreesFormComponent;
  let fixture: ComponentFixture<TreesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
