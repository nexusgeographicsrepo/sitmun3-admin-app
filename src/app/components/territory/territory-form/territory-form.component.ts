import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import {  ActivatedRoute,  Router} from '@angular/router';
import { TerritoryService } from 'dist/sitmun-frontend-core/';
import { Connection } from 'dist/sitmun-frontend-core/connection/connection.model';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import { BtnEditRenderedComponent } from 'dist/sitmun-frontend-gui/';

 
@Component({
  selector: 'app-territory-form',
  templateUrl: './territory-form.component.html',
  styleUrls: ['./territory-form.component.scss']
})
export class TerritoryFormComponent implements OnInit {

  territoryForm: FormGroup;
  territoryToEdit;
  territoryID = -1;
  extensions: Array<string>;
  columnDefs: any[];
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
    this.activatedRoute.params.subscribe(params => {
      this.territoryID = +params.id;
      if (this.territoryID !== -1){

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
                groupType:                   ' ',
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


}
