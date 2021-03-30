import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  htmlString = "";
  @ViewChild("ref", {read: ElementRef, static:true}) tref: ElementRef;



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
        "provaGon": {
          "condition": "name",
          "label": [
            {
            "name": "VALOR",
            "text": "tasksEntity.value"
            },	
            {
            "name": "FITRO",	
            "text": "tasksEntity.filterText"
            },			
            {
            "name": "DATATYPE",	
            "text": "tasksEntity.formatDataInput"
            }
          ],							
          "control": "input",
          "required": true
        }, 
        "group": { 
          "label": "tasksEntity.group", 
          "control": "selector", 
          "selector":{
            "data":"taskGroup"
          },
          "required":true
        }, 
        "ui": { 
          "label": "tasksEntity.ui", 
          "control": "selector",
          "selector":{
            "data":"taskUi"
          },
          "required":true
        }, 
        "cartography": { 
          "label": "tasksEntity.cartography", 
          "control": "selectorPopup", 
          "selectorPopup":{
            "data":"cartography",
            "columns":{
              "id": {
                "label":"tasksEntity.id"
              },
              "name": {
                "label":"tasksEntity.name"
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

  

  constructor(    public utils: UtilsService) {

  }

  ngOnInit(): void {
    if(this.properties.form){

      let keys= Object.keys(this.properties.form.elements);
      let values= Object.values(this.properties.form.elements);
      for(let i=0; i< keys.length; i++){
        this.formElements.push({fieldName:keys[i], values:values[i]})
      }
      this.initializeForm(keys,values);
      


      this.dataLoaded=true;





    }

    console.log(this.properties.form)
  }

  initializeForm(keys: Array<any>, values: Array<any>){
    this.taskForm=new FormGroup({})
    for(let i=0; i< keys.length; i++){
      const key= keys[i];
      let value = null;
      if(values[i].hidden) { value=values[i].value }
  
      if(values[i].required){
        this.taskForm.addControl(key,new FormControl(value,[Validators.required]));
      }
      else{
        this.taskForm.addControl(key,new FormControl(value,[]));
      }

  
    }


  }

  getFieldWithCondition(condition, table, fieldResult){
    console.log(condition)
    let findResult= table.find(element => element[condition] === this.taskForm.value[condition])

    if(findResult != undefined) { 
      findResult=findResult[fieldResult] 
    }
    
    return findResult;
  }
 

  onSaveButtonClicked(){
    console.log(this.taskForm.value);
  }

}
