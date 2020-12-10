import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators  } from '@angular/forms';
import {  ActivatedRoute,  Router} from '@angular/router';
import { ApplicationService } from 'dist/sitmun-frontend-core/';
import { Connection } from 'dist/sitmun-frontend-core/connection/connection.model';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import { BtnEditRenderedComponent } from 'dist/sitmun-frontend-gui/';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
    private http: HttpClient,
    private utils: UtilsService,
    ) {
        this.initializeConnectionForm();
    }


  applicationForm: FormGroup;
  applicationToEdit;
  applicationID = -1;



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.applicationID = +params.id;
      if (this.applicationID !== -1){
        console.log(this.applicationID);

        this.applicationService.get(this.applicationID).subscribe(
          resp => {
            console.log(resp);
            this.applicationToEdit=resp;
            this.applicationForm.setValue({
                id:                          this.applicationID,
                name:                        this.applicationToEdit.name,
                user:                        ' ',
                type:                        this.applicationToEdit.type,
                title:                       this.applicationToEdit.title,
                tree:                        ' ',
                desktopUrl:                  ' ',
                desktopCSS:                  ' ',
                mobileUrl:                   ' ',
                mobileCSS:                   ' ',
                defaultTool:                 ' ',
                desplacamentSupramunicipal:  false,
                situationMap:                this.applicationToEdit.situationMap.name,
                scales:                      this.applicationToEdit.scales,
                srs:                         this.applicationToEdit.srs,
                treeAutoRefresh:             this.applicationToEdit.treeAutoRefresh,
                _links:                      this.applicationToEdit._links
              });


          },
          error => {

          }
        );
      }
      else {
        this.applicationForm.patchValue({
          desplacamentSupramunicipal: false,
          treeAutorefresh: false,
        });
      }

    },
    error => {

    });


  }


  initializeConnectionForm(): void {

    this.applicationForm = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl(null, [
        Validators.required,
      ]),
      user: new FormControl(null, [
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
      desktopUrl: new FormControl(null, [
        Validators.required,
      ]),
      desktopCSS: new FormControl(null, [
        Validators.required,
      ]),
      mobileUrl: new FormControl(null, [
        Validators.required,
      ]),
      mobileCSS: new FormControl(null, [
        Validators.required,
      ]),
      defaultTool: new FormControl(null, [
        Validators.required,
      ]),
      desplacamentSupramunicipal: new FormControl(null, [
        Validators.required,
      ]),
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
    const situationMap = {
        id: this.applicationID,
        name: this.applicationForm.value.name,
        type: this.applicationForm.value.type,
    }
    this.applicationForm.patchValue({
      situationMap: situationMap,
    });
    

    this.applicationService.update(this.applicationForm.value)
      .subscribe(resp => {
        console.log(resp);

      });

  }
}
