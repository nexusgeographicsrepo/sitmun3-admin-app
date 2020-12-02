import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvesComponent } from './proves.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ProvesComponent', () => {
  let component: ProvesComponent;
  let fixture: ComponentFixture<ProvesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvesComponent ],
      providers: [HttpClient, HttpHandler]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
