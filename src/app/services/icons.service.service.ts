import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconsService {

  menuOptions: any = [];
  extraImg: any = [];

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) { }

  loadOptions() {
    this.menuOptions = [
      {
        id: 'connection',
        icon: 'menu_connexio',
      },
      {
        id: 'service',
        icon: 'menu_servei',
      },
      {
        id: 'layers',
        icon: 'menu_capes',
      },
      {
        id: 'trees',
        icon: 'menu_arbres',
      },
      {
        id: 'backgroundLayers',
        icon: 'menu_capes_fons',
      },
      {
        id: 'layersPermits',
        icon: 'menu_permisos',
      },
      {
        id: 'territory',
        icon: 'menu_territori',
      },
      {
        id: 'role',
        icon: 'menu_rol',
      },
      {
        id: 'user',
        icon: 'menu_usuari',
      },
      {
        id: 'tasks',
        icon: 'menu_tasques',
      },
      {
        id: 'application',
        icon: 'menu_aplicacio',
      }
      ];
    this.extraImg = [
        {
          id: 'ic_arrow_down_black',
          icon: 'ic_arrow_down_black',
        }
      ];
    }

    loadSVGs(){
      // tslint:disable-next-line: forin
      for (const key in this.menuOptions) {
        const option = this.menuOptions[key];
        const icon = option.icon;

        this.matIconRegistry.addSvgIcon(
          icon,
          this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/' + icon + '.svg')
        );
      }
      // tslint:disable-next-line: forin
      for ( const key in this.extraImg ) {
        const option = this.extraImg[key];
        const icon = option.icon;

        this.matIconRegistry.addSvgIcon(
          icon,
          this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/' + icon + '.svg')
        );
      }
    }

    getMenuOption() {
      this.loadOptions();
      return this.menuOptions;
    }

}
