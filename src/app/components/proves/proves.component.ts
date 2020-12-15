import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Role } from 'dist/sitmun-frontend-core/role/role.model';
import { RoleService } from 'dist/sitmun-frontend-core/';
import { UtilsService } from '../../services/utils.service';
import { BtnEditRenderedComponent } from 'dist/sitmun-frontend-gui/';
import { Router } from '@angular/router';



@Component({
  selector: 'app-proves',
  templateUrl: './proves.component.html',
  styleUrls: ['./proves.component.scss']
})
export class ProvesComponent implements OnInit {

  columnDefs: any[];
  public frameworkComponents = {
    btnEditRendererComponent: BtnEditRenderedComponent
  };


  constructor(private http: HttpClient,
              public roleService: RoleService,
              private utils: UtilsService,
              private router: Router,
              )
              { }


  ngOnInit()  {

    this.columnDefs = [
      {
        headerName: '',
        field: 'id',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        editable: false,
        filter: false,
        width: 100,
        cellRenderer: 'btnEditRendererComponent',
        cellRendererParams: {
          clicked: this.newData.bind(this)
        },
      },
      { headerName: 'ID',  field: 'id', editable: false},
      { headerName: this.utils.getTranslate('description'),  field: 'description' },
      { headerName: this.utils.getTranslate('name'),  field: 'name'},
      { headerName: this.utils.getTranslate('status'), field: 'estat'},
    ];
  }

  getAllRoles = () => {
    return this.roleService.getAll();
  };

  removeData( data: Role[])
  {
    console.log(data);
  }
  
  newData(id: any)
  {
    this.router.navigate(['role', id, 'roleForm']);
  }
  
  applyChanges( data: Role[])
  {
        console.log(data);
  }

}
