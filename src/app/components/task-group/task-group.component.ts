
import { Component, OnInit } from '@angular/core';
import { Connection } from 'dist/sitmun-frontend-core/connection/connection.model';
import { TaskGroupService } from 'dist/sitmun-frontend-core/';
import { UtilsService } from '../../services/utils.service';
import { BtnEditRenderedComponent } from 'dist/sitmun-frontend-gui/';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.scss']
})
export class TaskGroupComponent implements OnInit {

  themeGrid: any = environment.agGridTheme;
  columnDefs: any[];
  public frameworkComponents = {
    btnEditRendererComponent: BtnEditRenderedComponent
  };

  constructor(public taskGroupService: TaskGroupService,
    private utils: UtilsService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.columnDefs = [
      {
        headerName: '',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        editable: false,
        filter: false,
        width: 12,
        lockPosition: true,
      },
      {
        headerName: '',
        field: 'id',
        editable: false,
        filter: false,
        width: 13,
        lockPosition: true,
        cellRenderer: 'btnEditRendererComponent',
        cellRendererParams: {
          clicked: this.newData.bind(this)
        },
      },
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('taskGroupEntity.name'), field: 'name' },
      // { headerName: this.utils.getTranslate('serviceEntity.type'), field: 'type'},
      // { headerName: this.utils.getTranslate('serviceEntity.serviceURL'), field: 'theme'},
      // { headerName: this.utils.getTranslate('serviceEntity.supportedSRS'), field: 'srs'},
      // { headerName: this.utils.getTranslate('serviceEntity.createdDate'), field: 'createdDate'} // type: 'dateColumn'
    ];

  }


  getAllTaskGroups = () => {

    return this.taskGroupService.getAll();
  }


  removeData(data: Connection[]) {
    console.log(data);
  }

  newData(id: any) {
    this.router.navigate(['taskGroup', id, 'taskGroupForm']);
  }

  applyChanges(data: Connection[]) {
    console.log(data);
  }

}

