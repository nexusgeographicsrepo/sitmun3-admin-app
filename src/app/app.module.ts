import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { ServiceComponent } from './components/service/service.component';
import { LayersComponent } from './components/layers/layers.component';
import { TreesComponent } from './components/trees/trees.component';
import { BackgroundLayersComponent } from './components/background-layers/background-layers.component';
import { LayersPermitsComponent } from './components/layers-permits/layers-permits.component';
import { TerritoryComponent } from './components/territory/territory.component';
import { UserComponent } from './components/user/user.component';
import { ApplicationComponent } from './components/application/application.component';
import { IndexComponent } from './components/index/index.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app-routes';
import { RoleComponent } from './components/role/role.component';
import { SideMenuComponent } from './components/shared/side-menu/side-menu.component';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ExternalConfigurationService } from './ExternalConfigurationService';
import { AngularHalModule } from 'dist/sitmun-frontend-core/';
import { SitmunFrontendGuiModule } from 'dist/sitmun-frontend-gui/';
import { AgGridModule } from '@ag-grid-community/angular';
import { RoleService } from 'dist/sitmun-frontend-core/';
import { ProvesComponent } from './components/proves/proves.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { SidenavService } from './services/sidenav.service';
import { TasksDownloadComponent } from './components/tasks-download/tasks-download.component';
import { TasksDocumentComponent } from './components/tasks-document/tasks-document.component';
import { TasksConsultationComponent } from './components/tasks-consultation/tasks-consultation.component';
import { TasksMoreInfoComponent } from './components/tasks-more-info/tasks-more-info.component';
import { TasksLocatorComponent } from './components/tasks-locator/tasks-locator.component';
import { TasksReportComponent } from './components/tasks-report/tasks-report.component';
import { TasksEditionComponent } from './components/tasks-edition/tasks-edition.component';
import { TasksThematicComponent } from './components/tasks-thematic/tasks-thematic.component';
import { TasksExtractionFmeComponent } from './components/tasks-extraction-fme/tasks-extraction-fme.component';
//
@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    ServiceComponent,
    LayersComponent,
    TreesComponent,
    BackgroundLayersComponent,
    LayersPermitsComponent,
    TerritoryComponent,
    UserComponent,
    ApplicationComponent,
    IndexComponent,
    SideMenuComponent,
    RoleComponent,
    ToolbarComponent,
    ProvesComponent,
    TasksDownloadComponent,
    TasksDocumentComponent,
    TasksConsultationComponent,
    TasksMoreInfoComponent,
    TasksLocatorComponent,
    TasksReportComponent,
    TasksEditionComponent,
    TasksThematicComponent,
    TasksExtractionFmeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularHalModule,
    SitmunFrontendGuiModule,
    MaterialModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot(APP_ROUTES, { useHash: true }),
    BrowserAnimationsModule
  ],
  providers: [SidenavService, { provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService },
    RoleService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
