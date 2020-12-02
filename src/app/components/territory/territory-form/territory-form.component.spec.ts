import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoryFormComponent } from './territory-form.component';
import { RouterModule } from '@angular/router';

describe('TerritoryFormComponent', () => {
  let component: TerritoryFormComponent;
  let fixture: ComponentFixture<TerritoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerritoryFormComponent ],
      imports: [ RouterModule.forRoot([]),]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerritoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
