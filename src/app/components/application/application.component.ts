import { Component, OnInit } from '@angular/core';
import { Application } from 'dist/sitmun-frontend-core/';
import { ApplicationService } from 'dist/sitmun-frontend-core/';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  dataUpdatedEvent: Subject<boolean> = new Subject<boolean>();
  themeGrid: any = environment.agGridTheme;
  columnDefs: any[];

  applicationTypes: Array<any> = [];


  constructor(public applicationService: ApplicationService,
    private utils: UtilsService,
    private router: Router,
  ) {

  }

  ngOnInit() {


    this.utils.getCodeListValues('application.type').subscribe(
      resp => {
        this.applicationTypes.push(...resp);
      }
    );


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
        field: 'id',
        editable: false,
        filter: false,
        width: 41,
        lockPosition: true,
        cellRenderer: 'btnEditRendererComponent',
        cellRendererParams: {
          clicked: this.newData.bind(this)
        },
      },
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('applicationEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('applicationEntity.type'), 
        valueGetter: (params) => { 
          var alias=this.applicationTypes.filter((type) => type.value == params.data.type)[0];
          return alias!=undefined? alias.description: params.data.type
        } 
      },
      { headerName: this.utils.getTranslate('applicationEntity.serviceURL'), field: 'theme' },
      { headerName: this.utils.getTranslate('applicationEntity.supportedSRS'), field: 'srs' },
      { headerName: this.utils.getTranslate('applicationEntity.createdDate'), field: 'createdDate' } // type: 'dateColumn'
    ];

  }

  getAllApplications = () => {
    return this.applicationService.getAll();
  }

  newData(id: any) {
    this.router.navigate(['application', id, 'applicationForm']);
  }

  applyChanges(data: Application[]) {
    const promises: Promise<any>[] = [];
    data.forEach(application => {
      promises.push(new Promise((resolve, reject) => { this.applicationService.update(application).toPromise().then((resp) => { resolve() }) }));
      Promise.all(promises).then(() => {
        this.dataUpdatedEvent.next(true);
      });
    });
  }

  add(data: Application[]) {
    const promises: Promise<any>[] = [];
    data.forEach(application => {
      application.id = null;
      promises.push(new Promise((resolve, reject) => { this.applicationService.create(application).toPromise().then((resp) => { resolve() }) }));
      Promise.all(promises).then(() => {
        this.dataUpdatedEvent.next(true);
      });
    });

  }

  removeData(data: Application[]) {
    const promises: Promise<any>[] = [];
    data.forEach(application => {
      promises.push(new Promise((resolve, reject) => { this.applicationService.delete(application).toPromise().then((resp) => { resolve() }) }));
      Promise.all(promises).then(() => {
        this.dataUpdatedEvent.next(true);
      });
    });

  }
}
