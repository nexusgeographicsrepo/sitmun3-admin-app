import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService, CartographyService,Connection, Cartography, ServiceParameterService } from 'dist/sitmun-frontend-core/';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { environment } from 'src/environments/environment';
import { DialogGridComponent, DialogFormComponent } from 'dist/sitmun-frontend-gui/';
import { MatDialog } from '@angular/material/dialog';
import { Xml2js } from "xml2js";

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {

  //form
  dataLoaded: Boolean = false;
  private parametersUrl: string;
  serviceForm: FormGroup;
  serviceToEdit;
  serviceID = -1;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  projections: Array<string>;
  serviceTypes: Array<any> = [];
  requestTypes: Array<any> = [];

  //Grids
  themeGrid: any = environment.agGridTheme;
  columnDefsParameters: any[];
  getAllElementsEventParameters: Subject<boolean> = new Subject <boolean>();
  dataUpdatedEventParameters: Subject<boolean> = new Subject<boolean>();

  columnDefsLayers: any[];
  getAllElementsEventLayers: Subject<boolean> = new Subject <boolean>();
  dataUpdatedEventLayers: Subject<boolean> = new Subject<boolean>();

  //Dialogs
  columnDefsParametersDialog: any[];
  public parameterForm: FormGroup;
  addElementsEventParameters: Subject<any[]> = new Subject <any[]>();
  @ViewChild('newParameterDialog',{
    static: true
  }) private newParameterDialog: TemplateRef <any>;


  columnDefsLayersDialog: any[];
  addElementsEventLayers: Subject<any[]> = new Subject <any[]>();




  constructor(
    
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService,
    private http: HttpClient,
    public utils: UtilsService,
    public dialog: MatDialog,
    public cartographyService: CartographyService,
    public serviceParameterService: ServiceParameterService,

  ) {
    this.initializeServiceForm();
    this.initializeParameterForm();
    this.projections = [];

  }

  ngOnInit(): void {


    let serviceTypeByDefault = {
      value: -1,
      description: '-------'
    }
    this.serviceTypes.push(serviceTypeByDefault);

    const promises: Promise<any>[] = [];

    promises.push(new Promise((resolve, reject) => {
      this.utils.getCodeListValues('service.type').subscribe(
        resp => {
          this.serviceTypes.push(...resp);
          resolve(true);
        }
      );
    }));


    promises.push(new Promise((resolve, reject) => {
      this.utils.getCodeListValues('serviceParameter.type').subscribe(
        resp => {
          this.requestTypes.push(...resp);
          resolve(true);
        }
      );
    }));

    Promise.all(promises).then(() => {

      this.activatedRoute.params.subscribe(params => {
        this.serviceID = +params.id;
        if (this.serviceID !== -1) {
          this.serviceService.get(this.serviceID).subscribe(
            resp => {
              console.log(resp);
              this.serviceToEdit = resp;
              if (this.serviceToEdit.supportedSRS !== null) {
                this.serviceToEdit.supportedSRS.forEach((projection) => {
                  this.projections.push(projection);
                });
  
              }
              // this.projections = this.serviceToEdit.supportedSRS.split(';');
              this.parametersUrl = this.serviceToEdit._links.parameters.href;
              this.serviceForm.setValue({
                id: this.serviceID,
                name: this.serviceToEdit.name,
                type: this.serviceToEdit.type,
                serviceURL: this.serviceToEdit.serviceURL,
                proxyUrl: this.serviceToEdit.proxyUrl,
                supportedSRS: this.serviceToEdit.supportedSRS,
                getInformationURL: this.serviceToEdit.getInformationURL,
                blocked: this.serviceToEdit.blocked,
                _links: this.serviceToEdit._links
              });
  
              this.dataLoaded = true;
            },
            error => {
  
            }
          );
        }
        else{
          this.serviceForm.patchValue({
            blocked: false,
            type: this.serviceTypes[0].value
          })
          this.dataLoaded = true;
        }
  
      },
      error => {
  
      });

    });

    this.columnDefsParameters = [

      environment.selCheckboxColumnDef,
      { headerName: this.utils.getTranslate('serviceEntity.request'), field: 'type', editable:false },
      { headerName: this.utils.getTranslate('serviceEntity.parameter'), field: 'name', },
      { headerName: this.utils.getTranslate('serviceEntity.value'), field: 'value' },
      { headerName: this.utils.getTranslate('serviceEntity.status'), field: 'status', editable:false },


    ];

    this.columnDefsLayers = [

      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id' },
      { headerName: this.utils.getTranslate('serviceEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('serviceEntity.description'), field: 'description', },
      { headerName: this.utils.getTranslate('serviceEntity.status'), field: 'status', editable:false },

    ];

    this.columnDefsLayersDialog = [
      environment.selCheckboxColumnDef,
      { headerName: 'ID', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('connectionEntity.name'), field: 'name', editable: false },
    ];

    this.columnDefsParametersDialog = [
      environment.selCheckboxColumnDef,
      { headerName: this.utils.getTranslate('applicationEntity.name'), field: 'name',  editable: false  },
      { headerName: this.utils.getTranslate('applicationEntity.value'), field: 'value',  editable: false  },
      { headerName: this.utils.getTranslate('applicationEntity.type'), field: 'type',  editable: false  },
    ];

  }

  initializeServiceForm(): void {

    this.serviceForm = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl(null, [
        Validators.required,
      ]),
      type: new FormControl(null, [
        Validators.required,
      ]),
      serviceURL: new FormControl(null, [
        Validators.required,
      ]),
      proxyUrl: new FormControl(null,),
      supportedSRS: new FormControl(null),
      getInformationURL: new FormControl(null,),
      _links: new FormControl(null, []),
      blocked: new FormControl(null, []), 
    });

  }

  initializeParameterForm(): void {
    this.parameterForm = new FormGroup({
      name: new FormControl(null, []),
      type: new FormControl(null, []),
      value: new FormControl(null, []),

    })
  }

  addProjection(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.projections.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeProjection(projection: string): void {
    const index = this.projections.indexOf(projection);

    if (index >= 0) {
      this.projections.splice(index, 1);
    }
  }
  getCapabilitiesService(){
    this.http.get(`${this.serviceForm.value.serviceURL}?request=GetCapabilities`).subscribe(resp => {
      debugger;
      console.log(resp);
      // this.router.navigate(["/company", resp.id, "formConnection"]);
    });
  }


  // AG-GRID

  // ******** Parameters configuration ******** //
  getAllParameters = (): Observable<any> => {
    
    if(this.serviceID == -1)
    {
      const aux: Array<any> = [];
      return of(aux);
    }

    var urlReq = `${this.serviceToEdit._links.parameters.href}`
    if (this.serviceToEdit._links.parameters.templated) {
      var url = new URL(urlReq.split("{")[0]);
      url.searchParams.append("projection", "view")
      urlReq = url.toString();
    }


    return (this.http.get(urlReq))
      .pipe(map(data => data[`_embedded`][`service-parameters`]));
  }



  getAllRowsParameters(data: any[] )
  {
    let parameterToSave = [];
    let parameterToDelete = [];
    data.forEach(parameter => {
      if (parameter.status === 'Pending creation' || parameter.status === 'Modified') {
        if(! parameter._links) {
          parameter.service=this.serviceToEdit} //If is new, you need the service link
          parameterToSave.push(parameter)
      }
      if(parameter.status === 'Deleted' && parameter._links) {parameterToDelete.push(parameter) }
    });
    const promises: Promise<any>[] = [];
    parameterToSave.forEach(saveElement => {
      promises.push(new Promise((resolve, reject) => {  this.serviceParameterService.save(saveElement).subscribe((resp) => { resolve(true) }) }));
    });

    parameterToDelete.forEach(deletedElement => {
      promises.push(new Promise((resolve, reject) => {  this.serviceParameterService.remove(deletedElement).subscribe((resp) => { resolve(true) }) }));    
    });

    Promise.all(promises).then(() => {
      this.dataUpdatedEventParameters.next(true);
    });
	
  }

  duplicateParameters(data)
  {
    let parametersToDuplicate= []
    data.forEach(parameter => {
      let newParameter={
        name: 'copia_'.concat(parameter.name),
        type: parameter.type,
        value: parameter.value
      }
      
      
      parametersToDuplicate.push(newParameter);
    });
    this.addElementsEventParameters.next(parametersToDuplicate);
  }

  // ******** Layers ******** //
  getAllLayers = (): Observable<any> => {

    if(this.serviceID == -1)
    {
      const aux: Array<any> = [];
      return of(aux);
    }

    var urlReq = `${this.serviceToEdit._links.layers.href}`
    if (this.serviceToEdit._links.layers.templated) {
      var url = new URL(urlReq.split("{")[0]);
      url.searchParams.append("projection", "view")
      urlReq = url.toString();
    }
    return (this.http.get(urlReq))
    .pipe(map(data => data['_embedded']['cartographies']));
    

  }




  getAllRowsLayers(data: any[] )
  {
    let layersModified = [];
    let layersToPut = [];
    data.forEach(cartography => {
      if (cartography.status === 'Modified') {layersModified.push(cartography) }
      if(cartography.status!== 'Deleted') {layersToPut.push(cartography._links.self.href) }
    });

    this.updateLayers(layersModified, layersToPut );
  }

  updateLayers(layersModified: Cartography[], layersToPut: Cartography[])
  {
    const promises: Promise<any>[] = [];
    layersModified.forEach(cartography => {
      promises.push(new Promise((resolve, reject) => { this.cartographyService.update(cartography).subscribe((resp) => { resolve(true) }) }));
    });
    Promise.all(promises).then(() => {
      let url=this.serviceToEdit._links.layers.href.split('{', 1)[0];
      this.utils.updateUriList(url,layersToPut, this.dataUpdatedEventLayers)
    });
  }

  // ******** Parameters Dialog  ******** //


  openParametersDialog(data: any) {

    this.parameterForm.patchValue({
      type:  this.requestTypes[0].value
    })
  
    const dialogRef = this.dialog.open(DialogFormComponent);
    dialogRef.componentInstance.HTMLReceived=this.newParameterDialog;
    dialogRef.componentInstance.title=this.utils.getTranslate('serviceEntity.configurationParameters');

    


    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.event==='Add') {
          let item= this.parameterForm.value;
          this.addElementsEventParameters.next([item])
          console.log(this.parameterForm.value)
          this.parameterForm.reset();
          
        }
      }

    });

  }

        

  // ******** Layers Dialog  ******** //

  getAllLayersDialog = () => {
    return this.cartographyService.getAll();
  }

  openCartographyDialog(data: any) {

    const dialogRef = this.dialog.open(DialogGridComponent, {panelClass:'gridDialogs'});
    dialogRef.componentInstance.getAllsTable=[this.getAllLayersDialog];
    dialogRef.componentInstance.singleSelectionTable=[false];
    dialogRef.componentInstance.columnDefsTable=[this.columnDefsLayersDialog];
    dialogRef.componentInstance.themeGrid=this.themeGrid;
    dialogRef.componentInstance.title=this.utils.getTranslate('serviceEntity.layersToRegister');
    dialogRef.componentInstance.titlesTable=[''];
    dialogRef.componentInstance.nonEditable=false;
    


    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.event==='Add') {
          this.addElementsEventLayers.next(result.data[0])
        }
      }

    });

  }

  onSaveButtonClicked(){
    // this.serviceForm.patchValue({
    //   supportedSRS: this.projections.join(';')
    // })
    if(this.serviceForm.valid)
    {
      this.serviceForm.patchValue({
        supportedSRS: this.projections
      })
    console.log(this.serviceForm.value);
      this.serviceService.save(this.serviceForm.value)
      .subscribe(resp => {
        console.log(resp);
        this.serviceToEdit=resp;
        this.serviceID=resp.id;
        this.serviceForm.patchValue({
          id: resp.id,
          _links: resp._links
        })
        this.getAllElementsEventParameters.next(true);
        this.getAllElementsEventLayers.next(true);
      },
      error=> {
        console.log(error);
      });
    }
  	else{
      this.utils.showRequiredFieldsError();
    }



}



}