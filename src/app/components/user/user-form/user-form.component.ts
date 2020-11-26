import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute,  Router} from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

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
