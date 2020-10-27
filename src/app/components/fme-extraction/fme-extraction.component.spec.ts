import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmeExtractionComponent } from './fme-extraction.component';

describe('FmeExtractionComponent', () => {
  let component: FmeExtractionComponent;
  let fixture: ComponentFixture<FmeExtractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmeExtractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmeExtractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
