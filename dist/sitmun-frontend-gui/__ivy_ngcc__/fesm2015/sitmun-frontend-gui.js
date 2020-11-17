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
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@ag-grid-community/angular';
import * as ɵngcc3 from '@angular/material/button';
import * as ɵngcc4 from '@angular/material/icon';
import * as ɵngcc5 from '@angular/forms';

function DataGridComponent_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 13);
    ɵngcc0.ɵɵlistener("click", function DataGridComponent_button_1_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r8 = ɵngcc0.ɵɵnextContext(); return ctx_r8.deleteChanges(); });
    ɵngcc0.ɵɵelementStart(1, "mat-icon", 14);
    ɵngcc0.ɵɵtext(2, " close ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("disabled", ctx_r0.comptadorCanvis <= 0);
} }
function DataGridComponent_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r11 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 15);
    ɵngcc0.ɵɵlistener("click", function DataGridComponent_button_2_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r11); const ctx_r10 = ɵngcc0.ɵɵnextContext(); return ctx_r10.undo(); });
    ɵngcc0.ɵɵelementStart(1, "mat-icon", 14);
    ɵngcc0.ɵɵtext(2, " undo ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("disabled", ctx_r1.comptadorCanvis <= 0);
} }
function DataGridComponent_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r13 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 16);
    ɵngcc0.ɵɵlistener("click", function DataGridComponent_button_3_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r13); const ctx_r12 = ɵngcc0.ɵɵnextContext(); return ctx_r12.redo(); });
    ɵngcc0.ɵɵelementStart(1, "mat-icon", 14);
    ɵngcc0.ɵɵtext(2, " redo ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("disabled", ctx_r2.comptadorRedo <= 0);
} }
function DataGridComponent_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r15 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 17);
    ɵngcc0.ɵɵlistener("click", function DataGridComponent_button_4_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r15); const ctx_r14 = ɵngcc0.ɵɵnextContext(); return ctx_r14.applyChanges(); });
    ɵngcc0.ɵɵelementStart(1, "mat-icon", 14);
    ɵngcc0.ɵɵtext(2, " check ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("disabled", ctx_r3.comptadorCanvis <= 0);
} }
function DataGridComponent_label_6_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "label");
    ɵngcc0.ɵɵtext(1, "Search ");
    ɵngcc0.ɵɵelementEnd();
} }
function DataGridComponent_input_7_Template(rf, ctx) { if (rf & 1) {
    const _r17 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "input", 18);
    ɵngcc0.ɵɵlistener("keyup", function DataGridComponent_input_7_Template_input_keyup_0_listener() { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r16 = ɵngcc0.ɵɵnextContext(); return ctx_r16.quickSearch(); })("ngModelChange", function DataGridComponent_input_7_Template_input_ngModelChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r18 = ɵngcc0.ɵɵnextContext(); return ctx_r18.searchValue = $event; });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngModel", ctx_r5.searchValue);
} }
function DataGridComponent_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r20 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 19);
    ɵngcc0.ɵɵlistener("click", function DataGridComponent_button_8_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r20); const ctx_r19 = ɵngcc0.ɵɵnextContext(); return ctx_r19.removeData(); });
    ɵngcc0.ɵɵelementStart(1, "mat-icon", 14);
    ɵngcc0.ɵɵtext(2, " delete ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtext(3, " Elimina ");
    ɵngcc0.ɵɵelementEnd();
} }
function DataGridComponent_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r22 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 20);
    ɵngcc0.ɵɵlistener("click", function DataGridComponent_button_9_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r22); const ctx_r21 = ɵngcc0.ɵɵnextContext(); return ctx_r21.newData(); });
    ɵngcc0.ɵɵelementStart(1, "mat-icon", 14);
    ɵngcc0.ɵɵtext(2, " add_circle_outline ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtext(3, " Nou ");
    ɵngcc0.ɵɵelementEnd();
} }
class DataGridComponent {
    constructor() {
        this.modules = AllCommunityModules;
        this.columnaEstat = false;
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
                this.columnaEstat = true;
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
        if (this.columnaEstat) {
            /** @type {?} */
            const selectedRows = selectedNodes.map(node => node.rowIndex);
            for (const id of selectedRows) {
                this.gridApi.getRowNode(id).data.estat = 'Eliminat';
            }
            this.gridOptions.api.refreshCells();
        }
    }
    /**
     * @return {?}
     */
    newData() {
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
    onFilterModified() {
        this.deleteChanges();
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
DataGridComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: DataGridComponent, selectors: [["app-data-grid"]], inputs: { columnDefs: "columnDefs", getAll: "getAll", botoDescartarCanvis: "botoDescartarCanvis", botoUndo: "botoUndo", botoRedo: "botoRedo", botoAplicarCanvis: "botoAplicarCanvis", botoElimina: "botoElimina", botoNou: "botoNou", searchGeneral: "searchGeneral" }, outputs: { remove: "remove", new: "new", sendChanges: "sendChanges" }, decls: 13, vars: 19, consts: [["id", "grup1"], ["mat-mini-fab", "", "id", "borrarCanvis", "type", "button", 3, "disabled", "click", 4, "ngIf"], ["mat-mini-fab", "", "id", "undo", 3, "disabled", "click", 4, "ngIf"], ["mat-mini-fab", "", "id", "redo", 3, "disabled", "click", 4, "ngIf"], ["mat-mini-fab", "", "id", "aplicarCanvis", 3, "disabled", "click", 4, "ngIf"], ["id", "grup2"], [4, "ngIf"], ["type", "text", "placeholder", "", "ml-2", "", 3, "ngModel", "keyup", "ngModelChange", 4, "ngIf"], ["mat-stroked-button", "", "id", "botoElimina", 3, "click", 4, "ngIf"], ["mat-stroked-button", "", "id", "botoNou", 3, "click", 4, "ngIf"], [1, "row", 2, "height", "100%"], ["id", "myGrid", 1, "ag-theme-balham", 2, "width", "100%", "height", "100%"], ["rowSelection", "multiple", 1, "ag-theme-balham", 2, "width", "100%", "height", "100%", 3, "floatingFilter", "rowData", "columnDefs", "gridOptions", "animateRows", "pagination", "modules", "undoRedoCellEditing", "undoRedoCellEditingLimit", "suppressRowClickSelection", "enableCellChangeFlash", "filterModified", "cellEditingStopped", "cellValueChanged", "gridReady"], ["mat-mini-fab", "", "id", "borrarCanvis", "type", "button", 3, "disabled", "click"], ["fontSet", "material-icons-round"], ["mat-mini-fab", "", "id", "undo", 3, "disabled", "click"], ["mat-mini-fab", "", "id", "redo", 3, "disabled", "click"], ["mat-mini-fab", "", "id", "aplicarCanvis", 3, "disabled", "click"], ["type", "text", "placeholder", "", "ml-2", "", 3, "ngModel", "keyup", "ngModelChange"], ["mat-stroked-button", "", "id", "botoElimina", 3, "click"], ["mat-stroked-button", "", "id", "botoNou", 3, "click"]], template: function DataGridComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵtemplate(1, DataGridComponent_button_1_Template, 3, 1, "button", 1);
        ɵngcc0.ɵɵtemplate(2, DataGridComponent_button_2_Template, 3, 1, "button", 2);
        ɵngcc0.ɵɵtemplate(3, DataGridComponent_button_3_Template, 3, 1, "button", 3);
        ɵngcc0.ɵɵtemplate(4, DataGridComponent_button_4_Template, 3, 1, "button", 4);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(5, "div", 5);
        ɵngcc0.ɵɵtemplate(6, DataGridComponent_label_6_Template, 2, 0, "label", 6);
        ɵngcc0.ɵɵtemplate(7, DataGridComponent_input_7_Template, 1, 1, "input", 7);
        ɵngcc0.ɵɵtemplate(8, DataGridComponent_button_8_Template, 4, 0, "button", 8);
        ɵngcc0.ɵɵtemplate(9, DataGridComponent_button_9_Template, 4, 0, "button", 9);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(10, "div", 10);
        ɵngcc0.ɵɵelementStart(11, "div", 11);
        ɵngcc0.ɵɵelementStart(12, "ag-grid-angular", 12);
        ɵngcc0.ɵɵlistener("filterModified", function DataGridComponent_Template_ag_grid_angular_filterModified_12_listener() { return ctx.onFilterModified(); })("cellEditingStopped", function DataGridComponent_Template_ag_grid_angular_cellEditingStopped_12_listener($event) { return ctx.onCellEditingStopped($event); })("cellValueChanged", function DataGridComponent_Template_ag_grid_angular_cellValueChanged_12_listener($event) { return ctx.onCellValueChanged($event); })("gridReady", function DataGridComponent_Template_ag_grid_angular_gridReady_12_listener($event) { return ctx.onGridReady($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.botoDescartarCanvis);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.botoUndo);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.botoRedo);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.botoAplicarCanvis);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngIf", ctx.searchGeneral);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.searchGeneral);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.botoElimina);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.botoNou);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("floatingFilter", true)("rowData", ctx.rowData)("columnDefs", ctx.columnDefs)("gridOptions", ctx.gridOptions)("animateRows", true)("pagination", false)("modules", ctx.modules)("undoRedoCellEditing", true)("undoRedoCellEditingLimit", 200)("suppressRowClickSelection", true)("enableCellChangeFlash", true);
    } }, directives: [ɵngcc1.NgIf, ɵngcc2.AgGridAngular, ɵngcc3.MatButton, ɵngcc4.MatIcon, ɵngcc5.DefaultValueAccessor, ɵngcc5.NgControlStatus, ɵngcc5.NgModel], styles: ["input[_ngcontent-%COMP%], label[_ngcontent-%COMP%]{display:inline-block;margin:5px 5px 5px 10px}#botoNou[_ngcontent-%COMP%]{color:#fff;background:no-repeat padding-box #68a225;margin-left:3px}#botoElimina[_ngcontent-%COMP%]{background:no-repeat padding-box #fff;margin-left:3px}#aplicarCanvis[_ngcontent-%COMP%]{background:no-repeat padding-box #68a225;margin-left:3px}#redo[_ngcontent-%COMP%], #undo[_ngcontent-%COMP%]{background:#ff9300;margin-left:3px}#redo[disabled][_ngcontent-%COMP%], #undo[disabled][_ngcontent-%COMP%]{background:#ffc97f;margin-left:3px}#borrarCanvis[_ngcontent-%COMP%]{background:#df3133}#grup1[_ngcontent-%COMP%]{text-align:start;width:40%}#grup2[_ngcontent-%COMP%]{text-align:end;width:60%}#grup1[_ngcontent-%COMP%], #grup2[_ngcontent-%COMP%]{display:inline-block}"] });
/** @nocollapse */
DataGridComponent.ctorParameters = () => [];
DataGridComponent.propDecorators = {
    columnDefs: [{ type: Input }],
    getAll: [{ type: Input }],
    botoDescartarCanvis: [{ type: Input }],
    botoUndo: [{ type: Input }],
    botoRedo: [{ type: Input }],
    botoAplicarCanvis: [{ type: Input }],
    botoElimina: [{ type: Input }],
    botoNou: [{ type: Input }],
    searchGeneral: [{ type: Input }],
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
        <button  mat-mini-fab *ngIf="botoDescartarCanvis"  id="borrarCanvis" type="button"  (click)="deleteChanges()" [disabled]="comptadorCanvis <= 0">
            <mat-icon fontSet="material-icons-round" > close </mat-icon>
        </button>
        <button mat-mini-fab *ngIf="botoUndo"  id="undo"  (click)="undo()" [disabled]="comptadorCanvis <= 0" >
            <mat-icon fontSet="material-icons-round" > undo </mat-icon>
        </button>
        <button mat-mini-fab *ngIf="botoRedo"  id="redo"  (click)="redo()" [disabled]="comptadorRedo <= 0">
            <mat-icon fontSet="material-icons-round" > redo </mat-icon>
        </button>
        <button mat-mini-fab  *ngIf="botoAplicarCanvis"  id="aplicarCanvis"  (click)="applyChanges()" [disabled]="comptadorCanvis <= 0" >
            <mat-icon fontSet="material-icons-round" > check </mat-icon>
        </button>
    </div>

    <div id=grup2 >
        <label *ngIf="searchGeneral" >Search </label>
        <input *ngIf="searchGeneral"type="text" placeholder="" (keyup)="quickSearch()" [(ngModel)]="searchValue" ml-2 >
        <button *ngIf="botoElimina"  mat-stroked-button id="botoElimina"  (click)="removeData()">
            <mat-icon fontSet="material-icons-round" > delete </mat-icon>
            Elimina
        </button>
        <button  *ngIf="botoNou" mat-stroked-button id="botoNou"  (click)="newData()">
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
            (filterModified)="onFilterModified()"
            (cellEditingStopped) ="onCellEditingStopped($event)"
            (cellValueChanged)="onCellValueChanged($event)"
            (gridReady)="onGridReady($event)">
            
            </ag-grid-angular>
        </div>
    </div>


`,
                styles: [`input,label{display:inline-block;margin:5px 5px 5px 10px}#botoNou{color:#fff;background:no-repeat padding-box #68a225;margin-left:3px}#botoElimina{background:no-repeat padding-box #fff;margin-left:3px}#aplicarCanvis{background:no-repeat padding-box #68a225;margin-left:3px}#redo,#undo{background:#ff9300;margin-left:3px}#redo[disabled],#undo[disabled]{background:#ffc97f;margin-left:3px}#borrarCanvis{background:#df3133}#grup1{text-align:start;width:40%}#grup2{text-align:end;width:60%}#grup1,#grup2{display:inline-block}`]
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
        }], botoDescartarCanvis: [{
            type: Input
        }], botoUndo: [{
            type: Input
        }], botoRedo: [{
            type: Input
        }], botoAplicarCanvis: [{
            type: Input
        }], botoElimina: [{
            type: Input
        }], botoNou: [{
            type: Input
        }], searchGeneral: [{
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
        BrowserAnimationsModule, ɵngcc2.AgGridModule, SitmunFrontendCoreModule,
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWd1aS5qcyIsInNvdXJjZXMiOlsiQHNpdG11bi9mcm9udGVuZC1ndWkvZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWd1aS9zaXRtdW4tZnJvbnRlbmQtZ3VpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhCQTRHRTs0QkE3Qm9CO0lBQW1CLDhCQUl4QixLQUFLO01BQ08sSUFBSSxHQUFHLEVBQWtCLFVBMEJsRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUk7R0FBWSxFQUFFLENBQUMsU0FDakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUU7QUFBQztRQUN0QyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxTQUN6QixJQUFJLENBQUM7QUFBdUIsR0FBRyxDQUFDLENBQUMsU0FDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7R0FDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUNqQjtLQUFhLEVBQUUsa0JBQ2IsSUFBSSxFQUFFLENBQUMsa0JBQ1AsTUFBTSxFQUFFLElBQUksa0JBQ1osUUFBUSxFQUFFLElBQUksa0JBQ2QsU0FBUyxFQUFFLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxlQUN4QyxjQUNELFlBQVksRUFBRTtDQUFVLFdBR3pCLENBQUMsTUFFSDs7S0FJRCxXQUFXLENBQUMsTUFBTTtRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHO0NBQU0sQ0FBQyxTQUNyQixJQUFJO0FBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FDMUIsSUFBSSxDQUFDO0tBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQ3RDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUNuQjtFQUFJLENBQUM7TUFB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Q2hCLFlBQVksc0JBQ1osV0FBVyxzQkFDWCxvQkFBb0I7b0JBQ3BCO1VBQWdCO0VBQ2hCLG1CQUFtQjtpQkFDbkI7ZUFBdUI7R0FDdkIsWUFBWSxDQUFDO0FBQWMsQ0FBQyxFQUFFLENBQUMsc0JBQy9CO2lCQUF3QjtFQUN4QixlQUFlLHNCQUNmO09BQWEsbUJBRWQ7TUFDRCxZQUFZLEVBQUU7YUFDWjtHQUFpQixrQkFDbEI7VUFDRDtHQUFlLEVBQUUsRUFDaEI7SUFDRCxTQUFTLEVBQUUsRUFDVjtLQUNELE9BQU8sRUFBRTtVQUNQO0NBQWdCLHNCQUNoQjtNQUFZLHNCQUNaO0NBQVcsc0JBQ1gsb0JBQW9CLHNCQUNwQixnQkFBZ0Isc0JBQ2hCLGVBQWUsc0JBQ2YsbUJBQW1CLHNCQUNuQixpQkFBaUIsc0JBQ2pCO3FCQUF3QjthQUN6QjtLQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFDSztBQUFDO0FBQUM7QUFBSTtBQUVQO0FBQWtFO0FBQUk7QUFBQztBQUFJO0FBQWtDO0FBQWtFO0FBQUk7QUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFnR3JpZE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbmd1bGFyJztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ01vZHVsZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFsbENvbW11bml0eU1vZHVsZXMsIE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbGwtbW9kdWxlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1kYXRhLWdyaWQnLFxuICB0ZW1wbGF0ZTogYFxuXG5cbiAgICA8ZGl2IGlkPWdydXAxID5cbiAgICAgICAgPGJ1dHRvbiAgbWF0LW1pbmktZmFiICpuZ0lmPVwiYm90b0Rlc2NhcnRhckNhbnZpc1wiICBpZD1cImJvcnJhckNhbnZpc1wiIHR5cGU9XCJidXR0b25cIiAgKGNsaWNrKT1cImRlbGV0ZUNoYW5nZXMoKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JDYW52aXMgPD0gMFwiPlxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gY2xvc2UgPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbWF0LW1pbmktZmFiICpuZ0lmPVwiYm90b1VuZG9cIiAgaWQ9XCJ1bmRvXCIgIChjbGljayk9XCJ1bmRvKClcIiBbZGlzYWJsZWRdPVwiY29tcHRhZG9yQ2FudmlzIDw9IDBcIiA+XG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiB1bmRvIDwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG1hdC1taW5pLWZhYiAqbmdJZj1cImJvdG9SZWRvXCIgIGlkPVwicmVkb1wiICAoY2xpY2spPVwicmVkbygpXCIgW2Rpc2FibGVkXT1cImNvbXB0YWRvclJlZG8gPD0gMFwiPlxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gcmVkbyA8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtbWluaS1mYWIgICpuZ0lmPVwiYm90b0FwbGljYXJDYW52aXNcIiAgaWQ9XCJhcGxpY2FyQ2FudmlzXCIgIChjbGljayk9XCJhcHBseUNoYW5nZXMoKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JDYW52aXMgPD0gMFwiID5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IGNoZWNrIDwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBpZD1ncnVwMiA+XG4gICAgICAgIDxsYWJlbCAqbmdJZj1cInNlYXJjaEdlbmVyYWxcIiA+U2VhcmNoIDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCAqbmdJZj1cInNlYXJjaEdlbmVyYWxcInR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJcIiAoa2V5dXApPVwicXVpY2tTZWFyY2goKVwiIFsobmdNb2RlbCldPVwic2VhcmNoVmFsdWVcIiBtbC0yID5cbiAgICAgICAgPGJ1dHRvbiAqbmdJZj1cImJvdG9FbGltaW5hXCIgIG1hdC1zdHJva2VkLWJ1dHRvbiBpZD1cImJvdG9FbGltaW5hXCIgIChjbGljayk9XCJyZW1vdmVEYXRhKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IGRlbGV0ZSA8L21hdC1pY29uPlxuICAgICAgICAgICAgRWxpbWluYVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiAgKm5nSWY9XCJib3RvTm91XCIgbWF0LXN0cm9rZWQtYnV0dG9uIGlkPVwiYm90b05vdVwiICAoY2xpY2spPVwibmV3RGF0YSgpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCI+IGFkZF9jaXJjbGVfb3V0bGluZSA8L21hdC1pY29uPiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBOb3VcbiAgICAgICAgPC9idXR0b24+XG5cblxuICAgICAgICBcbiAgICA8L2Rpdj5cblxuXG5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCIgc3R5bGU9XCIgaGVpZ2h0OiAxMDAlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aGVtZS1iYWxoYW1cIiBpZD1cIm15R3JpZFwiIHN0eWxlPVwiIHdpZHRoOjEwMCU7IGhlaWdodDogMTAwJVwiID5cbiAgICAgICAgICAgIDxhZy1ncmlkLWFuZ3VsYXJcbiAgICAgICAgICAgIHN0eWxlPVwiIHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCJcbiAgICAgICAgICAgIGNsYXNzPVwiYWctdGhlbWUtYmFsaGFtXCJcbiAgICAgICAgICAgIFtmbG9hdGluZ0ZpbHRlcl09XCJ0cnVlXCJcbiAgICAgICAgICAgIFtyb3dEYXRhXT1cInJvd0RhdGFcIlxuICAgICAgICAgICAgW2NvbHVtbkRlZnNdPVwiY29sdW1uRGVmc1wiXG4gICAgICAgICAgICBbZ3JpZE9wdGlvbnNdPVwiZ3JpZE9wdGlvbnNcIlxuICAgICAgICAgICAgW2FuaW1hdGVSb3dzXT1cInRydWVcIlxuICAgICAgICAgICAgW3BhZ2luYXRpb25dPVwiZmFsc2VcIlxuICAgICAgICAgICAgW21vZHVsZXNdPVwibW9kdWxlc1wiICAgICBcbiAgICAgICAgICAgIFt1bmRvUmVkb0NlbGxFZGl0aW5nXT1cInRydWVcIiAgICBcbiAgICAgICAgICAgIFt1bmRvUmVkb0NlbGxFZGl0aW5nTGltaXRdPSAyMDBcbiAgICAgICAgICAgIFtzdXBwcmVzc1Jvd0NsaWNrU2VsZWN0aW9uXT10cnVlXG4gICAgICAgICAgICBbZW5hYmxlQ2VsbENoYW5nZUZsYXNoXT10cnVlXG4gICAgICAgICAgICByb3dTZWxlY3Rpb249XCJtdWx0aXBsZVwiXG4gICAgICAgICAgICAoZmlsdGVyTW9kaWZpZWQpPVwib25GaWx0ZXJNb2RpZmllZCgpXCJcbiAgICAgICAgICAgIChjZWxsRWRpdGluZ1N0b3BwZWQpID1cIm9uQ2VsbEVkaXRpbmdTdG9wcGVkKCRldmVudClcIlxuICAgICAgICAgICAgKGNlbGxWYWx1ZUNoYW5nZWQpPVwib25DZWxsVmFsdWVDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAgICAgKGdyaWRSZWFkeSk9XCJvbkdyaWRSZWFkeSgkZXZlbnQpXCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDwvYWctZ3JpZC1hbmd1bGFyPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuXG5gLFxuICBzdHlsZXM6IFtgaW5wdXQsbGFiZWx7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luOjVweCA1cHggNXB4IDEwcHh9I2JvdG9Ob3V7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjNjhhMjI1O21hcmdpbi1sZWZ0OjNweH0jYm90b0VsaW1pbmF7YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggI2ZmZjttYXJnaW4tbGVmdDozcHh9I2FwbGljYXJDYW52aXN7YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggIzY4YTIyNTttYXJnaW4tbGVmdDozcHh9I3JlZG8sI3VuZG97YmFja2dyb3VuZDojZmY5MzAwO21hcmdpbi1sZWZ0OjNweH0jcmVkb1tkaXNhYmxlZF0sI3VuZG9bZGlzYWJsZWRde2JhY2tncm91bmQ6I2ZmYzk3ZjttYXJnaW4tbGVmdDozcHh9I2JvcnJhckNhbnZpc3tiYWNrZ3JvdW5kOiNkZjMxMzN9I2dydXAxe3RleHQtYWxpZ246c3RhcnQ7d2lkdGg6NDAlfSNncnVwMnt0ZXh0LWFsaWduOmVuZDt3aWR0aDo2MCV9I2dydXAxLCNncnVwMntkaXNwbGF5OmlubGluZS1ibG9ja31gXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhR3JpZENvbXBvbmVudCB7XG4gXG5cblxuXG4gIG1vZHVsZXM6IE1vZHVsZVtdID0gQWxsQ29tbXVuaXR5TW9kdWxlcztcbiAgc2VhcmNoVmFsdWU6IHN0cmluZztcbiAgcHJpdmF0ZSBncmlkQXBpO1xuICBwcml2YXRlIGdyaWRDb2x1bW5BcGk7XG4gIGNvbHVtbmFFc3RhdCA9IGZhbHNlO1xuICBtYXA6IE1hcDxudW1iZXIsIG51bWJlcj4gPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpOyAvLyBHdWFyZGFyZW0gbCdpZCBkZSBsZXMgY2VsZXMgbW9kaWZpY2FkZXMgaSBlbCBuw4LCuiBkJ2VkaWNpb25zIHNvYnJlIGFxdWVzdGVzXG4gIHByaXZhdGUgcGFyYW1zOyAvLyBQYXJhbXMgZGVsIGdyaWQgYSBsJ8ODwrpsdGltYSBtb2RpZmljYWNpbyAocGVyIHNpIGZlbSBhcHBseSBjaGFuZ2VzKVxuICByb3dEYXRhOiBhbnlbXTtcbiAgY29tcHRhZG9yQ2FudmlzOiBudW1iZXI7IC8vIE5vbWJyZSBkJ2VkaWNpb25zIGZldGVzIHNvYnJlIGNlbGVzXG4gIGNvbXB0YWRvckNhbnZpc0FudGVyaW9yOiBudW1iZXI7IC8vIE5vbWJyZSBkJ2VkaWNpb25zIGFudGVyaW9yIGEgbCdhY3R1YWwgKGNvbXB0YWRvckNhbnZpcylcbiAgY29tcHRhZG9yUmVkbzogbnVtYmVyOyAvLyBOb21icmUgZGUgcmVkb3MgcXVlIHBvZGVtIGZlclxuICBncmlkT3B0aW9ucztcbiAgQElucHV0KCkgY29sdW1uRGVmczogYW55W107XG4gIEBJbnB1dCgpIGdldEFsbDogKCkgPT4gT2JzZXJ2YWJsZTxhbnk+O1xuICBASW5wdXQoKSBib3RvRGVzY2FydGFyQ2FudmlzOiBib29sZWFuO1xuICBASW5wdXQoKSBib3RvVW5kbzogYm9vbGVhbjtcbiAgQElucHV0KCkgYm90b1JlZG86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGJvdG9BcGxpY2FyQ2FudmlzOiBib29sZWFuO1xuICBASW5wdXQoKSBib3RvRWxpbWluYTogYm9vbGVhbjtcbiAgQElucHV0KCkgYm90b05vdTogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VhcmNoR2VuZXJhbDogYm9vbGVhbjtcblxuXG5cbiAgQE91dHB1dCgpIHJlbW92ZTogRXZlbnRFbWl0dGVyPGFueVtdPjtcbiAgQE91dHB1dCgpIG5ldzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+O1xuICBAT3V0cHV0KCkgc2VuZENoYW5nZXM6IEV2ZW50RW1pdHRlcjxhbnlbXT47XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMucmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMubmV3ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMuc2VuZENoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XG4gICAgdGhpcy5ncmlkT3B0aW9ucyA9IHtcbiAgICAgIGRlZmF1bHRDb2xEZWY6IHtcbiAgICAgICAgZmxleDogMSxcbiAgICAgICAgZmlsdGVyOiB0cnVlLFxuICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgY2VsbFN0eWxlOiB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9LFxuICAgICAgfSxcbiAgICAgIHJvd1NlbGVjdGlvbjogJ211bHRpcGxlJyxcbiAgICAgIC8vIHN1cHByZXNzSG9yaXpvbnRhbFNjcm9sbDogdHJ1ZSxcblxuICAgIH07XG5cbiAgfVxuXG5cblxuICBvbkdyaWRSZWFkeShwYXJhbXMpOiB2b2lke1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIHRoaXMuZ3JpZEFwaSA9IHBhcmFtcy5hcGk7XG4gICAgdGhpcy5ncmlkQ29sdW1uQXBpID0gcGFyYW1zLmNvbHVtbkFwaTtcbiAgICB0aGlzLmdldEVsZW1lbnRzKCk7XG4gICAgdGhpcy5ncmlkQXBpLnNpemVDb2x1bW5zVG9GaXQoKTtcbiAgICBmb3IgKGNvbnN0IGNvbCBvZiB0aGlzLmNvbHVtbkRlZnMpIHtcbiAgICAgIGlmIChjb2wuZmllbGQgPT09ICdlc3RhdCcpIHtcbiAgICAgICAgdGhpcy5jb2x1bW5hRXN0YXQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiBcbiAgIFxuXG4gIH1cblxuICBxdWlja1NlYXJjaCgpOiB2b2lke1xuICAgICAgdGhpcy5ncmlkQXBpLnNldFF1aWNrRmlsdGVyKHRoaXMuc2VhcmNoVmFsdWUpO1xuICB9XG5cbiAgZ2V0RWxlbWVudHMoKTogdm9pZFxuICB7XG4gICAgdGhpcy5nZXRBbGwoKVxuICAgIC5zdWJzY3JpYmUoKGl0ZW1zKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW1zKTtcbiAgICAgICAgdGhpcy5yb3dEYXRhID0gaXRlbXM7XG4gICAgICAgIHNldFRpbWVvdXQoKCk9Pnt0aGlzLmdyaWRBcGkuc2l6ZUNvbHVtbnNUb0ZpdCgpfSwgMzApO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlRGF0YSgpOiB2b2lkIHtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIGNvbnN0IHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdyaWRBcGkuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgIGNvbnN0IHNlbGVjdGVkRGF0YSA9IHNlbGVjdGVkTm9kZXMubWFwKG5vZGUgPT4gbm9kZS5kYXRhKTtcbiAgICB0aGlzLnJlbW92ZS5lbWl0KHNlbGVjdGVkRGF0YSk7XG5cbiAgICBpZih0aGlzLmNvbHVtbmFFc3RhdClcbiAgICB7XG4gICAgICBjb25zdCBzZWxlY3RlZFJvd3MgPSBzZWxlY3RlZE5vZGVzLm1hcChub2RlID0+IG5vZGUucm93SW5kZXgpO1xuXG4gICAgICBmb3IgKGNvbnN0IGlkIG9mIHNlbGVjdGVkUm93cyl7XG4gICAgICAgICAgdGhpcy5ncmlkQXBpLmdldFJvd05vZGUoaWQpLmRhdGEuZXN0YXQgPSdFbGltaW5hdCc7XG4gICAgICAgIH1cbiAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuYXBpLnJlZnJlc2hDZWxscygpO1xuICAgIH1cbiAgfVxuXG5cblxuXG5cbiAgbmV3RGF0YSgpOiB2b2lkXG4gIHtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIHRoaXMubmV3LmVtaXQodHJ1ZSk7XG4gIH1cblxuICBhcHBseUNoYW5nZXMoKTogdm9pZFxuICB7XG4gICAgY29uc3QgaXRlbXNDaGFuZ2VkOiBhbnlbXSA9IFtdO1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5tYXAua2V5cygpKVxuICAgIHtcbiAgICAgIGl0ZW1zQ2hhbmdlZC5wdXNoKHRoaXMuZ3JpZEFwaS5nZXRSb3dOb2RlKGtleSkuZGF0YSk7XG4gICAgfVxuICAgIHRoaXMuc2VuZENoYW5nZXMuZW1pdChpdGVtc0NoYW5nZWQpO1xuICAgIHRoaXMubWFwLmNsZWFyKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XG4gICAgdGhpcy5wYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9ICB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9O1xuICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKCk7XG4gIH1cblxuXG5cbiAgZGVsZXRlQ2hhbmdlcygpOiB2b2lkXG4gIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29tcHRhZG9yQ2FudmlzOyBpKyspXG4gICAge1xuICAgICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpO1xuICAgIH1cbiAgICB0aGlzLm1hcC5jbGVhcigpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gPSAwO1xuICAgIHRoaXMucGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSAge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTtcbiAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cygpO1xuICB9XG5cblxuICBvbkZpbHRlck1vZGlmaWVkKCk6IHZvaWR7XG4gICAgdGhpcy5kZWxldGVDaGFuZ2VzKCk7XG4gIH1cblxuXG4gIHVuZG8oKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICB0aGlzLmdyaWRBcGkudW5kb0NlbGxFZGl0aW5nKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgLT0gMTtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gKz0gMTtcbiAgfVxuXG4gIHJlZG8oKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICB0aGlzLmdyaWRBcGkucmVkb0NlbGxFZGl0aW5nKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgKz0gMTtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gLT0gMTtcbiAgfVxuXG5cbiAgb25DZWxsRWRpdGluZ1N0b3BwZWQoZSlcbiAge1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzKys7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvID0gMDtcbiAgICB0aGlzLm9uQ2VsbFZhbHVlQ2hhbmdlZChlKTtcbiAgfVxuXG5cbiAgb25DZWxsVmFsdWVDaGFuZ2VkKHBhcmFtcyk6IHZvaWR7XG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7IC8vIEd1YXJkYXJlbSBlbHMgcGFyYW1hdHJlcyBhY3R1YWxzIHBlciBzaSBoZW0gZGUgZmVyIHVuIGFwcGx5IGNoYW5nZXNcblxuICAgIGlmICh0aGlzLmNvbXB0YWRvckNhbnZpcyA+IHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IpXG4gICAgICAvLyBBcXVlc3RhIGNvbmRpY2nDg8KzIHNlcsODwqAgY2VydGEgc2kgdmVuaW0gZCdlZGl0YXIgbyBkZSBmZXIgdW4gcmVkbyAoY29tcHRhZG9yIGNhbnZpcyA+KSwgcGVyw4PCsiBubyBzaSB2ZW5pbSBkJ3VuIHVuZG9cblxuICAgICAge1xuICAgICAgICBpZiAoISB0aGlzLm1hcC5oYXMocGFyYW1zLm5vZGUuaWQpKSAvLyBTaSBubyBoZW0gZWRpdGF0IGxhIGNlbGEgYW1iIGFudGVyaW9yaXRhdCwgbCdhZmVnaXJlbSBhbCBtYXAgaSBjYW52aWFyZW0gZWwgYmFja2dyb3VuZCBhIHZlcmRcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMubWFwLnNldChwYXJhbXMubm9kZS5pZCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgLy8gU2kgamEgZXN0YXZhIG1vZGlmaWNhZGEsIGluY3JlbWVudGFyZW0gZWwgbm9tYnJlIGRlIGNhbnZpcyBkJ2FxdWVzdGEgY2VsYSBhbCBtYXBcbiAgICAgICAgICBjb25zdCBtb2RpZmljYWNpb25zQWN0dWFscyA9IHRoaXMubWFwLmdldChwYXJhbXMubm9kZS5pZCk7XG4gICAgICAgICAgdGhpcy5tYXAuc2V0KHBhcmFtcy5ub2RlLmlkLCAobW9kaWZpY2FjaW9uc0FjdHVhbHMgKyAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5ncmlkQXBpLmdldERpc3BsYXllZFJvd0F0SW5kZXgocGFyYW1zLnJvd0luZGV4KTsgLy8gQ29tIGhhIGVzdGF0IG1vZGlmaWNhZGEgbGEgbGluZWEsIGxhIHBpbnRhcmVtIGRlIHZlcmRcbiAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0U4RjFERSd9O1xuICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XG4gICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTsgLy8gRGVmaW5pcmVtIGVsIGNlbGxTdHlsZSBibGFuYyBwZXIgcHJveGltZXMgY2VsZXNcbiAgICAgICAgdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvcisrO1xuXG4gICAgICB9XG4gICAgaWYgKHRoaXMuY29tcHRhZG9yQ2FudmlzIDwgdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvcil7IC8vIEVudHJhcsODwqAgYXF1w4PCrSBzaSB2ZW5pbSBkJ3VuIHVuZG9cbiAgICAgICAgLy8gQ29tIHNhYmVtIHF1ZSBqYSBoYXZpZW0gZWRpdGF0IGxhIGNlbGEsIGFnYWZlbSBlbCBub21icmUgZGUgbW9kaWZpY2FjaW9ucyBxdWUgbCdoZW0gZmV0XG4gICAgICAgIGNvbnN0IG1vZGlmaWNhY2lvbnNBY3R1YWxzID0gdGhpcy5tYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKTtcblxuICAgICAgICBpZiAobW9kaWZpY2FjaW9uc0FjdHVhbHMgPT09IDEpIHtcbiAgICAgICAgICAvLyBTaSBub23Dg8KpcyB0ZSB1bmEgbW9kaWZpY2FjacODwrMsIHZvbCBkaXIgcXVlIGFtYiBsJ3VuZG8gaGVtIGRlaXhhdCBsYSBjZWxhIGNvbSBhIGwnZXN0YXQgaW5pY2lhbCwgcGVsIHF1ZSBsJ2hlbSBkZSBib3JyYXIgZGVsIG1hcFxuICAgICAgICAgIHRoaXMubWFwLmRlbGV0ZShwYXJhbXMubm9kZS5pZCk7XG4gICAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5ncmlkQXBpLmdldERpc3BsYXllZFJvd0F0SW5kZXgocGFyYW1zLnJvd0luZGV4KTtcbiAgICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307IC8vIExpIHBvc2FyZW0gdW4gYWx0cmUgY29wIGVsIGJhY2tncm91bmQgYmxhbmNcbiAgICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSAvLyBMYSBjZWxhIGVuY2FyYSBubyBlc3TDg8KgIGNvbSBhIGwnZXN0YXQgaW5pY2lhbCwgcGVsIHF1ZSBub21lcyByZXN0ZW0gZWwgbm9tYnJlIGRlIG1vZGlmaWNhY2lvbnMgYWwgbWFwXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLm1hcC5zZXQocGFyYW1zLm5vZGUuaWQsIChtb2RpZmljYWNpb25zQWN0dWFscyAtIDEpKTtcbiAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRBcGkuZ2V0RGlzcGxheWVkUm93QXRJbmRleChwYXJhbXMucm93SW5kZXgpOyAvLyBDb20gZW5jYXJhIHRlIG1vZGlmaWNhY2lvbnMsIGhhIGRlIHRlbmlyIGVsIGJhY2tncm91bmQgdmVyZFxuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNFOEYxREUnfTtcbiAgICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBEZWZpbmlyZW0gZWwgY2VsbFN0eWxlIGJsYW5jIHBlciBwcm94aW1lcyBjZWxlc1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3ItLTsgIC8vIENvbSB2ZW5pZW0gZCd1bmRvLCBoZW0gZGUgZGVjcmVtZW50YXIgZWwgY29tcHRhZG9yIGRlIGNhbnZpc0FudGVyaW9yXG4gICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge0h0dHBDbGllbnRNb2R1bGUsIEh0dHBDbGllbnQsIEhUVFBfSU5URVJDRVBUT1JTfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLCBOb29wQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSwgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbi8vaW1wb3J0ICogYXMgb2wgZnJvbSAnb3BlbmxheWVycyc7XHJcbmltcG9ydCB7VHJhbnNsYXRlTW9kdWxlLCBUcmFuc2xhdGVMb2FkZXIsVHJhbnNsYXRlU2VydmljZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcblxyXG5cclxuaW1wb3J0IHsgQW5ndWxhckhhbE1vZHVsZSB9IGZyb20gJ0BzaXRtdW4vZnJvbnRlbmQtY29yZSc7XHJcblxyXG5cclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7U2l0bXVuRnJvbnRlbmRDb3JlTW9kdWxlfSBmcm9tICdAc2l0bXVuL2Zyb250ZW5kLWNvcmUnO1xyXG5pbXBvcnQgeyBEYXRhR3JpZENvbXBvbmVudCB9IGZyb20gJy4vZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBZ0dyaWRNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYW5ndWxhcic7XHJcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XHJcbmltcG9ydCB7TWF0SWNvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XHJcblxyXG5cclxuXHJcblxyXG4vKiogU0lUTVVOIHBsdWdpbiBjb3JlIG1vZHVsZSAqL1xyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIFJvdXRlck1vZHVsZSxcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIE5vb3BBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQW5ndWxhckhhbE1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIEFnR3JpZE1vZHVsZS53aXRoQ29tcG9uZW50cyhbXSksXHJcbiAgICBTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIERhdGFHcmlkQ29tcG9uZW50XHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgSHR0cENsaWVudE1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgTm9vcEFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICBBbmd1bGFySGFsTW9kdWxlLFxyXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIERhdGFHcmlkQ29tcG9uZW50LFxyXG4gICAgU2l0bXVuRnJvbnRlbmRDb3JlTW9kdWxlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2l0bXVuRnJvbnRlbmRHdWlNb2R1bGUge1xyXG59XHJcbiJdfQ==