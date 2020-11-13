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
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/material/button';
import * as ɵngcc2 from '@angular/material/icon';
import * as ɵngcc3 from '@angular/forms';
import * as ɵngcc4 from '@ag-grid-community/angular';
class DataGridComponent {
    constructor() {
        this.modules = AllCommunityModules;
        this.map = new Map();
        this.remove = new EventEmitter();
        this.new = new EventEmitter();
        this.sendChanges = new EventEmitter();
        this.comptadorCanvis = 0;
        this.comptadorCanvisAnterior = 0;
        this.comptadorRedo = 0;
        this.gridOptions = {
            defaultColDef: {
                flex: 1,
                filter: true,
                editable: true,
                minWidth: 100,
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
        this.gridApi.rowHeight = 100;
        this.getElements();
        this.gridApi.sizeColumnsToFit();
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
        console.log(selectedData);
        this.remove.emit(selectedData);
    }
    /**
     * @return {?}
     */
    newData() {
        console.log(this.comptadorCanvis);
        this.gridApi.stopEditing(false);
        this.new.emit(true);
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
        this.comptadorCanvis = 0;
        this.comptadorCanvisAnterior = 0;
        this.comptadorRedo = 0;
        this.params.colDef.cellStyle = { backgroundColor: '#FFFFFF' };
        this.gridApi.redrawRows();
    }
    /**
     * @return {?}
     */
    deleteChanges() {
        console.log(this.comptadorCanvis);
        for (let i = 0; i < this.comptadorCanvis; i++) {
            this.gridApi.undoCellEditing();
        }
        this.map.clear();
        this.comptadorCanvisAnterior = 0;
        this.comptadorCanvis = 0;
        this.comptadorRedo = 0;
        this.params.colDef.cellStyle = { backgroundColor: '#FFFFFF' };
        this.gridApi.redrawRows();
    }
    /**
     * @return {?}
     */
    undo() {
        this.gridApi.stopEditing(false);
        this.gridApi.undoCellEditing();
        this.comptadorCanvis -= 1;
        this.comptadorRedo += 1;
    }
    /**
     * @return {?}
     */
    redo() {
        this.gridApi.stopEditing(false);
        this.gridApi.redoCellEditing();
        this.comptadorCanvis += 1;
        this.comptadorRedo -= 1;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onCellEditingStopped(e) {
        this.comptadorCanvis++;
        this.comptadorRedo = 0;
        this.onCellValueChanged(e);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    onCellValueChanged(params) {
        this.params = params; // Guardarem els paramatres actuals per si hem de fer un apply changes
        if (this.comptadorCanvis > this.comptadorCanvisAnterior) {
            if (!this.map.has(params.node.id)) {
                this.map.set(params.node.id, 1);
            }
            else {
                /** @type {?} */
                const modificacionsActuals = this.map.get(params.node.id);
                this.map.set(params.node.id, (modificacionsActuals + 1));
            }
            /** @type {?} */
            const row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex); // Com ha estat modificada la linea, la pintarem de verd
            params.colDef.cellStyle = { backgroundColor: '#E8F1DE' };
            this.gridApi.redrawRows({ rowNodes: [row] });
            params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Definirem el cellStyle blanc per proximes celes
            this.comptadorCanvisAnterior++;
        }
        if (this.comptadorCanvis < this.comptadorCanvisAnterior) {
            /** @type {?} */
            const modificacionsActuals = this.map.get(params.node.id);
            if (modificacionsActuals === 1) {
                // Si només te una modificació, vol dir que amb l'undo hem deixat la cela com a l'estat inicial, pel que l'hem de borrar del map
                this.map.delete(params.node.id);
                /** @type {?} */
                const row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex);
                params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Li posarem un altre cop el background blanc
                this.gridApi.redrawRows({ rowNodes: [row] });
            }
            else {
                this.map.set(params.node.id, (modificacionsActuals - 1));
                /** @type {?} */
                const row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex); // Com encara te modificacions, ha de tenir el background verd
                params.colDef.cellStyle = { backgroundColor: '#E8F1DE' };
                this.gridApi.redrawRows({ rowNodes: [row] });
                params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Definirem el cellStyle blanc per proximes celes
            }
            this.comptadorCanvisAnterior--; // Com veniem d'undo, hem de decrementar el comptador de canvisAnterior
        }
    }
}
DataGridComponent.ɵfac = function DataGridComponent_Factory(t) { return new (t || DataGridComponent)(); };
DataGridComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: DataGridComponent, selectors: [["app-data-grid"]], inputs: { columnDefs: "columnDefs", getAll: "getAll" }, outputs: { remove: "remove", new: "new", sendChanges: "sendChanges" }, decls: 28, vars: 16, consts: [["id", "grup1"], ["mat-mini-fab", "", "id", "borrarCanvis", "type", "button", 3, "disabled", "click"], ["fontSet", "material-icons-round"], ["mat-mini-fab", "", "id", "undo", 3, "disabled", "click"], ["mat-mini-fab", "", "id", "redo", 3, "disabled", "click"], ["mat-mini-fab", "", "id", "aplicarCanvis", 3, "disabled", "click"], ["id", "grup2"], ["type", "text", "placeholder", "", "ml-2", "", 3, "ngModel", "keyup", "ngModelChange"], ["mat-stroked-button", "", "id", "botoElimina", 3, "click"], ["mat-stroked-button", "", "id", "botoNou", 3, "click"], [1, "row", 2, "height", "100%"], ["id", "myGrid", 1, "ag-theme-balham", 2, "width", "100%", "height", "100%"], ["rowSelection", "multiple", 1, "ag-theme-balham", 2, "width", "100%", "height", "100%", 3, "floatingFilter", "rowData", "columnDefs", "gridOptions", "animateRows", "pagination", "modules", "undoRedoCellEditing", "undoRedoCellEditingLimit", "suppressRowClickSelection", "enableCellChangeFlash", "cellEditingStopped", "cellValueChanged", "gridReady"]], template: function DataGridComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "button", 1);
        ɵngcc0.ɵɵlistener("click", function DataGridComponent_Template_button_click_1_listener() { return ctx.deleteChanges(); });
        ɵngcc0.ɵɵelementStart(2, "mat-icon", 2);
        ɵngcc0.ɵɵtext(3, " close ");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(4, "button", 3);
        ɵngcc0.ɵɵlistener("click", function DataGridComponent_Template_button_click_4_listener() { return ctx.undo(); });
        ɵngcc0.ɵɵelementStart(5, "mat-icon", 2);
        ɵngcc0.ɵɵtext(6, " undo ");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(7, "button", 4);
        ɵngcc0.ɵɵlistener("click", function DataGridComponent_Template_button_click_7_listener() { return ctx.redo(); });
        ɵngcc0.ɵɵelementStart(8, "mat-icon", 2);
        ɵngcc0.ɵɵtext(9, " redo ");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(10, "button", 5);
        ɵngcc0.ɵɵlistener("click", function DataGridComponent_Template_button_click_10_listener() { return ctx.applyChanges(); });
        ɵngcc0.ɵɵelementStart(11, "mat-icon", 2);
        ɵngcc0.ɵɵtext(12, " check ");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(13, "div", 6);
        ɵngcc0.ɵɵelementStart(14, "label");
        ɵngcc0.ɵɵtext(15, "Search ");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(16, "input", 7);
        ɵngcc0.ɵɵlistener("keyup", function DataGridComponent_Template_input_keyup_16_listener() { return ctx.quickSearch(); })("ngModelChange", function DataGridComponent_Template_input_ngModelChange_16_listener($event) { return ctx.searchValue = $event; });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(17, "button", 8);
        ɵngcc0.ɵɵlistener("click", function DataGridComponent_Template_button_click_17_listener() { return ctx.removeData(); });
        ɵngcc0.ɵɵelementStart(18, "mat-icon", 2);
        ɵngcc0.ɵɵtext(19, " delete ");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtext(20, " Elimina ");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(21, "button", 9);
        ɵngcc0.ɵɵlistener("click", function DataGridComponent_Template_button_click_21_listener() { return ctx.newData(); });
        ɵngcc0.ɵɵelementStart(22, "mat-icon", 2);
        ɵngcc0.ɵɵtext(23, " add_circle_outline ");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtext(24, " Nou ");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(25, "div", 10);
        ɵngcc0.ɵɵelementStart(26, "div", 11);
        ɵngcc0.ɵɵelementStart(27, "ag-grid-angular", 12);
        ɵngcc0.ɵɵlistener("cellEditingStopped", function DataGridComponent_Template_ag_grid_angular_cellEditingStopped_27_listener($event) { return ctx.onCellEditingStopped($event); })("cellValueChanged", function DataGridComponent_Template_ag_grid_angular_cellValueChanged_27_listener($event) { return ctx.onCellValueChanged($event); })("gridReady", function DataGridComponent_Template_ag_grid_angular_gridReady_27_listener($event) { return ctx.onGridReady($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("disabled", ctx.comptadorCanvis <= 0);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("disabled", ctx.comptadorCanvis <= 0);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("disabled", ctx.comptadorRedo <= 0);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("disabled", ctx.comptadorCanvis <= 0);
        ɵngcc0.ɵɵadvance(6);
        ɵngcc0.ɵɵproperty("ngModel", ctx.searchValue);
        ɵngcc0.ɵɵadvance(11);
        ɵngcc0.ɵɵproperty("floatingFilter", true)("rowData", ctx.rowData)("columnDefs", ctx.columnDefs)("gridOptions", ctx.gridOptions)("animateRows", true)("pagination", false)("modules", ctx.modules)("undoRedoCellEditing", true)("undoRedoCellEditingLimit", 200)("suppressRowClickSelection", true)("enableCellChangeFlash", true);
    } }, directives: [ɵngcc1.MatButton, ɵngcc2.MatIcon, ɵngcc3.DefaultValueAccessor, ɵngcc3.NgControlStatus, ɵngcc3.NgModel, ɵngcc4.AgGridAngular], styles: ["input[_ngcontent-%COMP%], label[_ngcontent-%COMP%]{display:inline-block;margin:5px 5px 5px 10px}#botoNou[_ngcontent-%COMP%]{color:#fff;background:no-repeat padding-box #68a225;margin-left:3px}#botoElimina[_ngcontent-%COMP%]{background:no-repeat padding-box #fff;margin-left:3px}#aplicarCanvis[_ngcontent-%COMP%]{background:no-repeat padding-box #68a225;margin-left:3px}#redo[_ngcontent-%COMP%], #undo[_ngcontent-%COMP%]{background:#ff9300;margin-left:3px}#borrarCanvis[_ngcontent-%COMP%]{background:#df3133}#grup1[_ngcontent-%COMP%]{text-align:start;width:40%}#grup2[_ngcontent-%COMP%]{text-align:end;width:60%}#grup1[_ngcontent-%COMP%], #grup2[_ngcontent-%COMP%]{display:inline-block}"] });
/** @nocollapse */
DataGridComponent.ctorParameters = () => [];
DataGridComponent.propDecorators = {
    columnDefs: [{ type: Input }],
    getAll: [{ type: Input }],
    remove: [{ type: Output }],
    new: [{ type: Output }],
    sendChanges: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DataGridComponent, [{
        type: Component,
        args: [{
                selector: 'app-data-grid',
                template: `
   <div id=grup1 >
    <button  mat-mini-fab  id="borrarCanvis" type="button"  (click)="deleteChanges()" [disabled]="comptadorCanvis <= 0">
        <mat-icon fontSet="material-icons-round" > close </mat-icon>
    </button>
    <button mat-mini-fab  id="undo"  (click)="undo()" [disabled]="comptadorCanvis <= 0" >
        <mat-icon fontSet="material-icons-round" > undo </mat-icon>
    </button>
    <button mat-mini-fab  id="redo"  (click)="redo()" [disabled]="comptadorRedo <= 0">
        <mat-icon fontSet="material-icons-round" > redo </mat-icon>
    </button>
    <button mat-mini-fab  id="aplicarCanvis"  (click)="applyChanges()" [disabled]="comptadorCanvis <= 0" >
        <mat-icon fontSet="material-icons-round" > check </mat-icon>
    </button>
</div>

<div id=grup2 >
    <label>Search </label>
    <input type="text" placeholder="" (keyup)="quickSearch()" [(ngModel)]="searchValue" ml-2 >
    <button mat-stroked-button id="botoElimina"  (click)="removeData()">
        <mat-icon fontSet="material-icons-round" > delete </mat-icon>
        Elimina
    </button>
    <button mat-stroked-button id="botoNou"  (click)="newData()">
        <mat-icon fontSet="material-icons-round"> add_circle_outline </mat-icon>                 
        Nou
    </button>


    
</div>



<div class="row" style=" height: 100%">
    <div class="ag-theme-balham" id="myGrid" style=" width:100%; height: 100%" >
        <ag-grid-angular
        style=" width: 100%; height: 100%;"
        class="ag-theme-balham"
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
        rowSelection="multiple"
        (cellEditingStopped) ="onCellEditingStopped($event)"
        (cellValueChanged)="onCellValueChanged($event)"
        (gridReady)="onGridReady($event)">
        
        </ag-grid-angular>
    </div>
</div>


`,
                styles: [`input,label{display:inline-block;margin:5px 5px 5px 10px}#botoNou{color:#fff;background:no-repeat padding-box #68a225;margin-left:3px}#botoElimina{background:no-repeat padding-box #fff;margin-left:3px}#aplicarCanvis{background:no-repeat padding-box #68a225;margin-left:3px}#redo,#undo{background:#ff9300;margin-left:3px}#borrarCanvis{background:#df3133}#grup1{text-align:start;width:40%}#grup2{text-align:end;width:60%}#grup1,#grup2{display:inline-block}`]
            }]
    }], function () { return []; }, { remove: [{
            type: Output
        }], new: [{
            type: Output
        }], sendChanges: [{
            type: Output
        }], columnDefs: [{
            type: Input
        }], getAll: [{
            type: Input
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * SITMUN plugin core module
 */
class SitmunFrontendGuiModule {
}
SitmunFrontendGuiModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: SitmunFrontendGuiModule });
SitmunFrontendGuiModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function SitmunFrontendGuiModule_Factory(t) { return new (t || SitmunFrontendGuiModule)(); }, providers: [], imports: [[
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
        ], HttpClientModule,
        CommonModule,
        FormsModule,
        NoopAnimationsModule,
        AngularHalModule,
        TranslateModule,
        ReactiveFormsModule,
        SitmunFrontendCoreModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(SitmunFrontendGuiModule, { declarations: function () { return [DataGridComponent]; }, imports: function () { return [RouterModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        NoopAnimationsModule,
        AngularHalModule,
        ReactiveFormsModule,
        BrowserAnimationsModule, ɵngcc4.AgGridModule, SitmunFrontendCoreModule,
        MatButtonModule,
        MatIconModule]; }, exports: function () { return [HttpClientModule,
        CommonModule,
        FormsModule,
        NoopAnimationsModule,
        AngularHalModule,
        TranslateModule,
        ReactiveFormsModule, DataGridComponent, SitmunFrontendCoreModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SitmunFrontendGuiModule, [{
        type: NgModule,
        args: [{
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
                    DataGridComponent
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
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { DataGridComponent, SitmunFrontendGuiModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWd1aS5qcyIsInNvdXJjZXMiOlsiQHNpdG11bi9mcm9udGVuZC1ndWkvZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWd1aS9zaXRtdW4tZnJvbnRlbmQtZ3VpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhCQTZGRTs0QkFsQm9CLG1CQUFtQjtnQkFJWixJQUFJLEdBQUcsRUFBa0IsVUFnQmxELElBQUksQ0FBQyxNQUFNLEdBQUc7R0FBSSxZQUFZLEVBQUUsQ0FBQyxTQUNqQyxJQUFJLENBQUMsR0FBRyxHQUFHO0FBQUksWUFBWSxFQUFFLENBQUMsU0FDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJO0tBQVksRUFBRSxDQUFDLFNBQ3RDLElBQUksQ0FBQyx0QkFsR1Q7V0FrR3dCLEdBQUcsQ0FBQyxDQUFDLGhCQWxHSCxJQTZGeEI7S0FNRSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDLHRDQUxyQyx1QkFuQnNCLG1CQUFtQjtHQXlCckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsMUJBeEIzQixtQkFHNkIsSUFBSSxHQUFHLEVBQWtCO0tBc0JsRCxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQ2pCLHRDQXZCa0QsUUFnQnBELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztTQU9sQixFQUFFLGtCQUNiLElBQUksRUFBRSxDQUFDLHBDQVBmLFFBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO2VBUTFCLE1BQU0sRUFBRSxJQUFJLGtCQUNaLDdDQVJSLFFBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO01BUTFCLEVBQUUsSUFBSSxrQkFDZCw5QkFSUixRQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO0lBUWIsRUFB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O29CQUNwQjtVQUFnQjtFQUNoQixtQkFBbUI7aUJBQ25CO2VBQXVCO0dBQ3ZCLFlBQVksQ0FBQztBQUFjLENBQUMsRUFBRSxDQUFDLHNCQUMvQjtpQkFBd0I7RUFDeEIsZUFBZSxzQkFDZjtPQUFhLG1CQUVkO01BQ0QsWUFBWSxFQUFFO2FBQ1o7R0FBaUIsa0JBQ2xCO1VBQ0Q7R0FBZSxFQUFFLEVBQ2hCO0lBQ0QsU0FBUyxFQUFFLEVBQ1Y7S0FDRCxPQUFPLEVBQUU7VUFDUDtDQUFnQixzQkFDaEI7TUFBWSxzQkFDWjtDQUFXLHNCQUNYLG9CQUFvQixzQkFDcEIsZ0JBQWdCLHNCQUNoQixlQUFlLHNCQUNmLG1CQUFtQixzQkFDbkIsaUJBQWlCLHNCQUNqQjtxQkFBd0I7YUFDekI7S0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBQ0s7QUFBQztBQUFDO0FBQUk7QUFFUDtBQUFrRTtBQUFJO0FBQUM7QUFBSTtBQUFrQztBQUFrRTtBQUFJO0FBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZ0dyaWRNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYW5ndWxhcic7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgTmdNb2R1bGUsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBbGxDb21tdW5pdHlNb2R1bGVzLCBNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYWxsLW1vZHVsZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtZGF0YS1ncmlkJyxcbiAgdGVtcGxhdGU6IGBcbiAgIDxkaXYgaWQ9Z3J1cDEgPlxuICAgIDxidXR0b24gIG1hdC1taW5pLWZhYiAgaWQ9XCJib3JyYXJDYW52aXNcIiB0eXBlPVwiYnV0dG9uXCIgIChjbGljayk9XCJkZWxldGVDaGFuZ2VzKClcIiBbZGlzYWJsZWRdPVwiY29tcHRhZG9yQ2FudmlzIDw9IDBcIj5cbiAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gY2xvc2UgPC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uIG1hdC1taW5pLWZhYiAgaWQ9XCJ1bmRvXCIgIChjbGljayk9XCJ1bmRvKClcIiBbZGlzYWJsZWRdPVwiY29tcHRhZG9yQ2FudmlzIDw9IDBcIiA+XG4gICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IHVuZG8gPC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uIG1hdC1taW5pLWZhYiAgaWQ9XCJyZWRvXCIgIChjbGljayk9XCJyZWRvKClcIiBbZGlzYWJsZWRdPVwiY29tcHRhZG9yUmVkbyA8PSAwXCI+XG4gICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IHJlZG8gPC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uIG1hdC1taW5pLWZhYiAgaWQ9XCJhcGxpY2FyQ2FudmlzXCIgIChjbGljayk9XCJhcHBseUNoYW5nZXMoKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JDYW52aXMgPD0gMFwiID5cbiAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gY2hlY2sgPC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbjwvZGl2PlxuXG48ZGl2IGlkPWdydXAyID5cbiAgICA8bGFiZWw+U2VhcmNoIDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJcIiAoa2V5dXApPVwicXVpY2tTZWFyY2goKVwiIFsobmdNb2RlbCldPVwic2VhcmNoVmFsdWVcIiBtbC0yID5cbiAgICA8YnV0dG9uIG1hdC1zdHJva2VkLWJ1dHRvbiBpZD1cImJvdG9FbGltaW5hXCIgIChjbGljayk9XCJyZW1vdmVEYXRhKClcIj5cbiAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gZGVsZXRlIDwvbWF0LWljb24+XG4gICAgICAgIEVsaW1pbmFcbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uIG1hdC1zdHJva2VkLWJ1dHRvbiBpZD1cImJvdG9Ob3VcIiAgKGNsaWNrKT1cIm5ld0RhdGEoKVwiPlxuICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCI+IGFkZF9jaXJjbGVfb3V0bGluZSA8L21hdC1pY29uPiAgICAgICAgICAgICAgICAgXG4gICAgICAgIE5vdVxuICAgIDwvYnV0dG9uPlxuXG5cbiAgICBcbjwvZGl2PlxuXG5cblxuPGRpdiBjbGFzcz1cInJvd1wiIHN0eWxlPVwiIGhlaWdodDogMTAwJVwiPlxuICAgIDxkaXYgY2xhc3M9XCJhZy10aGVtZS1iYWxoYW1cIiBpZD1cIm15R3JpZFwiIHN0eWxlPVwiIHdpZHRoOjEwMCU7IGhlaWdodDogMTAwJVwiID5cbiAgICAgICAgPGFnLWdyaWQtYW5ndWxhclxuICAgICAgICBzdHlsZT1cIiB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiXG4gICAgICAgIGNsYXNzPVwiYWctdGhlbWUtYmFsaGFtXCJcbiAgICAgICAgW2Zsb2F0aW5nRmlsdGVyXT1cInRydWVcIlxuICAgICAgICBbcm93RGF0YV09XCJyb3dEYXRhXCJcbiAgICAgICAgW2NvbHVtbkRlZnNdPVwiY29sdW1uRGVmc1wiXG4gICAgICAgIFtncmlkT3B0aW9uc109XCJncmlkT3B0aW9uc1wiXG4gICAgICAgIFthbmltYXRlUm93c109XCJ0cnVlXCJcbiAgICAgICAgW3BhZ2luYXRpb25dPVwiZmFsc2VcIlxuICAgICAgICBbbW9kdWxlc109XCJtb2R1bGVzXCIgICAgIFxuICAgICAgICBbdW5kb1JlZG9DZWxsRWRpdGluZ109XCJ0cnVlXCIgICAgXG4gICAgICAgIFt1bmRvUmVkb0NlbGxFZGl0aW5nTGltaXRdPSAyMDBcbiAgICAgICAgW3N1cHByZXNzUm93Q2xpY2tTZWxlY3Rpb25dPXRydWVcbiAgICAgICAgW2VuYWJsZUNlbGxDaGFuZ2VGbGFzaF09dHJ1ZVxuICAgICAgICByb3dTZWxlY3Rpb249XCJtdWx0aXBsZVwiXG4gICAgICAgIChjZWxsRWRpdGluZ1N0b3BwZWQpID1cIm9uQ2VsbEVkaXRpbmdTdG9wcGVkKCRldmVudClcIlxuICAgICAgICAoY2VsbFZhbHVlQ2hhbmdlZCk9XCJvbkNlbGxWYWx1ZUNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgIChncmlkUmVhZHkpPVwib25HcmlkUmVhZHkoJGV2ZW50KVwiPlxuICAgICAgICBcbiAgICAgICAgPC9hZy1ncmlkLWFuZ3VsYXI+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuXG5gLFxuICBzdHlsZXM6IFtgaW5wdXQsbGFiZWx7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luOjVweCA1cHggNXB4IDEwcHh9I2JvdG9Ob3V7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjNjhhMjI1O21hcmdpbi1sZWZ0OjNweH0jYm90b0VsaW1pbmF7YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggI2ZmZjttYXJnaW4tbGVmdDozcHh9I2FwbGljYXJDYW52aXN7YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggIzY4YTIyNTttYXJnaW4tbGVmdDozcHh9I3JlZG8sI3VuZG97YmFja2dyb3VuZDojZmY5MzAwO21hcmdpbi1sZWZ0OjNweH0jYm9ycmFyQ2Fudmlze2JhY2tncm91bmQ6I2RmMzEzM30jZ3J1cDF7dGV4dC1hbGlnbjpzdGFydDt3aWR0aDo0MCV9I2dydXAye3RleHQtYWxpZ246ZW5kO3dpZHRoOjYwJX0jZ3J1cDEsI2dydXAye2Rpc3BsYXk6aW5saW5lLWJsb2NrfWBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFHcmlkQ29tcG9uZW50IHtcbiBcblxuXG4gIG1vZHVsZXM6IE1vZHVsZVtdID0gQWxsQ29tbXVuaXR5TW9kdWxlcztcbiAgc2VhcmNoVmFsdWU6IHN0cmluZztcbiAgcHJpdmF0ZSBncmlkQXBpO1xuICBwcml2YXRlIGdyaWRDb2x1bW5BcGk7XG4gIG1hcDogTWFwPG51bWJlciwgbnVtYmVyPiA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCk7IC8vIEd1YXJkYXJlbSBsJ2lkIGRlIGxlcyBjZWxlcyBtb2RpZmljYWRlcyBpIGVsIG7DgsK6IGQnZWRpY2lvbnMgc29icmUgYXF1ZXN0ZXNcbiAgcHJpdmF0ZSBwYXJhbXM7IC8vIFBhcmFtcyBkZWwgZ3JpZCBhIGwnw4PCumx0aW1hIG1vZGlmaWNhY2lvIChwZXIgc2kgZmVtIGFwcGx5IGNoYW5nZXMpXG4gIHJvd0RhdGE6IGFueVtdO1xuICBjb21wdGFkb3JDYW52aXM6IG51bWJlcjsgLy8gTm9tYnJlIGQnZWRpY2lvbnMgZmV0ZXMgc29icmUgY2VsZXNcbiAgY29tcHRhZG9yQ2FudmlzQW50ZXJpb3I6IG51bWJlcjsgLy8gTm9tYnJlIGQnZWRpY2lvbnMgYW50ZXJpb3IgYSBsJ2FjdHVhbCAoY29tcHRhZG9yQ2FudmlzKVxuICBjb21wdGFkb3JSZWRvOiBudW1iZXI7IC8vIE5vbWJyZSBkZSByZWRvcyBxdWUgcG9kZW0gZmVyXG4gIGdyaWRPcHRpb25zO1xuICBASW5wdXQoKSBjb2x1bW5EZWZzOiBhbnlbXTtcbiAgQElucHV0KCkgZ2V0QWxsOiAoKSA9PiBPYnNlcnZhYmxlPGFueT47XG4gIEBPdXRwdXQoKSByZW1vdmU6IEV2ZW50RW1pdHRlcjxhbnlbXT47XG4gIEBPdXRwdXQoKSBuZXc6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcbiAgQE91dHB1dCgpIHNlbmRDaGFuZ2VzOiBFdmVudEVtaXR0ZXI8YW55W10+O1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB0aGlzLnJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLm5ldyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLnNlbmRDaGFuZ2VzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gPSAwO1xuICAgIHRoaXMuZ3JpZE9wdGlvbnMgPSB7XG4gICAgICBkZWZhdWx0Q29sRGVmOiB7XG4gICAgICAgIGZsZXg6IDEsXG4gICAgICAgIGZpbHRlcjogdHJ1ZSxcbiAgICAgICAgZWRpdGFibGU6IHRydWUsXG4gICAgICAgIG1pbldpZHRoOiAxMDAsXG4gICAgICAgIGNlbGxTdHlsZToge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfSxcbiAgICAgIH0sXG4gICAgICByb3dTZWxlY3Rpb246ICdtdWx0aXBsZScsXG5cbiAgICB9O1xuXG4gIH1cblxuXG5cbiAgb25HcmlkUmVhZHkocGFyYW1zKTogdm9pZHtcbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICB0aGlzLmdyaWRBcGkgPSBwYXJhbXMuYXBpO1xuICAgIHRoaXMuZ3JpZENvbHVtbkFwaSA9IHBhcmFtcy5jb2x1bW5BcGk7XG4gICAgdGhpcy5ncmlkQXBpLnJvd0hlaWdodCA9IDEwMDtcbiAgICB0aGlzLmdldEVsZW1lbnRzKCk7XG4gICAgdGhpcy5ncmlkQXBpLnNpemVDb2x1bW5zVG9GaXQoKTtcblxuXG4gIH1cblxuICBxdWlja1NlYXJjaCgpOiB2b2lke1xuICAgICAgdGhpcy5ncmlkQXBpLnNldFF1aWNrRmlsdGVyKHRoaXMuc2VhcmNoVmFsdWUpO1xuICB9XG5cbiAgZ2V0RWxlbWVudHMoKTogdm9pZFxuICB7XG4gICAgdGhpcy5nZXRBbGwoKVxuICAgIC5zdWJzY3JpYmUoKGl0ZW1zKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW1zKTtcbiAgICAgICAgdGhpcy5yb3dEYXRhID0gaXRlbXM7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVEYXRhKCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgY29uc3Qgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ3JpZEFwaS5nZXRTZWxlY3RlZE5vZGVzKCk7XG4gIFx0IGNvbnN0IHNlbGVjdGVkRGF0YSA9IHNlbGVjdGVkTm9kZXMubWFwKG5vZGUgPT4gbm9kZS5kYXRhKTtcbiAgICBjb25zb2xlLmxvZyhzZWxlY3RlZERhdGEpO1xuICAgIHRoaXMucmVtb3ZlLmVtaXQoc2VsZWN0ZWREYXRhKTtcbiAgfVxuXG4gIG5ld0RhdGEoKTogdm9pZFxuICB7XG4gICAgY29uc29sZS5sb2codGhpcy5jb21wdGFkb3JDYW52aXMpO1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgdGhpcy5uZXcuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIGFwcGx5Q2hhbmdlcygpOiB2b2lkXG4gIHtcbiAgICBjb25zdCBpdGVtc0NoYW5nZWQ6IGFueVtdID0gW107XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLm1hcC5rZXlzKCkpXG4gICAge1xuICAgICAgaXRlbXNDaGFuZ2VkLnB1c2godGhpcy5ncmlkQXBpLmdldFJvd05vZGUoa2V5KS5kYXRhKTtcbiAgICB9XG4gICAgdGhpcy5zZW5kQ2hhbmdlcy5lbWl0KGl0ZW1zQ2hhbmdlZCk7XG4gICAgdGhpcy5tYXAuY2xlYXIoKTtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcyA9IDA7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvciA9IDA7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvID0gMDtcbiAgICB0aGlzLnBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0gIHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307XG4gICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3MoKTtcbiAgfVxuXG5cblxuICBkZWxldGVDaGFuZ2VzKCk6IHZvaWRcbiAge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuY29tcHRhZG9yQ2FudmlzKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29tcHRhZG9yQ2FudmlzOyBpKyspXG4gICAge1xuICAgICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpO1xuICAgIH1cbiAgICB0aGlzLm1hcC5jbGVhcigpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gPSAwO1xuICAgIHRoaXMucGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSAge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTtcbiAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cygpO1xuICB9XG5cblxuXG4gIHVuZG8oKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICB0aGlzLmdyaWRBcGkudW5kb0NlbGxFZGl0aW5nKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgLT0gMTtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gKz0gMTtcbiAgfVxuXG4gIHJlZG8oKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICB0aGlzLmdyaWRBcGkucmVkb0NlbGxFZGl0aW5nKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgKz0gMTtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gLT0gMTtcbiAgfVxuXG5cbiAgb25DZWxsRWRpdGluZ1N0b3BwZWQoZSlcbiAge1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzKys7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvID0gMDtcbiAgICB0aGlzLm9uQ2VsbFZhbHVlQ2hhbmdlZChlKTtcbiAgfVxuXG5cblxuXG4gIG9uQ2VsbFZhbHVlQ2hhbmdlZChwYXJhbXMpOiB2b2lke1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zOyAvLyBHdWFyZGFyZW0gZWxzIHBhcmFtYXRyZXMgYWN0dWFscyBwZXIgc2kgaGVtIGRlIGZlciB1biBhcHBseSBjaGFuZ2VzXG5cbiAgICBpZiAodGhpcy5jb21wdGFkb3JDYW52aXMgPiB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yKVxuICAgICAgLy8gQXF1ZXN0YSBjb25kaWNpw4PCsyBzZXLDg8KgIGNlcnRhIHNpIHZlbmltIGQnZWRpdGFyIG8gZGUgZmVyIHVuIHJlZG8gKGNvbXB0YWRvciBjYW52aXMgPiksIHBlcsODwrIgbm8gc2kgdmVuaW0gZCd1biB1bmRvXG5cbiAgICAgIHtcbiAgICAgICAgaWYgKCEgdGhpcy5tYXAuaGFzKHBhcmFtcy5ub2RlLmlkKSkgLy8gU2kgbm8gaGVtIGVkaXRhdCBsYSBjZWxhIGFtYiBhbnRlcmlvcml0YXQsIGwnYWZlZ2lyZW0gYWwgbWFwIGkgY2FudmlhcmVtIGVsIGJhY2tncm91bmQgYSB2ZXJkXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLm1hcC5zZXQocGFyYW1zLm5vZGUuaWQsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgIC8vIFNpIGphIGVzdGF2YSBtb2RpZmljYWRhLCBpbmNyZW1lbnRhcmVtIGVsIG5vbWJyZSBkZSBjYW52aXMgZCdhcXVlc3RhIGNlbGEgYWwgbWFwXG4gICAgICAgICAgY29uc3QgbW9kaWZpY2FjaW9uc0FjdHVhbHMgPSB0aGlzLm1hcC5nZXQocGFyYW1zLm5vZGUuaWQpO1xuICAgICAgICAgIHRoaXMubWFwLnNldChwYXJhbXMubm9kZS5pZCwgKG1vZGlmaWNhY2lvbnNBY3R1YWxzICsgMSkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7IC8vIENvbSBoYSBlc3RhdCBtb2RpZmljYWRhIGxhIGxpbmVhLCBsYSBwaW50YXJlbSBkZSB2ZXJkXG4gICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNFOEYxREUnfTtcbiAgICAgICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3Moe3Jvd05vZGVzOiBbcm93XX0pO1xuICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307IC8vIERlZmluaXJlbSBlbCBjZWxsU3R5bGUgYmxhbmMgcGVyIHByb3hpbWVzIGNlbGVzXG4gICAgICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IrKztcblxuICAgICAgfVxuICAgIGlmICh0aGlzLmNvbXB0YWRvckNhbnZpcyA8IHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IpeyAvLyBFbnRyYXLDg8KgIGFxdcODwq0gc2kgdmVuaW0gZCd1biB1bmRvXG4gICAgICAgIC8vIENvbSBzYWJlbSBxdWUgamEgaGF2aWVtIGVkaXRhdCBsYSBjZWxhLCBhZ2FmZW0gZWwgbm9tYnJlIGRlIG1vZGlmaWNhY2lvbnMgcXVlIGwnaGVtIGZldFxuICAgICAgICBjb25zdCBtb2RpZmljYWNpb25zQWN0dWFscyA9IHRoaXMubWFwLmdldChwYXJhbXMubm9kZS5pZCk7XG5cbiAgICAgICAgaWYgKG1vZGlmaWNhY2lvbnNBY3R1YWxzID09PSAxKSB7XG4gICAgICAgICAgLy8gU2kgbm9tw4PCqXMgdGUgdW5hIG1vZGlmaWNhY2nDg8KzLCB2b2wgZGlyIHF1ZSBhbWIgbCd1bmRvIGhlbSBkZWl4YXQgbGEgY2VsYSBjb20gYSBsJ2VzdGF0IGluaWNpYWwsIHBlbCBxdWUgbCdoZW0gZGUgYm9ycmFyIGRlbCBtYXBcbiAgICAgICAgICB0aGlzLm1hcC5kZWxldGUocGFyYW1zLm5vZGUuaWQpO1xuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7XG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBMaSBwb3NhcmVtIHVuIGFsdHJlIGNvcCBlbCBiYWNrZ3JvdW5kIGJsYW5jXG4gICAgICAgICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3Moe3Jvd05vZGVzOiBbcm93XX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgLy8gTGEgY2VsYSBlbmNhcmEgbm8gZXN0w4PCoCBjb20gYSBsJ2VzdGF0IGluaWNpYWwsIHBlbCBxdWUgbm9tZXMgcmVzdGVtIGVsIG5vbWJyZSBkZSBtb2RpZmljYWNpb25zIGFsIG1hcFxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5tYXAuc2V0KHBhcmFtcy5ub2RlLmlkLCAobW9kaWZpY2FjaW9uc0FjdHVhbHMgLSAxKSk7XG4gICAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5ncmlkQXBpLmdldERpc3BsYXllZFJvd0F0SW5kZXgocGFyYW1zLnJvd0luZGV4KTsgLy8gQ29tIGVuY2FyYSB0ZSBtb2RpZmljYWNpb25zLCBoYSBkZSB0ZW5pciBlbCBiYWNrZ3JvdW5kIHZlcmRcbiAgICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRThGMURFJ307XG4gICAgICAgICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3Moe3Jvd05vZGVzOiBbcm93XX0pO1xuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTsgLy8gRGVmaW5pcmVtIGVsIGNlbGxTdHlsZSBibGFuYyBwZXIgcHJveGltZXMgY2VsZXNcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yLS07ICAvLyBDb20gdmVuaWVtIGQndW5kbywgaGVtIGRlIGRlY3JlbWVudGFyIGVsIGNvbXB0YWRvciBkZSBjYW52aXNBbnRlcmlvclxuICAgICAgfVxuICAgIH1cblxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZSwgSHR0cENsaWVudCwgSFRUUF9JTlRFUkNFUFRPUlN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsIE5vb3BBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlLCBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuLy9pbXBvcnQgKiBhcyBvbCBmcm9tICdvcGVubGF5ZXJzJztcclxuaW1wb3J0IHtUcmFuc2xhdGVNb2R1bGUsIFRyYW5zbGF0ZUxvYWRlcixUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuXHJcblxyXG5pbXBvcnQgeyBBbmd1bGFySGFsTW9kdWxlIH0gZnJvbSAnQHNpdG11bi9mcm9udGVuZC1jb3JlJztcclxuXHJcblxyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHtTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGV9IGZyb20gJ0BzaXRtdW4vZnJvbnRlbmQtY29yZSc7XHJcbmltcG9ydCB7IERhdGFHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRhLWdyaWQvZGF0YS1ncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFnR3JpZE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbmd1bGFyJztcclxuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcclxuaW1wb3J0IHtNYXRJY29uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcclxuXHJcblxyXG5cclxuXHJcbi8qKiBTSVRNVU4gcGx1Z2luIGNvcmUgbW9kdWxlICovXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgUm91dGVyTW9kdWxlLFxyXG4gICAgSHR0cENsaWVudE1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgTm9vcEFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICBBbmd1bGFySGFsTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQWdHcmlkTW9kdWxlLndpdGhDb21wb25lbnRzKFtdKSxcclxuICAgIFNpdG11bkZyb250ZW5kQ29yZU1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiBcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRGF0YUdyaWRDb21wb25lbnRcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBOb29wQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIEFuZ3VsYXJIYWxNb2R1bGUsXHJcbiAgICBUcmFuc2xhdGVNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgRGF0YUdyaWRDb21wb25lbnQsXHJcbiAgICBTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaXRtdW5Gcm9udGVuZEd1aU1vZHVsZSB7XHJcbn1cclxuIl19