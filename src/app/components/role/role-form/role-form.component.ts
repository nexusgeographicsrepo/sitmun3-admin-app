import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService, UserService, CartographyService, TaskService, UserConfigurationService, HalOptions, HalParam } from 'dist/sitmun-frontend-core/';
import { Connection } from 'dist/sitmun-frontend-core/connection/connection.model';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DialogGridComponent } from 'dist/sitmun-frontend-gui/';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {

  //Formulari
  formRole: FormGroup;
  roleToEdit;
  roleID: number = -1;
  dataLoaded: Boolean = false;

  //Grids
  columnDefsUsers: any[];
  columnDefsTasks: any[];
  columnDefsCartography: any[];
  themeGrid: any = environment.agGridTheme;

  //Dialogs
  columnDefsUsersDialog: any[];
  columnDefsTasksDialog: any[];
  columnDefsCartographiesDialog: any[];



  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private userService: UserService,
    public cartographyService: CartographyService,
    public tasksService: TaskService,
    private http: HttpClient,
    private utils: UtilsService,
    private userConfigurationService: UserConfigurationService,
  ) {
    this.initializeRoleForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.roleID = +params.id;
      if (this.roleID !== -1) {
        console.log(this.roleID);

        this.roleService.get(this.roleID).subscribe(
          resp => {
            console.log(resp);
            this.roleToEdit = resp;
            this.formRole.setValue({
              id: this.roleID,
              name: this.roleToEdit.name,
              description: this.roleToEdit.description,
              _links: this.roleToEdit._links
            });

            this.dataLoaded = true;
          },
          error => {

          }
        );
      }

    },
      error => {

      });


    this.columnDefsUsers = [
      {
        headerName: '',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        editable: false,
        filter: false,
        width: 25,
        lockPosition: true,
      },
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('roleEntity.username'), field: 'user' },
      { headerName: this.utils.getTranslate('roleEntity.territory'), field: 'territory' },
    ];

    this.columnDefsTasks = [
      {
        headerName: '',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        editable: false,
        filter: false,
        width: 25,
        lockPosition: true,
      },
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('roleEntity.code'), field: 'code' },
      { headerName: this.utils.getTranslate('roleEntity.groupTask'), field: 'groupTask' },
    ];

    this.columnDefsCartography = [
      {
        headerName: '',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        editable: false,
        filter: false,
        width: 25,
        lockPosition: true,
      },
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('roleEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('roleEntity.layers'), field: 'layers' },
    ];

    this.columnDefsUsersDialog = [
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
      { headerName: this.utils.getTranslate('roleEntity.username'), field: 'username', editable: false },
    ];
    this.columnDefsCartographiesDialog = [
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
      { headerName: this.utils.getTranslate('roleEntity.name'), field: 'name', editable: false },
    ];

    this.columnDefsTasksDialog = [
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
      { headerName: this.utils.getTranslate('roleEntity.name'), field: 'name',  editable: false  },
    ];

  }


  initializeRoleForm(): void {

    this.formRole = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl(null, [
        Validators.required,
      ]),
      description: new FormControl(null, [
        Validators.required,
      ]),
      _links: new FormControl(null, []),

    })

  }

  addNewConnection() {
    console.log(this.formRole.value);
    this.roleService.create(this.formRole.value)
      .subscribe(resp => {
        console.log(resp);
        // this.router.navigate(["/company", resp.id, "formConnection"]);
      });


  }

  updateConnection() {

    console.log(this.formRole.value);

    this.roleService.update(this.formRole.value)
      .subscribe(resp => {
        console.log(resp);

      });

  }


  //AG GRID


  // ******** Users ******** //
  getAllUsers = (): Observable<any> => {

    let params2:HalParam[]=[];
    let param:HalParam={key:'user.id', value:this.roleID}
    params2.push(param);
    let query:HalOptions={ params:params2};

    return this.userConfigurationService.getAll(query);

  }
  removeUsers(data: any[]) {
    console.log(data);
  }

  newDataUsers(id: any) {
    // this.router.navigate(['territory', id, 'territoryForm']);
    console.log('screen in progress');
  }

  // ******** Task ******** //
  getAllTasks = (): Observable<any> => {
    //TODO Change the link when available
    //  return (this.http.get(`${this.formRole.value._links.members.href}`))
    //  .pipe( map( data =>  data[`_embedded`][`territories`]) );
    const aux: Array<any> = [];
    return of(aux);

  }
  removeTasks(data: any[]) {
    console.log(data);
  }

  newDataTasks(id: any) {
    // this.router.navigate(['territory', id, 'territoryForm']);
    console.log('screen in progress');
  }

  // ******** Cartography ******** //
  getAllCartographies = (): Observable<any> => {
    //TODO Change the link when available
    //  return (this.http.get(`${this.formRole.value._links.members.href}`))
    //  .pipe( map( data =>  data[`_embedded`][`territories`]) );
    const aux: Array<any> = [];
    return of(aux);

  }

  removeCartographies(data: any[]) {
    console.log(data);
  }

  newDataCartographies(id: any) {
    // this.router.navigate(['territory', id, 'territoryForm']);
    console.log('screen in progress');
  }


  // ******** Users Dialog  ******** //

  getAllUsersDialog = () => {
    return this.userService.getAll();
  }

  openUsersDialog(data: any) {
    // const getAlls: Array<() => Observable<any>> = [this.getAllCartographiesDialog];
    // const colDefsTable: Array<any[]> = [this.columnDefsCartographiesDialog];
    // const singleSelectionTable: Array<boolean> = [false];
    // const titlesTable: Array<string> = ['Cartographies'];
    const dialogRef = this.dialog.open(DialogGridComponent);
    dialogRef.componentInstance.getAllsTable=[this.getAllUsersDialog];
    dialogRef.componentInstance.singleSelectionTable=[false];
    dialogRef.componentInstance.columnDefsTable=[this.columnDefsUsersDialog];
    dialogRef.componentInstance.themeGrid=this.themeGrid;
    dialogRef.componentInstance.title='Users';
    dialogRef.componentInstance.titlesTable=['Users'];
    dialogRef.componentInstance.nonEditable=false;
    


    dialogRef.afterClosed().subscribe(result => {
      if(result.event==='Add') {      console.log(result.data); }
      else { console.log(' Cancelled ');}

    });

  }
  // ******** Cartography Dialog  ******** //

  getAllCartographiesDialog = () => {
    return this.cartographyService.getAll();
  }

  openCartographyDialog(data: any) {
    // const getAlls: Array<() => Observable<any>> = [this.getAllCartographiesDialog];
    // const colDefsTable: Array<any[]> = [this.columnDefsCartographiesDialog];
    // const singleSelectionTable: Array<boolean> = [false];
    // const titlesTable: Array<string> = ['Cartographies'];
    const dialogRef = this.dialog.open(DialogGridComponent);
    dialogRef.componentInstance.getAllsTable=[this.getAllCartographiesDialog];
    dialogRef.componentInstance.singleSelectionTable=[false];
    dialogRef.componentInstance.columnDefsTable=[this.columnDefsCartographiesDialog];
    dialogRef.componentInstance.themeGrid=this.themeGrid;
    dialogRef.componentInstance.title='Cartographies';
    dialogRef.componentInstance.titlesTable=['Cartographies'];
    dialogRef.componentInstance.nonEditable=false;
    


    dialogRef.afterClosed().subscribe(result => {
      if(result.event==='Add') {      console.log(result.data); }
      else { console.log(' Cancelled ');}

    });

  }

    // ******** Tasks Dialog  ******** //

    getAllTasksDialog = () => {
      return this.tasksService.getAll();
    }

    openTasksDialog(data: any) {
      // const getAlls: Array<() => Observable<any>> = [this.getAllCartographiesDialog];
      // const colDefsTable: Array<any[]> = [this.columnDefsCartographiesDialog];
      // const singleSelectionTable: Array<boolean> = [false];
      // const titlesTable: Array<string> = ['Cartographies'];
      const dialogRef = this.dialog.open(DialogGridComponent);
      dialogRef.componentInstance.getAllsTable=[this.getAllTasksDialog];
      dialogRef.componentInstance.singleSelectionTable=[false];
      dialogRef.componentInstance.columnDefsTable=[this.columnDefsTasksDialog];
      dialogRef.componentInstance.themeGrid=this.themeGrid;
      dialogRef.componentInstance.title='Tasks';
      dialogRef.componentInstance.titlesTable=['Tasks'];
      dialogRef.componentInstance.nonEditable=false;
      
  
  
      dialogRef.afterClosed().subscribe(result => {
        if(result.event==='Add') {      console.log(result.data); }
        else { console.log(' Cancelled ');}
  
      });
  
    }


}