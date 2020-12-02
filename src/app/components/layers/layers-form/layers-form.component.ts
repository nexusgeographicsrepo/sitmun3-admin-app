import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { CartographyService } from 'dist/sitmun-frontend-core/';
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

  layerForm: FormGroup;
  layerToEdit;
  layerID = -1;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartographyService: CartographyService,
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
}

