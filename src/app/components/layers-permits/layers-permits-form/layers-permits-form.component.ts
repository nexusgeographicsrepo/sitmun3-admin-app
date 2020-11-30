import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute,  Router} from '@angular/router';

@Component({
  selector: 'app-layers-permits-form',
  templateUrl: './layers-permits-form.component.html',
  styleUrls: ['./layers-permits-form.component.scss']
})
export class LayersPermitsFormComponent implements OnInit {

  layersPermitID: number = -1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) {
      this.activatedRoute.params.subscribe(params => {
        this.layersPermitID = +params.id;
        console.log(this.layersPermitID);
      });
    }

  ngOnInit(): void {
  }

}