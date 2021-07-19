import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackgroundService, HalOptions, HalParam, CartographyGroupService, TranslationService, Background, CartographyGroup, CartographyService, RoleService, Cartography, Role, Translation } from 'dist/sitmun-frontend-core/';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import { of,Subject } from 'rxjs';
import { DialogGridComponent } from 'dist/sitmun-frontend-gui';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { config } from 'src/config';


@Component({
  selector: 'app-background-layers-form',
  templateUrl: './background-layers-form.component.html',
  styleUrls: ['./background-layers-form.component.scss']
})
export class BackgroundLayersFormComponent implements OnInit {
  
  //Translations
  nameTranslationsModified: boolean = false;
  descriptionTranslationsModified: boolean = false;
  
  nameTranslationMap: Map<string, Translation>;
  descriptionTranslationMap: Map<string, Translation>;

  
  permissionGroups: Array<any> = [];
  cartographyGroupOfThisLayer = null;
  dataLoaded: Boolean = false;
  themeGrid: any = config.agGridTheme;


  //Grids
  columnDefsCartographies: any[];
  getAllElementsEventCartographies: Subject<boolean> = new Subject <boolean>();
  dataUpdatedEventCartographies: Subject<boolean> = new Subject<boolean>();

  columnDefsRoles: any[];
  getAllElementsEventRoles: Subject<boolean> = new Subject <boolean>();
  dataUpdatedEventRoles: Subject<boolean> = new Subject<boolean>();

  //Dialog
  columnDefsRolesDialog: any[];
  addElementsEventRoles: Subject<any[]> = new Subject <any[]>();
  
  columnDefsCartographiesDialog: any[];
  addElementsEventCartographies: Subject<any[]> = new Subject <any[]>();


  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private backgroundService: BackgroundService,
    private translationService: TranslationService,
    private http: HttpClient,
    public utils: UtilsService,
    private cartographyService: CartographyService,
    private roleService: RoleService,
    private cartographyGroupService:CartographyGroupService,
  ) {
    this.initializeBackgroundForm();
  }

  backgroundForm: FormGroup;
  backgroundToEdit;
  backgroundID = -1;
  duplicateID = -1;

  ngOnInit(): void {

    this.nameTranslationMap= this.utils.createTranslationsList(config.translationColumns.backgroundName);
    this.descriptionTranslationMap= this.utils.createTranslationsList(config.translationColumns.backgroundDescription);

    const promises: Promise<any>[] = [];
    promises.push(new Promise((resolve, reject) => {
      this.utils.getCodeListValues('cartographyPermission.type', true).map((resp) => {
        resp.forEach(cartographyGroup => {
          if (cartographyGroup.description === 'Background map') { 
            this.permissionGroups.push(cartographyGroup)
           }
        });
        resolve(true);
      }).subscribe()  
      // .subscribe(
      //   resp => {
      //     this.permissionGroupTypes.push(...resp);
      //     resolve(true);
      //   }
      // );
    }));


    Promise.all(promises).then(() => {
      this.activatedRoute.params.subscribe(params => {
        this.backgroundID = +params.id;

        if(params.idDuplicate) { this.duplicateID = +params.idDuplicate; }
      
        if (this.backgroundID !== -1 || this.duplicateID != -1) {
          let idToGet = this.backgroundID !== -1? this.backgroundID: this.duplicateID  
          console.log(this.backgroundID);
  
          this.backgroundService.get(idToGet).subscribe(
            resp => {
              console.log(resp);
              this.backgroundToEdit = resp;
              
              this.backgroundForm.patchValue({
                description: this.backgroundToEdit.description,
                image: this.backgroundToEdit.image,
                cartographyGroup: this.permissionGroups[0].value,
                active: this.backgroundToEdit.active,
                _links: this.backgroundToEdit._links
              });

              if(this.backgroundID !== -1){
                this.backgroundForm.patchValue({
                id: this.backgroundID,
                name: this.backgroundToEdit.name,
                });
              }
              else{
                this.backgroundForm.patchValue({
                name: this.utils.getTranslate('copy_').concat(this.backgroundToEdit.name),
              });
            }
              


              if(this.backgroundID != -1)
              {
                this.translationService.getAll()
                .pipe(map((data: any[]) => data.filter(elem => elem.element == this.backgroundID)
                )).subscribe( result => {
                  console.log(result);
                  let nameTranslations = [];
                  let descriptionTranslations = [];
                  result.forEach(translation => {
                    if(translation.column == config.translationColumns.backgroundName){
                      nameTranslations.push(translation)
                    }
                    else if (translation.column == config.translationColumns.backgroundDescription){
                      descriptionTranslations.push(translation)
                    }
                  });
                  this.utils.updateTranslations(this.nameTranslationMap, nameTranslations)
                  this.utils.updateTranslations(this.descriptionTranslationMap, descriptionTranslations)
                }
          
                );;


              }
              var urlReq = `${this.backgroundToEdit._links.cartographyGroup.href}`
              this.http.get(urlReq)
              .pipe(map(data =>{
                console.log(data);
                this.cartographyGroupOfThisLayer= data;
                this.dataLoaded = true;
              } )).subscribe();
             



              // if(this.backgroundToEdit.cartographyGroupId == null)
              // {
              //   this.backgroundForm.patchValue({
              //     cartographyGroup: this.permissionGroups[0].id
              //   })
              // }
            },
            error => {
   
            }
          );
        }
        else {
          this.backgroundForm.patchValue({
            active: false,
            cartographyGroup: this.permissionGroups[0].value
          });
          this.dataLoaded = true;
        }
  
      },
        error => {
  
        });

    });


    this.columnDefsCartographies = [
      this.utils.getSelCheckboxColumnDef(),
      this.utils.getIdColumnDef(),
      this.utils.getEditableColumnDef('layersPermitsEntity.name', 'name'),
      this.utils.getStatusColumnDef()
    ];


    this.columnDefsRoles = [
      this.utils.getSelCheckboxColumnDef(),
      this.utils.getIdColumnDef(),
      this.utils.getEditableColumnDef('layersPermitsEntity.name', 'name'),
      this.utils.getStatusColumnDef()
    ];

    this.columnDefsCartographiesDialog = [
      this.utils.getSelCheckboxColumnDef(),
      this.utils.getIdColumnDef(),
      this.utils.getNonEditableColumnDef('layersPermitsEntity.name', 'name'),
    ];

    this.columnDefsRolesDialog = [
      this.utils.getSelCheckboxColumnDef(),
      this.utils.getIdColumnDef(),
      this.utils.getEditableColumnDef('layersPermitsEntity.name', 'name'),
    ];

  }

  getPermissionGroups() {
    let params2:HalParam[]=[];
    let param:HalParam={key:'type', value:'F'}
    params2.push(param);
    let query:HalOptions={ params:params2};

    return this.cartographyGroupService.getAll(query);
  }

  


  initializeBackgroundForm(): void {

    this.backgroundForm = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl(null, [
        Validators.required,
      ]),
      description: new FormControl(null),
      image: new FormControl(null),
      cartographyGroup: new FormControl(null),
      active: new FormControl(null),
      _links: new FormControl(null),

    });

  }

  async onNameTranslationButtonClicked()
  {
    let dialogResult = null
    dialogResult = await this.utils.openTranslationDialog(this.nameTranslationMap);
    if(dialogResult && dialogResult.event == "Accept"){
      this.nameTranslationsModified=true;
    }
  }

  async onDescriptionTranslationButtonClicked()
  {
    let dialogResult = null
    dialogResult = await this.utils.openTranslationDialog(this.descriptionTranslationMap);
    if(dialogResult && dialogResult.event == "Accept"){
      this.descriptionTranslationsModified=true;
    }
  }

   // AG GRID

  // ******** Cartographies configuration ******** //
  getAllCartographies = () => {

    if(this.cartographyGroupOfThisLayer == null && this.backgroundID == -1 && this.duplicateID == -1)
    {
      const aux: Array<any> = [];
      return of(aux);
    }

     var urlReq = `${this.cartographyGroupOfThisLayer._links.members.href}`
     if (this.cartographyGroupOfThisLayer._links.members.templated) {
       var url = new URL(urlReq.split("{")[0]);
       url.searchParams.append("projection", "view")
       urlReq = url.toString();
     }
     return (this.http.get(urlReq))
     .pipe(map(data => data['_embedded']['cartographies']));

  }


  getAllRowsCartographies(data: any[] )
  {
    const promises: Promise<any>[] = [];
    let dataChanged = false;
    let cartographiesModified = [];
    let cartographiesToPut = [];
    data.forEach(cartography => {
      if(cartography.status!== 'pendingDelete') {
        if (cartography.status === 'pendingModify') {
          if(cartography.new){ dataChanged = true; }
          promises.push(new Promise((resolve, reject) => { this.cartographyService.update(cartography).subscribe((resp) => { resolve(true) }) }));
        }
        else if (cartography.status === 'pendingCreation') {
          dataChanged = true;
        }
        cartographiesToPut.push(cartography._links.self.href) 
      }
      else {
        dataChanged = true;
      }
    });
    console.log(cartographiesModified);
    Promise.all(promises).then(() => {
      if(dataChanged){
        let url=this.cartographyGroupOfThisLayer._links.members.href.split('{', 1)[0];
        this.utils.updateUriList(url,cartographiesToPut, this.dataUpdatedEventCartographies)
      }
      else { this.dataUpdatedEventCartographies.next(true) }
    });
  }

  // ******** Roles  ******** //
  getAllRoles = () => {

    if(this.cartographyGroupOfThisLayer == null && this.backgroundID == -1 && this.duplicateID == -1)
    {
      const aux: Array<any> = [];
      return of(aux);
    }

    var urlReq = `${this.cartographyGroupOfThisLayer._links.roles.href}`
    if (this.cartographyGroupOfThisLayer._links.roles.templated) {
      var url = new URL(urlReq.split("{")[0]);
      url.searchParams.append("projection", "view")
      urlReq = url.toString();
    }
   
    return (this.http.get(urlReq))
       .pipe(map(data => data['_embedded']['roles']));

  }

  getAllRowsRoles(data: any[] )
  {
    const promises: Promise<any>[] = [];
    let dataChanged = false;
    let rolesModified = [];
    let rolesToPut = [];
    data.forEach(role => {
      if(role.status!== 'pendingDelete') {
        if (role.status === 'pendingModify') {
          if(role.new){ dataChanged = true; }
          promises.push(new Promise((resolve, reject) => { this.roleService.update(role).subscribe((resp) => { resolve(true) }) }));
        }
        else if(role.status === 'pendingCreation'){
          dataChanged = true;
        }
        rolesToPut.push(role._links.self.href)
      }
      else{
        dataChanged = true;
      }
    });
    console.log(rolesModified);
    Promise.all(promises).then(() => {
      if(dataChanged)
      {
        let url=this.cartographyGroupOfThisLayer._links.roles.href.split('{', 1)[0];
        this.utils.updateUriList(url,rolesToPut, this.dataUpdatedEventRoles)
      }
      else { this.dataUpdatedEventRoles.next(true) }
    });
  }

  // ******** Cartography Dialog  ******** //

  getAllCartographiesDialog = () => {
    return this.cartographyService.getAll();
  }

  openCartographyDialog(data: any) {
    const dialogRef = this.dialog.open(DialogGridComponent, {panelClass:'gridDialogs'});
    dialogRef.componentInstance.orderTable = ['name'];
    dialogRef.componentInstance.getAllsTable=[this.getAllCartographiesDialog];
    dialogRef.componentInstance.singleSelectionTable=[false];
    dialogRef.componentInstance.columnDefsTable=[this.columnDefsCartographiesDialog];
    dialogRef.componentInstance.themeGrid=this.themeGrid;
    dialogRef.componentInstance.title=this.utils.getTranslate('layersPermitsEntity.cartographiesConfiguration');
    dialogRef.componentInstance.titlesTable=[''];
    dialogRef.componentInstance.currentData=[data];
    dialogRef.componentInstance.nonEditable=false;
    


    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if( result.event==='Add') { 
          this.addElementsEventCartographies.next(result.data[0])
        }
      }

    });

  }

   // ******** Roles Dialog  ******** //

   getAllRolesDialog = () => {
    return this.roleService.getAll();
  }

  openRolesDialog(data: any) {

    const dialogRef = this.dialog.open(DialogGridComponent, {panelClass:'gridDialogs'});
    dialogRef.componentInstance.orderTable = ['name'];
    dialogRef.componentInstance.getAllsTable=[this.getAllRolesDialog];
    dialogRef.componentInstance.singleSelectionTable=[false];
    dialogRef.componentInstance.columnDefsTable=[this.columnDefsRolesDialog];
    dialogRef.componentInstance.themeGrid=this.themeGrid;
    dialogRef.componentInstance.title=this.utils.getTranslate('layersPermitsEntity.roles');
    dialogRef.componentInstance.titlesTable=[''];
    dialogRef.componentInstance.currentData=[data];
    dialogRef.componentInstance.nonEditable=false;
    


    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if( result.event==='Add') { 
          this.addElementsEventRoles.next(result.data[0])
        }
      }

    });

  }


  onSaveButtonClicked(){
    
    if(this.backgroundForm.valid)
    {
      let cartographyGroupObj = new CartographyGroup();
      cartographyGroupObj.name = this.backgroundForm.value.name;
      cartographyGroupObj.type = this.backgroundForm.value.cartographyGroup;
      cartographyGroupObj._links = null;

      if (this.backgroundID == -1 && this.duplicateID != -1) {
        this.cartographyGroupOfThisLayer = null;
      }


      if(this.cartographyGroupOfThisLayer == null)
      {
        this.cartographyGroupService.save(cartographyGroupObj)
        .subscribe(resp => {
          this.cartographyGroupOfThisLayer=resp;
          console.log(resp);
          console.log(this.cartographyGroupOfThisLayer);
          this.updateBackground(resp);
        },
        error => {
          console.log(error);
        });
      }
      else{
        this.updateBackground(this.cartographyGroupOfThisLayer);
      }
    }

    else {
      this.utils.showRequiredFieldsError();
    }


    }

    updateBackground(cartographyGroup: any){

      if (this.backgroundID == -1 && this.duplicateID != -1) {
        this.backgroundForm.patchValue({
          _links: null
        })
      }

      var backgroundObj: Background=new Background();

      backgroundObj.id= this.backgroundForm.value.id;
      backgroundObj.name= this.backgroundForm.value.name;
      backgroundObj.description= this.backgroundForm.value.description;
      backgroundObj.image= this.backgroundForm.value.image;
      backgroundObj.cartographyGroup=cartographyGroup;
      backgroundObj.active= this.backgroundForm.value.active;
      backgroundObj._links= this.backgroundForm.value._links;
  
      this.backgroundService.save(backgroundObj)
        .subscribe(async resp => {
          console.log(resp);
          this.backgroundToEdit=resp;
          this.backgroundID=resp.id;
          this.backgroundForm.patchValue({
            id: resp.id,
            _links: resp._links
          })
          this.utils.saveTranslation(resp.id, this.nameTranslationMap, this.backgroundToEdit.name, this.nameTranslationsModified);
          this.nameTranslationsModified=false;
          this.utils.saveTranslation(resp.id, this.descriptionTranslationMap, this.backgroundToEdit.description, this.descriptionTranslationsModified);
          this.descriptionTranslationsModified=false;

          this.getAllElementsEventCartographies.next(true);
          this.getAllElementsEventRoles.next(true);
        },
        error=>{
          console.log("error")
        });
    }

}
