import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Role } from 'dist/sitmun-frontend-core/role/role.model';
import { RoleService } from 'dist/sitmun-frontend-core/';


@Component({
  selector: 'app-proves',
  templateUrl: './proves.component.html',
  styleUrls: ['./proves.component.css']
})
export class ProvesComponent implements OnInit {

  /*
    Important, perque funcioni s'ha de tenir el backend-core engegat, per defecte està posat al port 8080,
    que és en el que s'engega normalment, si pel que fos el tens a un altre, has de canviar-ho al fitxer
    ExternalConfigurationService.ts!
    La comanda per engegar el backend-core és: SPRING_PROFILES_ACTIVE=dev ./gradlew bootRun
    (Tal cual després de fer el git clone, recomanació, fer el clone directament del de sitmun, ja que van fent canvis)
  */


  /*
    El columnDefs correspon a les columnes que tindrà la taula (a cada component serà diferent suposo),
    el sortable es per si cliques al costat del nom de la columna, poder ordenar-ho de més gran a més petit o al revés! 
    El passarem al component del dataGrid a través de l'html!
  */
  
  columnDefs = [
    { field: 'id', sortable: true},
    { field: 'description', sortable: true },
    { field: 'name', sortable: true},
  ];

  constructor(private http: HttpClient,
              public roleService: RoleService,
              ) {

  }
  
  ngOnInit(): void {
    
  }


    /*
    Important! Aquesta és la funció que li passarem al data grid a través de l'html per obtenir les files de la taula,
    de moment no he trobat cap altre manera de que funcioni sense posar la nomenclatura = () =>,
    pel que de moment hem dit de deixar-ho així!
  */
  getAllRoles = () => {
    return this.roleService.getAll();
  }

  /*Encara es una versió molt primitiva, pero per veure les dades que et retorna y eso ja va bé,
    a mesura que ho vagi actualitzant aniré avisant, només s'haurà de canviar la carpeta dist,
    que segurament ja la canvii jo, pero avisaré igualment!
  */
}
