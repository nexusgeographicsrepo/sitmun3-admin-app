import { Component, OnInit } from '@angular/core';
import { Connection } from 'dist/sitmun-frontend-core/connection/connection.model';
import { ApplicationService } from 'dist/sitmun-frontend-core/';
import { UtilsService } from '../../services/utils.service';
import { BtnEditRenderedComponent } from 'dist/sitmun-frontend-gui/';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  columnDefs: any[];
  themeGrid: any = environment.agGridTheme;

  public frameworkComponents = {
    btnEditRendererComponent: BtnEditRenderedComponent
  };

  constructor(public applicationService: ApplicationService,
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
        width: 40,
        lockPosition: true,
        cellRenderer: 'btnEditRendererComponent',
        cellRendererParams: {
          clicked: this.newData.bind(this)
        },
      },
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('serviceEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('serviceEntity.type'), field: 'type' },
      { headerName: this.utils.getTranslate('serviceEntity.serviceURL'), field: 'theme' },
      { headerName: this.utils.getTranslate('serviceEntity.supportedSRS'), field: 'srs' },
      { headerName: this.utils.getTranslate('serviceEntity.createdDate'), field: 'createdDate' } // type: 'dateColumn'
    ];

  }



  getAllApplications = () => {

    return this.applicationService.getAll();
  }


  removeData(data: Connection[]) {
    console.log(data);
  }

  newData(id: any) {
    this.router.navigate(['application', id, 'applicationForm']);
  }

  applyChanges(data: Connection[]) {
    console.log(data);
  }

}
