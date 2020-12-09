import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import {  ActivatedRoute,  Router} from '@angular/router';
import { Territory, TerritoryService } from 'dist/sitmun-frontend-core/';
import { Connection } from 'dist/sitmun-frontend-core/connection/connection.model';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import { BtnEditRenderedComponent } from 'dist/sitmun-frontend-gui/';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

 
@Component({
  selector: 'app-territory-form',
  templateUrl: './territory-form.component.html',
  styleUrls: ['./territory-form.component.scss']
})
export class TerritoryFormComponent implements OnInit {

  groupTypeOfThisTerritory;
  territoryForm: FormGroup;
  territoryToEdit;
  territoryID = -1;
  territoryGroups: Territory[];
  extensions: Array<string>;
  columnDefsMemberOf: any[];
  public frameworkComponents = {
    btnEditRendererComponent: BtnEditRenderedComponent
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private territoryService: TerritoryService,
    private http: HttpClient,
    private utils: UtilsService,
    ) {
        this.initializeConnectionForm();
    }

  ngOnInit(): void {
    

    this.getTerritoryGroups().subscribe(
      resp => {
          this.territoryGroups = resp;
      }
    );



    this.activatedRoute.params.subscribe(params => {
      this.territoryID = +params.id;
      if (this.territoryID !== -1){

        if (this.territoryID !== -1)
        {
          this.getTerritoryGroupOfThisTerritory().subscribe(
          resp => {
              console.log(resp);
              this.groupTypeOfThisTerritory = resp;
          });
        }



        this.territoryService.get(this.territoryID).subscribe(
          resp => {
            console.log(resp);
            this.territoryToEdit=resp;

            this.extensions = this.territoryToEdit.extent.split(' ');

            this.territoryForm.setValue({
                id:                          this.territoryID,
                code:                        this.territoryToEdit.code,
                name:                        this.territoryToEdit.name,
                territorialAuthorityAddress: this.territoryToEdit.territorialAuthorityAddress,
                territorialAuthorityLogo:    this.territoryToEdit.territorialAuthorityLogo,
                scope:                       this.territoryToEdit.scope,
                groupType:                   this.groupTypeOfThisTerritory,
                extent:                      ' ',
                extensionX0:                 this.extensions[0],
                extensionX1:                 this.extensions[1],
                extensionY0:                 this.extensions[2],
                extensionY1:                 this.extensions[3],
                note:                        this.territoryToEdit.note,
                blocked:                     this.territoryToEdit.blocked,
                _links:                      this.territoryToEdit._links
              });


          },
          error => {

          }
        );
      }
      else {
        this.territoryForm.patchValue({
          blocked: false
        });
      }

    },
    error => {

    });



    this.columnDefsMemberOf = [

      { headerName: 'ID',  field: 'id', editable: false},
      { headerName: this.utils.getTranslate('territoryEntity.code'),  field: 'code' },
      { headerName: this.utils.getTranslate('territoryEntity.name'),  field: 'name'},

    ];

  }


  initializeConnectionForm(): void {

    this.territoryForm = new FormGroup({
      id: new FormControl(null, []),
      code: new FormControl(null, [
        Validators.required,
      ]),
      name: new FormControl(null, [
        Validators.required,
      ]),
      territorialAuthorityAddress: new FormControl(null, [
        Validators.required,
      ]),
      territorialAuthorityLogo: new FormControl(null, [
        Validators.required,
      ]),
      scope: new FormControl(null, [
        Validators.required,
      ]),
      groupType: new FormControl(null, [
        Validators.required,
      ]),
      extensionX0: new FormControl(null, [
        Validators.required,
      ]),
      extensionX1: new FormControl(null, [
        Validators.required,
      ]),
      extensionY0: new FormControl(null, [
        Validators.required,
      ]),
      extensionY1: new FormControl(null, [
        Validators.required,
      ]),
      extent: new FormControl(null, []),
      note: new FormControl(null, [
        Validators.required,
      ]),
      blocked: new FormControl(null, []),
      _links: new FormControl(null, []),

    })

  }

  getTerritoryGroups()
  {
    return (this.http.get(`http://localhost:8080/api/territory-group-types`))
    .pipe( map( data => data[`_embedded`][`territory-group-types`]) );
  }

  getTerritoryGroupOfThisTerritory()
  {
    return (this.http.get(`http://localhost:8080/api/territory-group-types/${this.territoryID}`))
    .pipe( map( data => data[`name`] ));
  }

  addNewTerritory() {
    this.updateExtent();
    console.log(this.territoryForm.value);
    this.territoryService.create(this.territoryForm.value)
      .subscribe(resp => {
        console.log(resp);
        // this.router.navigate(["/company", resp.id, "formConnection"]);
      });


  }

  updateTerritory() {
    this.updateExtent();
    console.log(this.territoryForm.value);
    this.territoryService.update(this.territoryForm.value)
      .subscribe(resp => {
        console.log(resp);

      });

  }

  updateExtent(){
    let extensionToUpdate= `${this.territoryForm.get('extensionX0').value} ${this.territoryForm.get('extensionX1').value} ${this.territoryForm.get('extensionY0').value} ${this.territoryForm.get('extensionY1').value}`;
    this.territoryForm.patchValue({
      extent: extensionToUpdate
    });
  }

 // AG-GRID

      /*
    Important! Aquesta és la funció que li passarem al data grid a través de l'html per obtenir les files de la taula,
    de moment no he trobat cap altre manera de que funcioni sense posar la nomenclatura = () =>,
    pel que de moment hem dit de deixar-ho així!
  */
 getAllMembersOf = (): Observable<any> => {
  return (this.http.get(`http://localhost:8080/api/territories/${this.territoryID}/memberOf`))
  .pipe( map( data =>  data['_embedded']['territories']) );
}

/*Les dues funcions que venen ara s'activaran quan es cliqui el botó de remove o el de new a la taula,
  si volguessim canviar el nom de la funció o qualsevol cosa, cal mirar l'html, allà es on es crida la funció
  corresponent!
*/

  removeMembersOf( data: any[])
  {
  console.log(data);
  }
  
  newDataMembersOf(id: any)
  {
    // this.router.navigate(['territory', id, 'territoryForm']);
    console.log('screen in progress');
  }


}
