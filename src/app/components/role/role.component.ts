import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Role } from 'dist/sitmun-frontend-core/role/role.model';
import { RoleService } from 'dist/sitmun-frontend-core/';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '../../services/utils.service';
import { BtnEditRenderedComponent } from '../shared/btn-edit-rendered/btn-edit-rendered.component';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit{

    columnDefs: any[];
    public frameworkComponents = {
      btnEditRendererComponent: BtnEditRenderedComponent
    };


    constructor(private http: HttpClient,
                public roleService: RoleService,
                private utils: UtilsService
                )
                { }


    ngOnInit()  {

      this.columnDefs = [
        {
          headerName: '',
          field: 'id',
          checkboxSelection: true,
          headerCheckboxSelection: true,
          filter: false,
          width: 100,
          cellRenderer: 'btnEditRendererComponent',
          cellRendererParams: {
            clicked: function(field: any) {
              alert(`${field} was clicked`);
            }
          },
        },
        { headerName: 'ID',  field: 'id'},
        { headerName: this.utils.getTranslate('description'),  field: 'description' },
        { headerName: this.utils.getTranslate('name'),  field: 'name'},
        { headerName: this.utils.getTranslate('status'), field: 'estat'},
      ];
    }


      /*
      Important! Aquesta és la funció que li passarem al data grid a través de l'html per obtenir les files de la taula,
      de moment no he trobat cap altre manera de que funcioni sense posar la nomenclatura = () =>,
      pel que de moment hem dit de deixar-ho així!
    */
    getAllRoles = () => {
      return this.roleService.getAll();
    };

    /*Les dues funcions que venen ara s'activaran quan es cliqui el botó de remove o el de new a la taula,
      si volguessim canviar el nom de la funció o qualsevol cosa, cal mirar l'html, allà es on es crida la funció
      corresponent!
    */

  removeData( data: Role[])
  {
    console.log(data);
  }
  
  newData()
  {
    console.log(`el ID es`);
  }  
  
  applyChanges( data: Role[])
  {
        console.log(data);
  }

  }
