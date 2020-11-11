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
    el sortable es per si cliques al costat del nom de la columna, poder ordenar-ho de més gran a més petit o al revés,
    i el filter es pel filtre a sota del nom de la columna! Si ho volguessim desactivar a alguna columna només caldrà treure-ho
    de la fila del columnDefs corresponent.
    El checkboxSelection es necessari que ho posem al primer element de la columna, per tal de poder seleccionar més d'una fila,
    això serà necessari pel remove!
    L'editable el posarem als camps que volem que es puguin editar des de la taula, si per exemple volguessim que no es pogués editar
    l'id, ho esborrariem d'aquest!
    El passarem al component del dataGrid a través de l'html!
  */
  
  columnDefs = [
    { field: 'id', sortable: true, filter: true, checkboxSelection: true, editable: true},
    { field: 'description', sortable: true, filter: true, editable: true },
    { field: 'name', sortable: true, filter: true, editable: true},
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

  /*Les dues funcions que venen ara s'activaran quan es cliqui el botó de remove o el de new a la taula,
    si volguessim canviar el nom de la funció o qualsevol cosa, cal mirar l'html, allà es on es crida la funció
    corresponent!
  */

  removeData( data: Role[])
  {
    console.log(data);
  }

  newData()
  {
    console.log("Crear nou objecte!");
  }

  applyChanges( data: Role[])
  {
    console.log(data);
  }



  /*Encara es una versió primitiva, pero per veure les dades que et retorna y eso ja va bé,
    a mesura que ho vagi actualitzant aniré avisant, només s'haurà de canviar la carpeta dist,
    que segurament ja la canvii jo, pero avisaré igualment!
  */
}

