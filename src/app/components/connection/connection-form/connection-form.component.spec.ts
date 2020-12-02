import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionFormComponent } from '../connection-form/connection-form.component';
import { RouterModule } from '@angular/router';

describe('ConnectionFormComponent', () => {
  let component: ConnectionFormComponent;
  let fixture: ComponentFixture<ConnectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionFormComponent ],
      imports: [ RouterModule.forRoot([]),]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
