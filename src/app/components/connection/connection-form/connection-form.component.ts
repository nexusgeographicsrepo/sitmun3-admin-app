import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute,  Router} from '@angular/router';


@Component({
  selector: 'app-connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.scss']
})
export class ConnectionFormComponent implements OnInit {


  stopID: number = -1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) {
      this.activatedRoute.params.subscribe(params => {
        this.stopID = +params.id;
        console.log(this.stopID);
      });
    }

  ngOnInit(): void {
  }

}
