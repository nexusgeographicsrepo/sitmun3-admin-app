import { Component, OnInit } from '@angular/core';
import { Territory } from 'dist/sitmun-frontend-core/territory/territory.model';
import { TerritoryService } from 'dist/sitmun-frontend-core/';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-territory',
  templateUrl: './territory.component.html',
  styleUrls: ['./territory.component.scss']
})
export class TerritoryComponent implements OnInit {

  dataUpdatedEvent: Subject<boolean> = new Subject<boolean>();
  themeGrid: any = environment.agGridTheme;
  columnDefs: any[];
  scopeTypes: Array<any> = [];



  constructor(public territoryService: TerritoryService,
    private utils: UtilsService,
    private router: Router,
  ) { }


  ngOnInit() {

    this.utils.getCodeListValues('territory.scope').subscribe(
      resp => {
        this.scopeTypes.push(...resp);
      }
    );

    this.columnDefs = [
      {
        headerName: '',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        editable: false,
        filter: false,
        width: 70,
        lockPosition: true,
      },
      {
        headerName: '',
        field: 'id',
        editable: false,
        filter: false,
        width: 75,
        lockPosition: true,
        cellRenderer: 'btnEditRendererComponent',
        cellRendererParams: {clicked: this.newData.bind(this) },
      },
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('territoryEntity.code'), field: 'code' },
      { headerName: this.utils.getTranslate('territoryEntity.name'), field: 'name' },
      {
        headerName: this.utils.getTranslate('territoryEntity.scope'),
        valueGetter: (params) => {
          var alias = this.scopeTypes.filter((type) => type.value == params.data.scope)[0];
          return alias != undefined ? alias.description : params.data.scope
        }
      },
      { headerName: this.utils.getTranslate('territoryEntity.createdDate'), field: 'createdDate', }, // type: 'dateColumn'
      { headerName: this.utils.getTranslate('territoryEntity.administrator'), field: 'territorialAuthorityName' },
      { headerName: this.utils.getTranslate('territoryEntity.email'), field: 'territorialAuthorityEmail' },
      { headerName: this.utils.getTranslate('territoryEntity.address'), field: 'territorialAuthorityAddress' },
      { headerName: this.utils.getTranslate('territoryEntity.extent'), field: 'extent' },
      { headerName: this.utils.getTranslate('territoryEntity.note'), field: 'note' },
      { headerName: this.utils.getTranslate('territoryEntity.blocked'), field: 'blocked', editable: false,
      cellRenderer: 'btnCheckboxRendererComponent', floatingFilterComponent: 'btnCheckboxFilterComponent',
      floatingFilterComponentParams: { suppressFilterButton: true }, },
    ];
  }

  getAllTerritories = () => {
    return this.territoryService.getAll();
  }

  newData(id: any) {
    this.router.navigate(['territory', id, 'territoryForm']);
  }

  applyChanges(data: Territory[]) {
    const promises: Promise<any>[] = [];
    data.forEach(territory => {
      promises.push(new Promise((resolve, reject) => { this.territoryService.update(territory).toPromise().then((resp) => { resolve() }) }));
      Promise.all(promises).then(() => {
        this.dataUpdatedEvent.next(true);
      });
    });
  }

  add(data: Territory[]) {
    const promises: Promise<any>[] = [];
    data.forEach(territory => {
      territory.id = null;
      promises.push(new Promise((resolve, reject) => { this.territoryService.create(territory).toPromise().then((resp) => { resolve() }) }));
      Promise.all(promises).then(() => {
        this.dataUpdatedEvent.next(true);
      });
    });

  }

  removeData(data: Territory[]) {
    const promises: Promise<any>[] = [];
    data.forEach(territory => {
      promises.push(new Promise((resolve, reject) => { this.territoryService.delete(territory).toPromise().then((resp) => { resolve() }) }));
      Promise.all(promises).then(() => {
        this.dataUpdatedEvent.next(true);
      });
    });

  }

}
