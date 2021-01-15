import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartographyGroupService, RoleService, Role, CartographyService } from 'dist/sitmun-frontend-core/';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DialogGridComponent } from 'dist/sitmun-frontend-gui/';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-layers-permits-form',
  templateUrl: './layers-permits-form.component.html',
  styleUrls: ['./layers-permits-form.component.scss']
})
export class LayersPermitsFormComponent implements OnInit {
 
  //Form
  formLayersPermits: FormGroup;
  layersPermitsToEdit;
  layersPermitsID = -1;
  themeGrid: any = environment.agGridTheme;
  permissionGroupTypes: Array<any> = [];
  dataLoaded: Boolean = false;

  //Grids
  columnDefsCartographies: any[];
  getAllElementsEventCartographies: Subject<boolean> = new Subject <boolean>();
  columnDefsRoles: any[];
  getAllElementsEventRoles: Subject<boolean> = new Subject <boolean>();

  //Dialog
  columnDefsRolesDialog: any[];
  addElementsEventRoles: Subject<any[]> = new Subject <any[]>();
  columnDefsCartographiesDialog: any[];
  addElementsEventCartographies: Subject<any[]> = new Subject <any[]>();

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartographyGroupService: CartographyGroupService,
    private cartographyService: CartographyService,
    private roleService: RoleService,
    private http: HttpClient,
    private utils: UtilsService,
  ) {
    this.initializeLayersPermitsForm();
  }

  ngOnInit(): void {
    let permissionGroupTypesByDefault = {
      value: null,
      description: '------'
    }
    this.permissionGroupTypes.push(permissionGroupTypesByDefault);

    this.utils.getCodeListValues('cartographyPermission.type').subscribe(
      resp => {
        this.permissionGroupTypes.push(...resp);
      }
    );
    this.activatedRoute.params.subscribe(params => {
      this.layersPermitsID = +params.id;
      if (this.layersPermitsID !== -1) {
        console.log(this.layersPermitsID);

        this.cartographyGroupService.get(this.layersPermitsID).subscribe(
          resp => {
            console.log(resp);
            this.layersPermitsToEdit = resp;
            this.formLayersPermits.setValue({
              id: this.layersPermitsID,
              name: this.layersPermitsToEdit.name,
              type: this.layersPermitsToEdit.type,
              _links: this.layersPermitsToEdit._links
            });

            this.dataLoaded = true;
          },
          error => {

          }
        );
      }

    },
      error => {

      });



    this.columnDefsCartographies = [
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('layersPermitsEntity.name'), field: 'name' },
    ];


    this.columnDefsRoles = [
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('layersPermitsEntity.name'), field: 'name' },
    ];

    this.columnDefsCartographiesDialog = [
      environment.selCheckboxColumnDef,
      { headerName: 'ID', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('connectionEntity.name'), field: 'name', editable: false },
    ];

    this.columnDefsRolesDialog = [
      environment.selCheckboxColumnDef,
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('layersPermitsEntity.name'), field: 'name' },
    ];
  }


  initializeLayersPermitsForm(): void {

    this.formLayersPermits = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl(null, [
        Validators.required,
      ]),
      type: new FormControl(null, [
        Validators.required,
      ]),
      _links: new FormControl(null, []),

    })

  }

  addNewLayersPermits() {
    console.log(this.formLayersPermits.value);
    this.cartographyGroupService.create(this.formLayersPermits.value)
      .subscribe(resp => {
        console.log(resp);
      });


  }

  updateLayersPermits() {

    console.log(this.formLayersPermits.value);
    this.layersPermitsToEdit.name=this.formLayersPermits.value.name;
    this.layersPermitsToEdit.type=this.formLayersPermits.value.type;
    delete this.layersPermitsToEdit._links['members'];
    delete this.layersPermitsToEdit._links['roles'];
    delete this.layersPermitsToEdit._links['situationMap'];
    console.log( this.layersPermitsToEdit);
    this.cartographyGroupService.update(this.layersPermitsToEdit)
      .subscribe(resp => {
        console.log(resp);

      });

  }


  // AG GRID

  // ******** Cartographies configuration ******** //
  getAllCartographies = () => {

     var urlReq = `${this.layersPermitsToEdit._links.members.href}`
     if (this.layersPermitsToEdit._links.members.templated) {
       var url = new URL(urlReq.split("{")[0]);
       url.searchParams.append("projection", "view")
       urlReq = url.toString();
     }
     return (this.http.get(urlReq))
     .pipe(map(data => data['_embedded']['cartographies']));

  }


  getAllRowsCartographies(data: any[] )
  {
    console.log(data);
  }


  // ******** Roles  ******** //
  getAllRoles = () => {
   
    return (this.http.get(`${this.formLayersPermits.value._links.roles.href}`))
       .pipe(map(data => data['_embedded']['roles']));

  }

  getAllRowsRoles(data: any[] )
  {
    this.layersPermitsToEdit.roles=data;
  }


  // ******** Cartography Dialog  ******** //

  getAllCartographiesDialog = () => {
    return this.cartographyService.getAll();
  }

  openCartographyDialog(data: any) {
    const dialogRef = this.dialog.open(DialogGridComponent, {panelClass:'gridDialogs'});
    dialogRef.componentInstance.getAllsTable=[this.getAllCartographiesDialog];
    dialogRef.componentInstance.singleSelectionTable=[false];
    dialogRef.componentInstance.columnDefsTable=[this.columnDefsCartographiesDialog];
    dialogRef.componentInstance.themeGrid=this.themeGrid;
    dialogRef.componentInstance.title=this.utils.getTranslate('layersPermitsEntity.cartographiesConfiguration');
    dialogRef.componentInstance.titlesTable=[''];
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
    dialogRef.componentInstance.getAllsTable=[this.getAllRolesDialog];
    dialogRef.componentInstance.singleSelectionTable=[false];
    dialogRef.componentInstance.columnDefsTable=[this.columnDefsRolesDialog];
    dialogRef.componentInstance.themeGrid=this.themeGrid;
    dialogRef.componentInstance.title=this.utils.getTranslate('layersPermitsEntity.roles');
    dialogRef.componentInstance.titlesTable=[''];
    dialogRef.componentInstance.nonEditable=false;
    


    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if( result.event==='Add') { 
          this.addElementsEventRoles.next(result.data[0])
        }
      }

    });

  }


  // Save Button

  onSaveButtonClicked(){

    if(this.layersPermitsID !== -1)
    {   
      this.getAllElementsEventCartographies.next(true);
      this.getAllElementsEventRoles.next(true);
      this.updateLayersPermits();
    }
    else { this.addNewLayersPermits()}

    }

  

}


