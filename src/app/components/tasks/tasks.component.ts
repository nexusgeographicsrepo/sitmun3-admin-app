import { Component, OnInit } from '@angular/core';
import { Role } from 'dist/sitmun-frontend-core/role/role.model';
import { TaskService } from 'dist/sitmun-frontend-core/';
import { UtilsService } from '../../services/utils.service';
import { BtnEditRenderedComponent } from 'dist/sitmun-frontend-gui/';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  columnDefs: any[];
  public frameworkComponents = {
    btnEditRendererComponent: BtnEditRenderedComponent
  };


  constructor(public tasksService: TaskService,
              private utils: UtilsService,
              private router: Router,
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
        width: 35,
        lockPosition:true,
      },
      {
        headerName: '',
        field: 'id',
        editable: false,
        filter: false,
        width: 40,
        lockPosition:true,
        cellRenderer: 'btnEditRendererComponent',
        cellRendererParams: {
          clicked: this.newData.bind(this)
        },
      },
      { headerName: 'ID',  field: 'id', editable: false},
      { headerName: this.utils.getTranslate('tasksEntity.task'),  field: 'name'},
      { headerName: this.utils.getTranslate('tasksEntity.informationType'),  field: 'type',  editable: false },
    ];
  }


    /*
    Important! Aquesta és la funció que li passarem al data grid a través de l'html per obtenir les files de la taula,
    de moment no he trobat cap altre manera de que funcioni sense posar la nomenclatura = () =>,
    pel que de moment hem dit de deixar-ho així!
  */
  getAllTasks = () => {
    return this.tasksService.getAll();
  };

  /*Les dues funcions que venen ara s'activaran quan es cliqui el botó de remove o el de new a la taula,
    si volguessim canviar el nom de la funció o qualsevol cosa, cal mirar l'html, allà es on es crida la funció
    corresponent!
  */

  removeData( data: Role[])
  {
    console.log(data);
  }
  
  newData(id: any)
  {
    this.router.navigate(['tasks', id, 'tasksForm']);
  }
  
  applyChanges( data: Role[])
  {
        console.log(data);
  }

}