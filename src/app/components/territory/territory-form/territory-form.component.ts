import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Territory, TerritoryService, TerritoryGroupTypeService, UserService, RoleService, CartographyService, TaskService, UserConfigurationService, HalOptions, HalParam, User, Role, Cartography, Task } from '@sitmun/frontend-core';
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
  getAllElementsEventPermits: Subject<boolean> = new Subject <boolean>();

  columnDefsMemberOf: any[];
  getAllElementsEventTerritoriesMemberOf: Subject<boolean> = new Subject <boolean>();

  columnDefsMembers: any[];
  getAllElementsEventTerritoriesMembers: Subject<boolean> = new Subject <boolean>();

  columnDefsCartographies: any[];
  getAllElementsEventCartographies: Subject<boolean> = new Subject <boolean>();

  columnDefsTasks: any[];
  getAllElementsEventTasks: Subject<boolean> = new Subject <boolean>();

  //Dialog
  columnDefsTasksDialog: any[];
  addElementsEventTasks: Subject<boolean> = new Subject <boolean>();
  columnDefsCartographiesDialog: any[];
  addElementsEventCartographies: Subject<boolean> = new Subject <boolean>();
  columnDefsTerritoriesDialog: any[];
  addElementsEventTerritoriesMembers: Subject<boolean> = new Subject <boolean>();
  addElementsEventTerritoriesMemberOf: Subject<boolean> = new Subject <boolean>();
  columnDefsUsersDialog: any[];
  columnDefsRolesDialog: any[];
  addElementsEventPermits: Subject<any[]> = new Subject <any[]>();

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
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('territoryEntity.user'), field: 'user', editable:false },
      { headerName: this.utils.getTranslate('territoryEntity.role'), field: 'role', editable:false },
      { headerName: this.utils.getTranslate('territoryEntity.status'), field: 'status', editable:false },

    ];

    this.columnDefsMemberOf = [
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('territoryEntity.code'), field: 'code' },
      { headerName: this.utils.getTranslate('territoryEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('territoryEntity.status'), field: 'status' },

    ];

    this.columnDefsMembers = [
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('territoryEntity.code'), field: 'code' },
      { headerName: this.utils.getTranslate('territoryEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('territoryEntity.status'), field: 'status' },

    ];

    this.columnDefsCartographies = [
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('territoryEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('territoryEntity.layers'), field: 'layers' },
      { headerName: this.utils.getTranslate('territoryEntity.status'), field: 'status' },

    ];

    this.columnDefsTasks = [
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('territoryEntity.code'), field: 'code' },
      { headerName: this.utils.getTranslate('territoryEntity.taskGroup'), field: 'taskGroup' },
      { headerName: this.utils.getTranslate('territoryEntity.status'), field: 'status' },

    ];

    this.columnDefsTerritoriesDialog = [
      environment.selCheckboxColumnDef,
      { headerName: 'ID', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('territoryEntity.name'), field: 'name', editable: false },
    ];

    this.columnDefsCartographiesDialog = [
      environment.selCheckboxColumnDef,
      { headerName: 'ID', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('territoryEntity.name'), field: 'name', editable: false },
    ];

    this.columnDefsTasksDialog = [
      environment.selCheckboxColumnDef,
      { headerName: 'ID', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('territoryEntity.name'), field: 'name',  editable: false  },
    ];

    this.columnDefsUsersDialog = [
      environment.selCheckboxColumnDef,
      { headerName: 'ID', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('roleEntity.username'), field: 'username', editable: false },
    ];

    this.columnDefsRolesDialog = [
      environment.selCheckboxColumnDef,
      { headerName: this.utils.getTranslate('territoryEntity.code'), field: 'code', editable: false },
      { headerName: this.utils.getTranslate('territoryEntity.name'), field: 'name', editable: false },
    ];

    this.columnDefsTerritoriesDialog = [
      environment.selCheckboxColumnDef,
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
    this.territoryToEdit.code=this.territoryForm.value.code;
    this.territoryToEdit.name=this.territoryForm.value.name;
    this.territoryToEdit.territorialAuthorityAddress=this.territoryForm.value.territorialAuthorityAddress;
    this.territoryToEdit.territorialAuthorityLogo=null;
    // this.territoryToEdit.territorialAuthorityLogo=this.territoryForm.value.territorialAuthorityLogo;
    this.territoryToEdit.scope=this.territoryForm.value.scope;
    // this.territoryToEdit.groupType=this.territoryForm.value.groupType;
    this.territoryToEdit.note=this.territoryForm.value.note;
    this.territoryToEdit.blocked=this.territoryForm.value.blocked;



    // const idGroupTerritory = this.territoryForm.get('groupType')[`value`];

    console.log(this.territoryToEdit);
    this.territoryService.update(this.territoryToEdit)
      .subscribe(resp => {
        console.log(resp);
      });
    this.updateScope('short');

  }

  updateExtent() {
    let extensionToUpdate = `${this.territoryForm.get('extensionX0').value} ${this.territoryForm.get('extensionX1').value} ${this.territoryForm.get('extensionY0').value} ${this.territoryForm.get('extensionY1').value}`;
    if(this.territoryID !== -1) {this.territoryToEdit.extent= extensionToUpdate};
    this.territoryForm.patchValue({
      extent: extensionToUpdate
    });
  }

  private updateScope(currentFormat: string) {
    let scopeToUpdate = this.translateScopeType(currentFormat, this.territoryForm.get('scope').value)
    if(this.territoryID !== -1) {this.territoryToEdit.scope=scopeToUpdate};
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




  getAllRowsPermits(data: any[] )
  {
    let usersConfToCreate = [];
    let usersConfDelete = [];
    data.forEach(userConf => {
      let item = {
        role: userConf.roleComplete,
        territory: this.territoryToEdit,
        user:  userConf.userComplete,
      }
      if (userConf.status === 'Pending creation') {usersConfToCreate.push(item) }
      if(userConf.status === 'Deleted') {usersConfDelete.push(userConf) }
    });

    usersConfToCreate.forEach(newElement => {

      this.userConfigurationService.save(newElement).subscribe(
        result => {
          console.log(result)
        })

      
    });

    usersConfDelete.forEach(deletedElement => {
    
      if(deletedElement._links)
      {
        this.userConfigurationService.remove(deletedElement).subscribe(
          result => {
            console.log(result)
          })
      }
      
    });
  }

  // ******** MembersOf ******** //
  getAllMembersOf = (): Observable<any> => {
    return (this.http.get(`${this.territoryForm.value._links.memberOf.href}`))
      .pipe(map(data => data[`_embedded`][`territories`]));
  }



  getAllRowsMembersOf(data: any[] )
  {
    let territoriesModified = [];
    let territoriesToPut = [];
    data.forEach(territory => {
      if (territory.status === 'Modified') {territoriesModified.push(territory) }
      if(territory.status!== 'Deleted') {territoriesToPut.push(territory._links.self.href) }
    });

    console.log(territoriesModified);
    this.updateTerritoriesMembersOf(territoriesModified, territoriesToPut);
  }

  updateTerritoriesMembersOf(territoriesModified: Territory[], territoriesToPut: Territory[])
  {
    debugger;
    const promises: Promise<any>[] = [];
    territoriesModified.forEach(territory => {
      promises.push(new Promise((resolve, reject) => { this.territoryService.update(territory).toPromise().then((resp) => { resolve() }) }));
    });
    Promise.all(promises).then(() => {
      let url=this.territoryToEdit._links.memberOf.href.split('{', 1)[0];
      this.utils.updateUriList(url,territoriesToPut)
    });
  }


  // ******** Members ******** //
  getAllMembers = (): Observable<any> => {

    return (this.http.get(`${this.territoryForm.value._links.members.href}`))
      .pipe(map(data => data[`_embedded`][`territories`]));

  }





  getAllRowsMembers(data: any[] )
  {
    let territoriesModified = [];
    let territoriesToPut = [];
    data.forEach(territory => {
      if (territory.status === 'Modified') {territoriesModified.push(territory) }
      if(territory.status!== 'Deleted') {territoriesToPut.push(territory._links.self.href) }
    });
    console.log(territoriesModified);
    this.updateTerritoriesMembersOf(territoriesModified, territoriesToPut);

  }

  updateTerritoriesMembers(territoriesModified: Territory[], territoriesToPut: Territory[])
  {
    debugger;
    const promises: Promise<any>[] = [];
    territoriesModified.forEach(territory => {
      promises.push(new Promise((resolve, reject) => { this.territoryService.update(territory).toPromise().then((resp) => { resolve() }) }));
    });
    Promise.all(promises).then(() => {
      let url=this.territoryToEdit._links.members.href.split('{', 1)[0];
      this.utils.updateUriList(url,territoriesToPut)
    });
  }

  // ******** Cartography ******** //
  getAllCartographies = (): Observable<any> => {
    var urlReq = `${this.territoryToEdit._links.cartographyAvailabilities.href}`
    if (this.territoryToEdit._links.cartographyAvailabilities.templated) {
      var url = new URL(urlReq.split("{")[0]);
      url.searchParams.append("projection", "view")
      urlReq = url.toString();
    }

    return (this.http.get(urlReq))
    .pipe( map( data =>  data['_embedded']['cartography-availabilities']) );

  }

  getAllRowsCartographies(data: any[] )
  {
    let cartographiesModified = [];
    let cartographiesToPut = [];
    data.forEach(cartography => {
      if (cartography.status === 'Modified') {cartographiesModified.push(cartography) }
      if(cartography.status!== 'Deleted') {cartographiesToPut.push(cartography._links.self.href) }
    });

    this.updateCartographies(cartographiesModified, cartographiesToPut );
  }

  updateCartographies(cartographiesModified: Cartography[], cartographiesToPut: Cartography[])
  {
    const promises: Promise<any>[] = [];
    cartographiesModified.forEach(cartography => {
      promises.push(new Promise((resolve, reject) => { this.cartographyService.update(cartography).toPromise().then((resp) => { resolve() }) }));
    });
    Promise.all(promises).then(() => {
      let url=this.territoryToEdit._links.cartographyAvailabilities.href.split('{', 1)[0];
      this.utils.updateUriList(url,cartographiesToPut)
    });
  }

  // ******** Task ******** //
  getAllTasks = (): Observable<any> => {
    var urlReq = `${this.territoryToEdit._links.taskAvailabilities.href}`
    if (this.territoryToEdit._links.taskAvailabilities.templated) {
      var url = new URL(urlReq.split("{")[0]);
      url.searchParams.append("projection", "view")
      urlReq = url.toString();
    }

    return (this.http.get(urlReq))
    .pipe( map( data =>  data['_embedded']['task-availabilities']) );


  }



  getAllRowsTasks(data: any[] )
  {
    let tasksModified = [];
    let tasksToPut = [];
    data.forEach(task => {
      if (task.status === 'Modified') {tasksModified.push(task) }
      if(task.status!== 'Deleted') {tasksToPut.push(task._links.self.href) }
    });
    this.updateTasks(tasksModified, tasksToPut);

  }

  updateTasks(tasksModified: Task[], tasksToPut: Task[])
  {
    const promises: Promise<any>[] = [];
    tasksModified.forEach(task => {
      promises.push(new Promise((resolve, reject) => { this.taskService.update(task).toPromise().then((resp) => { resolve() }) }));
    });
    Promise.all(promises).then(() => {
      let url=this.territoryToEdit._links.taskAvailabilities.href.split('{', 1)[0];
      this.utils.updateUriList(url,tasksToPut)
    });
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
    dialogRef.componentInstance.title=this.utils.getTranslate('territoryEntity.permits');
    dialogRef.componentInstance.titlesTable=[this.utils.getTranslate('territoryEntity.users'),this.utils.getTranslate('territoryEntity.roles')];
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

    // ******** Territory Member Of Dialog  ******** //

    getAllTerritoriesMemberOfDialog = () => {
      return this.territoryService.getAll();
    }
  
    openTerritoryMemberOfDialog(data: any) {
      const dialogRef = this.dialog.open(DialogGridComponent, {panelClass:'gridDialogs'});
      dialogRef.componentInstance.getAllsTable=[this.getAllTerritoriesMemberOfDialog];
      dialogRef.componentInstance.singleSelectionTable=[false];
      dialogRef.componentInstance.columnDefsTable=[this.columnDefsTerritoriesDialog];
      dialogRef.componentInstance.themeGrid=this.themeGrid;
      dialogRef.componentInstance.title=this.utils.getTranslate('territoryEntity.territories');
      dialogRef.componentInstance.titlesTable=[''];
      dialogRef.componentInstance.nonEditable=false;
      
  
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          if( result.event==='Add') { 
            if( result.event==='Add') { 
              this.addElementsEventTerritoriesMemberOf.next(result.data[0])
            }
          }
        }
      });
  
    }

    // ******** Territory Members Dialog  ******** //

    getAllTerritoriesMembersDialog = () => {
      return this.territoryService.getAll();
    }
  
    openTerritoryMembersDialog(data: any) {
      const dialogRef = this.dialog.open(DialogGridComponent, {panelClass:'gridDialogs'});
      dialogRef.componentInstance.getAllsTable=[this.getAllTerritoriesMembersDialog];
      dialogRef.componentInstance.singleSelectionTable=[false];
      dialogRef.componentInstance.columnDefsTable=[this.columnDefsTerritoriesDialog];
      dialogRef.componentInstance.themeGrid=this.themeGrid;
      dialogRef.componentInstance.title='Territories';
      dialogRef.componentInstance.titlesTable=['Territories'];
      dialogRef.componentInstance.nonEditable=false;
      
  
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          if( result.event==='Add') { 
            this.addElementsEventTerritoriesMembers.next(result.data[0])
          }
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
      dialogRef.componentInstance.title=this.utils.getTranslate('territoryEntity.layers');
      dialogRef.componentInstance.titlesTable=[''];
      dialogRef.componentInstance.nonEditable=false;
      
  
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          if( result.event==='Add') { 
            this.addElementsEventCartographies.next(result.data[0])
          }
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
        dialogRef.componentInstance.title=this.utils.getTranslate('territoryEntity.tasks');
        dialogRef.componentInstance.titlesTable=[''];
        dialogRef.componentInstance.nonEditable=false;
        
    
    
        dialogRef.afterClosed().subscribe(result => {
          if(result){
            if( result.event==='Add') { 
              this.addElementsEventTasks.next(result.data[0])
            }
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
                userComplete: user,
                role: role.name,
                roleComplete: role
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
  
      if(this.territoryID !== -1)
      {
        
        this.getAllElementsEventPermits.next(true);
        this.getAllElementsEventCartographies.next(true);
        this.getAllElementsEventTasks.next(true);
        this.getAllElementsEventTerritoriesMemberOf.next(true);
        this.getAllElementsEventTerritoriesMembers.next(true);
        this.updateTerritory();
        // this.updateUserConfiguration(this.territoryToEdit,this.rolesToUpdate,this.usersToUpdate)
    
      }
      else { this.addNewTerritory()}
    }

}
