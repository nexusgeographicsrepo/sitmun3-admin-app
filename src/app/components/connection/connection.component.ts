import { Component, OnInit } from '@angular/core';
import { Connection } from 'dist/sitmun-frontend-core/connection/connection.model';
import { ConnectionService } from 'dist/sitmun-frontend-core/';
import { UtilsService } from '../../services/utils.service';
import { BtnEditRenderedComponent } from 'dist/sitmun-frontend-gui/';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  themeGrid: any = environment.agGridTheme;
  columnDefs: any[];
  public frameworkComponents = {
    btnEditRendererComponent: BtnEditRenderedComponent
  };

  constructor(public connectionService: ConnectionService,
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
        width: 40,
        lockPosition: true,
      },
      {
        headerName: '',
        editable: false,
        filter: false,
        width: 48,
        lockPosition: true,
        cellRenderer: 'btnEditRendererComponent',
        cellRendererParams: {
          clicked: this.newData.bind(this)
        },
      },
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('connectionEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('connectionEntity.user'), field: 'user' },
      { headerName: this.utils.getTranslate('connectionEntity.driver'), field: 'driver' },
      { headerName: this.utils.getTranslate('connectionEntity.connection'), field: 'url' }
    ];
  }

  getAllConnections = () => {

    return this.connectionService.getAll();
  }

  removeData(data: Connection[]) {
    data.forEach(connection => {
      this.connectionService.delete(connection);
    });
  }

  newData(id: any) {
    this.router.navigate(['connection', id, 'connectionForm']);
  }

  applyChanges(data: Connection[]) {
    console.log(data);
  }

}
