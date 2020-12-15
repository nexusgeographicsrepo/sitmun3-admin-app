import { Component, OnInit } from '@angular/core';
import { Role } from 'dist/sitmun-frontend-core/role/role.model';
import { TaskService } from 'dist/sitmun-frontend-core/';
import { UtilsService } from '../../services/utils.service';
import { BtnEditRenderedComponent } from 'dist/sitmun-frontend-gui/';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  themeGrid: any = environment.agGridTheme;
  columnDefs: any[];
  public frameworkComponents = {
    btnEditRendererComponent: BtnEditRenderedComponent
  };


  constructor(public tasksService: TaskService,
    private utils: UtilsService,
    private router: Router,
  ) { }


  ngOnInit() {

    this.columnDefs = [
      {
        headerName: '',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        editable: false,
        filter: false,
        width: 35,
        lockPosition: true,
      },
      {
        headerName: '',
        field: 'id',
        editable: false,
        filter: false,
        width: 40,
        lockPosition: true,
        cellRenderer: 'btnEditRendererComponent',
        cellRendererParams: {
          clicked: this.newData.bind(this)
        },
      },
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('tasksEntity.task'), field: 'name' },
      { headerName: this.utils.getTranslate('tasksEntity.informationType'), field: 'type', editable: false },
    ];
  }

  getAllTasks = () => {
    return this.tasksService.getAll();
  };

  removeData(data: Role[]) {
    console.log(data);
  }

  newData(id: any) {
    // this.router.navigate(['tasks', id, 'tasksForm']);
  }

  applyChanges(data: Role[]) {
    console.log(data);
  }

}
