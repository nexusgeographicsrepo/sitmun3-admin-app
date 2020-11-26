import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Territory } from 'dist/sitmun-frontend-core/territory/territory.model';
import { TerritoryService } from 'dist/sitmun-frontend-core/';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '../../services/utils.service';
import { BtnEditRenderedComponent } from '../shared/btn-edit-rendered/btn-edit-rendered.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-territory',
  templateUrl: './territory.component.html',
  styleUrls: ['./territory.component.scss']
})
export class TerritoryComponent implements OnInit {

  columnDefs: any[];
  public frameworkComponents = {
    btnEditRendererComponent: BtnEditRenderedComponent
  };


  constructor(private http: HttpClient,
              public territoryService: TerritoryService,
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
      { headerName: this.utils.getTranslate('code'),  field: 'code' },
      { headerName: this.utils.getTranslate('name'),  field: 'name'},
      { headerName: this.utils.getTranslate('status'), field: 'estat'},
    ];
  }


    /*
    Important! Aquesta és la funció que li passarem al data grid a través de l'html per obtenir les files de la taula,
    de moment no he trobat cap altre manera de que funcioni sense posar la nomenclatura = () =>,
    pel que de moment hem dit de deixar-ho així!
  */
  getAllTerritories = () => {
    return this.territoryService.getAll();
  }

  /*Les dues funcions que venen ara s'activaran quan es cliqui el botó de remove o el de new a la taula,
    si volguessim canviar el nom de la funció o qualsevol cosa, cal mirar l'html, allà es on es crida la funció
    corresponent!
  */

removeData( data: Territory[])
{
  console.log(data);
}

newData(id: any)
{
  this.router.navigate(['territory', id, 'territoryForm']);
}

applyChanges( data: Territory[])
{
      console.log(data);
}

}
