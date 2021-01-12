import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Territory, TerritoryService, TerritoryGroupTypeService, UserService, RoleService, CartographyService, TaskService, UserConfigurationService, HalOptions, HalParam, User, Role } from 'dist/sitmun-frontend-core/';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DialogGridComponent } from 'dist/sitmun-frontend-gui/';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-territory-form',
  templateUrl: './territory-form.component.html',
  styleUrls: ['./territory-form.component.scss']
})
export class TerritoryFormComponent implements OnInit {

  //Form
  themeGrid: any = environment.agGridTheme;
  scopeTypes: Array<any> = [];
  groupTypeOfThisTerritory;
  territoryForm: FormGroup;
  territoryToEdit;
  territoryID = -1;
  territoryGroups: Array<any> = [];
  extensions: Array<string>;
  dataLoaded: Boolean = false;

  //Grids
  columnDefsPermits: any[];
  addElementsEventPermits: Subject<any[]> = new Subject <any[]>();
  columnDefsMemberOf: any[];
  columnDefsMembers: any[];
  columnDefsCartographies: any[];
  columnDefsTasks: any[];

  //Dialog
  columnDefsTasksDialog: any[];
  columnDefsCartographiesDialog: any[];
  columnDefsTerritoriesDialog: any[];
  columnDefsUsersDialog: any[];
  columnDefsRolesDialog: any[];

  //Save button
  rolesToUpdate: Role[] = [];
  usersToUpdate: User[] = [];
  dataUpdatedEvent: Subject<boolean> = new Subject <boolean>();

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private territoryService: TerritoryService,
    private userService: UserService,
    private roleService: RoleService,
    private territoryGroupTypeService: TerritoryGroupTypeService,
    private cartographyService: CartographyService,
    private taskService: TaskService,
    private userConfigurationService: UserConfigurationService,
    private http: HttpClient,
    private utils: UtilsService,
  ) {
    this.initializeTerritoryForm();
  }

  ngOnInit(): void {

    let territoryByDefault = {
      id: -1,
      name: '-------'
    }
    this.territoryGroups.push(territoryByDefault);
    this.groupTypeOfThisTerritory = territoryByDefault;
    console.log(this.groupTypeOfThisTerritory);
    this.getTerritoryGroups().subscribe(
      resp => {
        this.territoryGroups.push(...resp);
      }
    );

    let scopeTypesByDefault = {
      value: null,
      description: '------'
    }
    this.scopeTypes.push(scopeTypesByDefault);

    this.utils.getCodeListValues('territory.scope').subscribe(
      resp => {
        this.scopeTypes.push(...resp);
      }
    );


    this.activatedRoute.params.subscribe(params => {
      this.territoryID = +params.id;
      if (this.territoryID !== -1) {

        this.getTerritoryGroupOfThisTerritory().subscribe(
          resp => {
            console.log(resp);
            this.groupTypeOfThisTerritory = resp;
            this.territoryForm.patchValue({
              groupType: this.groupTypeOfThisTerritory[`id`],
            });
          });


        this.territoryService.get(this.territoryID).subscribe(
          resp => {
            console.log(resp);
            this.territoryToEdit = resp;

            this.extensions = this.territoryToEdit.extent.split(' ');

            this.territoryForm.setValue({
              id: this.territoryID,
              code: this.territoryToEdit.code,
              name: this.territoryToEdit.name,
              territorialAuthorityAddress: this.territoryToEdit.territorialAuthorityAddress,
              territorialAuthorityLogo: this.territoryToEdit.territorialAuthorityLogo,
              scope: this.territoryToEdit.scope,
              groupType: this.groupTypeOfThisTerritory[`id`],
              extent: ' ',
              extensionX0: this.extensions[0],
              extensionX1: this.extensions[1],
              extensionY0: this.extensions[2],
              extensionY1: this.extensions[3],
              note: this.territoryToEdit.note,
              blocked: this.territoryToEdit.blocked,
              _links: this.territoryToEdit._links
            });

            this.dataLoaded = true;
          },
          error => {

          }
        );
      }
      else {
        this.territoryForm.patchValue({
          blocked: false,
          groupType: this.groupTypeOfThisTerritory[`id`],
          scope: this.translateScopeType('short', null)
        });
      }

    },
      error => {

      });






    this.columnDefsPermits = [
      {
        headerName: '',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        editable: false,
        filter: false,
        width: 28,
        lockPosition: true,
      },
      { headerName: 'Id', field: ['user.id'], editable: false },
      { headerName: this.utils.getTranslate('territoryEntity.user'), field: 'user' },
      { headerName: this.utils.getTranslate('territoryEntity.role'), field: 'role' },

    ];

    this.columnDefsMemberOf = [
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
      { headerName: this.utils.getTranslate('territoryEntity.code'), field: 'code' },
      { headerName: this.utils.getTranslate('territoryEntity.name'), field: 'name' },

    ];

    this.columnDefsMembers = [
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
      { headerName: this.utils.getTranslate('territoryEntity.code'), field: 'code' },
      { headerName: this.utils.getTranslate('territoryEntity.name'), field: 'name' },

    ];

    this.columnDefsCartographies = [
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
      { headerName: this.utils.getTranslate('territoryEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('territoryEntity.layers'), field: 'layers' },

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
      { headerName: this.utils.getTranslate('territoryEntity.code'), field: 'code' },
      { headerName: this.utils.getTranslate('territoryEntity.taskGroup'), field: 'taskGroup' },

    ];

    this.columnDefsTerritoriesDialog = [
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
      { headerName: this.utils.getTranslate('territoryEntity.name'), field: 'name', editable: false },
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
      { headerName: this.utils.getTranslate('territoryEntity.name'), field: 'name', editable: false },
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
      { headerName: this.utils.getTranslate('territoryEntity.name'), field: 'name',  editable: false  },
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

    this.columnDefsRolesDialog = [
      {
        headerName: '',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        editable: false,
        filter: false,
        width: 50,
        lockPosition:true,
      },
      { headerName: this.utils.getTranslate('territoryEntity.code'), field: 'code', editable: false },
      { headerName: this.utils.getTranslate('territoryEntity.name'), field: 'name', editable: false },
    ];

    this.columnDefsTerritoriesDialog = [
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
      { headerName: this.utils.getTranslate('territoryEntity.code'), field: 'code', editable: false },
      { headerName: this.utils.getTranslate('territoryEntity.name'), field: 'name', editable: false },
    ];



  }


  initializeTerritoryForm(): void {

    this.territoryForm = new FormGroup({
      id: new FormControl(null, []),
      code: new FormControl(null, [
        Validators.required,
      ]),
      name: new FormControl(null, [
        Validators.required,
      ]),
      territorialAuthorityAddress: new FormControl(null, [
        Validators.required,
      ]),
      territorialAuthorityLogo: new FormControl(null, [
        Validators.required,
      ]),
      scope: new FormControl(null, [
        Validators.required,
      ]),
      groupType: new FormControl(null, [
        Validators.required,
      ]),
      extensionX0: new FormControl(null, [
        Validators.required,
      ]),
      extensionX1: new FormControl(null, [
        Validators.required,
      ]),
      extensionY0: new FormControl(null, [
        Validators.required,
      ]),
      extensionY1: new FormControl(null, [
        Validators.required,
      ]),
      extent: new FormControl(null, []),
      note: new FormControl(null, [
        Validators.required,
      ]),
      blocked: new FormControl(null, []),
      _links: new FormControl(null, []),

    })

  }

  getTerritoryGroups() {
    // return (this.http.get(`http://localhost:8080/api/territory-group-types`))
    //   .pipe(map(data => data[`_embedded`][`territory-group-types`]));
    return this.territoryGroupTypeService.getAll();
  }

  getTerritoryGroupOfThisTerritory() {
    // return (this.http.get(`http://localhost:8080/api/territory-group-types/${this.territoryID}`));
    return this.territoryGroupTypeService.get(this.territoryID);
  }

  addNewTerritory() {
    this.updateExtent();
    this.updateScope('large');
    console.log(this.territoryForm.value);

    this.territoryService.create(this.territoryForm.value)
      .subscribe(resp => {
        console.log(resp);
        // this.router.navigate(["/company", resp.id, "formConnection"]);
      });
    this.updateScope('short');


  }

  updateTerritory() {
    this.updateExtent();
    this.updateScope('large');
    const idGroupTerritory = this.territoryForm.get('groupType')[`value`];
    if (idGroupTerritory !== -1) {
      // this.territoryToEdit._links.groupType.href = `http://localhost:8080/api/territory-group-types/${idGroupTerritory}`;
    }
    else {
      this.territoryToEdit._links.groupType.href = ``;
    }
    console.log(this.territoryForm.value);
    this.territoryService.update(this.territoryForm.value)
      .subscribe(resp => {
        console.log(resp);
      });
    this.updateScope('short');

  }

  updateExtent() {
    let extensionToUpdate = `${this.territoryForm.get('extensionX0').value} ${this.territoryForm.get('extensionX1').value} ${this.territoryForm.get('extensionY0').value} ${this.territoryForm.get('extensionY1').value}`;
    this.territoryForm.patchValue({
      extent: extensionToUpdate
    });
  }

  private updateScope(currentFormat: string) {
    let scopeToUpdate = this.translateScopeType(currentFormat, this.territoryForm.get('scope').value)
    this.territoryForm.patchValue({
      scope: scopeToUpdate
    });
  }


  private translateScopeType(currentFormat: string, type: string) {

    if (currentFormat === 'large') {
      if (type === 'Municipal') { return 'M' }
      else if (type === 'Supramunicipal') { return 'R' }
      else if (type === 'Total') { return 'T' }
      else if (type === 'selectType') { return null }
    }
    else if (currentFormat === 'short') {
      if (type === 'M') { return 'Municipal' }
      else if (type === 'R') { return 'Supramunicipal' }
      else if (type === 'T') { return 'Total' }
      else if (type === null) { return 'selectType' }
    }

  }

  // AG-GRID

  // ******** Permits ******** //
  getAllPermits = (): Observable<any> => {

    let params2: HalParam[] = [];
    let param: HalParam = { key: 'territory.id', value: this.territoryID }
    params2.push(param);
    let query: HalOptions = { params: params2 };

    return this.userConfigurationService.getAll(query);

  }

  removePermits(data: any[]) {
    console.log(data);
  }

  newDataPermits(id: any) {
    // this.router.navigate(['territory', id, 'territoryForm']);
    console.log('screen in progress');
  }

  // ******** MembersOf ******** //
  getAllMembersOf = (): Observable<any> => {
    return (this.http.get(`${this.territoryForm.value._links.memberOf.href}`))
      .pipe(map(data => data[`_embedded`][`territories`]));
  }

  removeMembersOf(data: any[]) {
    console.log(data);
  }

  newDataMembersOf(id: any) {
    // this.router.navigate(['territory', id, 'territoryForm']);
    console.log('screen in progress');
  }


  // ******** Members ******** //
  getAllMembers = (): Observable<any> => {

    return (this.http.get(`${this.territoryForm.value._links.members.href}`))
      .pipe(map(data => data[`_embedded`][`territories`]));

  }
  removeMembers(data: any[]) {
    console.log(data);
  }

  newDataMembers(id: any) {
    // this.router.navigate(['territory', id, 'territoryForm']);
    console.log('screen in progress');
  }

  // ******** Cartography ******** //
  getAllCartographies = (): Observable<any> => {
    //TODO Change the link when available
    // return (this.http.get(`${this.territoryForm.value._links.members.href}`))
    // .pipe( map( data =>  data[`_embedded`][`territories`]) );
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

  // ******** Task ******** //
  getAllTasks = (): Observable<any> => {
    //TODO Change the link when available
    // return (this.http.get(`${this.territoryForm.value._links.members.href}`))
    // .pipe( map( data =>  data[`_embedded`][`territories`]) );
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


  
  // ******** Users Dialog  ******** //

  getAllUsersDialog = () => {
    return this.userService.getAll();
  }

  getAllRolesDialog = () => {
    return this.roleService.getAll();
  }

  openPermitsDialog(data: any) {

    const dialogRef = this.dialog.open(DialogGridComponent, {panelClass:'gridDialogs'});
    dialogRef.componentInstance.getAllsTable=[this.getAllUsersDialog,this.getAllRolesDialog];
    dialogRef.componentInstance.singleSelectionTable=[false,false];
    dialogRef.componentInstance.columnDefsTable=[this.columnDefsUsersDialog,this.columnDefsRolesDialog];
    dialogRef.componentInstance.themeGrid=this.themeGrid;
    dialogRef.componentInstance.title='Users';
    dialogRef.componentInstance.titlesTable=['Users','Roles'];
    dialogRef.componentInstance.nonEditable=false;
    


    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.event==='Add') {  
          console.log(result.data); 
          let rowsToAdd=this.getRowsToAddPermits(this.territoryToEdit,result.data[1],result.data[0])
          console.log(rowsToAdd);
          this.addElementsEventPermits.next(rowsToAdd);
         }
      }

    });

  }

    // ******** Territory Dialog  ******** //

    getAllTerritoriesDialog = () => {
      return this.territoryService.getAll();
    }
  
    openTerritoryDialog(data: any) {
      const dialogRef = this.dialog.open(DialogGridComponent, {panelClass:'gridDialogs'});
      dialogRef.componentInstance.getAllsTable=[this.getAllTerritoriesDialog];
      dialogRef.componentInstance.singleSelectionTable=[false];
      dialogRef.componentInstance.columnDefsTable=[this.columnDefsTerritoriesDialog];
      dialogRef.componentInstance.themeGrid=this.themeGrid;
      dialogRef.componentInstance.title='Territories';
      dialogRef.componentInstance.titlesTable=['Territories'];
      dialogRef.componentInstance.nonEditable=false;
      
  
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          if( result.event==='Add') {console.log(result.data); }
        }
      });
  
    }
    // ******** Cartography Dialog  ******** //

    getAllCartographiesDialog = () => {
      return this.cartographyService.getAll();
    }
  
    openCartographyDialog(data: any) {
      const dialogRef = this.dialog.open(DialogGridComponent, {panelClass:'gridDialogs'});
      dialogRef.componentInstance.getAllsTable=[this.getAllCartographiesDialog];
      dialogRef.componentInstance.singleSelectionTable=[false];
      dialogRef.componentInstance.columnDefsTable=[this.columnDefsCartographiesDialog];
      dialogRef.componentInstance.themeGrid=this.themeGrid;
      dialogRef.componentInstance.title='Cartographies';
      dialogRef.componentInstance.titlesTable=['Cartographies'];
      dialogRef.componentInstance.nonEditable=false;
      
  
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          if( result.event==='Add') {console.log(result.data); }
        }
  
      });
  
    }
  
      // ******** Tasks Dialog  ******** //
  
      getAllTasksDialog = () => {
        return this.taskService.getAll();
      }
  
      openTasksDialog(data: any) {

        const dialogRef = this.dialog.open(DialogGridComponent, {panelClass:'gridDialogs'});
        dialogRef.componentInstance.getAllsTable=[this.getAllTasksDialog];
        dialogRef.componentInstance.singleSelectionTable=[false];
        dialogRef.componentInstance.columnDefsTable=[this.columnDefsTasksDialog];
        dialogRef.componentInstance.themeGrid=this.themeGrid;
        dialogRef.componentInstance.title='Tasks';
        dialogRef.componentInstance.titlesTable=['Tasks'];
        dialogRef.componentInstance.nonEditable=false;
        
    
    
        dialogRef.afterClosed().subscribe(result => {
          if(result){
            if( result.event==='Add') {console.log(result.data); }
          }
    
        });
    
      }

      

      getRowsToAddPermits(territory: Territory, roles: Role[], users: User[] )
      {
        let itemsToAdd: any[] = [];
        roles.forEach(role => {
  
            users.forEach(user => {
              let item = {
                user: user.username,
                'user.id': user.id,
                role: role.name,
                'role.id': role.id,
                territory: territory.name,
                'territory.id': territory.id,
                _links: null
              }
              itemsToAdd.push(item);
            })
         })
        return itemsToAdd;
      }

      //Save button
      // updateUserConfiguration(territory: Territory, roles: Role[], users: User[] )
      // {
      //   const promises: Promise<any>[] = [];
      //   roles.forEach(role => {
  
      //     users.forEach(user => {
  
      //       let item = {
      //         user: user,
      //         role: role,
      //         territory: territory,
      //         _links: null
      //       }
      //       promises.push(new Promise((resolve, reject) => {​​​​​​​ this.userConfigurationService.save(item).toPromise().then((resp) =>{​​​​​​​resolve()}​​​​​​​)}​​​​​​​));
      //       Promise.all(promises).then(() => {
      //         this.dataUpdatedEvent.next(true);
      //       });
           
      //     });
          
      //   });
  
      // }
  
  
      onSaveButtonClicked(){
  
      // this.updateUserConfiguration(this.territoryToEdit,this.rolesToUpdate,this.usersToUpdate)
      this.dataUpdatedEvent.next(true);
  
      }

}
