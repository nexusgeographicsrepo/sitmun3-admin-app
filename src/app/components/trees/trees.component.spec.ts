import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreesComponent } from './trees.component';
import { TreeService } from 'dist/sitmun-frontend-core/';
import { HttpClientModule } from '@angular/common/http';
import { SitmunFrontendGuiModule } from 'dist/sitmun-frontend-gui/';
import { ExternalConfigurationService } from 'src/app/ExternalConfigurationService';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material-module';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TreesComponent', () => {
  let component: TreesComponent;
  let fixture: ComponentFixture<TreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreesComponent ],
      imports : [HttpClientTestingModule, SitmunFrontendGuiModule, RouterTestingModule, MaterialModule, RouterModule],
      providers: [TreeService,
        { provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService }, ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
