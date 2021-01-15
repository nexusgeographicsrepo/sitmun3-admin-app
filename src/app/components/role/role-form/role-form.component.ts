import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService, UserService, CartographyService, TaskService, UserConfigurationService, TerritoryService, HalOptions, HalParam, User, Territory, Role, ApplicationService } from 'dist/sitmun-frontend-core/';
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
  roleID: number = -1;
  dataLoaded: Boolean = false;


  //Grids
  columnDefsUsers: any[];
  getAllElementsEventUsers: Subject<true> = new Subject<true>();
  columnDefsTasks: any[];
  getAllElementsEventTasks: Subject<true> = new Subject <true>();
  columnDefsCartography: any[];
  getAllElementsEventCartographies: Subject<true> = new Subject <true>();
  columnDefsApplications: any[];
  getAllElementsEventApplications: Subject<true> = new Subject <true>();
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
    public cartographyService: CartographyService,
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
      { headerName: this.utils.getTranslate('roleEntity.status'), field: 'status' },
    ];

    this.columnDefsTasks = [
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('roleEntity.code'), field: 'code' },
      { headerName: this.utils.getTranslate('roleEntity.groupTask'), field: 'groupTask' },
      { headerName: this.utils.getTranslate('roleEntity.status'), field: 'status' },
    ];

    this.columnDefsCartography = [
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('roleEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('roleEntity.layers'), field: 'layers' },
      { headerName: this.utils.getTranslate('roleEntity.status'), field: 'status' },
    ];

    this.columnDefsApplications = [
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('roleEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('roleEntity.status'), field: 'status' },
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

  addNewRole() {
    console.log(this.formRole.value);
    this.roleService.create(this.formRole.value)
      .subscribe(resp => {
        console.log(resp);
      });


  }

  updateRole() {

    console.log(this.formRole.value);
    this.roleToEdit.name=this.formRole.value.name;
    this.roleToEdit.description=this.formRole.value.description;

    this.roleService.update( this.roleToEdit)
      .subscribe(resp => {
        console.log(resp);

      });

  }


  //AG GRID


  // ******** Users ******** //
  getAllUsers = (): Observable<any> => {

    let params2: HalParam[] = [];
    let param: HalParam = { key: 'role.id', value: this.roleID }
    params2.push(param);
    let query: HalOptions = { params: params2 };

    return this.userConfigurationService.getAll(query);

  }
  removeUsers(data: any[]) {
    const promises: Promise<any>[] = [];
    data.forEach(userConfiguration => {
      this.userConfigurationService.get(userConfiguration.id).subscribe((userConfigurationToDelete) => {
        promises.push(new Promise((resolve, reject) => { this.userConfigurationService.remove(userConfigurationToDelete).toPromise().then((resp) => { resolve() }) }));
        Promise.all(promises).then(() => {
          this.dataUpdatedEvent.next(true);
        });
      });
    });
  }

  newDataUsers(id: any) {
    // this.router.navigate(['territory', id, 'territoryForm']);
    console.log('screen in progress');
  }

  getAllRowsUsers(data: any[] )
  {
    //N M
    console.log(data);
  }

  // ******** Task ******** //
  getAllTasks = (): Observable<any> => {
    //TODO Change the link when available
    //  return (this.http.get(`${this.formRole.value._links.members.href}`))
    //  .pipe( map( data =>  data[`_embedded`][`territories`]) );
    const aux: Array<any> = [];
    return of(aux);

  }


  getAllRowsTasks(data: any[] )
  {
    //N M
    console.log(data);
  }

  // ******** Cartography ******** //
  getAllCartographies = (): Observable<any> => {
    //TODO Change the link when available
    //  return (this.http.get(`${this.formRole.value._links.members.href}`))
    //  .pipe( map( data =>  data[`_embedded`][`territories`]) );
    const aux: Array<any> = [];
    return of(aux);

  }

  getAllRowsCartographies(data: any[] )
  {
    console.log(data);
  }

    // ******** Applications ******** //
    getAllApplications = (): Observable<any> => {
      // //TODO Change the link when available
       var urlReq = `${this.formRole.value._links.applications.href}`
       if (this.formRole.value._links.applications.templated) {
         var url = new URL(urlReq.split("{")[0]);
         url.searchParams.append("projection", "view")
         urlReq = url.toString();
       }

       return (this.http.get(urlReq))
       .pipe(map(data => data['_embedded']['applications']));

    }
  
    getAllRowsApplications(data: any[] )
    {
      console.log(data);
      let applicationUriIdentificators:any[] = [];
      data.forEach(application => {
        applicationUriIdentificators.push((application._links.self.href)); 
      });
      console.log(applicationUriIdentificators);
      let urlReq="http://localhost:8080/api/roles/10/applications";
      // var urlReq = `${this.formRole.value._links.applications.href}`
       
      // if (this.formRole.value._links.applications.templated) {
       //  var url = new URL(urlReq.split("{")[0]);
       //  url.searchParams.append("projection", "view")
       //  urlReq = url.toString();
      //  let splitString= urlReq.split("%",1);
      //  urlReq=splitString[0];
      // }

      // var urlReq = `${this.formRole.value._links.applications.href}`
      // if (this.formRole.value._links.applications.templated) {
      //   var url = new URL(urlReq.split("{")[0]);
      //   url.searchParams.append("projection", "view")
      //   urlReq = url.toString();
      // }

      return (this.http.put(urlReq ,data)).subscribe(result => console.log(result));
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
          let rowsToAdd = this.getRowsToAddPermits(this.roleToEdit,result.data[1],result.data[0])
          console.log(rowsToAdd);
          this.addElementsEventUsers.next(rowsToAdd);
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
    dialogRef.componentInstance.title=this.utils.getTranslate('roleEntity.cartography');
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

    getRowsToAddPermits(role: Role, territories: Territory[], users: User[] )
    {
      let itemsToAdd: any[] = [];
      territories.forEach(territory => {

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


    // updateUserConfiguration(role: Role, territories: Territory[], users: User[] )
    // {
    //   const promises: Promise<any>[] = [];
    //   territories.forEach(territory => {

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


  onSaveButtonClicked() {

    if(this.roleID !== -1)
    {
      // this.updateUserConfiguration(this.roleToEdit,this.territorisToUpdate,this.usersToUpdate)
      this.getAllElementsEventApplications.next(true);
      this.updateRole();
      this.dataUpdatedEvent.next(true);
    }
    else { this.addNewRole() }

  }


}