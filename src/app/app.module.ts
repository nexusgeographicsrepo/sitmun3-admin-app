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
    ProvesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularHalModule,
    SitmunFrontendGuiModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot(APP_ROUTES, {useHash: true})
  ],
  providers: [{ provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService },
  RoleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
