import { Component, OnInit } from '@angular/core';
import { Connection } from 'dist/sitmun-frontend-core/connection/connection.model';
import { BackgroundService } from 'dist/sitmun-frontend-core/';
import { UtilsService } from '../../services/utils.service';
import { BtnEditRenderedComponent } from 'dist/sitmun-frontend-gui/';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-background-layers',
  templateUrl: './background-layers.component.html',
  styleUrls: ['./background-layers.component.scss']
})
export class BackgroundLayersComponent implements OnInit {

  themeGrid: any = environment.agGridTheme;
  columnDefs: any[];
  public frameworkComponents = {
    btnEditRendererComponent: BtnEditRenderedComponent
  };

  constructor(public backgroundService: BackgroundService,
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
        width: 30,
        lockPosition: true,
      },
      {
        headerName: '',
        field: 'id',
        editable: false,
        filter: false,
        width: 35,
        lockPosition: true,
        cellRenderer: 'btnEditRendererComponent',
        cellRendererParams: {
          clicked: this.newData.bind(this)
        },
      },
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('backgroundEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('backgroundEntity.description'), field: 'description' },
      { headerName: this.utils.getTranslate('backgroundEntity.active'), field: 'active' },
      { headerName: this.utils.getTranslate('backgroundEntity.cartographyGroup'), field: 'cartographyGroup.name' }
    ];

  }

  getAllBackgroundLayers = () => {

    return this.backgroundService.getAll()
  }

  removeData(data: Connection[]) {
    console.log(data);
  }

  newData(id: any) {
    this.router.navigate(['backgroundLayers', id, 'backgroundLayersForm']);
  }

  applyChanges(data: Connection[]) {
    console.log(data);
  }

}
