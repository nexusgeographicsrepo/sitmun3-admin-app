import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreesComponent } from './trees.component';
import { TreeService } from 'dist/sitmun-frontend-core/';
import { HttpClientModule } from '@angular/common/http';
import { SitmunFrontendGuiModule } from 'dist/sitmun-frontend-gui/';
import { ExternalConfigurationService } from 'src/app/ExternalConfigurationService';
import { RouterTestingModule } from '@angular/router/testing';

describe('TreesComponent', () => {
  let component: TreesComponent;
  let fixture: ComponentFixture<TreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreesComponent ],
      imports : [HttpClientModule, SitmunFrontendGuiModule, RouterTestingModule],
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
