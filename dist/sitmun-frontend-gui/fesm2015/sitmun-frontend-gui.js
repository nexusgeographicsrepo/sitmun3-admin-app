import { Component, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AngularHalModule, SitmunFrontendCoreModule } from '@sitmun/frontend-core';
import { AgGridModule } from '@ag-grid-community/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DataGridComponent {
    constructor() {
        this.modules = AllCommunityModules;
        this.statusColumn = false;
        this.map = new Map();
        this.modificationChange = false;
        this.remove = new EventEmitter();
        this.new = new EventEmitter();
        this.sendChanges = new EventEmitter();
        this.changeCounter = 0;
        this.previousChangeCounter = 0;
        this.redoCounter = 0;
        this.gridOptions = {
            defaultColDef: {
                sortable: true,
                flex: 1,
                filter: true,
                editable: true,
                cellStyle: { backgroundColor: '#FFFFFF' },
            },
            rowSelection: 'multiple',
        };
    }
    /**
     * @param {?} params
     * @return {?}
     */
    onGridReady(params) {
        this.params = params;
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.getElements();
        this.gridApi.sizeColumnsToFit();
        for (const col of this.columnDefs) {
            if (col.field === 'estat') {
                this.statusColumn = true;
            }
        }
    }
    /**
     * @return {?}
     */
    quickSearch() {
        this.gridApi.setQuickFilter(this.searchValue);
    }
    /**
     * @return {?}
     */
    getElements() {
        this.getAll()
            .subscribe((items) => {
            console.log(items);
            this.rowData = items;
            setTimeout(() => { this.gridApi.sizeColumnsToFit(); }, 30);
        });
    }
    /**
     * @return {?}
     */
    removeData() {
        this.gridApi.stopEditing(false);
        /** @type {?} */
        const selectedNodes = this.gridApi.getSelectedNodes();
        /** @type {?} */
        const selectedData = selectedNodes.map(node => node.data);
        this.remove.emit(selectedData);
        if (this.statusColumn) {
            /** @type {?} */
            const selectedRows = selectedNodes.map(node => node.rowIndex);
            for (const id of selectedRows) {
                this.gridApi.getRowNode(id).data.estat = 'Eliminat';
            }
            this.gridOptions.api.refreshCells();
        }
        this.gridOptions.api.deselectAll();
    }
    /**
     * @return {?}
     */
    newData() {
        this.gridApi.stopEditing(false);
        this.new.emit(-1);
    }
    /**
     * @return {?}
     */
    applyChanges() {
        /** @type {?} */
        const itemsChanged = [];
        this.gridApi.stopEditing(false);
        for (const key of this.map.keys()) {
            itemsChanged.push(this.gridApi.getRowNode(key).data);
        }
        this.sendChanges.emit(itemsChanged);
        this.map.clear();
        this.changeCounter = 0;
        this.previousChangeCounter = 0;
        this.redoCounter = 0;
        this.params.colDef.cellStyle = { backgroundColor: '#FFFFFF' };
        this.gridApi.redrawRows();
    }
    /**
     * @return {?}
     */
    deleteChanges() {
        for (let i = 0; i < this.changeCounter; i++) {
            this.gridApi.undoCellEditing();
        }
        this.map.clear();
        this.previousChangeCounter = 0;
        this.changeCounter = 0;
        this.redoCounter = 0;
        this.params.colDef.cellStyle = { backgroundColor: '#FFFFFF' };
        this.gridApi.redrawRows();
    }
    /**
     * @return {?}
     */
    onFilterModified() {
        this.deleteChanges();
    }
    /**
     * @return {?}
     */
    undo() {
        this.gridApi.stopEditing(false);
        this.gridApi.undoCellEditing();
        this.changeCounter -= 1;
        this.redoCounter += 1;
    }
    /**
     * @return {?}
     */
    redo() {
        this.gridApi.stopEditing(false);
        this.gridApi.redoCellEditing();
        this.changeCounter += 1;
        this.redoCounter -= 1;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onCellEditingStopped(e) {
        if (this.modificationChange) {
            this.changeCounter++;
            this.redoCounter = 0;
            this.onCellValueChanged(e);
            this.modificationChange = false;
        }
    }
    /**
     * @param {?} params
     * @return {?}
     */
    onCellValueChanged(params) {
        this.params = params; // Guardaremos los parametros por si hay que hacer un apply changes
        if (this.changeCounter > this.previousChangeCounter) {
            if (params.oldValue !== params.value && !(params.oldValue == null && params.value === '')) {
                if (!this.map.has(params.node.id)) {
                    this.map.set(params.node.id, 1);
                }
                else {
                    /** @type {?} */
                    const currentChanges = this.map.get(params.node.id);
                    this.map.set(params.node.id, (currentChanges + 1));
                }
                /** @type {?} */
                const row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex); // Com ha estado modificada la linia, la pintamos de verde
                params.colDef.cellStyle = { backgroundColor: '#E8F1DE' };
                this.gridApi.redrawRows({ rowNodes: [row] });
                params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Definiremos el cellStyle blanco para futuras modificaciones internas (ej: filtro)
                this.previousChangeCounter++;
            }
        }
        else if (this.changeCounter < this.previousChangeCounter) {
            /** @type {?} */
            const currentChanges = this.map.get(params.node.id);
            if (currentChanges === 1) {
                // Si solo tiene una modificacion, quiere decir que la cela está en su estado inicial, por lo que la pintamos de blanco
                this.map.delete(params.node.id);
                /** @type {?} */
                const row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex);
                params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Li posarem un altre cop el background blanc
                this.gridApi.redrawRows({ rowNodes: [row] });
            }
            else if (currentChanges > 1) {
                // No podemos hacer else por si hacemos un undo de una cela sin cambios
                this.map.set(params.node.id, (currentChanges - 1));
                /** @type {?} */
                const row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex); // Como aun tiene cambios, el background tiene que seguir verde
                params.colDef.cellStyle = { backgroundColor: '#E8F1DE' };
                this.gridApi.redrawRows({ rowNodes: [row] });
                params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Definirem el cellStyle blanc per proximes celes
            }
            this.previousChangeCounter--; // Com veniem d'undo, hem de decrementar el comptador de canvisAnterior
        }
        else {
            console.log(params);
            if (params.oldValue !== params.value && !(params.oldValue == null && params.value === '')) {
                this.modificationChange = true;
            }
            else {
                if (this.map.has(params.node.id)) {
                    /** @type {?} */
                    const row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex); // Com encara te modificacions, ha de tenir el background verd
                    params.colDef.cellStyle = { backgroundColor: '#E8F1DE' };
                    this.gridApi.redrawRows({ rowNodes: [row] });
                    params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Definiremos el cellStyle blanco para futuras modificaciones internas (ej: filtro)
                }
                else {
                    this.previousChangeCounter++; // Como al hacer undo volverá a entrar a esta misma función, hay que enviarlo a su if correspondiente
                    this.gridApi.undoCellEditing(); //Undo para deshacer el cambio sin modificaciones internamente
                }
            }
        }
    }
}
DataGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-data-grid',
                template: `    <div id=grup1 class="editDivBtns">
        <button  mat-mini-fab class="editBtn"  *ngIf="discardChangesButton"  id="borrarCanvis" type="button"  (click)="deleteChanges()" [disabled]="changeCounter <= 0">
            <mat-icon  fontSet="material-icons-round" > close </mat-icon>
        </button>
        <button mat-mini-fab class="editBtn" *ngIf="undoButton"  id="undo"  (click)="undo()" [disabled]="changeCounter <= 0" >
            <mat-icon fontSet="material-icons-round" > undo </mat-icon>
        </button>
        <button mat-mini-fab class="editBtn" *ngIf="redoButton"  id="redo"  (click)="redo()" [disabled]="redoCounter <= 0">
            <mat-icon fontSet="material-icons-round" > redo </mat-icon>
        </button>
        <button mat-mini-fab class="editBtn" *ngIf="applyChangesButton"  id="aplicarCanvis"  (click)="applyChanges()" [disabled]="changeCounter <= 0" >
            <mat-icon fontSet="material-icons-round" > check </mat-icon>
        </button>
    </div>

    <div id=grup2 class="actionsDivBtns" >
        <label *ngIf="globalSearch" [translate]="'Search'"> </label>
        <input *ngIf="globalSearch"type="text" class="searchGenericInput" placeholder="" (keyup)="quickSearch()" [(ngModel)]="searchValue" ml-2 >
        <button *ngIf="deleteButton"  mat-stroked-button id="botoElimina"  (click)="removeData()">
            <mat-icon fontSet="material-icons-round" > delete </mat-icon>
            <span  [translate]="'Remove'"> </span>
            
        </button>
        <button  *ngIf="newButton" mat-stroked-button id="botoNou"  (click)="newData()">
            <mat-icon fontSet="material-icons-round"> add_circle_outline </mat-icon>      
            <span  [translate]="'New'"> </span>           
        </button>


        
    </div>



    <div class="row" style=" height: 100%">
        <div class="ag-theme-alpine" id="myGrid" style=" width:100%; height: 100%" >
            <ag-grid-angular
            style=" width: 100%; height: 100%;"
            class="ag-theme-alpine"
            [floatingFilter]="true"
            [rowData]="rowData"
            [columnDefs]="columnDefs"
            [gridOptions]="gridOptions"
            [animateRows]="true"
            [pagination]="false"
            [modules]="modules"     
            [undoRedoCellEditing]="true"    
            [undoRedoCellEditingLimit]= 200
            [suppressRowClickSelection]=true
            [enableCellChangeFlash]=true
            [frameworkComponents]="frameworkComponents"
            rowSelection="multiple"
            (filterModified)="onFilterModified()"
            (cellEditingStopped) ="onCellEditingStopped($event)"
            (cellValueChanged)="onCellValueChanged($event)"
            (gridReady)="onGridReady($event)">
            
            </ag-grid-angular>
        </div>
    </div>


`,
                styles: [`input,label{display:inline-block;margin:5px 5px 5px 10px}#botoNou{color:#fff;background:no-repeat padding-box #68a225;margin-left:3px}#botoElimina{background:no-repeat padding-box #fff;margin-left:3px}#aplicarCanvis{color:#fff!important;background:no-repeat padding-box #68a225;margin-left:3px}#aplicarCanvis[disabled]{background:no-repeat padding-box #83976c}#redo,#undo{color:#fff!important;background:#ff9300;margin-left:3px}#redo[disabled],#undo[disabled]{background:#ffc97f;margin-left:3px}#borrarCanvis{color:#fff!important;background:#df3133}#borrarCanvis[disabled]{color:#fff!important;background:#da8c8e}.editDivBtns{text-align:start;width:20%;height:30px!important;line-height:30px!important}.actionsDivBtns{text-align:end;width:80%;height:60px}.actionsDivBtns,.editDivBtns{display:inline-block!important}.actionsDivBtns .mat-stroked-button{padding:5px 20px!important}.editDivBtns .mat-mini-fab .mat-button-wrapper{padding:inherit!important;display:inherit!important}.editDivBtns .mat-icon{height:30px!important;bottom:5px;position:relative}.editDivBtns .mat-mini-fab{width:30px;height:30px}.actionsDivBtns .searchGenericInput{height:45px!important;width:50%!important}`]
            },] },
];
/** @nocollapse */
DataGridComponent.ctorParameters = () => [];
DataGridComponent.propDecorators = {
    frameworkComponents: [{ type: Input }],
    columnDefs: [{ type: Input }],
    getAll: [{ type: Input }],
    discardChangesButton: [{ type: Input }],
    undoButton: [{ type: Input }],
    redoButton: [{ type: Input }],
    applyChangesButton: [{ type: Input }],
    deleteButton: [{ type: Input }],
    newButton: [{ type: Input }],
    globalSearch: [{ type: Input }],
    remove: [{ type: Output }],
    new: [{ type: Output }],
    sendChanges: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class BtnEditRenderedComponent {
    /**
     * @param {?} params
     * @return {?}
     */
    agInit(params) {
        this.params = params;
    }
    /**
     * @param {?} params
     * @return {?}
     */
    refresh(params) {
        return true;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    btnClickedHandler($event) {
        this.params.clicked(this.params.value);
    }
    /**
     * @return {?}
     */
    getParams() {
        return this.params;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // no need to remove the button click handler
    }
}
BtnEditRenderedComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-btn-edit-rendered',
                template: `<button mat-mini-fab class="buttonEdit"  type="button"  (click)="btnClickedHandler($event)" >
  <mat-icon class="iconEdit"   fontSet="material-icons-round" > edit </mat-icon>
</button> `,
                styles: [`.buttonEdit{color:#000;background-color:#ddd;width:24px;height:24px}.iconEdit{font-size:16px;margin-top:-8px}`]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * SITMUN plugin core module
 */
class SitmunFrontendGuiModule {
}
SitmunFrontendGuiModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    RouterModule,
                    HttpClientModule,
                    CommonModule,
                    FormsModule,
                    NoopAnimationsModule,
                    AngularHalModule,
                    ReactiveFormsModule,
                    BrowserAnimationsModule,
                    AgGridModule.withComponents([]),
                    SitmunFrontendCoreModule,
                    MatButtonModule,
                    MatIconModule,
                ],
                declarations: [
                    DataGridComponent,
                    BtnEditRenderedComponent,
                ],
                entryComponents: [],
                providers: [],
                exports: [
                    HttpClientModule,
                    CommonModule,
                    FormsModule,
                    NoopAnimationsModule,
                    AngularHalModule,
                    TranslateModule,
                    ReactiveFormsModule,
                    DataGridComponent,
                    SitmunFrontendCoreModule
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { DataGridComponent, SitmunFrontendGuiModule, BtnEditRenderedComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWd1aS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHNpdG11bi9mcm9udGVuZC1ndWkvZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL0BzaXRtdW4vZnJvbnRlbmQtZ3VpL2J0bi1lZGl0LXJlbmRlcmVkL2J0bi1lZGl0LXJlbmRlcmVkLmNvbXBvbmVudC50cyIsIm5nOi8vQHNpdG11bi9mcm9udGVuZC1ndWkvc2l0bXVuLWZyb250ZW5kLWd1aS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWdHcmlkTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nTW9kdWxlLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWxsQ29tbXVuaXR5TW9kdWxlcywgTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FsbC1tb2R1bGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWRhdGEtZ3JpZCcsXG4gIHRlbXBsYXRlOiBgICAgIDxkaXYgaWQ9Z3J1cDEgY2xhc3M9XCJlZGl0RGl2QnRuc1wiPlxyXG4gICAgICAgIDxidXR0b24gIG1hdC1taW5pLWZhYiBjbGFzcz1cImVkaXRCdG5cIiAgKm5nSWY9XCJkaXNjYXJkQ2hhbmdlc0J1dHRvblwiICBpZD1cImJvcnJhckNhbnZpc1wiIHR5cGU9XCJidXR0b25cIiAgKGNsaWNrKT1cImRlbGV0ZUNoYW5nZXMoKVwiIFtkaXNhYmxlZF09XCJjaGFuZ2VDb3VudGVyIDw9IDBcIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uICBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IGNsb3NlIDwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBtYXQtbWluaS1mYWIgY2xhc3M9XCJlZGl0QnRuXCIgKm5nSWY9XCJ1bmRvQnV0dG9uXCIgIGlkPVwidW5kb1wiICAoY2xpY2spPVwidW5kbygpXCIgW2Rpc2FibGVkXT1cImNoYW5nZUNvdW50ZXIgPD0gMFwiID5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gdW5kbyA8L21hdC1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gbWF0LW1pbmktZmFiIGNsYXNzPVwiZWRpdEJ0blwiICpuZ0lmPVwicmVkb0J1dHRvblwiICBpZD1cInJlZG9cIiAgKGNsaWNrKT1cInJlZG8oKVwiIFtkaXNhYmxlZF09XCJyZWRvQ291bnRlciA8PSAwXCI+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IHJlZG8gPC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIG1hdC1taW5pLWZhYiBjbGFzcz1cImVkaXRCdG5cIiAqbmdJZj1cImFwcGx5Q2hhbmdlc0J1dHRvblwiICBpZD1cImFwbGljYXJDYW52aXNcIiAgKGNsaWNrKT1cImFwcGx5Q2hhbmdlcygpXCIgW2Rpc2FibGVkXT1cImNoYW5nZUNvdW50ZXIgPD0gMFwiID5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gY2hlY2sgPC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgaWQ9Z3J1cDIgY2xhc3M9XCJhY3Rpb25zRGl2QnRuc1wiID5cclxuICAgICAgICA8bGFiZWwgKm5nSWY9XCJnbG9iYWxTZWFyY2hcIiBbdHJhbnNsYXRlXT1cIidTZWFyY2gnXCI+IDwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0ICpuZ0lmPVwiZ2xvYmFsU2VhcmNoXCJ0eXBlPVwidGV4dFwiIGNsYXNzPVwic2VhcmNoR2VuZXJpY0lucHV0XCIgcGxhY2Vob2xkZXI9XCJcIiAoa2V5dXApPVwicXVpY2tTZWFyY2goKVwiIFsobmdNb2RlbCldPVwic2VhcmNoVmFsdWVcIiBtbC0yID5cclxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiZGVsZXRlQnV0dG9uXCIgIG1hdC1zdHJva2VkLWJ1dHRvbiBpZD1cImJvdG9FbGltaW5hXCIgIChjbGljayk9XCJyZW1vdmVEYXRhKClcIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gZGVsZXRlIDwvbWF0LWljb24+XHJcbiAgICAgICAgICAgIDxzcGFuICBbdHJhbnNsYXRlXT1cIidSZW1vdmUnXCI+IDwvc3Bhbj5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiAgKm5nSWY9XCJuZXdCdXR0b25cIiBtYXQtc3Ryb2tlZC1idXR0b24gaWQ9XCJib3RvTm91XCIgIChjbGljayk9XCJuZXdEYXRhKClcIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiPiBhZGRfY2lyY2xlX291dGxpbmUgPC9tYXQtaWNvbj4gICAgICBcclxuICAgICAgICAgICAgPHNwYW4gIFt0cmFuc2xhdGVdPVwiJ05ldydcIj4gPC9zcGFuPiAgICAgICAgICAgXHJcbiAgICAgICAgPC9idXR0b24+XHJcblxyXG5cclxuICAgICAgICBcclxuICAgIDwvZGl2PlxyXG5cclxuXHJcblxyXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiIHN0eWxlPVwiIGhlaWdodDogMTAwJVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aGVtZS1hbHBpbmVcIiBpZD1cIm15R3JpZFwiIHN0eWxlPVwiIHdpZHRoOjEwMCU7IGhlaWdodDogMTAwJVwiID5cclxuICAgICAgICAgICAgPGFnLWdyaWQtYW5ndWxhclxyXG4gICAgICAgICAgICBzdHlsZT1cIiB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiXHJcbiAgICAgICAgICAgIGNsYXNzPVwiYWctdGhlbWUtYWxwaW5lXCJcclxuICAgICAgICAgICAgW2Zsb2F0aW5nRmlsdGVyXT1cInRydWVcIlxyXG4gICAgICAgICAgICBbcm93RGF0YV09XCJyb3dEYXRhXCJcclxuICAgICAgICAgICAgW2NvbHVtbkRlZnNdPVwiY29sdW1uRGVmc1wiXHJcbiAgICAgICAgICAgIFtncmlkT3B0aW9uc109XCJncmlkT3B0aW9uc1wiXHJcbiAgICAgICAgICAgIFthbmltYXRlUm93c109XCJ0cnVlXCJcclxuICAgICAgICAgICAgW3BhZ2luYXRpb25dPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICBbbW9kdWxlc109XCJtb2R1bGVzXCIgICAgIFxyXG4gICAgICAgICAgICBbdW5kb1JlZG9DZWxsRWRpdGluZ109XCJ0cnVlXCIgICAgXHJcbiAgICAgICAgICAgIFt1bmRvUmVkb0NlbGxFZGl0aW5nTGltaXRdPSAyMDBcclxuICAgICAgICAgICAgW3N1cHByZXNzUm93Q2xpY2tTZWxlY3Rpb25dPXRydWVcclxuICAgICAgICAgICAgW2VuYWJsZUNlbGxDaGFuZ2VGbGFzaF09dHJ1ZVxyXG4gICAgICAgICAgICBbZnJhbWV3b3JrQ29tcG9uZW50c109XCJmcmFtZXdvcmtDb21wb25lbnRzXCJcclxuICAgICAgICAgICAgcm93U2VsZWN0aW9uPVwibXVsdGlwbGVcIlxyXG4gICAgICAgICAgICAoZmlsdGVyTW9kaWZpZWQpPVwib25GaWx0ZXJNb2RpZmllZCgpXCJcclxuICAgICAgICAgICAgKGNlbGxFZGl0aW5nU3RvcHBlZCkgPVwib25DZWxsRWRpdGluZ1N0b3BwZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIChjZWxsVmFsdWVDaGFuZ2VkKT1cIm9uQ2VsbFZhbHVlQ2hhbmdlZCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgKGdyaWRSZWFkeSk9XCJvbkdyaWRSZWFkeSgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8L2FnLWdyaWQtYW5ndWxhcj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuXHJcbmAsXG4gIHN0eWxlczogW2BpbnB1dCxsYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46NXB4IDVweCA1cHggMTBweH0jYm90b05vdXtjb2xvcjojZmZmO2JhY2tncm91bmQ6bm8tcmVwZWF0IHBhZGRpbmctYm94ICM2OGEyMjU7bWFyZ2luLWxlZnQ6M3B4fSNib3RvRWxpbWluYXtiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjZmZmO21hcmdpbi1sZWZ0OjNweH0jYXBsaWNhckNhbnZpc3tjb2xvcjojZmZmIWltcG9ydGFudDtiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjNjhhMjI1O21hcmdpbi1sZWZ0OjNweH0jYXBsaWNhckNhbnZpc1tkaXNhYmxlZF17YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggIzgzOTc2Y30jcmVkbywjdW5kb3tjb2xvcjojZmZmIWltcG9ydGFudDtiYWNrZ3JvdW5kOiNmZjkzMDA7bWFyZ2luLWxlZnQ6M3B4fSNyZWRvW2Rpc2FibGVkXSwjdW5kb1tkaXNhYmxlZF17YmFja2dyb3VuZDojZmZjOTdmO21hcmdpbi1sZWZ0OjNweH0jYm9ycmFyQ2Fudmlze2NvbG9yOiNmZmYhaW1wb3J0YW50O2JhY2tncm91bmQ6I2RmMzEzM30jYm9ycmFyQ2FudmlzW2Rpc2FibGVkXXtjb2xvcjojZmZmIWltcG9ydGFudDtiYWNrZ3JvdW5kOiNkYThjOGV9LmVkaXREaXZCdG5ze3RleHQtYWxpZ246c3RhcnQ7d2lkdGg6MjAlO2hlaWdodDozMHB4IWltcG9ydGFudDtsaW5lLWhlaWdodDozMHB4IWltcG9ydGFudH0uYWN0aW9uc0RpdkJ0bnN7dGV4dC1hbGlnbjplbmQ7d2lkdGg6ODAlO2hlaWdodDo2MHB4fS5hY3Rpb25zRGl2QnRucywuZWRpdERpdkJ0bnN7ZGlzcGxheTppbmxpbmUtYmxvY2shaW1wb3J0YW50fS5hY3Rpb25zRGl2QnRucyAubWF0LXN0cm9rZWQtYnV0dG9ue3BhZGRpbmc6NXB4IDIwcHghaW1wb3J0YW50fS5lZGl0RGl2QnRucyAubWF0LW1pbmktZmFiIC5tYXQtYnV0dG9uLXdyYXBwZXJ7cGFkZGluZzppbmhlcml0IWltcG9ydGFudDtkaXNwbGF5OmluaGVyaXQhaW1wb3J0YW50fS5lZGl0RGl2QnRucyAubWF0LWljb257aGVpZ2h0OjMwcHghaW1wb3J0YW50O2JvdHRvbTo1cHg7cG9zaXRpb246cmVsYXRpdmV9LmVkaXREaXZCdG5zIC5tYXQtbWluaS1mYWJ7d2lkdGg6MzBweDtoZWlnaHQ6MzBweH0uYWN0aW9uc0RpdkJ0bnMgLnNlYXJjaEdlbmVyaWNJbnB1dHtoZWlnaHQ6NDVweCFpbXBvcnRhbnQ7d2lkdGg6NTAlIWltcG9ydGFudH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhR3JpZENvbXBvbmVudCB7XG4gXG5cblxuXG4gIG1vZHVsZXM6IE1vZHVsZVtdID0gQWxsQ29tbXVuaXR5TW9kdWxlcztcbiAgc2VhcmNoVmFsdWU6IHN0cmluZztcbiAgcHJpdmF0ZSBncmlkQXBpO1xuICBwcml2YXRlIGdyaWRDb2x1bW5BcGk7XG4gIHN0YXR1c0NvbHVtbiA9IGZhbHNlO1xuICBtYXA6IE1hcDxudW1iZXIsIG51bWJlcj4gPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpOyAvLyBHdWFyZGFyZW1vcyBlbCBpZCBkZSBsYXMgY2VsYXMgbW9kaWZpY2FkYXMgaSBlbCBuw4LCuiBkZSBlZGljaW9uZXMgaGVjaGFzIHNvYnJlIGVzdGFzXG4gIHByaXZhdGUgcGFyYW1zOyAvL1BhcmFtZXRyb3MgZGVsIGdyaWQgZW4gbGEgdWx0aW1hIG1vZGlmaWNhY2lvbiBoZWNoYSAocG9yIHNpIGhhY2Vtb3MgYXBwbHkgY2hhbmdlcylcbiAgcm93RGF0YTogYW55W107XG4gIGNoYW5nZUNvdW50ZXI6IG51bWJlcjsgLy8gTnVtZXJvIGRlIGVkaWNpb25lcyBoZWNoYXMgc29icmUgbGFzIGNlbGFzXG4gIHByZXZpb3VzQ2hhbmdlQ291bnRlcjogbnVtYmVyOyAvLyAgTnVtZXJvIGRlIGVkaWNpb25lcyBxdWUgaGFiaWEgYW50ZXMgZGUgaGFjZXIgbGEgdWx0aW1hIG1vZGlmaWNhY2lvbiAoY2hhbmdlQ291bnRlcilcbiAgcmVkb0NvdW50ZXI6IG51bWJlcjsgLy8gTnVtZXJvIGRlIHJlZG8gcXVlIHBvZGVtb3MgaGFjZXJcbiAgbW9kaWZpY2F0aW9uQ2hhbmdlID0gZmFsc2U7XG4gIGdyaWRPcHRpb25zO1xuICBASW5wdXQoKSBmcmFtZXdvcmtDb21wb25lbnRzOiBhbnk7XG4gIEBJbnB1dCgpIGNvbHVtbkRlZnM6IGFueVtdO1xuICBASW5wdXQoKSBnZXRBbGw6ICgpID0+IE9ic2VydmFibGU8YW55PjtcbiAgQElucHV0KCkgZGlzY2FyZENoYW5nZXNCdXR0b246IGJvb2xlYW47XG4gIEBJbnB1dCgpIHVuZG9CdXR0b246IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJlZG9CdXR0b246IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFwcGx5Q2hhbmdlc0J1dHRvbjogYm9vbGVhbjtcbiAgQElucHV0KCkgZGVsZXRlQnV0dG9uOiBib29sZWFuO1xuICBASW5wdXQoKSBuZXdCdXR0b246IGJvb2xlYW47XG4gIEBJbnB1dCgpIGdsb2JhbFNlYXJjaDogYm9vbGVhbjtcblxuXG5cbiAgQE91dHB1dCgpIHJlbW92ZTogRXZlbnRFbWl0dGVyPGFueVtdPjtcbiAgQE91dHB1dCgpIG5ldzogRXZlbnRFbWl0dGVyPG51bWJlcj47XG4gIEBPdXRwdXQoKSBzZW5kQ2hhbmdlczogRXZlbnRFbWl0dGVyPGFueVtdPjtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgdGhpcy5yZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5uZXcgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5zZW5kQ2hhbmdlcyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLmNoYW5nZUNvdW50ZXIgPSAwO1xuICAgIHRoaXMucHJldmlvdXNDaGFuZ2VDb3VudGVyID0gMDtcbiAgICB0aGlzLnJlZG9Db3VudGVyID0gMDtcbiAgICB0aGlzLmdyaWRPcHRpb25zID0ge1xuICAgICAgZGVmYXVsdENvbERlZjoge1xuICAgICAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgICAgICAgZmxleDogMSxcbiAgICAgICAgZmlsdGVyOiB0cnVlLFxuICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgY2VsbFN0eWxlOiB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9LFxuICAgICAgfSxcbiAgICAgIHJvd1NlbGVjdGlvbjogJ211bHRpcGxlJyxcbiAgICAgIC8vIHN1cHByZXNzSG9yaXpvbnRhbFNjcm9sbDogdHJ1ZSxcblxuICAgIH07XG5cbiAgfVxuXG5cblxuICBvbkdyaWRSZWFkeShwYXJhbXMpOiB2b2lke1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIHRoaXMuZ3JpZEFwaSA9IHBhcmFtcy5hcGk7XG4gICAgdGhpcy5ncmlkQ29sdW1uQXBpID0gcGFyYW1zLmNvbHVtbkFwaTtcbiAgICB0aGlzLmdldEVsZW1lbnRzKCk7XG4gICAgdGhpcy5ncmlkQXBpLnNpemVDb2x1bW5zVG9GaXQoKTtcbiAgICBmb3IgKGNvbnN0IGNvbCBvZiB0aGlzLmNvbHVtbkRlZnMpIHtcbiAgICAgIGlmIChjb2wuZmllbGQgPT09ICdlc3RhdCcpIHtcbiAgICAgICAgdGhpcy5zdGF0dXNDb2x1bW4gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiBcbiAgIFxuXG4gIH1cblxuICBxdWlja1NlYXJjaCgpOiB2b2lke1xuICAgICAgdGhpcy5ncmlkQXBpLnNldFF1aWNrRmlsdGVyKHRoaXMuc2VhcmNoVmFsdWUpO1xuICB9XG5cbiAgZ2V0RWxlbWVudHMoKTogdm9pZFxuICB7XG4gICAgdGhpcy5nZXRBbGwoKVxuICAgIC5zdWJzY3JpYmUoKGl0ZW1zKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW1zKTtcbiAgICAgICAgdGhpcy5yb3dEYXRhID0gaXRlbXM7XG4gICAgICAgIHNldFRpbWVvdXQoKCk9Pnt0aGlzLmdyaWRBcGkuc2l6ZUNvbHVtbnNUb0ZpdCgpfSwgMzApO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlRGF0YSgpOiB2b2lkIHtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIGNvbnN0IHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdyaWRBcGkuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgIGNvbnN0IHNlbGVjdGVkRGF0YSA9IHNlbGVjdGVkTm9kZXMubWFwKG5vZGUgPT4gbm9kZS5kYXRhKTtcbiAgICB0aGlzLnJlbW92ZS5lbWl0KHNlbGVjdGVkRGF0YSk7XG5cbiAgICBpZih0aGlzLnN0YXR1c0NvbHVtbilcbiAgICB7XG4gICAgICBjb25zdCBzZWxlY3RlZFJvd3MgPSBzZWxlY3RlZE5vZGVzLm1hcChub2RlID0+IG5vZGUucm93SW5kZXgpO1xuXG4gICAgICBmb3IgKGNvbnN0IGlkIG9mIHNlbGVjdGVkUm93cyl7XG4gICAgICAgICAgdGhpcy5ncmlkQXBpLmdldFJvd05vZGUoaWQpLmRhdGEuZXN0YXQgPSdFbGltaW5hdCc7XG4gICAgICAgIH1cbiAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuYXBpLnJlZnJlc2hDZWxscygpO1xuICAgIH1cbiAgICB0aGlzLmdyaWRPcHRpb25zLmFwaS5kZXNlbGVjdEFsbCgpO1xuICB9XG5cblxuXG5cblxuICBuZXdEYXRhKCk6IHZvaWRcbiAge1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgdGhpcy5uZXcuZW1pdCgtMSk7XG4gIH1cblxuICBhcHBseUNoYW5nZXMoKTogdm9pZFxuICB7XG4gICAgY29uc3QgaXRlbXNDaGFuZ2VkOiBhbnlbXSA9IFtdO1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5tYXAua2V5cygpKVxuICAgIHtcbiAgICAgIGl0ZW1zQ2hhbmdlZC5wdXNoKHRoaXMuZ3JpZEFwaS5nZXRSb3dOb2RlKGtleSkuZGF0YSk7XG4gICAgfVxuICAgIHRoaXMuc2VuZENoYW5nZXMuZW1pdChpdGVtc0NoYW5nZWQpO1xuICAgIHRoaXMubWFwLmNsZWFyKCk7XG4gICAgdGhpcy5jaGFuZ2VDb3VudGVyID0gMDtcbiAgICB0aGlzLnByZXZpb3VzQ2hhbmdlQ291bnRlciA9IDA7XG4gICAgdGhpcy5yZWRvQ291bnRlciA9IDA7XG4gICAgdGhpcy5wYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9ICB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9O1xuICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKCk7XG4gIH1cblxuXG5cbiAgZGVsZXRlQ2hhbmdlcygpOiB2b2lkXG4gIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hhbmdlQ291bnRlcjsgaSsrKVxuICAgIHtcbiAgICAgIHRoaXMuZ3JpZEFwaS51bmRvQ2VsbEVkaXRpbmcoKTtcbiAgICB9XG4gICAgdGhpcy5tYXAuY2xlYXIoKTtcbiAgICB0aGlzLnByZXZpb3VzQ2hhbmdlQ291bnRlciA9IDA7XG4gICAgdGhpcy5jaGFuZ2VDb3VudGVyID0gMDtcbiAgICB0aGlzLnJlZG9Db3VudGVyID0gMDtcbiAgICB0aGlzLnBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0gIHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307XG4gICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3MoKTtcbiAgfVxuXG5cbiAgb25GaWx0ZXJNb2RpZmllZCgpOiB2b2lke1xuICAgIHRoaXMuZGVsZXRlQ2hhbmdlcygpO1xuICB9XG5cblxuICB1bmRvKCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpO1xuICAgIHRoaXMuY2hhbmdlQ291bnRlciAtPSAxO1xuICAgIHRoaXMucmVkb0NvdW50ZXIgKz0gMTtcbiAgfVxuXG4gIHJlZG8oKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICB0aGlzLmdyaWRBcGkucmVkb0NlbGxFZGl0aW5nKCk7XG4gICAgdGhpcy5jaGFuZ2VDb3VudGVyICs9IDE7XG4gICAgdGhpcy5yZWRvQ291bnRlciAtPSAxO1xuICB9XG5cblxuICBvbkNlbGxFZGl0aW5nU3RvcHBlZChlKVxuICB7XG4gICAgICBpZiAodGhpcy5tb2RpZmljYXRpb25DaGFuZ2UpXG4gICAgICB7XG4gICAgICAgIHRoaXMuY2hhbmdlQ291bnRlcisrO1xuICAgICAgICB0aGlzLnJlZG9Db3VudGVyID0gMDtcbiAgICAgICAgdGhpcy5vbkNlbGxWYWx1ZUNoYW5nZWQoZSk7XG4gICAgICAgIHRoaXMubW9kaWZpY2F0aW9uQ2hhbmdlID0gZmFsc2U7XG4gICAgICB9XG4gIH1cblxuXG5cbiAgb25DZWxsVmFsdWVDaGFuZ2VkKHBhcmFtcyk6IHZvaWR7XG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7IC8vIEd1YXJkYXJlbW9zIGxvcyBwYXJhbWV0cm9zIHBvciBzaSBoYXkgcXVlIGhhY2VyIHVuIGFwcGx5IGNoYW5nZXNcblxuICAgIGlmICh0aGlzLmNoYW5nZUNvdW50ZXIgPiB0aGlzLnByZXZpb3VzQ2hhbmdlQ291bnRlcilcbiAgICAgIC8vIEVzdGEgY29uZGljacODwrNuIHNlcsODwqEgY2llcnRhIHNpIHZlbmltb3MgZGUgZWRpdGFyIGxhIGNlbGEgbyBkZSBoYWNlciB1biByZWRvXG4gICAgICB7XG4gICAgICAgIGlmIChwYXJhbXMub2xkVmFsdWUgIT09IHBhcmFtcy52YWx1ZSAmJiAhKHBhcmFtcy5vbGRWYWx1ZSA9PSBudWxsICYmIHBhcmFtcy52YWx1ZSA9PT0gJycpKVxuICAgICAgICB7XG4gICAgICAgICAgaWYgKCEgdGhpcy5tYXAuaGFzKHBhcmFtcy5ub2RlLmlkKSkgLy8gU2kgbm8gaGFiaWFtb3MgZWRpdGFkbyBsYSBjZWxhIGNvbiBhbnRlcmlvcmlkYWQsIGxhIGHDg8KxYWRpbW9zIGFsIG1hcCB5IGxhIHBpbnRhbW9zIGRlIHZlcmRlXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5tYXAuc2V0KHBhcmFtcy5ub2RlLmlkLCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAvLyBTaSB5YSBoYWLDg8KtYW1vcyBtb2RpZmljYWRvIGxhIGNlbGEsIGF1bWVudGFtb3MgZWwgbnVtZXJvIGRlIGNhbWJpb3MgZW4gZXN0YVxuICAgICAgICAgICAgY29uc3QgY3VycmVudENoYW5nZXMgPSB0aGlzLm1hcC5nZXQocGFyYW1zLm5vZGUuaWQpO1xuICAgICAgICAgICAgdGhpcy5tYXAuc2V0KHBhcmFtcy5ub2RlLmlkLCAoY3VycmVudENoYW5nZXMgKyAxKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7IC8vIENvbSBoYSBlc3RhZG8gbW9kaWZpY2FkYSBsYSBsaW5pYSwgbGEgcGludGFtb3MgZGUgdmVyZGVcbiAgICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRThGMURFJ307XG4gICAgICAgICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3Moe3Jvd05vZGVzOiBbcm93XX0pO1xuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTsgLy8gRGVmaW5pcmVtb3MgZWwgY2VsbFN0eWxlIGJsYW5jbyBwYXJhIGZ1dHVyYXMgbW9kaWZpY2FjaW9uZXMgaW50ZXJuYXMgKGVqOiBmaWx0cm8pXG4gICAgICAgICAgdGhpcy5wcmV2aW91c0NoYW5nZUNvdW50ZXIrKztcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5jaGFuZ2VDb3VudGVyIDwgdGhpcy5wcmV2aW91c0NoYW5nZUNvdW50ZXIpeyAvLyBFbnRyYXLDg8KhIGFxdcODwq0gc2kgaGVtb3MgaGVjaG8gdW4gdW5kb1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY3VycmVudENoYW5nZXMgPSB0aGlzLm1hcC5nZXQocGFyYW1zLm5vZGUuaWQpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGN1cnJlbnRDaGFuZ2VzID09PSAxKSB7XG4gICAgICAgICAgLy8gU2kgc29sbyB0aWVuZSB1bmEgbW9kaWZpY2FjaW9uLCBxdWllcmUgZGVjaXIgcXVlIGxhIGNlbGEgZXN0w4PCoSBlbiBzdSBlc3RhZG8gaW5pY2lhbCwgcG9yIGxvIHF1ZSBsYSBwaW50YW1vcyBkZSBibGFuY29cbiAgICAgICAgICB0aGlzLm1hcC5kZWxldGUocGFyYW1zLm5vZGUuaWQpO1xuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7XG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBMaSBwb3NhcmVtIHVuIGFsdHJlIGNvcCBlbCBiYWNrZ3JvdW5kIGJsYW5jXG4gICAgICAgICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3Moe3Jvd05vZGVzOiBbcm93XX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRDaGFuZ2VzID4xKSAvLyBMYSBjZWxhIGHDg8K6biBubyBlc3TDg8KhIGVuIHN1IGVzdGFkbyBpbmljaWFsLCBwb3IgbG8gcXVlIHNlZ2d1aXLDg8KhIHZlcmRlXG4gICAgICAgIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBObyBwb2RlbW9zIGhhY2VyIGVsc2UgcG9yIHNpIGhhY2Vtb3MgdW4gdW5kbyBkZSB1bmEgY2VsYSBzaW4gY2FtYmlvc1xuICAgICAgICAgIHRoaXMubWFwLnNldChwYXJhbXMubm9kZS5pZCwgKGN1cnJlbnRDaGFuZ2VzIC0gMSkpO1xuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7IC8vIENvbW8gYXVuIHRpZW5lIGNhbWJpb3MsIGVsIGJhY2tncm91bmQgdGllbmUgcXVlIHNlZ3VpciB2ZXJkZVxuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNFOEYxREUnfTtcbiAgICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBEZWZpbmlyZW0gZWwgY2VsbFN0eWxlIGJsYW5jIHBlciBwcm94aW1lcyBjZWxlc1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJldmlvdXNDaGFuZ2VDb3VudGVyLS07ICAvLyBDb20gdmVuaWVtIGQndW5kbywgaGVtIGRlIGRlY3JlbWVudGFyIGVsIGNvbXB0YWRvciBkZSBjYW52aXNBbnRlcmlvclxuICAgIH1cbiAgICBlbHNle1xuICAgICAgY29uc29sZS5sb2cocGFyYW1zKTtcbiAgICAgIGlmKHBhcmFtcy5vbGRWYWx1ZSAhPT0gcGFyYW1zLnZhbHVlICYmICEocGFyYW1zLm9sZFZhbHVlID09IG51bGwgJiYgcGFyYW1zLnZhbHVlID09PSAnJykgKVxuICAgICAge1xuICAgICAgICB0aGlzLm1vZGlmaWNhdGlvbkNoYW5nZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICBpZiAoIHRoaXMubWFwLmhhcyhwYXJhbXMubm9kZS5pZCkpXG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRBcGkuZ2V0RGlzcGxheWVkUm93QXRJbmRleChwYXJhbXMucm93SW5kZXgpOyAvLyBDb20gZW5jYXJhIHRlIG1vZGlmaWNhY2lvbnMsIGhhIGRlIHRlbmlyIGVsIGJhY2tncm91bmQgdmVyZFxuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNFOEYxREUnfTtcbiAgICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBEZWZpbmlyZW1vcyBlbCBjZWxsU3R5bGUgYmxhbmNvIHBhcmEgZnV0dXJhcyBtb2RpZmljYWNpb25lcyBpbnRlcm5hcyAoZWo6IGZpbHRybylcblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMucHJldmlvdXNDaGFuZ2VDb3VudGVyKys7IC8vIENvbW8gYWwgaGFjZXIgdW5kbyB2b2x2ZXLDg8KhIGEgZW50cmFyIGEgZXN0YSBtaXNtYSBmdW5jacODwrNuLCBoYXkgcXVlIGVudmlhcmxvIGEgc3UgaWYgY29ycmVzcG9uZGllbnRlXG4gICAgICAgICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpOyAvL1VuZG8gcGFyYSBkZXNoYWNlciBlbCBjYW1iaW8gc2luIG1vZGlmaWNhY2lvbmVzIGludGVybmFtZW50ZVxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgSUNlbGxSZW5kZXJlckFuZ3VsYXJDb21wIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWJ0bi1lZGl0LXJlbmRlcmVkJyxcbiAgdGVtcGxhdGU6IGA8YnV0dG9uIG1hdC1taW5pLWZhYiBjbGFzcz1cImJ1dHRvbkVkaXRcIiAgdHlwZT1cImJ1dHRvblwiICAoY2xpY2spPVwiYnRuQ2xpY2tlZEhhbmRsZXIoJGV2ZW50KVwiID5cbiAgPG1hdC1pY29uIGNsYXNzPVwiaWNvbkVkaXRcIiAgIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gZWRpdCA8L21hdC1pY29uPlxuPC9idXR0b24+IGAsXG4gIHN0eWxlczogW2AuYnV0dG9uRWRpdHtjb2xvcjojMDAwO2JhY2tncm91bmQtY29sb3I6I2RkZDt3aWR0aDoyNHB4O2hlaWdodDoyNHB4fS5pY29uRWRpdHtmb250LXNpemU6MTZweDttYXJnaW4tdG9wOi04cHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgQnRuRWRpdFJlbmRlcmVkQ29tcG9uZW50IGltcGxlbWVudHMgSUNlbGxSZW5kZXJlckFuZ3VsYXJDb21wLCBPbkRlc3Ryb3kge1xuXG4gIHB1YmxpYyBwYXJhbXM6IGFueTtcblxuICBhZ0luaXQocGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgfVxuXG4gIHJlZnJlc2gocGFyYW1zOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGJ0bkNsaWNrZWRIYW5kbGVyKCRldmVudCkge1xuICAgIHRoaXMucGFyYW1zLmNsaWNrZWQodGhpcy5wYXJhbXMudmFsdWUpO1xuICB9XG5cbiAgZ2V0UGFyYW1zKCl7XG4gICAgcmV0dXJuIHRoaXMucGFyYW1zO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgLy8gbm8gbmVlZCB0byByZW1vdmUgdGhlIGJ1dHRvbiBjbGljayBoYW5kbGVyIFxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlLCBIdHRwQ2xpZW50LCBIVFRQX0lOVEVSQ0VQVE9SU30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSwgTm9vcEFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUsIFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG4vL2ltcG9ydCAqIGFzIG9sIGZyb20gJ29wZW5sYXllcnMnO1xyXG5pbXBvcnQge1RyYW5zbGF0ZU1vZHVsZSwgVHJhbnNsYXRlTG9hZGVyLFRyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5cclxuXHJcbmltcG9ydCB7IEFuZ3VsYXJIYWxNb2R1bGUgfSBmcm9tICdAc2l0bXVuL2Zyb250ZW5kLWNvcmUnO1xyXG5cclxuXHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge1NpdG11bkZyb250ZW5kQ29yZU1vZHVsZX0gZnJvbSAnQHNpdG11bi9mcm9udGVuZC1jb3JlJztcclxuaW1wb3J0IHsgRGF0YUdyaWRDb21wb25lbnQgfSBmcm9tICcuL2RhdGEtZ3JpZC9kYXRhLWdyaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQWdHcmlkTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xyXG5pbXBvcnQge01hdEljb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xyXG5pbXBvcnQgeyBCdG5FZGl0UmVuZGVyZWRDb21wb25lbnQgfSBmcm9tICcuL2J0bi1lZGl0LXJlbmRlcmVkL2J0bi1lZGl0LXJlbmRlcmVkLmNvbXBvbmVudCc7XHJcblxyXG5cclxuXHJcblxyXG4vKiogU0lUTVVOIHBsdWdpbiBjb3JlIG1vZHVsZSAqL1xyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIFJvdXRlck1vZHVsZSxcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIE5vb3BBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQW5ndWxhckhhbE1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIEFnR3JpZE1vZHVsZS53aXRoQ29tcG9uZW50cyhbXSksXHJcbiAgICBTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIERhdGFHcmlkQ29tcG9uZW50LFxyXG4gICAgQnRuRWRpdFJlbmRlcmVkQ29tcG9uZW50LFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIE5vb3BBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQW5ndWxhckhhbE1vZHVsZSxcclxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBEYXRhR3JpZENvbXBvbmVudCxcclxuICAgIFNpdG11bkZyb250ZW5kQ29yZU1vZHVsZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNpdG11bkZyb250ZW5kR3VpTW9kdWxlIHtcclxufVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtJQTZHRTt1QkEvQm9CLG1CQUFtQjs0QkFJeEIsS0FBSzttQkFDTyxJQUFJLEdBQUcsRUFBa0I7a0NBTS9CLEtBQUs7UUFzQnhCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRztZQUNqQixhQUFhLEVBQUU7Z0JBQ2IsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsTUFBTSxFQUFFLElBQUk7Z0JBQ1osUUFBUSxFQUFFLElBQUk7Z0JBQ2QsU0FBUyxFQUFFLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQzthQUN4QztZQUNELFlBQVksRUFBRSxVQUFVO1NBR3pCLENBQUM7S0FFSDs7Ozs7SUFJRCxXQUFXLENBQUMsTUFBTTtRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJ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