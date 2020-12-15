import { Component, OnInit } from '@angular/core';
import { Connection } from 'dist/sitmun-frontend-core/connection/connection.model';
import { CartographyGroupService } from 'dist/sitmun-frontend-core/';
import { UtilsService } from '../../services/utils.service';
import { BtnEditRenderedComponent } from 'dist/sitmun-frontend-gui/';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layers-permits',
  templateUrl: './layers-permits.component.html',
  styleUrls: ['./layers-permits.component.scss']
})
export class LayersPermitsComponent implements OnInit {

  themeGrid: any = environment.agGridTheme;
  columnDefs: any[];
  public frameworkComponents = {
    btnEditRendererComponent: BtnEditRenderedComponent
  };

  constructor(public cartographyGroupService: CartographyGroupService,
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
        width: 20,
        lockPosition: true,
      },
      {
        headerName: '',
        field: 'id',
        editable: false,
        filter: false,
        width: 20,
        lockPosition: true,
        cellRenderer: 'btnEditRendererComponent',
        cellRendererParams: {
          clicked: this.newData.bind(this)
        },
      },
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('layersPermitsEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('layersPermitsEntity.type'), field: 'type' },
    ];

  }

  getAllLayersPermits = () => {

    return this.cartographyGroupService.getAll();
  }

  removeData(data: Connection[]) {
    console.log(data);
  }

  newData(id: any) {
    this.router.navigate(['layersPermits', id, 'layersPermitsForm']);
  }

  applyChanges(data: Connection[]) {
    console.log(data);
  }

}
