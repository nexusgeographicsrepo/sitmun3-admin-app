import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayersPermitsFormComponent } from './layers-permits-form.component';
import { RouterModule } from '@angular/router';
import { CartographyGroupService } from 'dist/sitmun-frontend-core/';
import { SitmunFrontendGuiModule } from 'dist/sitmun-frontend-gui/';
import { ExternalConfigurationService } from 'src/app/ExternalConfigurationService';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../material-module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('LayersPermitsFormComponent', () => {
  let component: LayersPermitsFormComponent;
  let fixture: ComponentFixture<LayersPermitsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayersPermitsFormComponent ],
      imports: [ RouterModule.forRoot([]), HttpClientTestingModule, SitmunFrontendGuiModule,
      RouterTestingModule, MaterialModule, RouterModule, MatIconTestingModule],
      providers: [CartographyGroupService,
        { provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService }, ]
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
