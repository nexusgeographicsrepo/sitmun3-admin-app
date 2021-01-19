import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackgroundService, HalOptions, HalParam, CartographyGroupService } from '@sitmun/frontend-core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';


@Component({
  selector: 'app-background-layers-form',
  templateUrl: './background-layers-form.component.html',
  styleUrls: ['./background-layers-form.component.scss']
})
export class BackgroundLayersFormComponent implements OnInit {

  permissionGroups: Array<any> = [];
  cartographyGroupOfThisLayer;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private backgroundService: BackgroundService,
    private http: HttpClient,
    private utils: UtilsService,
    private cartographyGroupService:CartographyGroupService,
  ) {
    this.initializeBackgroundForm();
  }

  backgroundForm: FormGroup;
  backgroundToEdit;
  backgroundID = -1;

  ngOnInit(): void {

    let permissionGroupByDefault = {
      id: -1,
      name: '-------'
    }
    this.permissionGroups.push(permissionGroupByDefault);

    this.getPermissionGroups().subscribe(
      resp => {
        this.permissionGroups.push(...resp);
      }
    );

    this.activatedRoute.params.subscribe(params => {
      this.backgroundID = +params.id;
      if (this.backgroundID !== -1) {
        console.log(this.backgroundID);

        this.backgroundService.get(this.backgroundID).subscribe(
          resp => {
            console.log(resp);
            this.backgroundToEdit = resp;
            this.backgroundForm.setValue({
              id: this.backgroundID,
              name: this.backgroundToEdit.name,
              description: this.backgroundToEdit.description,
              cartographyGroup: this.backgroundToEdit['cartographyGroup.id'],
              active: this.backgroundToEdit.active,
              _links: this.backgroundToEdit._links
            });
          },
          error => {
 
          }
        );
      }
      else {
        this.backgroundForm.patchValue({
          active: false,
        });
      }

    },
      error => {

      });


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
      description: new FormControl(null, [
        Validators.required,
      ]),
      cartographyGroup: new FormControl(null, [
        Validators.required,
      ]),
      active: new FormControl(null, [
        Validators.required,
      ]),
      _links: new FormControl(null, []),

    });

  }

  addNewBackground() {
    let cartographyGroup= this.permissionGroups.find(x => x.id===this.backgroundForm.value.cartographyGroup )
    this.backgroundForm.patchValue({
      cartographyGroup : cartographyGroup
    })
    console.log(this.backgroundForm.value);

    this.backgroundService.create(this.backgroundForm.value)
      .subscribe(resp => {
        console.log(resp);
        // this.router.navigate(["/company", resp.id, "formConnection"]);
      });

      this.backgroundForm.patchValue({
        cartographyGroup : cartographyGroup.id
      }) 
  }

  updateBackground() {

    console.log(this.backgroundForm.value);
    let cartographyGroup= this.permissionGroups.find(x => x.id===this.backgroundForm.value.cartographyGroup )

    this.backgroundToEdit.name= this.backgroundForm.value.name;
    this.backgroundToEdit.description= this.backgroundForm.value.description;
    this.backgroundToEdit.cartographyGroup=cartographyGroup
    this.backgroundToEdit['cartographyGroup.id']=cartographyGroup.id;
    this.backgroundToEdit.cartographyGroupName=cartographyGroup.name;
    this.backgroundToEdit.cartographyGroup=cartographyGroup
    this.backgroundToEdit.active= this.backgroundForm.value.active;
    this.backgroundService.update(this.backgroundToEdit)
      .subscribe(resp => {
        console.log(resp);
      });

  }


  onSaveButtonClicked(){

    if(this.backgroundID !==-1)
    {this.updateBackground();}
    else {this.addNewBackground()}

    }
}
