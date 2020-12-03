import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundLayersFormComponent } from './background-layers-form.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material-module';

describe('BackgroundLayersFormComponent', () => {
  let component: BackgroundLayersFormComponent;
  let fixture: ComponentFixture<BackgroundLayersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundLayersFormComponent ],
      imports: [ RouterModule.forRoot([]),MaterialModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundLayersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
