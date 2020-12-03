import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SitmunFrontendGuiModule } from 'dist/sitmun-frontend-gui/';
import { ExternalConfigurationService } from 'src/app/ExternalConfigurationService';
import { RouterTestingModule } from '@angular/router/testing';
import { BackgroundLayersComponent } from './background-layers.component';
import { BackgroundService } from 'dist/sitmun-frontend-core/';
import { MaterialModule } from '../../material-module';

describe('BackgroundLayersComponent', () => {
  let component: BackgroundLayersComponent;
  let fixture: ComponentFixture<BackgroundLayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundLayersComponent ],
      imports : [HttpClientModule, SitmunFrontendGuiModule, RouterTestingModule, MaterialModule],
      providers: [BackgroundService,
        { provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService }, ]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
