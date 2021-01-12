import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HalOptions, HalParam, TaskService } from '@sitmun/frontend-core';

@Component({
  selector: 'app-tasks-thematic',
  templateUrl: './tasks-thematic.component.html',
  styleUrls: ['./tasks-thematic.component.scss']
})
export class TasksThematicComponent implements OnInit {

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
        width: 50,
        lockPosition:true,
      },
      {
        headerName: '',
        field: 'id',
        editable: false,
        filter: false,
        width: 50,
        lockPosition:true,
        cellRenderer: 'btnEditRendererComponent',
        cellRendererParams: {
          clicked: this.newData.bind(this)
        },
      },
      { headerName: 'ID',  field: 'id', editable: false},
      { headerName: this.utils.getTranslate('tasksThematicEntity.name'),  field: 'name'},
      { headerName: this.utils.getTranslate('tasksThematicEntity.origin'),  field: 'origin'},
      { headerName: this.utils.getTranslate('tasksThematicEntity.creator'),  field: 'creator'},
      { headerName: this.utils.getTranslate('tasksThematicEntity.dataCreated'),  field: 'createdDate' }
    ];
  }



  getAllTasksThematic = () => {
    let taskType=environment.tasksTypes.find(element => element.name==='thematic');
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
    this.router.navigate(['tasksThematic', id, 'tasksThematicForm']);

  }
  
  applyChanges( data: any[])
  {
        console.log(data);
  }

}
