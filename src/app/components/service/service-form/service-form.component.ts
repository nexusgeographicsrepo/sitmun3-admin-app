import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService, CartographyService, Translation, TranslationService, Connection, Cartography, ServiceParameterService, CapabilitiesService, CartographyStyleService, CartographyFilterService } from 'dist/sitmun-frontend-core/';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { environment } from 'src/environments/environment';
import { config } from 'src/config';
import { DialogGridComponent, DialogFormComponent } from 'dist/sitmun-frontend-gui/';
import { MatDialog } from '@angular/material/dialog';
import * as xml2js from 'xml2js';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {

  //Translations
  translationMap: Map<string, Translation>;

  translationsModified: boolean = false;
  //form
  dataLoaded: Boolean = false;
  capabilitiesLoaded: Boolean = true;
  private parametersUrl: string;
  serviceForm: FormGroup;
  serviceToEdit;
  serviceID = -1;
  duplicateID = -1;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  projections: Array<string>;
  serviceTypes: Array<any> = [];
  requestTypes: Array<any> = [];
  serviceCapabilitiesData:any={};
  getCapabilitiesLayers=[];
  //Grids
  themeGrid: any = config.agGridTheme;
  columnDefsParameters: any[];
  getAllElementsEventParameters: Subject<string> = new Subject <string>();
  dataUpdatedEventParameters: Subject<boolean> = new Subject<boolean>();

  columnDefsLayers: any[];
  getAllElementsEventLayers: Subject<string> = new Subject <string>();
  dataUpdatedEventLayers: Subject<boolean> = new Subject<boolean>();

  //Dialogs

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
    private translationService: TranslationService,
    private http: HttpClient,
    public utils: UtilsService,
    public dialog: MatDialog,
    public cartographyService: CartographyService,
    public serviceParameterService: ServiceParameterService,
    public cartographyStyleService: CartographyStyleService,
    public capabilitiesService: CapabilitiesService

  ) {
    this.initializeServiceForm();
    this.initializeParameterForm();
    this.projections = [];

  }

  ngOnInit(): void {
    this.translationMap= this.utils.createTranslationsList(config.translationColumns.serviceDescription);
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
        if(params.idDuplicate) { this.duplicateID = +params.idDuplicate; }
      
        if (this.serviceID !== -1 || this.duplicateID != -1) {
          let idToGet = this.serviceID !== -1? this.serviceID: this.duplicateID  
          this.serviceService.get(idToGet).subscribe(
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
              this.serviceForm.patchValue({
                type: this.serviceToEdit.type,
                description: this.serviceToEdit.description,
                proxyUrl: this.serviceToEdit.proxyUrl,
                supportedSRS: this.serviceToEdit.supportedSRS,
                blocked: this.serviceToEdit.blocked,
                _links: this.serviceToEdit._links
              });



              if(this.serviceID != -1){
                this.serviceForm.patchValue({
                  id: this.serviceID,
                  name: this.serviceToEdit.name,
                  serviceURL: this.serviceToEdit.serviceURL,
                  getInformationURL: this.serviceToEdit.getInformationURL,
                  });
                this.translationService.getAll()
                .pipe(map((data: any[]) => data.filter(elem => elem.element == this.serviceID && elem.column == config.translationColumns.serviceDescription)
                )).subscribe( result => {
                  this.utils.updateTranslations(this.translationMap, result)
                });;
              } 
              else{
                this.serviceForm.patchValue({
                  name: this.utils.getTranslate('copy_').concat(this.serviceToEdit.name),
                  });
              }   



  
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

      this.utils.getSelCheckboxColumnDef(),
      this.utils.getIdColumnDef(),
      this.utils.getNonEditableColumnDef('serviceEntity.request', 'type'),
      this.utils.getEditableColumnDef('serviceEntity.parameter', 'name'),
      this.utils.getEditableColumnDef('serviceEntity.value', 'value'),
      this.utils.getStatusColumnDef()

    ];

    this.columnDefsLayers = [
      this.utils.getSelCheckboxColumnDef(),
      this.utils.getIdColumnDef(),
      this.utils.getNonEditableColumnDef('serviceEntity.name', 'name'),
      this.utils.getNonEditableColumnDef('serviceEntity.description', 'description'),
      this.utils.getStatusColumnDef()
    ];

    this.columnDefsLayersDialog = [
      this.utils.getSelCheckboxColumnDef(),
      this.utils.getIdColumnDef(),
      this.utils.getNonEditableColumnDef('serviceEntity.name', 'name'),
    ];

  }

  initializeServiceForm(): void {

    this.serviceForm = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl(null, [
        Validators.required,
      ]),
      description: new FormControl(null,[]),
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
      name: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
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

  getCapabilitiesDataService(refresh?){
    try{
      let url: string = this.serviceForm.value.serviceURL;
      if(! url.includes('request=GetCapabilities')){
        if(url[url.length-1] != '?') { url += "?" }
      
        url += 'request=GetCapabilities%26service=WMS'
      }
      this.capabilitiesService.getInfo(url).subscribe(result => {
        console.log(result)
        if(result.success){
          this.getCapabilitiesLayers=[];
          this.serviceCapabilitiesData=result.asJson;
          this.changeServiceDataByCapabilities(refresh);
        }
      },error => {
        console.log(error)
        this.capabilitiesLoaded=true;
      })
    }
    catch(err) {
      this.utils.showErrorMessage ("ERROR")
      this.capabilitiesLoaded=true;

    };
  }

  changeServiceDataByCapabilities(refresh?){
    let data=this.serviceCapabilitiesData.WMT_MS_Capabilities!=undefined?this.serviceCapabilitiesData.WMT_MS_Capabilities:this.serviceCapabilitiesData.WMS_Capabilities
    if (data!=undefined ){
      if(data.Capability && data.Capability.Layer.SRS !== null && data.Capability.Layer.SRS !== undefined) {
        this.projections=[];
        this.serviceCapabilitiesData.WMT_MS_Capabilities.Capability.Layer.SRS.forEach((projection) => {
          this.projections.push(projection);
        });
      }
      let capability = data.Capability.Layer;
      while(capability.Layer != null && capability.Layer != undefined){
        capability=capability.Layer;
      }
      let layersTable= [];
      this.getLayersCapabilities(capability,layersTable);
      if(layersTable.length>0){
        layersTable.forEach(lyr => {
          let layersLyr;
          let styles = [];
          if(Array.isArray(lyr.Name)){
            layersLyr=lyr.Name;
          }
          else{
            if(!isNaN(lyr.Name)) { lyr.Name=lyr.Name.toString() }
            layersLyr=lyr.Name.split(",");
          }
          if(!layersLyr) { layersLyr = [] }
          let cartography= new Cartography();
          cartography.name= lyr.Title;
          cartography.description=lyr.Abstract;
          cartography.layers=layersLyr;
          if(lyr.Style){
            if(Array.isArray(lyr.Style)) {
               lyr.Style[0].defaultStyle=true;
               styles.push(...lyr.Style)
              }
            else {
               lyr.Style.defaultStyle=true 
               styles.push(lyr.Style)
              }
            cartography.styles= styles;
          }
          if(lyr){
            if(lyr.MetadataURL!=undefined){
              let metadataURL= Array.isArray(lyr.MetadataURL)?lyr.MetadataURL[0]:lyr.MetadataURL
              cartography.metadataURL=metadataURL.OnlineResource['xlink:href']
            }
  
            if(lyr.Style && lyr.Style[0] && lyr.Style[0].LEGENDURL!=undefined){
              let style= Array.isArray(lyr.STYLE)?lyr.STYLE[0]:lyr.STYLE
              cartography.legendURL=style.legendURL.OnlineResource['xlink:href']
            }
          }

          this.getCapabilitiesLayers.push(cartography);
        });
      }
      if(data.Service && data.Service.Abstract && data.Service.Abstract.length>0){
        let auxDescription;
        if(Array.isArray(data.Service.Abstract)){
          console.log(data.Service.Abstract)
          // for(let i=0; i<data.Service.Abstract.length; i++){
            data.Service.Abstract.forEach(translation => {
              let languageShortname: string = translation['xml:lang']
              let index = languageShortname.indexOf("-");
              if(index != -1){
                languageShortname= languageShortname.substring(0,index);
              } 
              if(languageShortname == config.defaultLang){
                auxDescription=translation.content;
              }
              else{
                if((this.translationMap.has(languageShortname))){
                  let currentTranslation =  this.translationMap.get(languageShortname);
                  let translationReduced = translation.content.substring(0,250);
                  if (currentTranslation.translation != translationReduced){
                    currentTranslation.translation = translationReduced; 
                    this.translationsModified = true;
                  }
                }
              }

            });


          auxDescription =data.Service.Abstract.find(element => element['xml:lang'].includes(config.defaultLang));
          if(!auxDescription) { auxDescription=data.Service.Abstract[0].content }
        }
        else{
          auxDescription=data.Service.Abstract;
        }
        let newDescription = auxDescription.length >250? auxDescription.substring(0,250): auxDescription
        this.serviceForm.patchValue({
          description: newDescription,
        })
      }

    }
    

    this.capabilitiesLoaded=true;
    if(refresh){this.dataUpdatedEventLayers.next(true) }
  }

  private getLayersCapabilities(lyrTable, tableToSave){
    if(Array.isArray(lyrTable)){
      lyrTable.forEach(layer => {
        if(layer.Layer != null && layer.Layer != undefined){
          this.getLayersCapabilities(layer.Layer, tableToSave)
        }
        else{
          tableToSave.push(layer);
        }
      });
    }
    else{
      tableToSave.push(lyrTable);
    }

  }

  async onTranslationButtonClicked()
  {
    let dialogResult = null
    dialogResult = await this.utils.openTranslationDialog(this.translationMap);
    if(dialogResult && dialogResult.event == "Accept"){
      this.translationsModified=true;
    }
  }

  // AG-GRID

  // ******** Parameters configuration ******** //
  getAllParameters = (): Observable<any> => {
    
    if (this.serviceID == -1 && this.duplicateID == -1) 
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

  getAllRowsParameters(event){
    if(event.event == "save"){
      this.saveParameters(event.data);
    }
  }


  saveParameters(data: any[] )
  {
    let parameterToSave = [];
    let parameterToDelete = [];
    const promises: Promise<any>[] = [];
    data.forEach(parameter => {
      if (parameter.status === 'pendingCreation' || parameter.status === 'pendingModify') {
        if(parameter.status === 'pendingCreation'  || parameter.new){
            parameter.id = null;
            parameter._links=null;
            parameter.service=this.serviceToEdit
          } //If is new, you need the service link
          promises.push(new Promise((resolve, reject) => {  this.serviceParameterService.save(parameter).subscribe((resp) => { resolve(true) }) }));
        }
      if(parameter.status === 'pendingDelete' && parameter._links  && !parameter.new ) {
        promises.push(new Promise((resolve, reject) => {  this.serviceParameterService.remove(parameter).subscribe((resp) => { resolve(true) }) }));    
        // parameterToDelete.push(parameter) 
      }
    });

    // parameterToSave.forEach(saveElement => {
    //   promises.push(new Promise((resolve, reject) => {  this.serviceParameterService.save(saveElement).subscribe((resp) => { resolve(true) }) }));
    // });

    // parameterToDelete.forEach(deletedElement => {
    //   promises.push(new Promise((resolve, reject) => {  this.serviceParameterService.remove(deletedElement).subscribe((resp) => { resolve(true) }) }));    
    // });

    Promise.all(promises).then(() => {
      this.dataUpdatedEventParameters.next(true);
    });
	
  }

  duplicateParameters(data)
  {
    let parametersToDuplicate= []
    data.forEach(parameter => {
      let newParameter={
        name: this.utils.getTranslate('copy_').concat(parameter.name),
        type: parameter.type,
        value: parameter.value
      }
      
      
      parametersToDuplicate.push(newParameter);
    });
    this.addElementsEventParameters.next(parametersToDuplicate);
  }

  // ******** Layers ******** //
  getAllLayers = (): Observable<any> => {

    if(this.getCapabilitiesLayers.length <= 0){
      return of([])
    }

    if (this.serviceID != -1){

      var urlReq = `${this.serviceToEdit._links.layers.href}`
      if (this.serviceToEdit._links.layers.templated) {
        var url = new URL(urlReq.split("{")[0]);
        url.searchParams.append("projection", "view")
        urlReq = url.toString();
      }
      return (this.http.get(urlReq))
      .pipe(map(data => {
        let finalCartographies = [];
        let cartographies= data['_embedded']['cartographies'];
        this.getCapabilitiesLayers.forEach(capabilityLayer => {
          let index = cartographies.findIndex(element => element.name == capabilityLayer.name);
          if( index != -1){
            if(cartographies[index].blocked){
              cartographies[index].status="notAvailable";
            }
            cartographies[index].alreadySearched = true;
            finalCartographies.push(cartographies[index])
          }
          else{
            capabilityLayer.status="unregisteredLayer"
            finalCartographies.push(capabilityLayer);
          }
        });
  
        cartographies.forEach(cartography => {
  
          if(!cartography.alreadySearched){
            cartography.status="notAvailable";
            finalCartographies.push(cartography);
          }
          
        });
  
        return finalCartographies;
  
      } ));
    
    }
    else{
      let finalCartographies = [];
      this.getCapabilitiesLayers.forEach(capabilityLayer => {
          capabilityLayer.status="unregisteredLayer"
          finalCartographies.push(capabilityLayer);
      })
      return of(finalCartographies);
    }

  }


  getAllRowsLayers(event){
    if(event.event == "save"){
      this.saveLayers(event.data);
    }
  }

  saveLayers(data: any[] )
  {
    const promises: Promise<any>[] = [];
    const promisesStyles: Promise<any>[] = [];
    data.forEach(cartography => {
        if (cartography.status === 'notAvailable' && !cartography.blocked) {
          cartography.blocked=true;
          promises.push(new Promise((resolve, reject) => { this.cartographyService.update(cartography).subscribe((resp) => { resolve(true) }) }));
        }
        else if (cartography.status === 'pendingRegistration') {
          cartography.service= this.serviceToEdit;
          cartography.blocked= false;
          cartography.queryableFeatureAvailable= false;
          cartography.queryableFeatureEnabled= false;
          let styles = cartography.styles;
          delete cartography.styles;
          promises.push(new Promise((resolve, reject) => {
             this.cartographyService.save(cartography).subscribe((resp) => {
               if(styles && styles.length>0){
                 styles.forEach(style => {
                   console.log(styles)
                   style.cartography=resp;
                   if(style.Name){
                    style.name=style.Name;
                    delete style.Name;
                   }

                   if(style.Abstract){
                    style.description=style.Abstract;
                    delete style.Abstract;
                   }

                   if(style.Title){
                    style.title=style.Title
                    delete style.Title;
                   }
                   if(style.LegendURL){
                    style.legendURL= {
                      format: style.LegendURL.Format,
                      // onlineResource: style.LegendURL.OnlineResource,
                      height: style.LegendURL.height,
                      width: style.LegendURL.width
                    }
                    delete style.LegendURL.OnlineResource;
                   }

                   promisesStyles.push(new Promise((resolve, reject) => { this.cartographyStyleService.save(style).subscribe((resp) => { resolve(true) }) }));
                 });
               }
                resolve(true) 
              }) 
            }));
        }
        
        // layersToPut.push(cartography._links.self.href)
    
    });

    Promise.all(promises).then(() => {
        Promise.all(promisesStyles).then(() => {
          this.dataUpdatedEventLayers.next(true)
        })
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
    dialogRef.componentInstance.form=this.parameterForm;

    


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
    dialogRef.componentInstance.orderTable = ['name'];
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
    if(this.serviceForm.valid)
    {

      if (this.serviceID == -1 && this.duplicateID != -1) {
        this.serviceForm.patchValue({
          _links: null
        })
      }

      this.serviceForm.patchValue({
        supportedSRS: this.projections
      })
      console.log(this.serviceForm.value);
      this.serviceService.save(this.serviceForm.value)
      .subscribe(async resp => {
        console.log(resp);
        this.serviceToEdit=resp;
        this.serviceID=resp.id;
        this.serviceForm.patchValue({
          id: resp.id,
          _links: resp._links
        })

        this.utils.saveTranslation(resp.id, this.translationMap, this.serviceToEdit.description, this.translationsModified);
        this.translationsModified = false;
        this.getAllElementsEventParameters.next('save');
        this.getAllElementsEventLayers.next('save');
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