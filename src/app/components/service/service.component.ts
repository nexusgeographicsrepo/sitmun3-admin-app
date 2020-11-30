import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Connection } from 'dist/sitmun-frontend-core/connection/connection.model';
import { ServiceService } from 'dist/sitmun-frontend-core/';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '../../services/utils.service';
import { BtnEditRenderedComponent } from 'dist/sitmun-frontend-gui/';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {


  columnDefs: any[];
  public frameworkComponents = {
    btnEditRendererComponent: BtnEditRenderedComponent
  };

    constructor(private http: HttpClient,
                public serviceService: ServiceService,
                private utils: UtilsService,
                private router: Router,
                ) {

    }

     ngOnInit()  {
      this.columnDefs = [
        {
          headerName: '',
          field: 'id',
          checkboxSelection: true,
          headerCheckboxSelection: true,
          editable: false,
          filter: false,
          width: 130,
          cellRenderer: 'btnEditRendererComponent',
          cellRendererParams: {
            clicked: this.newData.bind(this)
          },
        },
        { headerName: 'ID', field: 'id', editable: false },
        { headerName: this.utils.getTranslate('serviceEntity.name'), field: 'name' },
        { headerName: this.utils.getTranslate('serviceEntity.type'), field: 'type'},
        { headerName: this.utils.getTranslate('serviceEntity.serviceURL'), field: 'serviceURL'},
        { headerName: this.utils.getTranslate('serviceEntity.supportedSRS'), field: 'supportedSRS'},
        { headerName: this.utils.getTranslate('serviceEntity.createdDate'), field: 'createdDate'}
      ];

      

    }



    /*
    Important! Aquesta és la funció que li passarem al data grid a través de l'html per obtenir les files de la taula,
    de moment no he trobat cap altre manera de que funcioni sense posar la nomenclatura = () =>,
    pel que de moment hem dit de deixar-ho així!
    */
    getAllConnections = () => {

      return this.serviceService.getAll();
    }

    /*Les dues funcions que venen ara s'activaran quan es cliqui el botó de remove o el de new a la taula,
      si volguessim canviar el nom de la funció o qualsevol cosa, cal mirar l'html, allà es on es crida la funció
      corresponent!
    */

    removeData( data: Connection[])
    {
      console.log(data);
    }

    newData(id: any)
    {
      this.router.navigate(['service', id, 'serviceForm']);
    }

    applyChanges( data: Connection[])
    {
      console.log(data);
    }

  }
