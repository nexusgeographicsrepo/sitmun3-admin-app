import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Connection } from 'dist/sitmun-frontend-core/connection/connection.model';
import { MapConfigurationManagerService } from 'dist/sitmun-frontend-core/';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '../../services/utils.service';
import { BtnEditRenderedComponent } from 'dist/sitmun-frontend-gui/';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.scss']
})
export class LayersComponent implements OnInit {


  columnDefs: any[];
  public frameworkComponents = {
    btnEditRendererComponent: BtnEditRenderedComponent
  };

    constructor(private http: HttpClient,
                public mapConfigurationManagerService: MapConfigurationManagerService,
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
          lockPosition:true,
          cellRenderer: 'btnEditRendererComponent',
          cellRendererParams: {
            clicked: this.newData.bind(this)
          },
        },
        { headerName: 'ID', field: 'id', editable: false },
        { headerName: this.utils.getTranslate('layersEntity.name'), field: 'name' },
        { headerName: this.utils.getTranslate('layersEntity.serverName'), field: 'serverName'}, //service
        { headerName: this.utils.getTranslate('layersEntity.order'), field: 'order'},
        { headerName: this.utils.getTranslate('layersEntity.layers'), field: 'layers'},
        { headerName: this.utils.getTranslate('layersEntity.createdDate'), field: 'createdDate'},
        { headerName: this.utils.getTranslate('layersEntity.minScale'), field: 'minScale'},
        { headerName: this.utils.getTranslate('layersEntity.maxScale'), field: 'maxScale'},
        { headerName: this.utils.getTranslate('layersEntity.infoUrl'), field: 'infoUrl'},
      ];

    }



    /*
    Important! Aquesta és la funció que li passarem al data grid a través de l'html per obtenir les files de la taula,
    de moment no he trobat cap altre manera de que funcioni sense posar la nomenclatura = () =>,
    pel que de moment hem dit de deixar-ho així!
    */
    getAllLayers = () => {

      return this.mapConfigurationManagerService.getLayers();
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
      this.router.navigate(['layers', id, 'layersForm']);
    }

    applyChanges( data: Connection[])
    {
      console.log(data);
    }

  }
