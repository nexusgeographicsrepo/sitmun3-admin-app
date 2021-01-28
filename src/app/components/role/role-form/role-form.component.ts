import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService, UserService, CartographyGroupService, TaskService, UserConfigurationService, TerritoryService, HalOptions, HalParam, User, Territory, Role, ApplicationService, Task, CartographyGroup, Application } from '@sitmun/frontend-core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import { Observable, of, Subject } from 'rxjs';
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

  //Form
  formRole: FormGroup;
  roleToEdit;
  roleSaved: Role;
  roleID: number = -1;
  dataLoaded: Boolean = false;

  //Grids
  columnDefsUsers: any[];
  getAllElementsEventUsers: Subject<boolean> = new Subject<boolean>();
  columnDefsTasks: any[];
  getAllElementsEventTasks: Subject<boolean> = new Subject <boolean>();
  columnDefsCartography: any[];
  getAllElementsEventCartographies: Subject<boolean> = new Subject <boolean>();
  columnDefsApplications: any[];
  getAllElementsEventApplications: Subject<boolean> = new Subject <boolean>();
  themeGrid: any = environment.agGridTheme;
  
  //Dialogs
  columnDefsUsersDialog: any[];
  columnDefsTerritoriesDialog: any[];
  addElementsEventUsers: Subject<any[]> = new Subject<any[]>();
  columnDefsTasksDialog: any[];
  addElementsEventTasks: Subject<any[]> = new Subject <any[]>();
  columnDefsCartographiesDialog: any[];
  addElementsEventCartographies: Subject<any[]> = new Subject <any[]>();
  columnDefsApplicationsDialog: any[];
  addElementsEventApplications: Subject<any[]> = new Subject <any[]>();

  //Save button
  territorisToUpdate: Territory[] = [];
  usersToUpdate: User[] = [];
  dataUpdatedEvent: Subject<boolean> = new Subject <boolean>();


  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private userService: UserService,
    public cartographyGroupService: CartographyGroupService,
    public tasksService: TaskService,
    public applicationService: ApplicationService,
    private http: HttpClient,
    private utils: UtilsService,
    private userConfigurationService: UserConfigurationService,
    private territoryService: TerritoryService
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
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('roleEntity.username'), field: 'user' },
      { headerName: this.utils.getTranslate('roleEntity.territory'), field: 'territory' },
      { headerName: this.utils.getTranslate('roleEntity.status'), field: 'status', editable:false },
    ];

    this.columnDefsTasks = [
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('roleEntity.groupTask'), field: 'groupName', editable:false },
      { headerName: this.utils.getTranslate('roleEntity.status'), field: 'status', editable:false },
    ];

    this.columnDefsCartography = [
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('roleEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('roleEntity.status'), field: 'status', editable:false },
    ];

    this.columnDefsApplications = [
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('roleEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('roleEntity.status'), field: 'status', editable:false },
    ];

    this.columnDefsUsersDialog = [
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('roleEntity.username'), field: 'username', editable: false },
    ];

    this.columnDefsTerritoriesDialog = [
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('roleEntity.code'), field: 'code', editable: false },
      { headerName: this.utils.getTranslate('roleEntity.name'), field: 'name', editable: false },
    ];
    this.columnDefsCartographiesDialog = [
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('roleEntity.name'), field: 'name', editable: false },
    ];

    this.columnDefsTasksDialog = [
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('roleEntity.name'), field: 'name', editable: false },
    ];

    this.columnDefsApplicationsDialog = [
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('roleEntity.name'), field: 'name' },
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


  //AG GRID


  // ******** Users ******** //
  getAllUsers = (): Observable<any> => {

    if(this.roleID == -1)
    {
      const aux: Array<any> = [];
      return of(aux);
    }

    let params2: HalParam[] = [];
    let param: HalParam = { key: 'role.id', value: this.roleID }
    params2.push(param);
    let query: HalOptions = { params: params2 };

    return this.userConfigurationService.getAll(query);

  }

  getAllRowsUsers(data: any[] )
  {
    let usersConfToCreate = [];
    let usersConfDelete = [];
    data.forEach(userConf => {
      let item = {
        role: this.roleToEdit,
        territory: userConf.territoryComplete,
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

  // ******** Task ******** //
  getAllTasks = (): Observable<any> => {

    if (this.roleID!== -1)
    {
      var urlReq = `${this.formRole.value._links.tasks.href}`
      if (this.formRole.value._links.tasks.templated) {
        var url = new URL(urlReq.split("{")[0]);
        url.searchParams.append("projection", "view")
        urlReq = url.toString();
      }
      return (this.http.get(urlReq))
      .pipe(map(data => data['_embedded']['tasks']));
    }
    else {
      const aux: Array<any> = [];
      return of(aux);
    }


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
      promises.push(new Promise((resolve, reject) => { this.tasksService.update(task).toPromise().then((resp) => { resolve() }) }));
    });
    Promise.all(promises).then(() => {
      let url=this.roleToEdit._links.tasks.href.split('{', 1)[0];
      this.utils.updateUriList(url,tasksToPut)
    });
  }

  // ******** Cartography Groups ******** //
  getAllCartographiesGroups = (): Observable<any> => {
    if (this.roleID!== -1)
    {
      var urlReq = `${this.formRole.value._links.permissions.href}`
      if (this.formRole.value._links.permissions.templated) {
        var url = new URL(urlReq.split("{")[0]);
        url.searchParams.append("projection", "view")
        urlReq = url.toString();
      }
      return (this.http.get(urlReq))
      .pipe(map(data => data['_embedded']['cartography-groups']));
    }
    else {
      const aux: Array<any> = [];
      return of(aux);
    }
    

  }

  getAllRowsCartographiesGroups(data: any[] )
  {
    let cartographiesGroupModified = [];
    let cartographiesGroupToPut = [];
    data.forEach(cartographyGroup => {
      if (cartographyGroup.status === 'Modified') {cartographiesGroupModified.push(cartographyGroup) }
      if(cartographyGroup.status!== 'Deleted') {cartographiesGroupToPut.push(cartographyGroup._links.self.href) }
    });

    this.updateCartographiesGroups(cartographiesGroupModified, cartographiesGroupToPut );
  }

  updateCartographiesGroups(cartographiesGroupsModified: CartographyGroup[], cartographiesGroupsToPut: CartographyGroup[])
  {
    const promises: Promise<any>[] = [];
    cartographiesGroupsModified.forEach(cartographyGroup => {
      promises.push(new Promise((resolve, reject) => { this.cartographyGroupService.update(cartographyGroup).toPromise().then((resp) => { resolve() }) }));
    });
    Promise.all(promises).then(() => {
      let url=this.roleToEdit._links.permissions.href.split('{', 1)[0];
      this.utils.updateUriList(url,cartographiesGroupsToPut)
    });
  }
    // ******** Applications ******** //
    getAllApplications = (): Observable<any> => {
      // //TODO Change the link when available
      if (this.roleID!== -1)
      {
        var urlReq = `${this.formRole.value._links.applications.href}`
        if (this.formRole.value._links.applications.templated) {
          var url = new URL(urlReq.split("{")[0]);
          url.searchParams.append("projection", "view")
          urlReq = url.toString();
        }
        return (this.http.get(urlReq))
        .pipe(map(data => data['_embedded']['applications']));
      }
      else {
        const aux: Array<any> = [];
        return of(aux);
      }

    }
  
    getAllRowsApplications(data: any[] )
    {
  
      let applicationsModified = [];
      let applicationsToPut = [];
      data.forEach(application => {
        if (application.status === 'Modified') {applicationsModified.push(application) }
        if(application.status!== 'Deleted') {applicationsToPut.push(application._links.self.href) }
      });

      console.log(applicationsModified);
      this.updateApplications(applicationsModified, applicationsToPut);
    
    }

    updateApplications(applicationsModified: Application[], applicationsToPut: Application[])
    {
      const promises: Promise<any>[] = [];
      applicationsModified.forEach(application => {
        promises.push(new Promise((resolve, reject) => { this.applicationService.update(application).toPromise().then((resp) => { resolve() }) }));
      });
      Promise.all(promises).then(() => {
        let url=this.roleToEdit._links.applications.href.split('{', 1)[0];
        this.utils.updateUriList(url,applicationsToPut)
      });
    }
  
    
    // ******** Users Dialog  ******** //

  getAllUsersDialog = () => {
    return this.userService.getAll();
  }

  getAllTerritoriesDialog = () => {
    return this.territoryService.getAll();
  }

  openUsersDialog(data: any) {

    const dialogRef = this.dialog.open(DialogGridComponent, {panelClass:'gridDialogs'});
    dialogRef.componentInstance.getAllsTable=[this.getAllUsersDialog,this.getAllTerritoriesDialog];
    dialogRef.componentInstance.singleSelectionTable=[false,false];
    dialogRef.componentInstance.columnDefsTable=[this.columnDefsUsersDialog,this.columnDefsTerritoriesDialog];
    dialogRef.componentInstance.themeGrid=this.themeGrid;
    dialogRef.componentInstance.title=this.utils.getTranslate('roleEntity.users');
    dialogRef.componentInstance.titlesTable=[this.utils.getTranslate('roleEntity.users'),this.utils.getTranslate('roleEntity.territories')];
    dialogRef.componentInstance.nonEditable=false;
    


    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        if(result.event==='Add') {  
          console.log(result.data); 
          let rowsToAdd = this.getRowsToAddPermits(result.data[1],result.data[0])
          console.log(rowsToAdd);
          this.addElementsEventUsers.next(rowsToAdd);
         }
      }

    });

  }
  // ******** Cartography Dialog  ******** //

  getAllCartographiesGroupsDialog = () => {
    let params2:HalParam[]=[];
    let param:HalParam={key:'type', value:'C'}
    params2.push(param);
    let query:HalOptions={ params:params2};
    return this.cartographyGroupService.getAll(query,undefined);
  }

  openCartographyDialog(data: any) {

    const dialogRef = this.dialog.open(DialogGridComponent, {panelClass:'gridDialogs'});
    dialogRef.componentInstance.getAllsTable=[this.getAllCartographiesGroupsDialog];
    dialogRef.componentInstance.singleSelectionTable=[false];
    dialogRef.componentInstance.columnDefsTable=[this.columnDefsCartographiesDialog];
    dialogRef.componentInstance.themeGrid=this.themeGrid;
    dialogRef.componentInstance.title=this.utils.getTranslate('roleEntity.permissiongroupLayersConfiguration');
    dialogRef.componentInstance.titlesTable=[''];
    dialogRef.componentInstance.nonEditable=false;
    


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if( result.event==='Add') { 
          this.addElementsEventCartographies.next(result.data[0])
        }
      }

    });

  }

    // ******** Tasks Dialog  ******** //

    getAllTasksDialog = () => {
      return this.tasksService.getAll();
    }

    openTasksDialog(data: any) {

      const dialogRef = this.dialog.open(DialogGridComponent, {panelClass:'gridDialogs'});
      dialogRef.componentInstance.getAllsTable=[this.getAllTasksDialog];
      dialogRef.componentInstance.singleSelectionTable=[false];
      dialogRef.componentInstance.columnDefsTable=[this.columnDefsTasksDialog];
      dialogRef.componentInstance.themeGrid=this.themeGrid;
      dialogRef.componentInstance.title=this.utils.getTranslate('roleEntity.tasks');
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

    getRowsToAddPermits(territories: Territory[], users: User[] )
    {
      let itemsToAdd: any[] = [];
      territories.forEach(territory => {

          users.forEach(user => {
            let item = {
              user: user.username,
              userComplete: user,
              territory: territory.name,
              territoryComplete: territory,
            }
            itemsToAdd.push(item);
          })
       })
      return itemsToAdd;
    }


    // ******** Applications Dialog  ******** //

    getAllApplicationsDialog = () => {
      return this.applicationService.getAll();
    }

    openApplicationsDialog(data: any) {

      const dialogRef = this.dialog.open(DialogGridComponent, {panelClass:'gridDialogs'});
      dialogRef.componentInstance.getAllsTable=[this.getAllApplicationsDialog];
      dialogRef.componentInstance.singleSelectionTable=[false];
      dialogRef.componentInstance.columnDefsTable=[this.columnDefsApplicationsDialog];
      dialogRef.componentInstance.themeGrid=this.themeGrid;
      dialogRef.componentInstance.title=this.utils.getTranslate('roleEntity.applications');
      dialogRef.componentInstance.titlesTable=[''];
      dialogRef.componentInstance.nonEditable=false;
      
  
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          if( result.event==='Add') { 
            this.addElementsEventApplications.next(result.data[0])
          }
        }
  
      });
  
    }



  onSaveButtonClicked() {

    this.roleService.save( this.formRole.value)
    .subscribe(resp => {
      this.roleToEdit=resp;
      // this.getAllElementsEventUsers.next(true);
      this.getAllElementsEventApplications.next(true);
      this.getAllElementsEventCartographies.next(true);
      this.getAllElementsEventTasks.next(true);
    },
    error=>{
      console.log(error);
    });


  }


}