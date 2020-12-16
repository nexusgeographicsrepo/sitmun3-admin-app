import { Component, OnInit } from '@angular/core';
import { CartographyService, Cartography } from 'dist/sitmun-frontend-core/';
import { UtilsService } from '../../services/utils.service';
import { BtnEditRenderedComponent } from 'dist/sitmun-frontend-gui/';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.scss']
})
export class LayersComponent implements OnInit {

  dataUpdatedEvent: Subject<boolean> = new Subject <boolean>();
  themeGrid: any = environment.agGridTheme;
  columnDefs: any[];
  public frameworkComponents = {
    btnEditRendererComponent: BtnEditRenderedComponent
  };

  constructor(public cartographyService: CartographyService,
    private utils: UtilsService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.columnDefs = [
      {
        headerName: '',
        field: 'id',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        editable: false,
        filter: false,
        width: 60,
        lockPosition: true,
      },
      {
        headerName: '',
        field: 'id',
        editable: false,
        filter: false,
        width: 65,
        lockPosition: true,
        cellRenderer: 'btnEditRendererComponent',
        cellRendererParams: {
          clicked: this.newData.bind(this)
        },
      },
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('layersEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('layersEntity.source'), field: 'source' }, //service
      { headerName: this.utils.getTranslate('layersEntity.order'), field: 'order' },
      { headerName: this.utils.getTranslate('layersEntity.layers'), field: 'layers' },
      { headerName: this.utils.getTranslate('layersEntity.createdDate'), field: 'createdDate' }, // type: 'dateColumn'
      { headerName: this.utils.getTranslate('layersEntity.minimumScale'), field: 'minimumScale' },
      { headerName: this.utils.getTranslate('layersEntity.maximumScale'), field: 'maximumScale' },
      { headerName: this.utils.getTranslate('layersEntity.metadataURL'), field: 'metadataURL' },
    ];

  }

  getAllLayers = () => {

    return this.cartographyService.getAll();
  }

  newData(id: any) {
    this.router.navigate(['layers', id, 'layersForm']);
  }

  applyChanges(data: Cartography[]) {
    console.log(data);
  }

  add(data: Cartography[]) {
    const promises: Promise<any>[] = [];
    data.forEach(cartography => {
      cartography.id = null;
      console.log(cartography);
      promises.push(new Promise((resolve, reject) => {​​​​​​​ this.cartographyService.create(cartography).toPromise().then((resp) =>{​​​​​​​resolve()}​​​​​​​)}​​​​​​​));
      Promise.all(promises).then(() => {
        this.dataUpdatedEvent.next(true);
      });
    });

  }

  removeData(data: Cartography[]) {
    const promises: Promise<any>[] = [];
    data.forEach(cartography => {

      promises.push(new Promise((resolve, reject) => {​​​​​​​ this.cartographyService.delete(cartography).toPromise().then((resp) =>{​​​​​​​resolve()}​​​​​​​)}​​​​​​​));
      Promise.all(promises).then(() => {
        this.dataUpdatedEvent.next(true);
      });
    });

  }

}
