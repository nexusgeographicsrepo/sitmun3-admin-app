import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { APP_ROUTES } from './app-routing.module';
import { RoleComponent } from './components/role/role.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { DownloadComponent } from './components/download/download.component';
import { DocumentComponent } from './components/document/document.component';
import { MoreInformationComponent } from './components/more-information/more-information.component';
import { LocatorComponent } from './components/locator/locator.component';
import { ReportComponent } from './components/report/report.component';
import { EditionComponent } from './components/edition/edition.component';
import { ThematicComponent } from './components/thematic/thematic.component';
import { FmeExtractionComponent } from './components/fme-extraction/fme-extraction.component';


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
    RoleComponent,
    TasksComponent,
    DownloadComponent,
    DocumentComponent,
    MoreInformationComponent,
    LocatorComponent,
    ReportComponent,
    EditionComponent,
    ThematicComponent,
    FmeExtractionComponent   
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES, {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
