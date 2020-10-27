import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { ServiceComponent } from './components/service/service.component';
import { LayersComponent } from './components/layers/layers.component';
import { TreesComponent } from './components/trees/trees.component';
import { BackgroundLayersComponent } from './components/background-layers/background-layers.component';
import { LayersPermitsComponent } from './components/layers-permits/layers-permits.component';
import { TerritoryComponent } from './components/territory/territory.component';
import { RoleComponent } from './components/role/role.component';
import { UserComponent } from './components/user/user.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ApplicationComponent } from './components/application/application.component';
import { DownloadComponent } from './components/download/download.component';
import { DocumentComponent } from './components/document/document.component';
import { MoreInformationComponent } from './components/more-information/more-information.component';
import { LocatorComponent } from './components/locator/locator.component';
import { ReportComponent } from './components/report/report.component';
import { EditionComponent } from './components/edition/edition.component';
import { ThematicComponent } from './components/thematic/thematic.component';
import { FmeExtractionComponent } from './components/fme-extraction/fme-extraction.component';

export const APP_ROUTES: Routes = [
    {path: 'index', component: IndexComponent},
    {path: 'connection', component: ConnectionComponent},
    {path: 'service', component: ServiceComponent},
    {path: 'layers', component: LayersComponent},
    {path: 'trees', component: TreesComponent},
    {path: 'backgroundLayers', component: BackgroundLayersComponent},
    {path: 'layersPermits', component: LayersPermitsComponent},
    {path: 'territory', component: TerritoryComponent},
    {path: 'role', component: RoleComponent},
    {path: 'user', component: UserComponent},
    {path: 'tasks', component: TasksComponent},
    {path: 'tasks/download', component: DownloadComponent},
    {path: 'tasks/document', component: DocumentComponent},
    {path: 'tasks/download', component: DownloadComponent}, // FALTA CONSULTA (QUERY O CONSULTATION)
    {path: 'tasks/moreInformation', component: MoreInformationComponent},
    {path: 'tasks/locator', component: LocatorComponent},
    {path: 'tasks/report', component: ReportComponent},
    {path: 'tasks/edition', component: EditionComponent},
    {path: 'tasks/thematic', component: ThematicComponent},
    {path: 'tasks/fmeExtraction', component: FmeExtractionComponent},
    {path: 'application', component: ApplicationComponent},
    {path: '', pathMatch: 'full', redirectTo: 'index' },
    {path: '**', pathMatch: 'full', redirectTo: 'index' }

];

