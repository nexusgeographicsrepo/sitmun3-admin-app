import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayersPermitsFormComponent } from './layers-permits-form.component';
import { RouterModule } from '@angular/router';

describe('LayersPermitsFormComponent', () => {
  let component: LayersPermitsFormComponent;
  let fixture: ComponentFixture<LayersPermitsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayersPermitsFormComponent ],
      imports: [ RouterModule.forRoot([]),]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayersPermitsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
