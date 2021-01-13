
import { Component, OnInit } from '@angular/core';
import { TreeService, Tree } from 'dist/sitmun-frontend-core/';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from 'dist/sitmun-frontend-gui/';
 
@Component({
  selector: 'app-trees',
  templateUrl: './trees.component.html',
  styleUrls: ['./trees.component.scss']
})
export class TreesComponent implements OnInit {

  dataUpdatedEvent: Subject<boolean> = new Subject <boolean>();
  themeGrid: any = environment.agGridTheme;
  columnDefs: any[];


  constructor(public dialog: MatDialog,
    public treeService: TreeService,
    private utils: UtilsService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.columnDefs = [
      {
        headerName: '',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        editable: false,
        filter: false,
        width: 15,
        lockPosition: true,
      },
      {
        headerName: '',
        field: 'id',
        editable: false,
        filter: false,
        width: 14,
        lockPosition: true,
        cellRenderer: 'btnEditRendererComponent',
        cellRendererParams: {
          clicked: this.newData.bind(this)
        },
      },
      { headerName: 'Id', field: 'id', editable: false },
      { headerName: this.utils.getTranslate('treesEntity.name'), field: 'name' },
    ];

  }

  getAllTrees = () => {

    return this.treeService.getAll();
  }

  newData(id: any) {
    // this.router.navigate(['trees', id, 'treesForm']);
  }

  applyChanges(data: Tree[]) {
    const promises: Promise<any>[] = [];
    data.forEach(tree => {
      promises.push(new Promise((resolve, reject) => {​​​​​​​ this.treeService.update(tree).toPromise().then((resp) =>{​​​​​​​resolve()}​​​​​​​)}​​​​​​​));
      Promise.all(promises).then(() => {
        this.dataUpdatedEvent.next(true);
      });
    });
  }

  add(data: Tree[]) {
    const promises: Promise<any>[] = [];
    data.forEach(tree => {
      tree.id = null;
      promises.push(new Promise((resolve, reject) => {​​​​​​​ this.treeService.create(tree).toPromise().then((resp) =>{​​​​​​​resolve()}​​​​​​​)}​​​​​​​));
      Promise.all(promises).then(() => {
        this.dataUpdatedEvent.next(true);
      });
    });

  }

  removeData(data: Tree[]) {

    const dialogRef = this.dialog.open(DialogMessageComponent);
    dialogRef.componentInstance.title=this.utils.getTranslate("Caution");
    dialogRef.componentInstance.message=this.utils.getTranslate("RemoveMessage");
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.event==='Accept') {  
          const promises: Promise<any>[] = [];
          data.forEach(tree => {
            promises.push(new Promise((resolve, reject) => {​​​​​​​ this.treeService.delete(tree).toPromise().then((resp) =>{​​​​​​​resolve()}​​​​​​​)}​​​​​​​));
            Promise.all(promises).then(() => {
              this.dataUpdatedEvent.next(true);
            });
          });
       }
      }
    });



  }

}
