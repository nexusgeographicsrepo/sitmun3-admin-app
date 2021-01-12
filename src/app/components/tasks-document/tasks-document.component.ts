import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HalOptions, HalParam, TaskService } from '@sitmun/frontend-core';

@Component({
  selector: 'app-tasks-document',
  templateUrl: './tasks-document.component.html',
  styleUrls: ['./tasks-document.component.scss']
})
export class TasksDocumentComponent implements OnInit {

  themeGrid:any=environment.agGridTheme;
  columnDefs: any[];

  constructor(private utils: UtilsService,
              private router: Router,
              public taskService: TaskService
              )
              { }


  ngOnInit()  {

    this.columnDefs = [
      {
        headerName: '',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        editable: false,
        filter: false,
        width: 60,
        lockPosition:true,
      },
      {
        headerName: '',
        field: 'id',
        editable: false,
        filter: false,
        width: 60,
        lockPosition:true,
        cellRenderer: 'btnEditRendererComponent',
        cellRendererParams: {
          clicked: this.newData.bind(this)
        },
      },
      { headerName: 'ID',  field: 'id', editable: false},
      { headerName: this.utils.getTranslate('tasksDocumentEntity.task'),  field: 'name'},
      { headerName: this.utils.getTranslate('tasksDocumentEntity.informationType'),  field: 'groupName'},
      { headerName: this.utils.getTranslate('tasksDocumentEntity.path'),  field: 'path' },
      { headerName: this.utils.getTranslate('tasksDocumentEntity.extent'),  field: 'extent' },
      { headerName: this.utils.getTranslate('tasksDocumentEntity.associatedLayer'),  field: 'associatedLayer' }
    ];
  }



  getAllTasksDocument = () => {
    
    let taskType=environment.tasksTypes.find(element => element.name==='document');
    let params2:HalParam[]=[];
    let param:HalParam={key:'type.id', value:taskType.id}
    params2.push(param);
    let query:HalOptions={ params:params2};
    return this.taskService.getAll(query);
  }

  removeData( data: any[])
  {
    console.log(data);
  }
  
  newData(id: any)
  {
    this.router.navigate(['tasksDocument', id, 'tasksDocumentForm']);
  }
  
  applyChanges( data: any[])
  {
        console.log(data);
  }

}
