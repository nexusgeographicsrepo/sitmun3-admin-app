import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import {  ActivatedRoute,  Router} from '@angular/router';
import { RoleService } from 'dist/sitmun-frontend-core/';
import { Connection } from 'dist/sitmun-frontend-core/connection/connection.model';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import { BtnEditRenderedComponent } from 'dist/sitmun-frontend-gui/';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {

  formRole: FormGroup;
  roleToEdit;
  stopID: number = -1;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private http: HttpClient,
    private utils: UtilsService,
    ) {
        this.initializeLayersPermitsForm();
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.stopID = +params.id;
      if (this.stopID !== -1){
        console.log(this.stopID);

        this.roleService.get(this.stopID).subscribe(
          resp => {
            console.log(resp);
            this.roleToEdit=resp;
            this.formRole.setValue({
                id:           this.stopID,
                name:         this.roleToEdit.name,
                description:  this.roleToEdit.description,
                _links:       this.roleToEdit._links
              });


          },
          error => {

          }
        );
      }

    },
    error => {

    });

  }


  initializeLayersPermitsForm(): void {

    this.formRole = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl(null, [
        Validators.required,
      ]),
      description: new FormControl(null, [
        Validators.required,
      ]),
      _links: new FormControl(null, []),

    })

  }

  addNewConnection() {
    console.log(this.formRole.value);
    this.roleService.create(this.formRole.value)
      .subscribe(resp => {
        console.log(resp);
        // this.router.navigate(["/company", resp.id, "formConnection"]);
      });


  }

  updateConnection() {

    console.log(this.formRole.value);

    this.roleService.update(this.formRole.value)
      .subscribe(resp => {
        console.log(resp);

      });

  }


}