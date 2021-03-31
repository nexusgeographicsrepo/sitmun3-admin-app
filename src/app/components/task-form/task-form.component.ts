import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService, TaskService, TaskGroupService, CartographyService, ConnectionService, HalOptions, HalParam, TaskUIService } from 'dist/sitmun-frontend-core/';
import { config } from 'src/config';
import { MatDialog } from '@angular/material/dialog';
import { DialogGridComponent } from 'dist/sitmun-frontend-gui/';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {


  taskForm: FormGroup;
  formElements = [];
  dataLoaded = false;
  taskID = -1;
  themeGrid: any = config.agGridTheme;

  //Selector tables
  taskGroups: Array<any> = [];
  taskUIs: Array<any> = [];
  documentTypes: Array<any> = [];
  wfsServices: Array<any> = [];
  fmeServices: Array<any> = [];
  accessTypes: Array<any> = [];
  locators: Array<any> = [];
  cartographies: Array<any> = [];
  connections: Array<any> = [];
  



  properties = { 
    "form":{
      "label": "tasksEntity.generalData",
      "elements": {
        "type": { 
          "hidden": true, 
          "value": 1,
          "required":true
        },
        "name": { 
          "label": "tasksEntity.name", 
          "control": "input", 
          "required":true
        }, 
        "checkbox": { 
          "label": "tasksEntity.checkbox", 
          "control": "checkbox", 
        }, 
        "provaRadio": { 
          "label": "tasksEntity.type", 
          "control": "enum", 
          "enum": 
            { 
              "list": "tasksEntity.type", 
              "elements": [ 
                {
                  "label": "tasksEntity.fix",
                  "value": "VALOR"
                }, 
                {
                  "label": "tasksEntity.user",
                  "value": "FITRO"
                }, 
                {
                  "label": "tasksEntity.dataInput",
                  "value": "DATATYPE"
                }
              ] 
            }
        },
        // "provaGon": {
        //   "condition": "name",
        //   "label": [
        //     {
        //     "name": "VALOR",
        //     "text": "tasksEntity.value"
        //     },	
        //     {
        //     "name": "FITRO",	
        //     "text": "tasksEntity.filterText"
        //     },			
        //     {
        //     "name": "DATATYPE",	
        //     "text": "tasksEntity.formatDataInput"
        //     }
        //   ],							
        //   "control": "input",
        //   "required": true
        // }, 
        "group": { 
          "label": "tasksEntity.group", 
          "control": "selector", 
          "selector":{
            "data":"taskGroup",
            "name": "name",
            "value": "id",
          },
          "required":true
        }, 
        "ui": { 
          "label": "tasksEntity.ui", 
          "control": "selector",
          "selector":{
            "data":"taskUi",
            "name": "name",
            "value": "id",
          },
          "required":true
        }, 
        "cartography": { 
          "label": "tasksEntity.cartography", 
          "control": "selectorPopup", 
          "selectorPopup":{
            "data":"cartography",
            "value":"name",
            "columns":{
              "id": {
                "label":"tasksEntity.id",
                "editable": "false",
              },
              "name": {
                "label":"tasksEntity.name",
                "editable": "false"
              }
            }
          },
          "required":true
        }
      },
    },
    "tables":
      [
        { 
          "link":"roles",
          "label": "tasksEntity.roles", 
          "controlAdd": {
            "control":"selectorPopup",
            "data":"roles", 
            "columns":{
              "id": {
                "label":"tasksEntity.id"
              }
            }
          },
          "columns" : {
            "id": {
              "label":"tasksEntity.id"
            }
          }
        },	
        { 
          "link":"availabilities",
          "label": "tasksEntity.territory", 
          "controlAdd": {
            "control":"selectorPopup",
            "data":"availabilities", 
            "columns":{
              "id": {
                "label":"tasksEntity.id"
              }
            }
          } ,
          "columns" : {
            "id": {
              "label":"tasksEntity.id"
            }
          }					
        }, 
        {
          "link":"parameters",
          "label": "tasksEntity.parameters",
          "columns" : {
            "type": { 
              "label": "tasksEntity.type",
              "typeColumn": "string" 
            },
            "name": { 
              "label": "tasksEntity.parameter", 
              "typeColumn": "string"
            },
            "value": { 
              "label": "tasksEntity.value",
              "typeColumn": "string"
            },
            "order": { 
              "label": "tasksEntity.order", 
              "typeColumn": "integer"
            }
          },
          "controlAdd": {
            "control":"formPopup",
            "label": "tasksEntity.paramData",			
            "elements":{
              "type": { 
                "label": "tasksEntity.type", 
                "control": "enum", 
                "enum": 
                  { 
                    "list": "tasksEntity.type", 
                    "elements": [ 
                      {
                        "label": "tasksEntity.fix",
                        "value": "VALOR"
                      }, 
                      {
                        "label": "tasksEntity.user",
                        "value": "FITRO"
                      }, 
                      {
                        "label": "tasksEntity.dataInput",
                        "value": "DATATYPE"
                      }
                    ] 
                  }
              },
              "name": { 
                "label":"tasksEntity.paramURL", 
                "control": "input",
                "required":true,
              },
              "value": {
                "condition": "type",
                "label": [
                  {
                  "type": "VALOR",
                  "text": "tasksEntity.value"
                  },	
                  {
                  "type": "FITRO",	
                  "text": "tasksEntity.filterText"
                  },			
                  {
                  "type": "DATATYPE",	
                  "text": "tasksEntity.formatDataInput"
                  }
                ],							
                "control": "input",
                "required": true
              }, 
              "order": { 
                "label": "tasksEntity.order", 
                "control": "input"
              }
            }	
          }
        } 
      ]
    }

  

  constructor(
        public dialog: MatDialog,
        public utils: UtilsService,
        public taskGroupService: TaskGroupService,
        public serviceService: ServiceService,
        public cartographyService: CartographyService,
        public connectionService: ConnectionService,
        public taskService: TaskService,
        public taskUIService: TaskUIService,
        ) {

  }

  ngOnInit(): void {
    if(this.properties.form){

      let keys= Object.keys(this.properties.form.elements);
      let values= Object.values(this.properties.form.elements);
      for(let i=0; i< keys.length; i++){
        this.formElements.push({fieldName:keys[i], values:values[i]})
      }
      this.initializeForm(keys,values);
      
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
        this.taskUIService.getAll().subscribe(
          resp => {
            this.taskUIs.push(...resp);
            resolve(true);
          }
        );
      }));

      promises.push(new Promise((resolve, reject) => {
        this.utils.getCodeListValues('downloadTask.scope').subscribe(
          resp => {
            this.documentTypes.push(...resp);
            resolve(true);
          }
        );
      }));

      promises.push(new Promise((resolve, reject) => {
        this.serviceService.getAll().map((resp) => {
          let wfsServices = [];
          resp.forEach(service => {
            if(service.type==='WFS') {wfsServices.push(service)}
          });  
          this.wfsServices.push(...wfsServices)
          resolve(true);
        }).subscribe()
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
            console.log(this.fmeServices);
            this.fmeServices.push(...fmeServices)
            resolve(true);
          }).subscribe()
        }));

        promises.push(new Promise((resolve, reject) => {
          this.connectionService.getAll().subscribe(
            resp => {
              this.connections.push(...resp);
              resolve(true);
            }
          );
        }));
    
        promises.push(new Promise((resolve, reject) => {
          this.utils.getCodeListValues('queryTask.scope').subscribe(
            resp => {
              this.accessTypes.push(...resp);
              resolve(true);
            }
          );
        }));

        promises.push(new Promise((resolve, reject) => {
          let taskTypeID=config.tasksTypes['report'];
          let params2:HalParam[]=[];
          let param:HalParam={key:'type.id', value:taskTypeID}
          params2.push(param);
          let query:HalOptions={ params:params2};
          this.taskService.getAll(query,undefined,"tasks").subscribe(
            resp => {
              this.locators.push(...resp);
              resolve(true);
            }
          );;
        }));

      Promise.all(promises).then(() => {

        this.dataLoaded=true;

      });






    }

    console.log(this.properties.form)
  }

  initializeForm(keys: Array<any>, values: Array<any>){
    this.taskForm=new FormGroup({})
    for(let i=0; i< keys.length; i++){
      const key= keys[i];
      let value = null;
      if(values[i].hidden) { value=values[i].value }
      else if(values[i].control==="checkbox") {value=false}
  
      if(values[i].required){
        this.taskForm.addControl(key,new FormControl(value,[Validators.required]));
      }
      else{
        this.taskForm.addControl(key,new FormControl(value,[]));
      }

  
    }


  }

  getFieldWithCondition(condition, table, fieldResult){

    let findResult= table.find(element => element[condition] === this.taskForm.value[condition])

    if(findResult != undefined) { 
      findResult=findResult[fieldResult] 
    }
    
    return findResult;
  }
 

  onSaveButtonClicked(){
    console.log(this.taskForm.value);
  }

  getDataSelector(data){

        
        if(data=="taskGroup"){ return this.taskGroups }
        else if(data=="taskUi") { return this.taskUIs }
        else if(data=="documentTypes") { return this.documentTypes }
        else if(data=="wfsServices") { return this.wfsServices }
        else if(data=="fmeServices") { return this.fmeServices }
        else if(data=="accessTypes") { return this.accessTypes }
        else if(data=="this.locators") { return this.locators }
        else if(data=="cartographies") { return this.cartographies }
        else if(data=="connections") { return this.connections }
        

  }

  onPopupDeleteButtonClicked(field){
      
    this.taskForm.get(field).setValue(null);

  }

  openPopupDialog(field, data, columns, label, checkbox, singleSelection ){

    let getAllfunction = this.getDataTable(data)

    const dialogRef = this.dialog.open(DialogGridComponent, { panelClass: 'gridDialogs' });
    dialogRef.componentInstance.getAllsTable = [() => getAllfunction];
    dialogRef.componentInstance.singleSelectionTable = [singleSelection];
    dialogRef.componentInstance.columnDefsTable = [this.generateColumnDefs(columns,checkbox)];
    dialogRef.componentInstance.themeGrid = this.themeGrid;
    dialogRef.componentInstance.title = this.utils.getTranslate(label);
    dialogRef.componentInstance.titlesTable = [""];

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.event === 'Add') {
          console.log(result.data)
          this.taskForm.get(field).setValue(result.data[0][0]);

          //TODO SAVE ALL ELEMENT
        }
      }

    });


  }

  getDataTable(field)
  {
    if(field == "cartography") return this.cartographyService.getAll()
  }





  generateColumnDefs(columns, checkbox){

    let columnResults = [];
    if(checkbox) {columnResults.push(this.utils.getSelCheckboxColumnDef())}

    let keys= Object.keys(columns);
    let values= Object.values(columns);
    for(let i=0; i< keys.length; i++){
      columnResults.push({headerName: this.utils.getTranslate(values[i]['label']), field: keys[i], editable: values[i]['editable'] })
    }

    return columnResults;

  }

}
