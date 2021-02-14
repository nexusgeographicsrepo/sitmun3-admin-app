import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, TerritoryService, RoleService, CartographyService, ServiceService, TaskAvailabilityService, TaskGroupService, Task, Role, Territory } from 'dist/sitmun-frontend-core/';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { config } from 'src/config';
import { DialogGridComponent } from 'dist/sitmun-frontend-gui/';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-tasks-extraction-fme-form',
  templateUrl: './tasks-extraction-fme-form.component.html',
  styleUrls: ['./tasks-extraction-fme-form.component.scss']
})
export class TasksExtractionFmeFormComponent implements OnInit {

  taskGroups: Array<any> = [];
  cartographies: Array<any> = [];
  services: Array<any> = [];


   //Form
   formTasksExtractionFME: FormGroup;
   taskExtractionFMEToEdit;
   taskExtractionFMEID = -1;
   dataLoaded: Boolean = false;
   
   //Grids
   themeGrid: any = config.agGridTheme;

   columnDefsTerritories: any[];
   getAllElementsEventTerritories: Subject<boolean> = new Subject <boolean>();
   dataUpdatedEventTerritories: Subject<boolean> = new Subject<boolean>();
 
   columnDefsRoles: any[];
   getAllElementsEventRoles: Subject<boolean> = new Subject <boolean>();
   dataUpdatedEventRoles: Subject<boolean> = new Subject<boolean>();
 
   
 
   //Dialog
   columnDefsRolesDialog: any[];
   addElementsEventRoles: Subject<any[]> = new Subject <any[]>();
   columnDefsTerritoriesDialog: any[];
   addElementsEventTerritories: Subject<any[]> = new Subject <any[]>();
 
 
 
 
   constructor(
     public dialog: MatDialog,
     private activatedRoute: ActivatedRoute,
     private router: Router,
     public taskService: TaskService,
     public roleService: RoleService,
     public territoryService: TerritoryService,
     public taskGroupService: TaskGroupService,
     private taskAvailabilityService: TaskAvailabilityService,
     private serviceService: ServiceService,
     private cartographyService: CartographyService,
     private http: HttpClient,
     public utils: UtilsService
   ) {
     this.initializeTasksExtractionFMEForm();
   }
 
   ngOnInit(): void {

    const promises: Promise<any>[] = [];

    promises.push(new Promise((resolve, reject) => {
      this.taskGroupService.getAll().subscribe(
        resp => {
          this.taskGroups.push(...resp);
          resolve(true);
        }
      );
    }));

    promises.push(new Promise((resolve, reject) => {
      this.cartographyService.getAll().subscribe(
        resp => {
          this.cartographies.push(...resp);
          resolve(true);
        }
      );
    }));

    promises.push(new Promise((resolve, reject) => {
      this.serviceService.getAll().map((resp) => {
        let fmeServices = [];
        resp.forEach(service => {
          if(service.type==='FME') {fmeServices.push(service)}
        });  
        console.log(this.services);
        this.services.push(...fmeServices)
        resolve(true);
      }).subscribe()
      }));

    Promise.all(promises).then(() => {
     this.activatedRoute.params.subscribe(params => {
       this.taskExtractionFMEID = +params.id;
       if (this.taskExtractionFMEID !== -1) {
         console.log(this.taskExtractionFMEID);
 
         this.taskService.get(this.taskExtractionFMEID).subscribe(
           resp => {
             console.log(resp);
             this.taskExtractionFMEToEdit = resp;
             this.formTasksExtractionFME.setValue({
               id: this.taskExtractionFMEID,
               cartography: this.cartographies[0].id,
               taskGroup: this.taskExtractionFMEToEdit.groupId,
               service: this.services[0].id,
               layer: '',
               _links: this.taskExtractionFMEToEdit._links
             });
 
             this.dataLoaded=true;
           },
           error => {
 
           }
         );
       }
       else {
        this.dataLoaded = true;
        this.formTasksExtractionFME.patchValue({
          cartography: this.cartographies[0].id,
          taskGroup: this.taskGroups[0].id,
          service: this.services[0].id,
        });
      }
 
     },
       error => {
 
       });
      });

       this.columnDefsRoles = [
        config.selCheckboxColumnDef,
         { headerName: 'Id', field: 'id', editable: false },
         { headerName: this.utils.getTranslate('tasksExtractionFMEEntity.name'), field: 'name' },  
         { headerName: this.utils.getTranslate('tasksExtractionFMEEntity.status'), field: 'status', editable:false },
       ];
   
       this.columnDefsTerritories = [
        config.selCheckboxColumnDef,
         { headerName: 'Id', field: 'territoryId', editable: false },
         { headerName: this.utils.getTranslate('tasksExtractionFMEEntity.name'), field: 'territoryName' },
         { headerName: this.utils.getTranslate('tasksExtractionFMEEntity.status'), field: 'status', editable:false },
   
       ];

       this.columnDefsRolesDialog = [
        config.selCheckboxColumnDef,
         { headerName: 'ID', field: 'id', editable: false },
         { headerName: this.utils.getTranslate('tasksExtractionFMEEntity.name'), field: 'name', editable: false },
         { headerName: this.utils.getTranslate('tasksExtractionFMEEntity.description'), field: 'description' },
       ];
 
       this.columnDefsTerritoriesDialog = [
        config.selCheckboxColumnDef,
         { headerName: 'ID', field: 'id', editable: false },
         { headerName: this.utils.getTranslate('tasksExtractionFMEEntity.name'), field: 'name',  editable: false  },
         { headerName: this.utils.getTranslate('tasksExtractionFMEEntity.code'), field: 'code',  editable: false  },
       ];
 
 
 
   }
 
 
   initializeTasksExtractionFMEForm(): void {
 
     this.formTasksExtractionFME = new FormGroup({
       id: new FormControl(null, []),
       cartography: new FormControl(null, []),
       taskGroup: new FormControl(null, []),
       service: new FormControl(null, []),
       layer: new FormControl(null, []),
       _links: new FormControl(null, []),
     })
   }

   
   // ******** Roles  ******** //
   getAllRoles = () => {

    if(this.taskExtractionFMEID == -1)
    {
      const aux: Array<any> = [];
      return of(aux);
    }

    var urlReq = `${this.taskExtractionFMEToEdit._links.roles.href}`
    if (this.taskExtractionFMEToEdit._links.roles.templated) {
      var url = new URL(urlReq.split("{")[0]);
      url.searchParams.append("projection", "view")
      urlReq = url.toString();
    }
   
    return (this.http.get(urlReq))
       .pipe(map(data => data['_embedded']['roles']));

  }

  getAllRowsRoles(data: any[] )
  {
    let rolesModified = [];
    let rolesToPut = [];
    data.forEach(role => {
      if (role.status === 'Modified') {rolesModified.push(role) }
      if(role.status!== 'Deleted') {rolesToPut.push(role._links.self.href) }
    });
    console.log(rolesModified);
    this.updateRoles(rolesModified, rolesToPut);
  }

  updateRoles(rolesModified: Role[], rolesToPut: Role[])
  {
    const promises: Promise<any>[] = [];
    rolesModified.forEach(role => {
      promises.push(new Promise((resolve, reject) => { this.roleService.update(role).subscribe((resp) => { resolve(true) }) }));
    });
    Promise.all(promises).then(() => {
      let url=this.taskExtractionFMEToEdit._links.roles.href.split('{', 1)[0];
      this.utils.updateUriList(url,rolesToPut, this.dataUpdatedEventRoles)
    });
  }

 
    // ******** Territories ******** //
  getAllTerritories = (): Observable<any> => {
    if(this.taskExtractionFMEID == -1)
    {
      const aux: Array<any> = [];
      return of(aux);
    }

    var urlReq = `${this.taskExtractionFMEToEdit._links.availabilities.href}`
    if (this.taskExtractionFMEToEdit._links.availabilities.templated) {
      var url = new URL(urlReq.split("{")[0]);
      url.searchParams.append("projection", "view")
      urlReq = url.toString();
    }

    return (this.http.get(urlReq))
      .pipe(map(data => data['_embedded']['task-availabilities']));


  }

  getAllRowsTerritories(data: any[] )
  {
    let territoriesToCreate = [];
    let territoriesToDelete = [];
    data.forEach(territory => {
      territory.task= this.taskExtractionFMEToEdit;
      if (territory.status === 'Pending creation') {
        let index= data.findIndex(element => element.territoryId === territory.territoryId && !element.new)
        if(index === -1)
        {
          territoriesToCreate.push(territory)
          territory.new=false;
        }
       }
      if(territory.status === 'Deleted' && territory._links) {territoriesToDelete.push(territory) }
    });
    const promises: Promise<any>[] = [];
    territoriesToCreate.forEach(newElement => {
      promises.push(new Promise((resolve, reject) => { this.taskAvailabilityService.save(newElement).subscribe((resp) => { resolve(true) }) }));
    });

    territoriesToDelete.forEach(deletedElement => {
      promises.push(new Promise((resolve, reject) => {this.taskAvailabilityService.remove(deletedElement).subscribe((resp) => { resolve(true) }) }));
      
    });

    Promise.all(promises).then(() => {
      this.dataUpdatedEventTerritories.next(true);
    });
	

  }
 
   // ******** Roles Dialog  ******** //
 
   getAllRolesDialog = () => {
    return this.roleService.getAll();
  }

  openRolesDialog(data: any) {

    const dialogRef = this.dialog.open(DialogGridComponent, {panelClass:'gridDialogs'});
    dialogRef.componentInstance.getAllsTable=[this.getAllRolesDialog];
    dialogRef.componentInstance.singleSelectionTable=[false];
    dialogRef.componentInstance.columnDefsTable=[this.columnDefsRolesDialog];
    dialogRef.componentInstance.themeGrid=this.themeGrid;
    dialogRef.componentInstance.title='Roles';
    dialogRef.componentInstance.titlesTable=['Roles'];
    dialogRef.componentInstance.nonEditable=false;
    


    dialogRef.afterClosed().subscribe(result => {
     if(result){
       if(result.event==='Add') {
         this.addElementsEventRoles.next(result.data[0])
       }
     }
    });

  }

    // ******** Territories Dialog  ******** //

    getAllTerritoriesDialog = () => {
      return this.territoryService.getAll();
    }

    openTerritoriesDialog(data: any) {

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
         if(result.event==='Add') {
           this.addElementsEventTerritories.next(this.adaptFormatTerritories(result.data[0]))
         }
       }
 
     });
 
   }
 
   
   adaptFormatTerritories(dataToAdapt: Territory[])
   {
     let newData: any[] = [];
     
     dataToAdapt.forEach(element => {
       let item = {
         id: null,
         territoryCode: element.code,
         territoryName: element.name,
         territoryId: element.id,
         createdDate: element.createdDate,
         owner: null,
         territory: element,
         new: true
       }
       newData.push(item);
       
     });
 
     return newData;
   }

   onSaveButtonClicked(): void {

     if(this.formTasksExtractionFME.valid)
     {
 
       //TODO Update cartography when save works
       console.log(this.formTasksExtractionFME.value)
       let taskGroup= this.taskGroups.find(x => x.id===this.formTasksExtractionFME.value.taskGroup )
       let cartography= this.cartographies.find(x => x.id===this.formTasksExtractionFME.value.cartography )
       let service= this.taskGroups.find(x => x.id===this.formTasksExtractionFME.value.service )

       var taskObj: Task= new Task();
       taskObj.name= this.formTasksExtractionFME.value.name;
       taskObj.id= this.formTasksExtractionFME.value.id;
       taskObj.group= taskGroup;
       taskObj._links= this.formTasksExtractionFME.value._links;
   
       this.taskService.save(this.formTasksExtractionFME.value)
       .subscribe(resp => {
         this.taskExtractionFMEToEdit= resp;
         this.taskExtractionFMEID=this.taskExtractionFMEToEdit.id;
         this.formTasksExtractionFME.patchValue({
           id: resp.id,
           _links: resp._links
         })

         this.getAllElementsEventTerritories.next(true);
         this.getAllElementsEventRoles.next(true);
     
       },
       error => {
         console.log(error);
       })
     }
 
     else {
       this.utils.showRequiredFieldsError();
     }
 
   }

}
