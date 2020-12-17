import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Role } from 'dist/sitmun-frontend-core/role/role.model';
import { RoleService } from 'dist/sitmun-frontend-core/';
import { ApplicationService } from 'dist/sitmun-frontend-core/';
import { BtnEditRenderedComponent } from 'dist/sitmun-frontend-gui/';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-prova-dialog',
  templateUrl: './prova-dialog.component.html',
  styleUrls: ['./prova-dialog.component.scss']
})
export class ProvaDialogComponent{

  themeGrid: any = environment.agGridTheme;
  getAlls: Array<() => Observable<any>> = [];
  colDefs: Array<any[]> = [];
  public frameworkComponents = {
    btnEditRendererComponent: BtnEditRenderedComponent
  };
columnDefs = [
    {
      headerName: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      editable: false,
      filter: false,
      width: 50,
      lockPosition:true,
    },
    { headerName: 'ID', field: 'id', editable: false },
    { headerName: 'Name', field: 'name' },
    { headerName: 'CreatedDAte', field: 'createdDate'} //  valueFormatter: this.dateFormatter,
  ];



  constructor(private http: HttpClient,
              public roleService: ApplicationService,
              ) {
                console.log('TAMO EN PRUEBA O NO');
                this.getAlls.push(this.getAllRoles);
                this.getAlls.push(this.getAllRoles);
                this.getAlls.push(this.getAllRoles);
                this.colDefs.push(this.columnDefs);
                this.colDefs.push(this.columnDefs);
                this.colDefs.push(this.columnDefs);


  }


getAllRoles = () => {
    return this.roleService.getAll();

  }


}
 