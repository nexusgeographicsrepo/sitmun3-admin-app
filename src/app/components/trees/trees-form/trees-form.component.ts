import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TreeService, Tree} from '@sitmun/frontend-core'
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import { map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
@Component({
  selector: 'app-trees-form',
  templateUrl: './trees-form.component.html',
  styleUrls: ['./trees-form.component.scss']
})
export class TreesFormComponent implements OnInit {

  treeID: number = -1;
  treeForm: FormGroup;
  treeNodeForm: FormGroup;
  treeToEdit: Tree;
  dataLoaded: Boolean = false;
  sendNodeUpdated: Subject<any> = new Subject <any>();
  getAllElementsNodes: Subject<boolean> = new Subject <boolean>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private treeService: TreeService,
    private http: HttpClient,
    private utils: UtilsService,
  ) {
   
    this.initializeTreesForm();
    this.initializeTreesNodeForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.treeID = +params.id;
      if (this.treeID !== -1) {
        console.log(this.treeID);

        this.treeService.get(this.treeID).subscribe(
          resp => {
            console.log(resp);
            this.treeToEdit = resp;
            this.treeForm.setValue({
              id: this.treeID,
              name: this.treeToEdit.name,
              _links: this.treeToEdit._links
            });

            this.dataLoaded = true;
          },
          error => {

          }
        );
      }
    });
  }

  initializeTreesForm(): void {
    this.treeForm = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl(null, [Validators.required]),
      _links: new FormControl(null, [])
    })
  }

  initializeTreesNodeForm(): void {
    this.treeNodeForm = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl(null, [Validators.required]),
      tooltip: new FormControl(null, []),
      cartography: new FormControl(null, []),
      radio: new FormControl(null, []),
      visible: new FormControl(null, []),
      _links: new FormControl(null, []),
      children: new FormControl(null, []),

    })
  }

  getAllTreeNodes= (): Observable<any> => {
      var urlReq = `${this.treeForm.value._links.allNodes.href}`
      if (this.treeForm.value._links.allNodes.templated) {
        var url = new URL(urlReq.split("{")[0]);
        url.searchParams.append("projection", "view")
        urlReq = url.toString();
      }
      return (this.http.get(urlReq))
        .pipe(map(data => data['_embedded']['tree-nodes']));

  }

  nodeReceived(node)
  {
    console.log(node);
    this.treeNodeForm.patchValue({
      id: node.id,
      name: node.name,
      tooltip: node.tooltip,
      cartography: null,
      radio: node.radio,
      visible: node.visible,
      _links: node._links,
      children: node.children
    })
  }

  
  onSaveButtonClicked(){ //TODO CHANGE TO UPDATE BUTTON WHEN AVAILABLE (Discomment the first line and delete line "sendNodeUpdated")
    // this.getAllElementsNodes.next(true);
    this.sendNodeUpdated.next(this.treeNodeForm.value)


  }

  onUpdateButtonClicked(){
    this.sendNodeUpdated.next(this.treeNodeForm.value)
  }

  

  getAllNodes(data)
  {

    console.log(data);
  }

}