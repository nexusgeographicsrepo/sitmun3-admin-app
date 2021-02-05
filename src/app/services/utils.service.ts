import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { HalOptions, HalParam, CodeListService  } from 'dist/sitmun-frontend-core/';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DialogMessageComponent } from 'dist/sitmun-frontend-gui/';
import { MatDialog } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  [x: string]: any;

  private subjectLoading: Subject<boolean> = new Subject();

  constructor(private translate: TranslateService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private location: Location,
    private codeListService:CodeListService) { }


  showMessage(message) {
    this.snackBar.open(this.translate.instant(message), '', {
      duration: 5000
    });

  }

  getTranslate(msg) {
    return this.translate.instant(msg);
  }

  showErrorMessage(error) {
    let missatge = "";
    try {
      missatge = this.translate.instant(error.error ? (error.error.error + '. ' + error.error.message) : error.message)
    }
    catch (e) {
      missatge = error.toString();
    }

    this.snackBar.open(missatge, '', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  /**
   * LOADING OBSERVABLE
   */
  enableLoading() {
    this.subjectLoading.next(true);
  }

  disableLoading() {
    this.subjectLoading.next(false);
  }

  getLoadingAsObservable() {
    return this.subjectLoading.asObservable();
  }

  /**
   * PRINT
   */
  print() {
    window.print();
  }

  /**
   * GO BACK
   */
  navigateBack() {
    this.location.back();
  }

  getCodeListValues(valueList){
    let params2:HalParam[]=[];
    let param:HalParam={key:'codeListName', value:valueList}
    params2.push(param);
    let query:HalOptions={ params:params2};

    return this.codeListService.getAll(query);
  }


  getDateFormated(data){
      return data.value ? (new Date(data.value)).toLocaleDateString() : ''
  }


  getDateFilterParams(){
    var filterParams = {
      comparator: function (filterLocalDateAtMidnight, cellValue) {
        var dateAsString = cellValue;
        if (dateAsString == null) return -1;
        var cellDate = new Date(cellValue);
        if (filterLocalDateAtMidnight.toLocaleDateString() === cellDate.toLocaleDateString()) {
          return 0;
        }
        if (cellDate < filterLocalDateAtMidnight) {
          return -1;
        }
        if (cellDate > filterLocalDateAtMidnight) {
          return 1;
        }
      },
      browserDatePicker: true,
      minValidYear: 2000,
    };

    return filterParams;
  }

  //Update grids

  updateUriList(requestURI: string, data: any[], eventRefresh? ) {

     this.http
          .put(requestURI
              , this.createUriList(data), {headers: new HttpHeaders({'Content-Type': 'text/uri-list', 'Charset': 'UTF-8'})}).subscribe(
                result => {
                  this.success= true
                  if(eventRefresh) {eventRefresh.next(true); }
                },
                error => {this.success= false}
              ) 

  }
  
  createUriList(data: any[]) {
    let putRequestLine = '';
    data.forEach(item => {    
      putRequestLine += `${item}`+'\n';       
    });
    console.log(putRequestLine);
    return putRequestLine;
  }

  showRequiredFieldsError(){
    const dialogRef = this.dialog.open(DialogMessageComponent);
    dialogRef.componentInstance.title = this.getTranslate("atention");
    dialogRef.componentInstance.message = this.getTranslate("requiredFieldMessage")
    dialogRef.componentInstance.hideCancelButton = true;
    dialogRef.afterClosed().subscribe();
  }

}
