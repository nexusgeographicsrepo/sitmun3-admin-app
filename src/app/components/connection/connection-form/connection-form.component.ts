import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionService, CartographyService, TaskService, Cartography, Task, Connection } from '@sitmun/frontend-core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { DialogGridComponent } from 'dist/sitmun-frontend-gui/';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.scss']
})
export class ConnectionFormComponent implements OnInit {

  
  //Form
  formConnection: FormGroup;
  connectionToEdit;
  connectionID = -1;
  dataLoaded: Boolean = false;
  
  //Grids
  themeGrid: any = environment.agGridTheme;

  columnDefsCartographies: any[];
  getAllElementsEventCartographies: Subject<boolean> = new Subject <boolean>();

  columnDefsTasks: any[];
  getAllElementsEventTasks: Subject<boolean> = new Subject <boolean>();

  //Dialog
  columnDefsCartographiesDialog: any[];
  addElementsEventCartographies: Subject<any[]> = new Subject <any[]>();
  columnDefsTasksDialog: any[];
  addElementsEventTasks: Subject<any[]> = new Subject <any[]>();

  //Save Button
  dataUpdatedEvent: Subject<boolean> = new Subject <boolean>();

  newCartographies: Cartography[] = [];
  newtasks: Task[] = [];





  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private connectionService: ConnectionService,
    public cartographyService: CartographyService,
    public tasksService: TaskService,
    private http: HttpClient,
    private utils: UtilsService
  ) {
    this.initializeConnectionForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.connectionID = +params.id;
      if (this.connectionID !== -1) {
        console.log(this.connectionID);

        this.connectionService.get(this.connectionID).subscribe(
          resp => {
            console.log(resp);
            this.connectionToEdit = resp;
            this.formConnection.setValue({
              id: this.connectionID,
              name: this.connectionToEdit.name,
              driver: this.connectionToEdit.driver,
              user: this.connectionToEdit.user,
              password: this.connectionToEdit.password,
              url: this.connectionToEdit.url,
              _links: this.connectionToEdit._links
            });

            this.dataLoaded=true;
          },
          error => {

          }
        );
      }

    },
      error => {

      });


      this.columnDefsCartographies = [
        environment.selCheckboxColumnDef,
        { headerName: 'Id', field: 'id', editable: false },
        { headerName: this.utils.getTranslate('connectionEntity.name'), field: 'name' },
        { headerName: this.utils.getTranslate('connectionEntity.layers'), field: 'layers' },
        { headerName: this.utils.getTranslate('connectionEntity.status'), field: 'status' },

  
      ];
  
      this.columnDefsTasks = [
        environment.selCheckboxColumnDef,
        { headerName: 'Id', field: 'id', editable: false },
        { headerName: this.utils.getTranslate('connectionEntity.code'), field: 'name' },
        { headerName: this.utils.getTranslate('connectionEntity.taskGroup'), field: 'groupName' },
        { headerName: this.utils.getTranslate('connectionEntity.status'), field: 'status' },

  
      ];

      this.columnDefsCartographiesDialog = [
        environment.selCheckboxColumnDef,
        { headerName: 'ID', field: 'id', editable: false },
        { headerName: this.utils.getTranslate('connectionEntity.name'), field: 'name', editable: false },
      ];

      this.columnDefsTasksDialog = [
        environment.selCheckboxColumnDef,
        { headerName: 'ID', field: 'id', editable: false },
        { headerName: this.utils.getTranslate('connectionEntity.name'), field: 'name',  editable: false  },
      ];



  }


  initializeConnectionForm(): void {

    this.formConnection = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl(null, [
        Validators.required,
      ]),
      driver: new FormControl(null, [
        Validators.required,
      ]),
      user: new FormControl(null, []),
      password: new FormControl(null, []),
      url: new FormControl(null, []),
      _links: new FormControl(null, []),
    })
  }

  addNewConnection() {
    console.log(this.formConnection.value);
    this.connectionService.create(this.formConnection.value)
      .subscribe(resp => {
        console.log(resp);
      });
  }

  updateConnection() {
    console.log(this.formConnection.value);
    this.connectionToEdit.name=this.formConnection.value.name
    this.connectionToEdit.driver=this.formConnection.value.driver
    this.connectionToEdit.user=this.formConnection.value.user
    this.connectionToEdit.password=this.formConnection.value.password
    this.connectionToEdit.url=this.formConnection.value.url
    console.log(this.connectionToEdit);
    this.connectionService.update(this.connectionToEdit)
      .subscribe(resp => {
        console.log(resp);
      });
  }
  
  // ******** Cartographies ******** //
  getAllCartographies = () => {
    
    var urlReq = `${this.connectionToEdit._links.cartographies.href}`
    if (this.connectionToEdit._links.cartographies.templated) {
      var url = new URL(urlReq.split("{")[0]);
      url.searchParams.append("projection", "view")
      urlReq = url.toString();
    }

    return (this.http.get(urlReq))
    .pipe( map( data =>  data['_embedded']['cartographies']) );

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
      // let url=this.connectionToEdit._links.cartographies.href.split('{', 1)[0];
      // this.utils.updateUriList(url,cartographiesToPut)
      this.connectionToEdit.cartographies=this.utils.createUriList(cartographiesToPut);
    });
  }



  // ******** Tasks  ******** //
  getAllTasks = () => {
    var urlReq=`${this.connectionToEdit._links.tasks.href}`
    if(this.connectionToEdit._links.tasks.templated){
      var url=new URL(urlReq.split("{")[0]);
      url.searchParams.append("projection","view")
      urlReq=url.toString();
    }

    return (this.http.get(urlReq))
    .pipe( map( data =>  data['_embedded']['tasks']) );
    
    
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
      let url=this.connectionToEdit._links.tasks.href.split('{', 1)[0];
      this.utils.updateUriList(url,tasksToPut)
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
    const dialogRef = this.dialog.open(DialogGridComponent, {panelClass: 'gridDialogs'});
    dialogRef.componentInstance.getAllsTable=[this.getAllCartographiesDialog];
    dialogRef.componentInstance.singleSelectionTable=[false];
    dialogRef.componentInstance.columnDefsTable=[this.columnDefsCartographiesDialog];
    dialogRef.componentInstance.themeGrid=this.themeGrid;
    dialogRef.componentInstance.title=this.utils.getTranslate("connectionEntity.cartography");
    dialogRef.componentInstance.titlesTable=[""];
    dialogRef.componentInstance.nonEditable=false;
    


    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.event==='Add') {
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
      // const getAlls: Array<() => Observable<any>> = [this.getAllCartographiesDialog];
      // const colDefsTable: Array<any[]> = [this.columnDefsCartographiesDialog];
      // const singleSelectionTable: Array<boolean> = [false];
      // const titlesTable: Array<string> = ['Cartographies'];
      const dialogRef = this.dialog.open(DialogGridComponent, {panelClass:'gridDialogs'});
      dialogRef.componentInstance.getAllsTable=[this.getAllTasksDialog];
      dialogRef.componentInstance.singleSelectionTable=[false];
      dialogRef.componentInstance.columnDefsTable=[this.columnDefsTasksDialog];
      dialogRef.componentInstance.themeGrid=this.themeGrid;
      dialogRef.componentInstance.title=this.utils.getTranslate("connectionEntity.tasks");
      dialogRef.componentInstance.titlesTable=[""];
      dialogRef.componentInstance.nonEditable=false;
      
  
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          if( result.event==='Add') { 
            this.addElementsEventTasks.next(result.data[0])
          }
        }
      });
  
    }

 

    //Save Button
    
    onSaveButtonClicked(){
      
      if(this.connectionID!== -1)
      {
        this.getAllElementsEventCartographies.next(true);
        this.getAllElementsEventTasks.next(true);
        this.updateConnection();
      }
      else
      {
        this.addNewConnection();
      }
  
      }

}
