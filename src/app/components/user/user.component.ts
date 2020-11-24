import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'dist/sitmun-frontend-core/user/user.model';
import { UserService } from 'dist/sitmun-frontend-core/';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '../../services/utils.service';
import { BtnEditRenderedComponent } from '../shared/btn-edit-rendered/btn-edit-rendered.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit  {


  columnDefs: any[];
  public frameworkComponents = {
    btnEditRendererComponent: BtnEditRenderedComponent
  };

    constructor(private http: HttpClient,
                public userService: UserService,
                private utils: UtilsService
                // private translate: TranslateService
                ) {

    }

    
    ngOnInit()  {
      // this.headerNameColumnUser = await this.translate.get('user').toPromise();
      // this.headerNameColumnFirstName = await this.translate.get('firstname').toPromise();
      // this.headerNameColumnLastName = await this.translate.get('lastname').toPromise();
      // this.headerNameColumnStatus = await this.translate.get('status').toPromise();

      this.columnDefs = [
        {
          headerName: '',
          field: 'id',
          checkboxSelection: true,
          headerCheckboxSelection: true,
          filter: false,
          width: 100,
          cellRenderer: 'btnEditRendererComponent',
          cellRendererParams: {
            clicked: function(field: any) {
              alert(`${field} was clicked`);
            }
          },
        },
        { headerName: this.utils.getTranslate('user'), field: 'username' },
        { headerName: this.utils.getTranslate('firstname'),  field: 'firstName' },
        { headerName: this.utils.getTranslate('lastname'),  field: 'lastName'},
        { headerName: this.utils.getTranslate('status'), field: 'estat'},
        // { headerName: this.translate.instant, field: 'username', checkboxSelection: true, },
        // { headerName: this.headerNameColumnFirstName,  field: 'firstName' },
        // { headerName: this.headerNameColumnLastName,  field: 'lastName'},
        // { headerName: this.headerNameColumnStatus, field: 'estat'},
      ];
    }


      /*
      Important! Aquesta és la funció que li passarem al data grid a través de l'html per obtenir les files de la taula,
      de moment no he trobat cap altre manera de que funcioni sense posar la nomenclatura = () =>,
      pel que de moment hem dit de deixar-ho així!
    */
    getAllUsers = () => {

      return this.userService.getAll();
    }

    /*Les dues funcions que venen ara s'activaran quan es cliqui el botó de remove o el de new a la taula,
      si volguessim canviar el nom de la funció o qualsevol cosa, cal mirar l'html, allà es on es crida la funció
      corresponent!
    */

    removeData( data: User[])
    {
      console.log(data);
    }

    newData()
    {
      console.log(this.utils.getTranslate('user'));
      console.log('Crear nou objecte!');
    }

    applyChanges( data: User[])
    {
      console.log(data);
    }

  }
