import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TreeService, TreeNodeService, Translation, TranslationService, CartographyService, Tree, TreeNode, Cartography } from 'dist/sitmun-frontend-core/';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../services/utils.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { config } from 'src/config';
import { Observable, of, Subject } from 'rxjs';
import { DialogMessageComponent } from 'dist/sitmun-frontend-gui/';
import { MatDialog } from '@angular/material/dialog';

interface NodeTranslation {
  catalan?: String,
  spanish?: String,
  english?: String,
  aranese?: String,
  french?: String,
}

@Component({
  selector: 'app-trees-form',
  templateUrl: './trees-form.component.html',
  styleUrls: ['./trees-form.component.scss']
})
export class TreesFormComponent implements OnInit {


  //Translations
  nameTranslationsModified: boolean = false;
  descriptionTranslationsModified: boolean = false;
  nameTranslations: Map<number, NodeTranslation> = new Map<number, NodeTranslation>();
  descriptionTranslations: Map<number, NodeTranslation> = new Map<number, NodeTranslation>();
  
  treeNameTranslationMap: Map<string, Translation>;
  treeDescriptionTranslationMap: Map<string, Translation>;

  themeGrid: any = config.agGridTheme;
  treeID: number = -1;
  duplicateID = -1;
  treeForm: FormGroup;
  treeNodeForm: FormGroup;
  idFictitiousCounter=-1;
  treeToEdit: Tree;
  dataLoaded: Boolean = false;
  currentNodeIsFolder: Boolean;
  newElement: Boolean = false;
  duplicateToDo = false;
  sendNodeUpdated: Subject<any> = new Subject <any>();
  getAllElementsNodes: Subject<boolean> = new Subject <boolean>();
  refreshTreeEvent: Subject<boolean> = new Subject <boolean>();
  createNodeEvent: Subject<boolean> = new Subject <boolean>();
  getAllElementsEventCartographies: Subject<boolean> = new Subject <boolean>();
  columnDefsCartographies: any[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private treeService: TreeService,
    private treeNodeService: TreeNodeService,
    private translationService: TranslationService,
    private cartographyService: CartographyService,
    private http: HttpClient,
    public utils: UtilsService,
    public dialog: MatDialog,
  ) {
   
    this.initializeTreesForm();
    this.initializeTreesNodeForm();
  }



  ngOnInit(): void {

    this.treeNameTranslationMap= this.utils.createTranslationsList(config.translationColumns.treeName);
    this.treeDescriptionTranslationMap= this.utils.createTranslationsList(config.translationColumns.treeDescription);

    this.activatedRoute.params.subscribe(params => {
      this.treeID = +params.id;
      if(params.idDuplicate) { this.duplicateID = +params.idDuplicate; }
      
      if (this.treeID !== -1 || this.duplicateID != -1) {
        let idToGet = this.treeID !== -1? this.treeID: this.duplicateID 
        console.log(this.treeID);

        this.treeService.get(idToGet).subscribe(
          resp => {
            console.log(resp);
            this.treeToEdit = resp;
            this.treeForm.patchValue({
              description: this.treeToEdit.description,
              image: this.treeToEdit.image,
              _links: this.treeToEdit._links
            });

            if(this.treeID !== -1){
              this.treeForm.patchValue({
              id: this.treeID,
              name: this.treeToEdit.name,
              });
            }
            else{
              this.treeForm.patchValue({
              name: this.utils.getTranslate('copy_').concat(this.treeToEdit.name),
              });
              this.duplicateToDo=true;
            }

            if(this.treeID !=-1)
            {
              this.translationService.getAll()
              .pipe(map((data: any[]) => data.filter(elem => elem.element == this.treeID || elem.column == config.translationColumns.treeNodeName ||
                elem.column == config.translationColumns.treeNodeDescription)
              )).subscribe( result => {
                console.log(result);
                let treeNameTranslations = [];
                let treeDescriptionTranslations = [];
                result.forEach(translation => {
                  if(translation.column == config.translationColumns.treeName){
                    treeNameTranslations.push(translation)
                  }
                  else if (translation.column == config.translationColumns.treeDescription){
                    treeDescriptionTranslations.push(translation)
                  }
                  else if (translation.column == config.translationColumns.treeNodeDescription || translation.column == config.translationColumns.treeNodeName){
                    this.saveTreeNodeTranslation(translation);
                  }
  
                });
                this.utils.updateTranslations(this.treeNameTranslationMap, treeNameTranslations)
                this.utils.updateTranslations(this.treeDescriptionTranslationMap, treeDescriptionTranslations)
              });
            }
            

            this.dataLoaded = true;
          },
          error => {

          }
        );
      }else{
        this.dataLoaded = true;
      }
    });


    this.columnDefsCartographies = [
      this.utils.getSelCheckboxColumnDef(),
      this.utils.getIdColumnDef(),
      this.utils.getNonEditableColumnDef('treesEntity.name','name')
    ];

  }

  saveTreeNodeTranslation(translation){
    if(translation.column == config.translationColumns.treeNodeName ){
      this.storeTranslationInMap(translation,this.nameTranslations)
    }
    else if(translation.column == config.translationColumns.treeNodeDescription){
      this.storeTranslationInMap(translation,this.descriptionTranslations)
    }
  }

  private storeTranslationInMap(translation, map:Map<Number,NodeTranslation>){
    let currentTranslation = map.get(translation.element)
    if(currentTranslation != undefined){
      console.log(currentTranslation)
      if(translation.languageName==config.languagesObjects.catalan.name) {currentTranslation.catalan=translation; }
      else if(translation.languageName==config.languagesObjects.spanish.name) {currentTranslation.spanish=translation; }
      else if(translation.languageName==config.languagesObjects.english.name) {currentTranslation.english=translation; }
      else if(translation.languageName==config.languagesObjects.aranese.name) {currentTranslation.aranese=translation; }
      else if(translation.languageName==config.languagesObjects.french.name) {currentTranslation.french=translation; }
      map.set(translation.element,currentTranslation);
    }
    else{
      let newTranslation: NodeTranslation = {catalan: null, spanish: null, english:null};
      if(translation.languageName==config.languagesObjects.catalan.name) {newTranslation.catalan=translation; }
      else if(translation.languageName==config.languagesObjects.spanish.name) {newTranslation.spanish=translation; }
      else if(translation.languageName==config.languagesObjects.english.name) {newTranslation.english=translation; }
      else if(translation.languageName==config.languagesObjects.aranese.name) {newTranslation.aranese=translation; }
      else if(translation.languageName==config.languagesObjects.french.name) {newTranslation.french=translation; }
      map.set(translation.element,newTranslation);
      console.log(newTranslation);
    }
  }


  initializeTreesForm(): void {
    this.treeForm = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, []),
      image: new FormControl(null, []),
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
      datasetURL: new FormControl(null, []),
      metadataURL: new FormControl(null, []),
      description: new FormControl(null, []),
      active: new FormControl(null, []),
      _links: new FormControl(null, []),
      children: new FormControl(null, []),
      parent: new FormControl(null, []),
      isFolder: new FormControl(null, []),
      type: new FormControl(null, []),
      order: new FormControl(null, []),
      catalanNameTranslation: new FormControl(null, []),
      spanishNameTranslation: new FormControl(null, []),
      englishNameTranslation: new FormControl(null, []),
      araneseNameTranslation: new FormControl(null, []),
      frenchNameTranslation: new FormControl(null, []),
      catalanDescriptionTranslation: new FormControl(null, []),
      spanishDescriptionTranslation: new FormControl(null, []),
      englishDescriptionTranslation: new FormControl(null, []),
      araneseDescriptionTranslation: new FormControl(null, []),
      frenchDescriptionTranslation: new FormControl(null, []),
      nameTranslationsModified: new FormControl(null, []),
      descriptionTranslationsModified: new FormControl(null, []),
      status: new FormControl(null, []),
      cartographyName: new FormControl(null, []),
      
    })
  }

  async onNameTranslationButtonClicked()
  {
    let dialogResult = null
    dialogResult = await this.utils.openTranslationDialog2(this.treeNameTranslationMap);
    if(dialogResult && dialogResult.event == "Accept"){
      this.nameTranslationsModified=true;
    }
  }

  async onTreeNodeNameTranslationButtonClicked()
  {
    let dialogResult = null
    dialogResult = await this.utils.openTranslationDialog(this.treeNodeForm.value.catalanNameTranslation,
       this.treeNodeForm.value.spanishNameTranslation, this.treeNodeForm.value.englishNameTranslation, this.treeNodeForm.value.araneseNameTranslation, this.treeNodeForm.value.frenchNameTranslation, config.translationColumns.treeNodeName);
    if(dialogResult!=null){
      this.treeNodeForm.patchValue({
       catalanNameTranslation: dialogResult[0],
       spanishNameTranslation: dialogResult[1],
       englishNameTranslation: dialogResult[2],
       araneseNameTranslation: dialogResult[3],
       frenchNameTranslation: dialogResult[4],
       nameTranslationsModified: true,

      })
    }
  }

  async onDescriptionTranslationButtonClicked()
  {
    let dialogResult = null
    dialogResult = await this.utils.openTranslationDialog2(this.treeDescriptionTranslationMap);
    if(dialogResult && dialogResult.event == "Accept"){
      this.descriptionTranslationsModified=true;
    }
  }

  
  async onTreeNodeDescriptionTranslationButtonClicked()
  {
    let dialogResult = null
    dialogResult = await this.utils.openTranslationDialog(this.treeNodeForm.value.catalanDescriptionTranslation,
      this.treeNodeForm.value.spanishDescriptionTranslation, this.treeNodeForm.value.englishDescriptionTranslation,
       this.treeNodeForm.value.araneseDescriptionTranslation, this.treeNodeForm.value.frenchDescriptionTranslation, config.translationColumns.treeNodeDescription);
    if(dialogResult!=null){
      this.treeNodeForm.patchValue({
        catalanDescriptionTranslation: dialogResult[0],
        spanishDescriptionTranslation: dialogResult[1],
        englishDescriptionTranslation: dialogResult[2],
        araneseDescriptionTranslation: dialogResult[3],
        frenchDescriptionTranslation: dialogResult[4],
        descriptionTranslationsModified: true,
       })
    }
  }

  getAllCartographies = (): Observable<any> => {

   return this.cartographyService.getAll();

  }

  getAllTreeNodes= (): Observable<any> => {
    if(this.treeID == -1 && this.duplicateID == -1){
      const aux: Array<any> = [];
      return of(aux);

    }else{
      var urlReq = `${this.treeForm.value._links.allNodes.href}`
      if (this.treeForm.value._links.allNodes.templated) {
        var url = new URL(urlReq.split("{")[0]);
        url.searchParams.append("projection", "view")
        urlReq = url.toString();
      }
      return (this.http.get(urlReq))
        .pipe(map(data => data['_embedded']['tree-nodes']));
    }
  }

  nodeReceived(node)
  {
    this.newElement=false;
    let currentType;
    if (node.isFolder)
    {
      this.currentNodeIsFolder = true;
      currentType='folder'
    }
    else
    {
      this.currentNodeIsFolder = false;
      currentType='node'
    }
    console.log(node);
    let status="Modified"
    if(node.id < 0) { status = "pendingCreation"}
    this.treeNodeForm.patchValue({
      id: node.id,
      name: node.name,
      tooltip: node.tooltip,
      order: node.order,
      cartography: node.cartographyName,
      radio: node.radio,
      description: node.description,
      datasetURL: node.datasetURL,
      metadataURL: node.metadataURL,
      active: node.active,
      _links: node._links,
      children: node.children,
      parent: node.parent,
      isFolder: node.isFolder,
      nameTranslationsModified: false,
      descriptionTranslationsModified: false,
      catalanNameTranslation: node.catalanNameTranslation,
      spanishNameTranslation: node.spanishNameTranslation,
      englishNameTranslation: node.englishNameTranslation,
      araneseNameTranslation: node.araneseNameTranslation,
      frenchNameTranslation: node.frenchNameTranslation,
      catalanDescriptionTranslation: node.catalanDescriptionTranslation,
      spanishDescriptionTranslation: node.spanishDescriptionTranslation,
      englishDescriptionTranslation: node.englishDescriptionTranslation,
      araneseDescriptionTranslation: node.araneseDescriptionTranslation,
      frenchDescriptionTranslation: node.frenchDescriptionTranslation,
      status: status,
      type:currentType
    })

    if(! node.nameTranslationsModified){
      if(this.nameTranslations.has(node.id)){
        let translations = this.nameTranslations.get(node.id);
        this.treeNodeForm.patchValue({
          catalanNameTranslation: translations.catalan,
          spanishNameTranslation: translations.spanish,
          englishNameTranslation: translations.english,
          araneseNameTranslation: translations.aranese,
          frenchNameTranslation: translations.french,
        })
      }
    }

    if(! node.descriptionTranslationsModified){
      if(this.descriptionTranslations.has(node.id)){
        let translations = this.descriptionTranslations.get(node.id);
        this.treeNodeForm.patchValue({
          catalanDescriptionTranslation: translations.catalan,
          spanishDescriptionTranslation: translations.spanish,
          englishDescriptionTranslation: translations.english,
          araneseDescriptionTranslation: translations.aranese,
          frenchDescriptionTranslation: translations.french,
        })
      }
    }

  }

  createNode(parent)
  {
    this.treeNodeForm.reset();
    this.newElement=true;
    this.currentNodeIsFolder=false
    console.log(parent);
    let parentId = parent.id;
    if(parent.name === "Root") {parentId=null}
    this.treeNodeForm.patchValue({
      parent: parentId ,
      isFolder: false,
      order: null,
      children: [],
      status: "pendingCreation"
    })

  }

  createFolder(parent)
  {
    this.treeNodeForm.reset();
    this.newElement=true;
    this.currentNodeIsFolder=true
    let parentId = parent.id;
    if(parent.name === "Root") {parentId=null}
    this.treeNodeForm.patchValue({
      parent: parentId,
      isFolder: true,
      order: null,
      children: [],
      status: "pendingCreation"
    })

  }



  
  onSaveButtonClicked(){ 
    if(this.treeForm.valid)
    {    
        this.getAllElementsNodes.next(true);
    }
    else {
      this.utils.showRequiredFieldsError();
    }
  }

  updateNode(){
    console.log(this.treeNodeForm.value);
    this.sendNodeUpdated.next(this.treeNodeForm.value)
  }

  onSaveFormButtonClicked(){
    if(this.treeNodeForm.valid)
    {
      if(!this.currentNodeIsFolder) {this.getAllElementsEventCartographies.next(this.treeNodeForm.value)}
      else { this.updateTreeLeft(null) }
    }
    else {
      this.utils.showRequiredFieldsError();
    }
    
  }

    

  getAllNodes(data: TreeNode[])
  {
    		
	  if (this.treeID == -1 && this.duplicateID != -1) {
      this.treeForm.patchValue({
        _links: null
      })
    }
  

    console.log(data);
    this.treeService.save( this.treeForm.value)
    .subscribe(async resp => {
      this.treeToEdit=resp;
      this.treeID=resp.id;

      this.treeForm.patchValue({
        _links : resp._links,
        id: resp.id
      })

      this.utils.saveTranslation2(resp.id, this.treeNameTranslationMap, this.treeToEdit.name, this.nameTranslationsModified);
      this.nameTranslationsModified=false;
      this.utils.saveTranslation2(resp.id, this.treeDescriptionTranslationMap, this.treeToEdit.description, this.descriptionTranslationsModified);
      this.descriptionTranslationsModified=false;

      let mapNewIdentificators: Map <number, any[]> = new Map<number, any[]>();
      const promises: Promise<any>[] = [];
       this.updateAllTrees(data,0,mapNewIdentificators, promises,  null, null);
      this.refreshTreeEvent.next(true)
    },
    error=>{
      console.log(error);
    });

  }

  async updateAllTrees(treesToUpdate: any[], depth:number,mapNewIdentificators: Map <number, any[]>, promises: Promise<any>[], newId, newParent)
  {
    console.log(treesToUpdate);
      for(let i = 0; i<treesToUpdate.length; i++){
        let tree= treesToUpdate[i];
	
      if(tree.status)
      {
        var treeNodeObj: TreeNode=new TreeNode();
     
        treeNodeObj.name= tree.name;
        treeNodeObj.tooltip= tree.tooltip;
        treeNodeObj.order= tree.order;
        treeNodeObj.active= tree.active;
        treeNodeObj.datasetURL= tree.datasetURL;
        treeNodeObj.metadataURL= tree.metadataURL;
        treeNodeObj.description= tree.description;
        treeNodeObj.tree= this.treeToEdit;



        if(tree.status === "pendingCreation" && tree._links && !tree.isFolder && !tree.cartography){

            let urlReqCartography = `${tree._links.cartography.href}`
            if (tree._links.cartography.href) {
              let url = new URL(urlReqCartography.split("{")[0]);
              url.searchParams.append("projection", "view")
              urlReqCartography = url.toString();
            }
            tree.cartography = await this.http.get(urlReqCartography).toPromise();
          
        }
        else{
          if(tree.status !== "pendingCreation") { treeNodeObj._links= tree._links; }
          
        }
        treeNodeObj.cartography= tree.cartography;


        if(tree.status !== "pendingDelete")
        {

          let currentParent;
          if(tree.parent !== null) {
            if(tree.parent >= 0)
            {
              currentParent= treesToUpdate.find(element => element.id === tree.parent ) 
              currentParent.tree=this.treeToEdit;
            }
            else{
              if(newId == null)
              {
                if(mapNewIdentificators.has(tree.parent)) { mapNewIdentificators.get(tree.parent).push(tree)  }
                else{
                  mapNewIdentificators.set(tree.parent,[tree])
                }
                currentParent=undefined;
              }
              else{
                currentParent= newParent;
              }
            }

          }
          else {
             currentParent=null;
             treeNodeObj.parent = null;
            }
          
          if (currentParent !== undefined)
          {
  
              if(tree.status === "pendingCreation" && currentParent!=null){
                treeNodeObj.parent= currentParent._links.self.href;
              }
              else if ( tree.status === "Modified" && currentParent!=null){
                treeNodeObj.parent= currentParent;
              }
              console.log(treeNodeObj)
  
              if(treeNodeObj._links)
              {
                treeNodeObj._links.cartography.href=treeNodeObj._links.cartography.href.split("{")[0];
                treeNodeObj._links.parent.href=treeNodeObj._links.parent.href.split("{")[0];
                treeNodeObj._links.treeNode.href=treeNodeObj._links.treeNode.href.split("{")[0];
                treeNodeObj.tree._links.allNodes.href=treeNodeObj.tree._links.allNodes.href.split("{")[0];
              }
        
              console.log(treeNodeObj)
              promises.push(new Promise((resolve, reject) => {
              this.treeNodeService.save(treeNodeObj).subscribe(
                async result => {
                  if(tree.nameTranslationsModified){
                    let translation = this.nameTranslations.get(tree.id);
                    translation.catalan= await this.utils.saveTranslation(result.id,translation.catalan);
                    translation.spanish= await this.utils.saveTranslation(result.id,translation.spanish);
                    translation.english = await this.utils.saveTranslation(result.id,translation.english);
                    translation.aranese = await this.utils.saveTranslation(result.id,translation.aranese);
                    translation.french = await this.utils.saveTranslation(result.id,translation.french);
                    this.nameTranslations.set(result.id,translation);
                    tree.nameTranslationModified = false;
                  }

                  if(tree.descriptionTranslationsModified){
                    let translation = this.descriptionTranslations.get(tree.id);
                    translation.catalan= await this.utils.saveTranslation(result.id,translation.catalan);
                    translation.spanish= await this.utils.saveTranslation(result.id,translation.spanish);
                    translation.english = await this.utils.saveTranslation(result.id,translation.english);
                    translation.aranese = await this.utils.saveTranslation(result.id,translation.aranese);
                    translation.french = await this.utils.saveTranslation(result.id,translation.french);
                    this.descriptionTranslations.set(result.id,translation);
                    tree.descriptionTranslationsModified= false;
                  }
                  let oldId=tree.id;
                  treesToUpdate.splice(i,1);
                  treesToUpdate.splice(0,0,result)
                  if(mapNewIdentificators.has(oldId))
                  {
                    this.updateAllTrees(mapNewIdentificators.get(oldId),depth++, mapNewIdentificators, promises, result.id,result)
                  }

                  resolve(true);
                },
                error => {
                  console.log(error);
                }
              )
            }));
            

		
          }


        }
        else {
          if(tree.id >= 0)
          {
              let idDeletedElement=tree.id;
              await this.treeNodeService.remove(treeNodeObj).toPromise();

          }
        }


      }


    };
    Promise.all(promises).then(() => {
        this.refreshTreeEvent.next(true);
    });
      
  }


  getSelectedRowsCartographies(data: any[] )
  {
    if( (data.length<=0 && this.treeNodeForm.value.cartography == null) && !this.currentNodeIsFolder)
     {
      const dialogRef = this.dialog.open(DialogMessageComponent);
      dialogRef.componentInstance.title=this.utils.getTranslate("Error");
      dialogRef.componentInstance.hideCancelButton = true;
      dialogRef.componentInstance.message=this.utils.getTranslate("cartographyNonSelectedMessage");
       dialogRef.afterClosed().subscribe();
     }
    else {
      if(this.treeNodeForm.value.cartography !== null && data.length<=0) {
        this.updateTreeLeft(null)
       }
      else {
        this.updateTreeLeft(data[0])
      }
    }

  }

  updateTreeLeft(cartography)
  {
    this.treeNodeForm.patchValue({
      cartography: cartography
    })
    if(cartography != null)
    {
      this.treeNodeForm.patchValue({
        cartographyName: cartography.name
      })
    }

    let newNameTranslation: NodeTranslation = null;
    let newDescriptionTranslation: NodeTranslation = null;

    if(this.treeNodeForm.value.nameTranslationsModified){
      newNameTranslation ={
        catalan: this.treeNodeForm.value.catalanNameTranslation,
        spanish: this.treeNodeForm.value.spanishNameTranslation,
        english: this.treeNodeForm.value.englishNameTranslation,
        aranese: this.treeNodeForm.value.araneseNameTranslation,
        french: this.treeNodeForm.value.frenchNameTranslation,
      }
    }

    if(this.treeNodeForm.value.descriptionTranslationsModified){
      newDescriptionTranslation ={
        catalan: this.treeNodeForm.value.catalanDescriptionTranslation,
        spanish: this.treeNodeForm.value.spanishDescriptionTranslation,
        english: this.treeNodeForm.value.englishDescriptionTranslation,
        aranese: this.treeNodeForm.value.araneseDescriptionTranslation,
        french: this.treeNodeForm.value.frenchDescriptionTranslation,
      }
    }
  
    if(this.newElement) {
      this.treeNodeForm.patchValue({
        id: this.idFictitiousCounter
      })
      console.log(this.treeNodeForm.value);
      if(newNameTranslation){ this.nameTranslations.set(this.idFictitiousCounter,newNameTranslation) }
      if(newDescriptionTranslation){ this.descriptionTranslations.set(this.idFictitiousCounter,newDescriptionTranslation) }
      
      this.idFictitiousCounter--;
      this.createNodeEvent.next(this.treeNodeForm.value);
    }
    else{ 
      if(newNameTranslation){ this.nameTranslations.set(this.treeNodeForm.value.id,newNameTranslation) }
      if(newDescriptionTranslation){ this.descriptionTranslations.set(this.treeNodeForm.value.id,newDescriptionTranslation) }
      this.updateNode() 
    }

    console.log(this.treeNodeForm.value);
    this.newElement=false;
    this.currentNodeIsFolder=undefined;
    this.treeNodeForm.reset();
  }
}

