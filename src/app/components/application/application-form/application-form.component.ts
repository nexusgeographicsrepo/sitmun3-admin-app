import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService, RoleService, HalOptions, HalParam, CartographyGroupService, TreeService, BackgroundService, Role, Background, Tree } from '@sitmun/frontend-core';

import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';

import { map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DialogGridComponent } from 'dist/sitmun-frontend-gui/';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {

  situationMapList: Array<any> = [];

  //Dialog
  applicationForm: FormGroup;
  applicationToEdit;
  applicationID = -1;
  dataLoaded: Boolean = false;
  themeGrid: any = environment.agGridTheme;

  //Grids
  columnDefsParameters: any[];
  addElementsEventParameters: Subject<any[]> = new Subject <any[]>();
  columnDefsTemplates: any[];
  addElementsEventTemplateConfiguration: Subject<any[]> = new Subject <any[]>();
  columnDefsRoles: any[];
  addElementsEventRoles: Subject<any[]> = new Subject <any[]>();
  columnDefsBackgrounds: any[];
  addElementsEventBackground: Subject<any[]> = new Subject <any[]>();
  columnDefsTrees: any[];
  addElementsEventTree: Subject<any[]> = new Subject <any[]>();


  applicationTypes: Array<any> = [];

  //Dialogs

  columnDefsParametersDialog: any[];
  getAllElementsEventParameters: Subject<boolean> = new Subject <boolean>();
  columnDefsTemplateConfigurationDialog: any[];
  getAllElementsEventTemplateConfiguration: Subject<boolean> = new Subject <boolean>();
  columnDefsRolesDialog: any[];
  getAllElementsEventRoles: Subject<boolean> = new Subject <boolean>();
  columnDefsBackgroundDialog: any[];
  getAllElementsEventBackground: Subject<boolean> = new Subject <boolean>();
  columnDefsTreeDialog: any[];
  getAllElementsEventTree: Subject<boolean> = new Subject <boolean>();
  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
    private backgroundService: BackgroundService,
    private roleService: RoleService,
    private treeService: TreeService,
    private http: HttpClient,
    private utils: UtilsService,
    private cartographyGroupService: CartographyGroupService,
  ) {
    this.initializeApplicationForm();
  }



  ngOnInit(): void {

    this.utils.getCodeListValues('application.type').subscribe(
      resp => {
        this.applicationTypes.push(...resp);
      }
    );

    let situationMapByDefault = {
      id: -1,
      name: '-------'
    }
    this.situationMapList.push(situationMapByDefault);

    this.getSituationMapList().subscribe(
      resp => {
        this.situationMapList.push(...resp);
      }
    );

    this.activatedRoute.params.subscribe(params => {
      this.applicationID = +params.id;
      if (this.applicationID !== -1) {
        console.log(this.applicationID);

        this.applicationService.get(this.applicationID).subscribe(
          resp => {
            console.log(resp);
            this.applicationToEdit = resp;


            this.applicationForm.setValue({
              id: this.applicationID,
              name: this.applicationToEdit.name,
              type: this.applicationToEdit.type,
              title: this.applicationToEdit.title,
              tree: ' ',
              jspTemplate: this.applicationToEdit.jspTemplate,
              theme: this.applicationToEdit.theme,
              situationMap: this.applicationToEdit.situationMapId,
              scales: this.applicationToEdit.scales,
              srs: this.applicationToEdit.srs,
              treeAutoRefresh: this.applicationToEdit.treeAutoRefresh,
              _links: this.applicationToEdit._links
            });

            this.dataLoaded = true;
          },
          error => {

          }
        );
      }
      else {
        this.applicationForm.patchValue({
          moveSupramunicipal: false,
          treeAutorefresh: false,
        });
      }

    },
      error => {

      });
 

    this.columnDefsParameters = [
      environment.selCheckboxColumnDef,
      { headerName: this.utils.getTranslate('applicationEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('applicationEntity.value'), field: 'value', },
      { headerName: this.utils.getTranslate('applicationEntity.type'), field: 'type' },
      { headerName: this.utils.getTranslate('applicationEntity.status'), field: 'status' },


    ];

    this.columnDefsTemplates = [

      environment.selCheckboxColumnDef,
      { headerName: this.utils.getTranslate('applicationEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('applicationEntity.value'), field: 'value', },
      { headerName: this.utils.getTranslate('applicationEntity.status'), field: 'status' },

    ];

    this.columnDefsRoles = [

      environment.selCheckboxColumnDef,
      { headerName: "ID", field: 'id' },
      { headerName: this.utils.getTranslate('applicationEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('applicationEntity.status'), field: 'status' },


    ];

    this.columnDefsBackgrounds = [

      environment.selCheckboxColumnDef,
      { headerName: "ID", field: 'id' },
      { headerName: this.utils.getTranslate('applicationEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('applicationEntity.description'), field: 'description' },


    ];

    this.columnDefsTrees = [

      environment.selCheckboxColumnDef,
      { headerName: "Id", field: 'id' },
      { headerName: this.utils.getTranslate('applicationEntity.name'), field: 'name' },
      { headerName: this.utils.getTranslate('applicationEntity.status'), field: 'status' },


    ];

    this.columnDefsParametersDialog = [

      environment.selCheckboxColumnDef,
      { headerName: this.utils.getTranslate('applicationEntity.name'), field: 'name', editable: false },
      { headerName: this.utils.getTranslate('applicationEntity.value'), field: 'value', editable: false },
      { headerName: this.utils.getTranslate('applicationEntity.type'), field: 'type', editable: false },
    ];

    this.columnDefsTemplateConfigurationDialog = [

      environment.selCheckboxColumnDef,
      { headerName: this.utils.getTranslate('applicationEntity.name'), field: 'name', editable: false },
      { headerName: this.utils.getTranslate('applicationEntity.value'), field: 'value', editable: false },
    ];

    this.columnDefsRolesDialog = [

      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('applicationEntity.name'), field: 'name', editable: false },
      { headerName: this.utils.getTranslate('applicationEntity.note'), field: 'description' },
      { headerName: this.utils.getTranslate('applicationEntity.application'), field: 'application' },

    ];

    this.columnDefsBackgroundDialog = [

      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('applicationEntity.name'), field: 'name', editable: false },
    ];

    
    this.columnDefsTreeDialog = [

      environment.selCheckboxColumnDef,
      { headerName: "Id", field: 'id' },
      { headerName: this.utils.getTranslate('applicationEntity.name'), field: 'name' },

    ];

  }
  getSituationMapList() {
    let params2: HalParam[] = [];
    let param: HalParam = { key: 'type', value: 'M' }
    params2.push(param);
    let query: HalOptions = { params: params2 };

    return this.cartographyGroupService.getAll(query);
  }


  onSelectionTypeAppChanged({ value }) {
    debugger;
    if (value === 'E') {
      this.applicationForm.get('title').disable();
      this.applicationForm.get('tree').disable();
      this.applicationForm.get('scales').disable();
      this.applicationForm.get('srs').disable();
      this.applicationForm.get('situationMap').disable();
      this.applicationForm.get('treeAutoRefresh').disable();
      this.applicationForm.get('theme').disable();
    } else {
      this.applicationForm.get('title').enable();
      this.applicationForm.get('tree').enable();
      this.applicationForm.get('scales').enable();
      this.applicationForm.get('srs').enable();
      this.applicationForm.get('situationMap').enable();
      this.applicationForm.get('treeAutoRefresh').enable();
      this.applicationForm.get('theme').enable();
    }
  }

  initializeApplicationForm(): void {

    this.applicationForm = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl(null, [
        Validators.required,
      ]),
      type: new FormControl(null, [
        Validators.required,
      ]),
      title: new FormControl(null, [
        Validators.required,
      ]),
      tree: new FormControl(null, [
        Validators.required,
      ]),
      jspTemplate: new FormControl(null, [
        Validators.required,
      ]),
      theme: new FormControl(null, [
        Validators.required,
      ]),
      /*mobileUrl: new FormControl(null, [
        Validators.required,
      ]),
      mobileCSS: new FormControl(null, [
        Validators.required,
      ]),
      defaultTool: new FormControl(null, [
        Validators.required,
      ]),
      moveSupramunicipal: new FormControl(null, [
        Validators.required,
      ]),*/
      situationMap: new FormControl(null, [
        Validators.required,
      ]),
      scales: new FormControl(null, [
        Validators.required,
      ]),
      srs: new FormControl(null, [
        Validators.required,
      ]),
      treeAutoRefresh: new FormControl(null, [
        Validators.required,
      ]),
      _links: new FormControl(null, []),

    });

  }

  addNewApplication() {
    console.log(this.applicationForm.value);
    this.applicationService.create(this.applicationForm.value)
      .subscribe(resp => {
        console.log(resp);
        // this.router.navigate(["/company", resp.id, "formConnection"]);
      });
  }

  updateApplication() {

    console.log(this.applicationForm.value);
    this.applicationToEdit.name = this.applicationForm.value.name,
    this.applicationToEdit.type = this.applicationForm.value.type,
    this.applicationToEdit.title = this.applicationForm.value.title,
    this.applicationToEdit.jspTemplate = this.applicationForm.value.jspTemplate,
    this.applicationToEdit.theme = this.applicationForm.value.theme,
    this.applicationToEdit.scales = this.applicationForm.value.scales,
    this.applicationToEdit.srs = this.applicationForm.value.srs,
    this.applicationToEdit.treeAutoRefresh = this.applicationForm.value.treeAutoRefresh,

    console.log(this.applicationToEdit);
    this.applicationService.update(this.applicationToEdit)
      .subscribe(resp => {
        console.log(resp);

      });

  }


  // AG-GRID


  // ******** Parameters configuration ******** //

  getAllParameters = (): Observable<any> => {
    return (this.http.get(`${this.applicationForm.value._links.parameters.href}`))
      .pipe(map(data => data[`_embedded`][`application-parameters`]));
  }


  getAllRowsParameters(data: any[] )
  {
    this.applicationToEdit.parameters= [];
    data.forEach(parameter => {
      if(parameter.status!== 'Deleted') {this.applicationToEdit.parameters.push(parameter) }
    });
  }

  // ******** Template configuration ******** //

  getAllTemplates = (): Observable<any> => {
    //TODO Change the link when available
    // return (this.http.get(`${this.applicationForm.value._links.parameters.href}`))
    //   .pipe(map(data => data[`_embedded`][`application-parameters`]));
    const aux: Array<any> = [];
    return of(aux);
  }

  getAllRowsTemplates(data: any[] )
  {
    console.log(data);
    // let templatesModified = [];
    // let templatesToPut = [];
    // data.forEach(template => {
    //   if (template.status === 'Modified') {templatesModified.push(template) }
    //   if(template.status!== 'Deleted') {templatesToPut.push(template._links.self) }
    // });
    // if (templatesModified.length >0)
    // {
    //    console.log(templatesModified);
    //    this.updateTemplates(templatesModified);
    // }
  }

  updateTemplates(templatesModified: any[])
  {
    // const promises: Promise<any>[] = [];
    // templatesModified.forEach(template => {
    //   promises.push(new Promise((resolve, reject) => { this.tasksService.update(template).toPromise().then((resp) => { resolve() }) }));
    // });
    // Promise.all(promises).then(() => {
    //   console.log('Ara tocaria fer els canvis')
    // });
  }
  
  


  // ******** Roles ******** //

  getAllRoles = (): Observable<any> => {
    return (this.http.get(`${this.applicationForm.value._links.availableRoles.href}`))
      .pipe(map(data => data[`_embedded`][`roles`]));
  }

  getAllRowsRoles(data: any[] )
  {
    let rolesModified = [];
    let rolesToPut = [];
    data.forEach(role => {
      if (role.status === 'Modified') {rolesModified.push(role) }
      if(role.status!== 'Deleted') {rolesToPut.push(role._links.self) }
    });
    if (rolesModified.length >0)
    {
       console.log(rolesModified);
       this.updateRoles(rolesModified);
    }
  }

  updateRoles(rolesModified: Role[])
  {
    const promises: Promise<any>[] = [];
    rolesModified.forEach(role => {
      promises.push(new Promise((resolve, reject) => { this.roleService.update(role).toPromise().then((resp) => { resolve() }) }));
    });
    Promise.all(promises).then(() => {
    });
  }
  
 

  // ******** Background ******** //

  getAllBackgrounds = (): Observable<any> => {
    var urlReq = `${this.applicationForm.value._links.backgrounds.href}`
    if (this.applicationForm.value._links.backgrounds.templated) {
      var url = new URL(urlReq.split("{")[0]);
      url.searchParams.append("projection", "view")
      urlReq = url.toString();
    }

    return (this.http.get(urlReq))
      .pipe(map(data => data['_embedded']['application-backgrounds']));


  }


  getAllRowsBackgrounds(data: any[] )
  {
    let backgroundsModified = [];
    let backgroundsToPut = [];
    data.forEach(background => {
      if (background.status === 'Modified') {backgroundsModified.push(background) }
      if(background.status!== 'Deleted') {backgroundsToPut.push(background._links.self) }
    });
    if (backgroundsModified.length >0)
    {
       console.log(backgroundsModified);
       this.updateBackgrounds(backgroundsModified);
    }
  }

  updateBackgrounds(backgroundsModified: Background[])
  {
    const promises: Promise<any>[] = [];
    backgroundsModified.forEach(background => {
      promises.push(new Promise((resolve, reject) => { this.backgroundService.update(background).toPromise().then((resp) => { resolve() }) }));
    });
    Promise.all(promises).then(() => {
    });
  }
  

  // ******** Trees ******** //

  getAllTrees = (): Observable<any> => {
    var urlReq = `${this.applicationForm.value._links.trees.href}`
    if (this.applicationForm.value._links.trees.templated) {
      var url = new URL(urlReq.split("{")[0]);
      url.searchParams.append("projection", "view")
      urlReq = url.toString();
    }

    return (this.http.get(urlReq))
      .pipe(map(data => data['_embedded']['trees']));


  }


  getAllRowsTrees(data: any[] )
  {
    let treesModified = [];
    let treesToPut = [];
    data.forEach(tree => {
      if (tree.status === 'Modified') {treesModified.push(tree) }
      if(tree.status!== 'Deleted') {treesToPut.push(tree._links.self) }
    });
    if (treesModified.length >0)
    {
       console.log(treesModified);
       this.updateTrees(treesModified);
    }
  }

  updateTrees(treesModified: Tree[])
  {
    const promises: Promise<any>[] = [];
    treesModified.forEach(tree => {
      promises.push(new Promise((resolve, reject) => { this.treeService.update(tree).toPromise().then((resp) => { resolve() }) }));
    });
    Promise.all(promises).then(() => {
    });
  }


  // ******** Parameters Dialog  ******** //

  getAllParametersDialog = () => {
    const aux: Array<any> = [];
    return of(aux);
    // return this.cartographyService.getAll();
  }

  openParametersDialog(data: any) {

    const dialogRef = this.dialog.open(DialogGridComponent, { panelClass: 'gridDialogs' });
    dialogRef.componentInstance.getAllsTable = [this.getAllParametersDialog];
    dialogRef.componentInstance.singleSelectionTable = [false];
    dialogRef.componentInstance.columnDefsTable = [this.columnDefsParametersDialog];
    dialogRef.componentInstance.themeGrid = this.themeGrid;
    dialogRef.componentInstance.title = this.utils.getTranslate("applicationEntity.parametersConfiguration");
    dialogRef.componentInstance.titlesTable = [''];
    dialogRef.componentInstance.nonEditable = false;



    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.event==='Add') {
          console.log(result.data);
          this.addElementsEventParameters.next(result.data[0])
        }
      }

    });

  }

  // ******** TemplatesConfiguration Dialog  ******** //

  getAllTemplatesConfigurationDialog = () => {
    const aux: Array<any> = [];
    return of(aux);
    // return this.cartographyService.getAll();
  }

  openTemplateConfigurationDialog(data: any) {
    const dialogRef = this.dialog.open(DialogGridComponent, { panelClass: 'gridDialogs' });
    dialogRef.componentInstance.getAllsTable = [this.getAllTemplatesConfigurationDialog];
    dialogRef.componentInstance.singleSelectionTable = [false];
    dialogRef.componentInstance.columnDefsTable = [this.columnDefsTemplateConfigurationDialog];
    dialogRef.componentInstance.themeGrid = this.themeGrid;
    dialogRef.componentInstance.title = this.utils.getTranslate("applicationEntity.templateConfiguration");
    dialogRef.componentInstance.titlesTable = [''];
    dialogRef.componentInstance.nonEditable = false;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addElementsEventTemplateConfiguration.next(result.data[0])
      }
    
    });

  }
    // ******** Roles Dialog  ******** //

    getAllRolesDialog = () => {
      return this.roleService.getAll();
    }

  
    openRolesDialog(data: any) {

      const dialogRef = this.dialog.open(DialogGridComponent, {panelClass:'gridDialogs'});
      dialogRef.componentInstance.getAllsTable=[this.getAllRolesDialog];
      dialogRef.componentInstance.singleSelectionTable=[false];
      dialogRef.componentInstance.columnDefsTable=[this.columnDefsRolesDialog];
      dialogRef.componentInstance.themeGrid=this.themeGrid;
      this.utils.getTranslate("applicationEntity.roles");
      dialogRef.componentInstance.titlesTable=[''];
      dialogRef.componentInstance.nonEditable=false;
      
  
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          if(result.event==='Add') {
            this.addElementsEventRoles.next(result.data[0])
          }         
        }
  
      });
  
    }

  // ******** Background Dialog  ******** //

  getAllBackgroundDialog = () => {
    return this.backgroundService.getAll();
  }
  
  openBackgroundDialog(data: any) {
    const dialogRef = this.dialog.open(DialogGridComponent, {panelClass:'gridDialogs'});
    dialogRef.componentInstance.getAllsTable=[this.getAllBackgroundDialog];
    dialogRef.componentInstance.singleSelectionTable=[false];
    dialogRef.componentInstance.columnDefsTable=[this.columnDefsBackgroundDialog];
    dialogRef.componentInstance.themeGrid=this.themeGrid;
    this.utils.getTranslate("applicationEntity.background");
    dialogRef.componentInstance.titlesTable=[''];
    dialogRef.componentInstance.nonEditable=false;
    


    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.event==='Add') {
          this.addElementsEventBackground.next(result.data[0])
        }         
      }

    });

  }

    // ******** Tree Dialog  ******** //

    getAllTreeDialog = () => {

      return this.treeService.getAll();
    }
  
    openTreeDialog(data: any) {
      const dialogRef = this.dialog.open(DialogGridComponent, {panelClass:'gridDialogs'});
      dialogRef.componentInstance.getAllsTable=[this.getAllTreeDialog];
      dialogRef.componentInstance.singleSelectionTable=[false];
      dialogRef.componentInstance.columnDefsTable=[this.columnDefsTreeDialog];
      dialogRef.componentInstance.themeGrid=this.themeGrid;
      dialogRef.componentInstance.title='Tree';
      dialogRef.componentInstance.titlesTable=['Tree'];
      dialogRef.componentInstance.nonEditable=false;
      
  
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          if(result.event==='Add') {
            this.addElementsEventTree.next(result.data[0])
          }                 
        }
  
      });
  
    }


    // Save button

    onSaveButtonClicked(){

      if(this.applicationID !== -1)
      {
        this.getAllElementsEventParameters.next(true);
        this.getAllElementsEventTemplateConfiguration.next(true);
        this.getAllElementsEventRoles.next(true);
        this.getAllElementsEventBackground.next(true);
        this.getAllElementsEventTree.next(true);
        this.updateApplication();

      }

      else { this.addNewApplication()};
  
    }


}
