import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Role } from 'dist/sitmun-frontend-core/role/role.model';
import { RoleService, UserConfigurationService } from 'dist/sitmun-frontend-core/';
import { TerritoryService, UserService } from 'dist/sitmun-frontend-core/';
import { DialogGridComponent } from 'dist/sitmun-frontend-gui/';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-prova-dialog',
  templateUrl: './prova-dialog.component.html',
  styleUrls: ['./prova-dialog.component.scss']
})
export class ProvaDialogComponent{

  buttonAddClicked: Subject<boolean> = new Subject <boolean>();
  themeGrid: any = environment.agGridTheme;
  getAlls: Array<() => Observable<any>> = [];
  colDefs: Array<any[]> = [];
  singleSelectionTable: Array<boolean> = [];
  titlesTable: Array<string> = [];

columnDefsUsers = [
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
    { headerName: 'Username', field: 'username' },
  ];
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
  ];



  constructor(public dialog: MatDialog,
              private http: HttpClient,
              public userService: UserService,
              public roleService: RoleService,
              public territoryService: TerritoryService,
              public userConfigurationService: UserConfigurationService,
              ) {
                console.log('TAMO EN PRUEBA O NO');
                this.getAlls.push(this.getAllRoles);
                this.getAlls.push(this.getAllUsers);
                this.getAlls.push(this.getAllTerritories);
                this.colDefs.push(this.columnDefs);
                this.colDefs.push(this.columnDefsUsers);
                this.colDefs.push(this.columnDefs);
                this.singleSelectionTable.push(true);
                this.singleSelectionTable.push(false);
                this.singleSelectionTable.push(false);
                this.titlesTable.push('Roles');
                this.titlesTable.push('Users');
                this.titlesTable.push('Territories');
                this.userConfigurationService.USER_CONFIGURATION_API=`${environment.apiBaseURL}/api/user-configurations`
  }


  getAllRoles = () => {
    return this.roleService.getAll();
  }
  getAllUsers = () => {
    return this.userService.getAll();
  }
  getAllTerritories = () => {
    return this.territoryService.getAll();
  }

  joinTables(data: any[]){
      console.log(data);
  }

  onAddButtonClicked()
  {

    const dialogRef = this.dialog.open(DialogGridComponent);
    dialogRef.componentInstance.getAllsTable=this.getAlls;
    dialogRef.componentInstance.singleSelectionTable=this.singleSelectionTable;
    dialogRef.componentInstance.columnDefsTable=this.colDefs;
    dialogRef.componentInstance.themeGrid=this.themeGrid;
    dialogRef.componentInstance.title='TITLE';
    dialogRef.componentInstance.titlesTable=this.titlesTable;
    dialogRef.componentInstance.nonEditable=false;
    


    dialogRef.afterClosed().subscribe(result => {
      if(result.event==='Add') {
        console.log(result.data); 
        let user= result.data[1][0];
        let role= result.data[0][0];
        let territory= result.data[2][0];

        console.log(user);
        console.log(role);
        console.log(territory);

        let item = {
          user: user,
          role: role,
          territory: territory,
          _links: null
        }

        this.userConfigurationService.save(item).subscribe(result => console.log(result));
      }
      else { console.log(' Cancelled ');}

    });
  }


}


 