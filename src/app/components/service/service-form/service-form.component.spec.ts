import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceFormComponent } from '../service-form/service-form.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material-module';

describe('ServiceFormComponent', () => {
  let component: ServiceFormComponent;
  let fixture: ComponentFixture<ServiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceFormComponent ],
      imports: [ RouterModule.forRoot([]), MaterialModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
