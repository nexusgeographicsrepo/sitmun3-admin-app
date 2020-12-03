import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { CartographyService, TerritoryService, Territory } from 'dist/sitmun-frontend-core/';
import { Connection } from 'dist/sitmun-frontend-core/connection/connection.model';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import { BtnEditRenderedComponent } from 'dist/sitmun-frontend-gui/';

 
@Component({
  selector: 'app-layers-form',
  templateUrl: './layers-form.component.html',
  styleUrls: ['./layers-form.component.scss']
})
export class LayersFormComponent implements OnInit {

  columnDefs: any[];
  public frameworkComponents = {
    btnEditRendererComponent: BtnEditRenderedComponent
  };


  layerForm: FormGroup;
  layerToEdit;
  layerID = -1;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartographyService: CartographyService,
    private territoryService: TerritoryService,
    private http: HttpClient,
    private utils: UtilsService,
    ) {
        this.initializeConnectionForm();
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.layerID = +params.id;
      if (this.layerID !== -1){
        console.log(this.layerID);

        this.cartographyService.get(this.layerID).subscribe(
          resp => {
            console.log(resp);
            this.layerToEdit=resp;
            this.layerForm.setValue({
                id:       this.layerID,
                name:     this.layerToEdit.name,
                driver:   this.layerToEdit.driver,
                user:     this.layerToEdit.user,
                password: this.layerToEdit.password,
                url:      this.layerToEdit.url,
                _links:   this.layerToEdit._links
              });


          },
          error => {

          }
        );
      }

    },
    error => {

    });


    this.columnDefs = [
      {
        headerName: '',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        editable: false,
        filter: false,
        width: 105,
        lockPosition:true,
      },
      {
        headerName: '',
        field: 'id',
        editable: false,
        filter: false,
        width: 130,
        lockPosition:true,
        cellRenderer: 'btnEditRendererComponent',
        cellRendererParams: {
          clicked: this.newDataTerritories.bind(this)
        },
      },
      { headerName: 'ID',  field: 'id', editable: false},
      { headerName: this.utils.getTranslate('territoryEntity.code'),  field: 'code' },
      { headerName: this.utils.getTranslate('territoryEntity.name'),  field: 'name'},
      { headerName: this.utils.getTranslate('territoryEntity.scope'),  field: 'scope'},
      { headerName: this.utils.getTranslate('territoryEntity.createdDate'),  field: 'createdDate', }, // type: 'dateColumn'
      { headerName: this.utils.getTranslate('territoryEntity.administrator'),  field: 'territorialAuthorityName'},
      { headerName: this.utils.getTranslate('territoryEntity.email'),  field: 'territorialAuthorityEmail'},
      { headerName: this.utils.getTranslate('territoryEntity.address'),  field: 'territorialAuthorityAddress'},
      { headerName: this.utils.getTranslate('territoryEntity.extent'),  field: 'extent'},
      { headerName: this.utils.getTranslate('territoryEntity.note'),  field: 'note'},
      { headerName: this.utils.getTranslate('territoryEntity.blocked'),  field: 'blocked'},
    ];

  }


  initializeConnectionForm(): void {

    this.layerForm = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl(null, [
        Validators.required,
      ]),
      driver: new FormControl(null),
      user: new FormControl(null, []),
      password: new FormControl(null, []),
      url: new FormControl(null, []),
      _links: new FormControl(null, []),

    })

  }

  addNewLayer() {
    this.cartographyService.create(this.layerForm.value)
      .subscribe(resp => {
        console.log(resp);
        // this.router.navigate(["/company", resp.id, "formConnection"]);
      });


  }

  updateLayer() {
    this.cartographyService.update(this.layerForm.value)
      .subscribe(resp => {
        console.log(resp);

      });

  }


  // AG-GRID

      /*
    Important! Aquesta és la funció que li passarem al data grid a través de l'html per obtenir les files de la taula,
    de moment no he trobat cap altre manera de que funcioni sense posar la nomenclatura = () =>,
    pel que de moment hem dit de deixar-ho així!
  */
   getAllTerritories = () => {
    return this.territoryService.getAll();
  }

  /*Les dues funcions que venen ara s'activaran quan es cliqui el botó de remove o el de new a la taula,
    si volguessim canviar el nom de la funció o qualsevol cosa, cal mirar l'html, allà es on es crida la funció
    corresponent!
  */

  removeDataTerritories( data: Territory[])
  {
  console.log(data);
  }

  newDataTerritories(id: any)
  {
  this.router.navigate(['territory', id, 'territoryForm']);
  }

}




