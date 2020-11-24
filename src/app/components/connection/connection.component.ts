import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Connection } from 'dist/sitmun-frontend-core/connection/connection.model';
import { ConnectionService } from 'dist/sitmun-frontend-core/';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '../../services/utils.service';
import { BtnEditRenderedComponent } from '../shared/btn-edit-rendered/btn-edit-rendered.component';


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {


  columnDefs: any[];
  public frameworkComponents = {
    btnEditRendererComponent: BtnEditRenderedComponent
  };

    constructor(private http: HttpClient,
                public connectionService: ConnectionService,
                private utils: UtilsService
                ) {

    }

     ngOnInit()  {
      this.columnDefs = [
        {
          headerName: '',
          field: 'id',
          checkboxSelection: true,
          headerCheckboxSelection: true,
          filter: false,
          width: 130,
          cellRenderer: 'btnEditRendererComponent',
          cellRendererParams: {
            clicked: function(field: any) {
              alert(`${field} was clicked`);
            }
          },
        },
        { headerName: 'ID', field: 'id' },
        { headerName: this.utils.getTranslate('name'), field: 'name' },
        { headerName: this.utils.getTranslate('user'), field: 'user'},
        { headerName: 'Driver', field: 'driver'},
        { headerName: this.utils.getTranslate('connection'), field: 'url'},
        { headerName: this.utils.getTranslate('status'), field: 'estat'},
      ];
    }



      /*
      Important! Aquesta és la funció que li passarem al data grid a través de l'html per obtenir les files de la taula,
      de moment no he trobat cap altre manera de que funcioni sense posar la nomenclatura = () =>,
      pel que de moment hem dit de deixar-ho així!
    */
    getAllConnections = () => {

      return this.connectionService.getAll();
    }

    /*Les dues funcions que venen ara s'activaran quan es cliqui el botó de remove o el de new a la taula,
      si volguessim canviar el nom de la funció o qualsevol cosa, cal mirar l'html, allà es on es crida la funció
      corresponent!
    */

    removeData( data: Connection[])
    {
      console.log(data);
    }

    newData()
    {
      console.log('Crear nou objecte!');
    }

    applyChanges( data: Connection[])
    {
      console.log(data);
    }

  }
