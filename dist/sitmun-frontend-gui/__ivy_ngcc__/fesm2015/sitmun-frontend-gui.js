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
        this.canviAmbModificacions = false;
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
        this.gridOptions.api.deselectAll();
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
        if (this.canviAmbModificacions) {
            this.comptadorCanvis++;
            this.comptadorRedo = 0;
            this.onCellValueChanged(e);
            this.canviAmbModificacions = false;
        }
    }
    /**
     * @param {?} params
     * @return {?}
     */
    onCellValueChanged(params) {
        this.params = params; // Guardaremos los parametros por si hay que hacer un apply changes
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
            const row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex); // Com ha estado modificada la linia, la pintamos de verde
            params.colDef.cellStyle = { backgroundColor: '#E8F1DE' };
            this.gridApi.redrawRows({ rowNodes: [row] });
            params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Definiremos el cellStyle blanco para futuras modificaciones internas (ej: filtro)
            this.comptadorCanvisAnterior++;
        }
        else if (this.comptadorCanvis < this.comptadorCanvisAnterior) {
            /** @type {?} */
            const modificacionsActuals = this.map.get(params.node.id);
            if (modificacionsActuals === 1) {
                // Si solo tiene una modificacion, quiere decir que la cela está en su estado inicial, por lo que la pintamos de blanco
                this.map.delete(params.node.id);
                /** @type {?} */
                const row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex);
                params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Li posarem un altre cop el background blanc
                this.gridApi.redrawRows({ rowNodes: [row] });
            }
            else if (modificacionsActuals > 1) {
                // No podemos hacer else por si hacemos un undo de una cela sin cambios
                this.map.set(params.node.id, (modificacionsActuals - 1));
                /** @type {?} */
                const row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex); // Como aun tiene cambios, el background tiene que seguir verde
                params.colDef.cellStyle = { backgroundColor: '#E8F1DE' };
                this.gridApi.redrawRows({ rowNodes: [row] });
                params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Definirem el cellStyle blanc per proximes celes
            }
            this.comptadorCanvisAnterior--; // Com veniem d'undo, hem de decrementar el comptador de canvisAnterior
        }
        else {
            console.log(params);
            if (params.oldValue !== params.value && !(params.oldValue == null && params.value === '')) {
                this.canviAmbModificacions = true;
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
                    this.comptadorCanvisAnterior++; // Como al hacer undo volverá a entrar a esta misma función, hay que enviarlo a su if correspondiente
                    this.gridApi.undoCellEditing(); //Undo para deshacer el cambio sin modificaciones internamente
                }
            }
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
    } }, directives: [ɵngcc1.NgIf, ɵngcc2.AgGridAngular, ɵngcc3.MatButton, ɵngcc4.MatIcon, ɵngcc5.DefaultValueAccessor, ɵngcc5.NgControlStatus, ɵngcc5.NgModel], styles: ["input[_ngcontent-%COMP%], label[_ngcontent-%COMP%]{display:inline-block;margin:5px 5px 5px 10px}#botoNou[_ngcontent-%COMP%]{color:#fff;background:no-repeat padding-box #68a225;margin-left:3px}#botoElimina[_ngcontent-%COMP%]{background:no-repeat padding-box #fff;margin-left:3px}#aplicarCanvis[_ngcontent-%COMP%]{color:#fff!important;background:no-repeat padding-box #68a225;margin-left:3px}#aplicarCanvis[disabled][_ngcontent-%COMP%]{background:no-repeat padding-box #83976c}#redo[_ngcontent-%COMP%], #undo[_ngcontent-%COMP%]{color:#fff!important;background:#ff9300;margin-left:3px}#redo[disabled][_ngcontent-%COMP%], #undo[disabled][_ngcontent-%COMP%]{background:#ffc97f;margin-left:3px}#borrarCanvis[_ngcontent-%COMP%]{color:#fff!important;background:#df3133}#borrarCanvis[disabled][_ngcontent-%COMP%]{color:#fff!important;background:#da8c8e}#grup1[_ngcontent-%COMP%]{text-align:start;width:40%}#grup2[_ngcontent-%COMP%]{text-align:end;width:60%}#grup1[_ngcontent-%COMP%], #grup2[_ngcontent-%COMP%]{display:inline-block!important}"] });
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
                styles: [`input,label{display:inline-block;margin:5px 5px 5px 10px}#botoNou{color:#fff;background:no-repeat padding-box #68a225;margin-left:3px}#botoElimina{background:no-repeat padding-box #fff;margin-left:3px}#aplicarCanvis{color:#fff!important;background:no-repeat padding-box #68a225;margin-left:3px}#aplicarCanvis[disabled]{background:no-repeat padding-box #83976c}#redo,#undo{color:#fff!important;background:#ff9300;margin-left:3px}#redo[disabled],#undo[disabled]{background:#ffc97f;margin-left:3px}#borrarCanvis{color:#fff!important;background:#df3133}#borrarCanvis[disabled]{color:#fff!important;background:#da8c8e}#grup1{text-align:start;width:40%}#grup2{text-align:end;width:60%}#grup1,#grup2{display:inline-block!important}`]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWd1aS5qcyIsInNvdXJjZXMiOlsiQHNpdG11bi9mcm9udGVuZC1ndWkvZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWd1aS9zaXRtdW4tZnJvbnRlbmQtZ3VpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhCQTZHRTs0QkE5Qm9CO0lBQW1CLDhCQUl4QixLQUFLO01BQ08sSUFBSSxHQUFHLEVBQWtCO0VBTTVCLEtBQUssVUFxQjNCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUU7QUFBQyxTQUNqQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7O0tBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQyxTQUN0QyxJQUFJLENBQUM7RUFBZSxHQUFHLENBQUMsQ0FBQyxTQUN6QixJQUFJLENBQUM7Q0FBdUIsR0FBRyxDQUFDLENBQUMsU0FDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7R0FDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUNqQixhQUFhLEVBQUUsa0JBQ2IsSUFBSSxFQUFFLENBQUMsa0JBQ1AsTUFBTSxFQUFFLElBQUksa0JBQ1osUUFBUSxFQUFFLElBQUksa0JBQ2QsU0FBUyxFQUFFLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQztPQUN4QyxjQUNELFlBQVksRUFBRSxVQUFVO1VBR3pCLENBQUMsTUFFSDs7c0JBSUQ7TUFBVyxDQUFDLE1BQU07U0FDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FDckI7QUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDOztBQUFTLENBQUMsU0FDdEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7QUFBQyxTQUNoQyxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVO0FBQUUsY0FDakMsSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtlQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUMxQixVQUNGLE1BSUYsd0NBRUQsV0FBVyxhQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUNqRDsyQkFFRCxXQUFXO0tBRVQsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNaLFNBQVMsQ0FBQyxDQUFDLEtBQUs7UUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztBQUFDLGFBQ25CO0NBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLGFBQ3JCLFVBQVUsQ0FBQztPQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQSxFQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsVUFDekQsQ0FBQyxDQUFDO0NBQ0o7cUNBRUQsVUFBVSxhQUNSLElBQUksQ0FBQztFQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQztFQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxrQ0FDdEQsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQzFELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBRS9CLElBQUcsSUFBSSxDQUFDLFlBQVksRUFDcEI7OEJBQ0UsTUFBTTtFQUFZLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUk7R0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRTlELEtBQUssTUFBTSxFQUFFLElBQUk7RUFBWSxFQUFDO01BQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztDQUFLLEdBQUUsVUFBVSxDQUFDLGNBQ3BELGFBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQztBQUFHLENBQUM7U0FBWSxFQUFFLENBQUMsVUFDckMsU0FDRCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztFQUNwQyx3Q0FNRDtLQUFPLGFBRUwsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7SUFBSyxDQUFDLENBQUMsU0FDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFDckIsd0NBRUQsWUFBWSxzQ0FFVixNQUFNLFlBQVksR0FBVSxFQUFFLENBQUMsU0FDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsU0FDaEM7R0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUNqQztDQUNFLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEQsU0FDRCxJQUFJLENBQUM7RUFBVyxDQUFDLElBQUksQ0FBQztJQUFZLENBQUMsQ0FBQyxTQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQ2pCO0VBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLFNBQ3pCLElBQUksQ0FBQyx1QkFBdUIsR0FBRztBQUFDLENBQUM7TUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsU0FDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUztBQUFJLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDO0NBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDM0I7O1NBSUQsYUFBYSxhQUVYLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7TUFBZSxFQUFFLENBQUMsRUFBRSxFQUM3QyxjQUNFLElBQUksQ0FBQyxPQUFPLENBQUM7V0FBZSxFQUFFLENBQUMsVUFDaEMsU0FDRCxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQUssRUFBRSxDQUFDLFNBQ2pCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLENBQUMsU0FDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsU0FDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsU0FDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFJLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDLFNBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsTUFDM0Isd0NBR0QsZ0JBQWdCLGFBQ2QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQ3RCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW5PSDtBQUEwQixJQTZHeEI7QUFDRix1QkEvQnNCLG1CQUFtQjtBQUN6Qyw0QkFHaUIsS0FBSztBQUN0QixtQkFBNkIsSUFBSSxHQUFHLEVBQWtCO0FBQUUscUNBTTlCLEtBQUs7QUFDL0IsUUFvQkksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0FBQ3JDLFFBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0FBQ2xDLFFBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0FBQzFDLFFBQUksSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7QUFDN0IsUUFBSSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0FBQ3JDLFFBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFDM0IsUUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHO0FBQ3ZCLFlBQU0sYUFBYSxFQUFFO0FBQ3JCLGdCQUFRLElBQUksRUFBRSxDQUFDO0FBQ2YsZ0JBQVEsTUFBTSxFQUFFLElBQUk7QUFDcEIsZ0JBQVEsUUFBUSxFQUFFLElBQUk7QUFDdEIsZ0JBQVEsU0FBUyxFQUFFLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQztBQUMvQyxhQUFPO0FBQ1AsWUFBTSxZQUFZLEVBQUUsVUFBVTtBQUM5QixTQUVLLENBQUM7QUFDTixLQUNHO0FBQ0g7QUFHSztBQUNKO0FBQW1CO0FBQ2xCLElBRkEsV0FBVyxDQUFDLE1BQU07QUFBSSxRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUN6QixRQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztBQUM5QixRQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUMxQyxRQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUN2QixRQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztBQUNwQyxRQUFJLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUN2QyxZQUFNLElBQUksR0FBRyxDQUFDLEtBQUssS0FBSyxPQUFPLEVBQUU7QUFDakMsZ0JBQVEsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDakMsYUFBTztBQUNQLFNBQUs7QUFDTCxLQUdHO0FBQ0g7QUFDTztBQUNKO0FBQVEsSUFEVCxXQUFXO0FBQUssUUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDcEQsS0FBRztBQUNIO0FBQ087QUFFUDtBQUFRLElBRk4sV0FBVztBQUFLLFFBRWQsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNqQixhQUFLLFNBQVMsQ0FBQyxDQUFDLEtBQUs7QUFDckIsWUFBUSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzNCLFlBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDN0IsWUFBUSxVQUFVLENBQUMsUUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUEsRUFBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzlELFNBQUssQ0FBQyxDQUFDO0FBQ1AsS0FBRztBQUNIO0FBQ087QUFDSjtBQUFRLElBRFQsVUFBVTtBQUFLLFFBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEM7QUFBeUIsUUFBckIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0FBQzFEO0FBQXlCLFFBQXJCLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5RCxRQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ25DLFFBQ0ksSUFBRyxJQUFJLENBQUMsWUFBWSxFQUNwQjtBQUNKO0FBQTZCLFlBQXZCLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNwRSxZQUNNLEtBQUssTUFBTSxFQUFFLElBQUksWUFBWSxFQUFDO0FBQ3BDLGdCQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUUsVUFBVSxDQUFDO0FBQzdELGFBQVM7QUFDVCxZQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQzFDLFNBQUs7QUFDTCxRQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ3ZDLEtBQUc7QUFDSDtBQUtHO0FBRUg7QUFBUSxJQUZOLE9BQU87QUFBSyxRQUVWLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BDLFFBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsS0FBRztBQUNIO0FBQ087QUFDSjtBQUNJLElBRkwsWUFBWTtBQUFLO0FBRUYsUUFBYixNQUFNLFlBQVksR0FBVSxFQUFFLENBQUM7QUFDbkMsUUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwQyxRQUFJLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFDakM7QUFDSixZQUFNLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0QsU0FBSztBQUNMLFFBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDeEMsUUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3JCLFFBQUksSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7QUFDN0IsUUFBSSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0FBQ3JDLFFBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFDM0IsUUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUksRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUM7QUFDakUsUUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzlCLEtBQUc7QUFDSDtBQUdLO0FBQ0w7QUFDSSxJQUZGLGFBQWE7QUFBSyxRQUVoQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLEVBQUUsRUFDN0M7QUFDSixZQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7QUFDckMsU0FBSztBQUNMLFFBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNyQixRQUFJLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLENBQUM7QUFDckMsUUFBSSxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztBQUM3QixRQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLFFBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFJLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDO0FBQ2pFLFFBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUM5QixLQUFHO0FBQ0g7QUFFTTtBQUFtQjtBQUNwQixJQURILGdCQUFnQjtBQUFLLFFBQ25CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7QUFFekI7QUFFTTtBQUNFO0lBRE4sSUFBSSxSQUNVLElBRGQsSUFBSTtRQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLHhDQUR6QixRQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUMsdkNBQW5DLFFBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsQ0FBQyxsQ0FBOUIsUUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQyxoQ0FBNUIsUUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQztLQUN6QixMQUFILEtBQUc7QUFDSDtBQUNPO0FBQ0U7SUFEUCxJQUFJLFJBQ1csSUFEZixJQUFJO1FBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMseENBRHpCLFFBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQyx2Q0FBbkMsUUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxDQUFDLGxDQUE5QixRQUFJLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDLGhDQUE1QixRQUFJLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDO0tBQ3pCLExBQUgsS0FBRztBQUNIO0FBRU07QUFDTjtBQUNlO0lBRmIsb0JBQW9CLENBQUMsQ0FBQywxQkFFRCxJQUZyQixvQkFBb0IsQ0FBQyxDQUFDO1FBRWxCLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUM5Qix4Q0FGSixRQUNJLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUM5QjtZQUNFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxuQ0FBL0IsWUFBUSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsbkNBQS9CLFlBQVEsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLHZDQUFuQyxZQUFRLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDLC9DQUEzQyxZQUFRLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7U0FDcEMsVEFBUCxTQUFPO0tBQ0osTEFBSCxLQUFHO0FBQ0g7QUFHSztBQUF5QjtBQUNqQjtJQURYLGtCQUFrQixDQUFDLE1BQU0sN0JBQ04sSUFEbkIsa0JBQWtCLENBQUMsTUFBTTtRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyw3QkFETSxRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUVyRCxqRUFITixRQUNJLElBQUksSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsdUJBQXVCLEVBRXJEO1lBQ0UsSUFBSSxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQ2xDLC9DQURSLFlBQVEsSUFBSSxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQ2xDO2dCQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGhEQUExQyxnQkFBVSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNqQyxiQUFULGFBQVM7aUJBQ0csakJBQVosaUJBQVk7QUFDWjtnQkFDVSxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsMUVBRG5DLGdCQUN2QixNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzFELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLG9CQUFvQixHQUFHLENBQUMsRUFBRSxDQUFDLHpFQUFuRSxnQkFBVSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxvQkFBb0IsR0FBRyxDQUFDLEVBQUUsQ0FBQzthQUMxRCxiQUFULGFBQVM7QUFDVDtZQUFRLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLDdFQUE1QyxZQUFyQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqRSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUMsQ0FBQyxyRUFBL0QsWUFBUSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQyx6REFBbkQsWUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUMsQ0FBQyxyRUFBL0QsWUFBUSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQywzQ0FBdkMsWUFBUSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztTQUVoQyxUQURQLFNBQ087YUFDRSxJQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFDLHRFQUFqRSxhQUFTLElBQUksSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsdUJBQXVCLEVBQUM7QUFBRTtZQUUzRCxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsdEVBRjhCLFlBRXhGLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUUxRCxJQUFJLG9CQUFvQixLQUFLLENBQUMsRUFBRSw1Q0FEeEMsWUFDUSxJQUFJLG9CQUFvQixLQUFLLENBQUMsRUFBRTtBQUN4QztnQkFDVSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGhEQUFyQyxnQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzFDO2dCQUFVLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGpGQUExQyxnQkFBdkIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pFLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDLHpFQUFqRSxnQkFBVSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUMsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsN0RBQXJELGdCQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDO2FBQzVDLGJBQVQsYUFBUztpQkFDSSxJQUFJLG9CQUFvQixHQUFFLENBQUMsRUFDaEMsL0NBRFIsaUJBQWEsSUFBSSxvQkFBb0IsR0FBRSxDQUFDLEVBQ2hDO0FBQUU7Z0JBQ0EsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsb0JBQW9CLEdBQUcsQ0FBQyxFQUFFLENBQUMsekVBRCtCLGdCQUN4RixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxvQkFBb0IsR0FBRyxDQUFDLEVBQUUsQ0FBQztBQUNuRTtnQkFBVSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxqRkFBMUMsZ0JBQXZCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNqRSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUMsQ0FBQyx6RUFBakUsZ0JBQVUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLDdEQUFyRCxnQkFBVSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUMsekVBQWpFLGdCQUFVLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDO2FBQ3hELGJBQVQsYUFBUztZQUNELElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLDNDQUF2QyxZQUFRLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQ2xDLFRBRDJHLFNBQzNHO2FBQ0csYkFBUixhQUFRO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxoQ0FBMUIsWUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLElBQUcsTUFBTSxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUUsRUFDekYsdkdBRE4sWUFBTSxJQUFHLE1BQU0sQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFFLEVBQ3pGO2dCQUNFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsbERBQTFDLGdCQUFRLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7YUFDbkMsYkFBUCxhQUFPO2lCQUNHLGpCQUFWLGlCQUFVO2dCQUNGLElBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFDakMsbERBRFIsZ0JBQVEsSUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUNqQztBQUNSO29CQUFVLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLHJGQUF0QyxvQkFBM0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2pFLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDLDdFQUFqRSxvQkFBVSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUMsQ0FBQztvQkFDdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsakVBQXJELG9CQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDO29CQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUMsQ0FBQyw3RUFBakUsb0JBQVUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUM7aUJBRXhELGpCQURULGlCQUNTO3FCQUNJLHJCQUFiLHFCQUFhO29CQUNILElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLG5EQUF6QyxvQkFBVSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztvQkFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxuREFEdUcsb0JBQ3RJLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7aUJBQ2hDLGpCQUFULGlCQUFTO2FBRUYsYkFEUCxhQUNPO1NBRUYsVEFETCxTQUNLO0tBQ0YsTEFBSCxLQUFHO0FBQ0g7NkNBL1RDLFNBQVMsU0FBQyxrQkFDVCxRQUFRLEVBQUUsZUFBZSw3REFEMUIsU0FBUyxTQUFDLGtCQUNULFFBQVEsRUFBRSxlQUFlO2lCQUN6QixRQUFRLEVBQUUsVkFBVixRQUFRLEVBQUU7Ozs7Ozs7Y0ErRFgsa0JBQ0MsTUFBTSxFQUFFLENBQUMsM0JBRFYsa0JBQ0MsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7OzswTUFBc3RCLENBQUMsY0FDanVCLHVJQW1CRSxLQUFLLDBCQUNMLEtBQUssdUNBQ0wsS0FBSyw0QkFDTCxLQUFLLDRCQUNMLEtBQUsscUNBQ0wsS0FBSywrQkFDTCxLQUFLLDJCQUNMLGpaQTNCOHRCLENBQUMsY0FDanVCO0VBMEJPO0lBQ0wsS0FBSztJQUlMLE1BQU07RUFDTixNQUFNO21CQUNOLE1BQU07Ozt1QkMzR1Q7V0E4REE7O2tCQW5DQyxRQUFRO01BQUMsa0JBQ1IsT0FBTyxFQUFFLHNCQUNQO1NBQVk7RUFDWixnQkFBZ0Isc0JBQ2hCLFlBQVk7b0JBQ1o7RUFBVyxzQkFDWCxvQkFBb0I7WUFDcEIsZ0JBQWdCO3FCQUNoQixtQkFBbUI7VUFDbkI7SUFBdUIsc0JBQ3ZCLFlBQVksQ0FBQztLQUFjLENBQUMsRUFBRSxDQUFDO0VBQy9CLHdCQUF3QixzQkFDeEIsZUFBZSxzQkFDZixhQUFhLG1CQUVkLGtCQUNELFlBQVksRUFBRSxzQkFDWixpQkFBaUIsa0JBQ2xCLGtCQUNELGVBQWUsRUFBRSxFQUNoQixrQkFDRCxTQUFTLEVBQUUsRUFDVixrQkFDRCxPQUFPLEVBQUUsc0JBQ1A7UUFBZ0Isc0JBQ2hCLFlBQVksc0JBQ1osV0FBVyxzQkFDWCxvQkFBb0Isc0JBQ3BCLGdCQUFnQixzQkFDaEIsZUFBZSxzQkFDZixtQkFBbUIsc0JBQ25CLGlCQUFpQixzQkFDakIsd0JBQXdCLGtCQUN6QixjQUNGLDIxQkRjSztBQUFDO0FBQW1CO0FBS087QUFFN0IseUJBV0QsS0FBSztBQUFLLHFCQUNWLEtBQUs7QUFBSyxrQ0FDVixLQUFLO0FBQUssdUJBQ1YsS0FBSztBQUFLLHVCQUNWLEtBQUs7QUFBSyxnQ0FDVixLQUFLO0FBQUssMEJBQ1YsS0FBSztBQUFLLHNCQUNWLEtBQUs7QUFBSyw0QkFDVixLQUFLO0FBQUsscUJBSVYsTUFBTTtBQUFLLGtCQUNYLE1BQU07QUFBSywwQkFDWCxNQUFNO0FBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUFFO0FBQUM7QUFBQztBQUFJO0FBR2Q7QUFHUztBQ2pIaEI7QUFBSTtBQUE2QjtBQThEakM7QUFBZ0M7bURBbkMvQixRQUFRLFNBQUMsa0JBQ1I7RUFBTyxFQUFFLHNCQUNQLFlBQVksc0JBQ1osZ0JBQWdCLHNCQUNoQixZQUFZLHNCQUNaLFdBQVcsc0JBQ1gsb0JBQW9CO29CQUNwQjtVQUFnQjtFQUNoQixtQkFBbUI7aUJBQ25CO2VBQXVCO0dBQ3ZCLFlBQVksQ0FBQztBQUFjLENBQUMsRUFBRSxDQUFDLHNCQUMvQjtpQkFBd0I7RUFDeEIsZUFBZSxzQkFDZjtPQUFhLG1CQUVkO01BQ0QsWUFBWSxFQUFFO2FBQ1o7R0FBaUIsa0JBQ2xCO1VBQ0Q7R0FBZSxFQUFFLEVBQ2hCO0lBQ0QsU0FBUyxFQUFFLEVBQ1Y7S0FDRCxPQUFPLEVBQUU7VUFDUDtDQUFnQixzQkFDaEI7TUFBWSxzQkFDWjtDQUFXLHNCQUNYLG9CQUFvQixzQkFDcEIsZ0JBQWdCLHNCQUNoQixlQUFlLHNCQUNmLG1CQUFtQixzQkFDbkIsaUJBQWlCLHNCQUNqQjtxQkFBd0I7YUFDekI7S0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBQ0s7QUFBQztBQUFDO0FBQUk7QUFFUDtBQUFrRTtBQUFJO0FBQUM7QUFBSTtBQUFrQztBQUFrRTtBQUFJO0FBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZ0dyaWRNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYW5ndWxhcic7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgTmdNb2R1bGUsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBbGxDb21tdW5pdHlNb2R1bGVzLCBNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYWxsLW1vZHVsZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtZGF0YS1ncmlkJyxcbiAgdGVtcGxhdGU6IGBcblxuXG4gICAgPGRpdiBpZD1ncnVwMSA+XG4gICAgICAgIDxidXR0b24gIG1hdC1taW5pLWZhYiAqbmdJZj1cImJvdG9EZXNjYXJ0YXJDYW52aXNcIiAgaWQ9XCJib3JyYXJDYW52aXNcIiB0eXBlPVwiYnV0dG9uXCIgIChjbGljayk9XCJkZWxldGVDaGFuZ2VzKClcIiBbZGlzYWJsZWRdPVwiY29tcHRhZG9yQ2FudmlzIDw9IDBcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IGNsb3NlIDwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG1hdC1taW5pLWZhYiAqbmdJZj1cImJvdG9VbmRvXCIgIGlkPVwidW5kb1wiICAoY2xpY2spPVwidW5kbygpXCIgW2Rpc2FibGVkXT1cImNvbXB0YWRvckNhbnZpcyA8PSAwXCIgPlxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gdW5kbyA8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtbWluaS1mYWIgKm5nSWY9XCJib3RvUmVkb1wiICBpZD1cInJlZG9cIiAgKGNsaWNrKT1cInJlZG8oKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JSZWRvIDw9IDBcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IHJlZG8gPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbWF0LW1pbmktZmFiICAqbmdJZj1cImJvdG9BcGxpY2FyQ2FudmlzXCIgIGlkPVwiYXBsaWNhckNhbnZpc1wiICAoY2xpY2spPVwiYXBwbHlDaGFuZ2VzKClcIiBbZGlzYWJsZWRdPVwiY29tcHRhZG9yQ2FudmlzIDw9IDBcIiA+XG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiBjaGVjayA8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgaWQ9Z3J1cDIgPlxuICAgICAgICA8bGFiZWwgKm5nSWY9XCJzZWFyY2hHZW5lcmFsXCIgPlNlYXJjaCA8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgKm5nSWY9XCJzZWFyY2hHZW5lcmFsXCJ0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiXCIgKGtleXVwKT1cInF1aWNrU2VhcmNoKClcIiBbKG5nTW9kZWwpXT1cInNlYXJjaFZhbHVlXCIgbWwtMiA+XG4gICAgICAgIDxidXR0b24gKm5nSWY9XCJib3RvRWxpbWluYVwiICBtYXQtc3Ryb2tlZC1idXR0b24gaWQ9XCJib3RvRWxpbWluYVwiICAoY2xpY2spPVwicmVtb3ZlRGF0YSgpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiBkZWxldGUgPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIEVsaW1pbmFcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gICpuZ0lmPVwiYm90b05vdVwiIG1hdC1zdHJva2VkLWJ1dHRvbiBpZD1cImJvdG9Ob3VcIiAgKGNsaWNrKT1cIm5ld0RhdGEoKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiPiBhZGRfY2lyY2xlX291dGxpbmUgPC9tYXQtaWNvbj4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgTm91XG4gICAgICAgIDwvYnV0dG9uPlxuXG5cbiAgICAgICAgXG4gICAgPC9kaXY+XG5cblxuXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiIHN0eWxlPVwiIGhlaWdodDogMTAwJVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGhlbWUtYmFsaGFtXCIgaWQ9XCJteUdyaWRcIiBzdHlsZT1cIiB3aWR0aDoxMDAlOyBoZWlnaHQ6IDEwMCVcIiA+XG4gICAgICAgICAgICA8YWctZ3JpZC1hbmd1bGFyXG4gICAgICAgICAgICBzdHlsZT1cIiB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiXG4gICAgICAgICAgICBjbGFzcz1cImFnLXRoZW1lLWJhbGhhbVwiXG4gICAgICAgICAgICBbZmxvYXRpbmdGaWx0ZXJdPVwidHJ1ZVwiXG4gICAgICAgICAgICBbcm93RGF0YV09XCJyb3dEYXRhXCJcbiAgICAgICAgICAgIFtjb2x1bW5EZWZzXT1cImNvbHVtbkRlZnNcIlxuICAgICAgICAgICAgW2dyaWRPcHRpb25zXT1cImdyaWRPcHRpb25zXCJcbiAgICAgICAgICAgIFthbmltYXRlUm93c109XCJ0cnVlXCJcbiAgICAgICAgICAgIFtwYWdpbmF0aW9uXT1cImZhbHNlXCJcbiAgICAgICAgICAgIFttb2R1bGVzXT1cIm1vZHVsZXNcIiAgICAgXG4gICAgICAgICAgICBbdW5kb1JlZG9DZWxsRWRpdGluZ109XCJ0cnVlXCIgICAgXG4gICAgICAgICAgICBbdW5kb1JlZG9DZWxsRWRpdGluZ0xpbWl0XT0gMjAwXG4gICAgICAgICAgICBbc3VwcHJlc3NSb3dDbGlja1NlbGVjdGlvbl09dHJ1ZVxuICAgICAgICAgICAgW2VuYWJsZUNlbGxDaGFuZ2VGbGFzaF09dHJ1ZVxuICAgICAgICAgICAgcm93U2VsZWN0aW9uPVwibXVsdGlwbGVcIlxuICAgICAgICAgICAgKGZpbHRlck1vZGlmaWVkKT1cIm9uRmlsdGVyTW9kaWZpZWQoKVwiXG4gICAgICAgICAgICAoY2VsbEVkaXRpbmdTdG9wcGVkKSA9XCJvbkNlbGxFZGl0aW5nU3RvcHBlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChjZWxsVmFsdWVDaGFuZ2VkKT1cIm9uQ2VsbFZhbHVlQ2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChncmlkUmVhZHkpPVwib25HcmlkUmVhZHkoJGV2ZW50KVwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8L2FnLWdyaWQtYW5ndWxhcj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cblxuYCxcbiAgc3R5bGVzOiBbYGlucHV0LGxhYmVse2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbjo1cHggNXB4IDVweCAxMHB4fSNib3RvTm91e2NvbG9yOiNmZmY7YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggIzY4YTIyNTttYXJnaW4tbGVmdDozcHh9I2JvdG9FbGltaW5he2JhY2tncm91bmQ6bm8tcmVwZWF0IHBhZGRpbmctYm94ICNmZmY7bWFyZ2luLWxlZnQ6M3B4fSNhcGxpY2FyQ2Fudmlze2NvbG9yOiNmZmYhaW1wb3J0YW50O2JhY2tncm91bmQ6bm8tcmVwZWF0IHBhZGRpbmctYm94ICM2OGEyMjU7bWFyZ2luLWxlZnQ6M3B4fSNhcGxpY2FyQ2FudmlzW2Rpc2FibGVkXXtiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjODM5NzZjfSNyZWRvLCN1bmRve2NvbG9yOiNmZmYhaW1wb3J0YW50O2JhY2tncm91bmQ6I2ZmOTMwMDttYXJnaW4tbGVmdDozcHh9I3JlZG9bZGlzYWJsZWRdLCN1bmRvW2Rpc2FibGVkXXtiYWNrZ3JvdW5kOiNmZmM5N2Y7bWFyZ2luLWxlZnQ6M3B4fSNib3JyYXJDYW52aXN7Y29sb3I6I2ZmZiFpbXBvcnRhbnQ7YmFja2dyb3VuZDojZGYzMTMzfSNib3JyYXJDYW52aXNbZGlzYWJsZWRde2NvbG9yOiNmZmYhaW1wb3J0YW50O2JhY2tncm91bmQ6I2RhOGM4ZX0jZ3J1cDF7dGV4dC1hbGlnbjpzdGFydDt3aWR0aDo0MCV9I2dydXAye3RleHQtYWxpZ246ZW5kO3dpZHRoOjYwJX0jZ3J1cDEsI2dydXAye2Rpc3BsYXk6aW5saW5lLWJsb2NrIWltcG9ydGFudH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhR3JpZENvbXBvbmVudCB7XG4gXG5cblxuXG4gIG1vZHVsZXM6IE1vZHVsZVtdID0gQWxsQ29tbXVuaXR5TW9kdWxlcztcbiAgc2VhcmNoVmFsdWU6IHN0cmluZztcbiAgcHJpdmF0ZSBncmlkQXBpO1xuICBwcml2YXRlIGdyaWRDb2x1bW5BcGk7XG4gIGNvbHVtbmFFc3RhdCA9IGZhbHNlO1xuICBtYXA6IE1hcDxudW1iZXIsIG51bWJlcj4gPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpOyAvLyBHdWFyZGFyZW1vcyBlbCBpZCBkZSBsYXMgY2VsYXMgbW9kaWZpY2FkYXMgaSBlbCBuw4LCuiBkZSBlZGljaW9uZXMgaGVjaGFzIHNvYnJlIGVzdGFzXG4gIHByaXZhdGUgcGFyYW1zOyAvL1BhcmFtZXRyb3MgZGVsIGdyaWQgZW4gbGEgdWx0aW1hIG1vZGlmaWNhY2lvbiBoZWNoYSAocG9yIHNpIGhhY2Vtb3MgYXBwbHkgY2hhbmdlcylcbiAgcm93RGF0YTogYW55W107XG4gIGNvbXB0YWRvckNhbnZpczogbnVtYmVyOyAvLyBOdW1lcm8gZGUgZWRpY2lvbmVzIGhlY2hhcyBzb2JyZSBsYXMgY2VsYXNcbiAgY29tcHRhZG9yQ2FudmlzQW50ZXJpb3I6IG51bWJlcjsgLy8gIE51bWVybyBkZSBlZGljaW9uZXMgcXVlIGhhYmlhIGFudGVzIGRlIGhhY2VyIGxhIHVsdGltYSBtb2RpZmljYWNpb24gKGNvbXB0YWRvckNhbnZpcylcbiAgY29tcHRhZG9yUmVkbzogbnVtYmVyOyAvLyBOdW1lcm8gZGUgcmVkbyBxdWUgcG9kZW1vcyBoYWNlclxuICBjYW52aUFtYk1vZGlmaWNhY2lvbnMgPSBmYWxzZTtcbiAgZ3JpZE9wdGlvbnM7XG4gIEBJbnB1dCgpIGNvbHVtbkRlZnM6IGFueVtdO1xuICBASW5wdXQoKSBnZXRBbGw6ICgpID0+IE9ic2VydmFibGU8YW55PjtcbiAgQElucHV0KCkgYm90b0Rlc2NhcnRhckNhbnZpczogYm9vbGVhbjtcbiAgQElucHV0KCkgYm90b1VuZG86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGJvdG9SZWRvOiBib29sZWFuO1xuICBASW5wdXQoKSBib3RvQXBsaWNhckNhbnZpczogYm9vbGVhbjtcbiAgQElucHV0KCkgYm90b0VsaW1pbmE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGJvdG9Ob3U6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNlYXJjaEdlbmVyYWw6IGJvb2xlYW47XG5cblxuXG4gIEBPdXRwdXQoKSByZW1vdmU6IEV2ZW50RW1pdHRlcjxhbnlbXT47XG4gIEBPdXRwdXQoKSBuZXc6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcbiAgQE91dHB1dCgpIHNlbmRDaGFuZ2VzOiBFdmVudEVtaXR0ZXI8YW55W10+O1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB0aGlzLnJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLm5ldyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLnNlbmRDaGFuZ2VzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gPSAwO1xuICAgIHRoaXMuZ3JpZE9wdGlvbnMgPSB7XG4gICAgICBkZWZhdWx0Q29sRGVmOiB7XG4gICAgICAgIGZsZXg6IDEsXG4gICAgICAgIGZpbHRlcjogdHJ1ZSxcbiAgICAgICAgZWRpdGFibGU6IHRydWUsXG4gICAgICAgIGNlbGxTdHlsZToge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfSxcbiAgICAgIH0sXG4gICAgICByb3dTZWxlY3Rpb246ICdtdWx0aXBsZScsXG4gICAgICAvLyBzdXBwcmVzc0hvcml6b250YWxTY3JvbGw6IHRydWUsXG5cbiAgICB9O1xuXG4gIH1cblxuXG5cbiAgb25HcmlkUmVhZHkocGFyYW1zKTogdm9pZHtcbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICB0aGlzLmdyaWRBcGkgPSBwYXJhbXMuYXBpO1xuICAgIHRoaXMuZ3JpZENvbHVtbkFwaSA9IHBhcmFtcy5jb2x1bW5BcGk7XG4gICAgdGhpcy5nZXRFbGVtZW50cygpO1xuICAgIHRoaXMuZ3JpZEFwaS5zaXplQ29sdW1uc1RvRml0KCk7XG4gICAgZm9yIChjb25zdCBjb2wgb2YgdGhpcy5jb2x1bW5EZWZzKSB7XG4gICAgICBpZiAoY29sLmZpZWxkID09PSAnZXN0YXQnKSB7XG4gICAgICAgIHRoaXMuY29sdW1uYUVzdGF0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gXG4gICBcblxuICB9XG5cbiAgcXVpY2tTZWFyY2goKTogdm9pZHtcbiAgICAgIHRoaXMuZ3JpZEFwaS5zZXRRdWlja0ZpbHRlcih0aGlzLnNlYXJjaFZhbHVlKTtcbiAgfVxuXG4gIGdldEVsZW1lbnRzKCk6IHZvaWRcbiAge1xuICAgIHRoaXMuZ2V0QWxsKClcbiAgICAuc3Vic2NyaWJlKChpdGVtcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhpdGVtcyk7XG4gICAgICAgIHRoaXMucm93RGF0YSA9IGl0ZW1zO1xuICAgICAgICBzZXRUaW1lb3V0KCgpPT57dGhpcy5ncmlkQXBpLnNpemVDb2x1bW5zVG9GaXQoKX0sIDMwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZURhdGEoKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICBjb25zdCBzZWxlY3RlZE5vZGVzID0gdGhpcy5ncmlkQXBpLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICBjb25zdCBzZWxlY3RlZERhdGEgPSBzZWxlY3RlZE5vZGVzLm1hcChub2RlID0+IG5vZGUuZGF0YSk7XG4gICAgdGhpcy5yZW1vdmUuZW1pdChzZWxlY3RlZERhdGEpO1xuXG4gICAgaWYodGhpcy5jb2x1bW5hRXN0YXQpXG4gICAge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRSb3dzID0gc2VsZWN0ZWROb2Rlcy5tYXAobm9kZSA9PiBub2RlLnJvd0luZGV4KTtcblxuICAgICAgZm9yIChjb25zdCBpZCBvZiBzZWxlY3RlZFJvd3Mpe1xuICAgICAgICAgIHRoaXMuZ3JpZEFwaS5nZXRSb3dOb2RlKGlkKS5kYXRhLmVzdGF0ID0nRWxpbWluYXQnO1xuICAgICAgICB9XG4gICAgICB0aGlzLmdyaWRPcHRpb25zLmFwaS5yZWZyZXNoQ2VsbHMoKTtcbiAgICB9XG4gICAgdGhpcy5ncmlkT3B0aW9ucy5hcGkuZGVzZWxlY3RBbGwoKTtcbiAgfVxuXG5cblxuXG5cbiAgbmV3RGF0YSgpOiB2b2lkXG4gIHtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIHRoaXMubmV3LmVtaXQodHJ1ZSk7XG4gIH1cblxuICBhcHBseUNoYW5nZXMoKTogdm9pZFxuICB7XG4gICAgY29uc3QgaXRlbXNDaGFuZ2VkOiBhbnlbXSA9IFtdO1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5tYXAua2V5cygpKVxuICAgIHtcbiAgICAgIGl0ZW1zQ2hhbmdlZC5wdXNoKHRoaXMuZ3JpZEFwaS5nZXRSb3dOb2RlKGtleSkuZGF0YSk7XG4gICAgfVxuICAgIHRoaXMuc2VuZENoYW5nZXMuZW1pdChpdGVtc0NoYW5nZWQpO1xuICAgIHRoaXMubWFwLmNsZWFyKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XG4gICAgdGhpcy5wYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9ICB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9O1xuICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKCk7XG4gIH1cblxuXG5cbiAgZGVsZXRlQ2hhbmdlcygpOiB2b2lkXG4gIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29tcHRhZG9yQ2FudmlzOyBpKyspXG4gICAge1xuICAgICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpO1xuICAgIH1cbiAgICB0aGlzLm1hcC5jbGVhcigpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gPSAwO1xuICAgIHRoaXMucGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSAge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTtcbiAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cygpO1xuICB9XG5cblxuICBvbkZpbHRlck1vZGlmaWVkKCk6IHZvaWR7XG4gICAgdGhpcy5kZWxldGVDaGFuZ2VzKCk7XG4gIH1cblxuXG4gIHVuZG8oKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICB0aGlzLmdyaWRBcGkudW5kb0NlbGxFZGl0aW5nKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgLT0gMTtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gKz0gMTtcbiAgfVxuXG4gIHJlZG8oKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICB0aGlzLmdyaWRBcGkucmVkb0NlbGxFZGl0aW5nKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgKz0gMTtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG8gLT0gMTtcbiAgfVxuXG5cbiAgb25DZWxsRWRpdGluZ1N0b3BwZWQoZSlcbiAge1xuICAgICAgaWYgKHRoaXMuY2FudmlBbWJNb2RpZmljYWNpb25zKVxuICAgICAge1xuICAgICAgICB0aGlzLmNvbXB0YWRvckNhbnZpcysrO1xuICAgICAgICB0aGlzLmNvbXB0YWRvclJlZG8gPSAwO1xuICAgICAgICB0aGlzLm9uQ2VsbFZhbHVlQ2hhbmdlZChlKTtcbiAgICAgICAgdGhpcy5jYW52aUFtYk1vZGlmaWNhY2lvbnMgPSBmYWxzZTtcbiAgICAgIH1cbiAgfVxuXG5cblxuICBvbkNlbGxWYWx1ZUNoYW5nZWQocGFyYW1zKTogdm9pZHtcbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtczsgLy8gR3VhcmRhcmVtb3MgbG9zIHBhcmFtZXRyb3MgcG9yIHNpIGhheSBxdWUgaGFjZXIgdW4gYXBwbHkgY2hhbmdlc1xuXG4gICAgaWYgKHRoaXMuY29tcHRhZG9yQ2FudmlzID4gdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvcilcbiAgICAgIC8vIEVzdGEgY29uZGljacODwrNuIHNlcsODwqEgY2llcnRhIHNpIHZlbmltb3MgZGUgZWRpdGFyIGxhIGNlbGEgbyBkZSBoYWNlciB1biByZWRvXG4gICAgICB7XG4gICAgICAgIGlmICghIHRoaXMubWFwLmhhcyhwYXJhbXMubm9kZS5pZCkpIC8vIFNpIG5vIGhhYmlhbW9zIGVkaXRhZG8gbGEgY2VsYSBjb24gYW50ZXJpb3JpZGFkLCBsYSBhw4PCsWFkaW1vcyBhbCBtYXAgeSBsYSBwaW50YW1vcyBkZSB2ZXJkZVxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5tYXAuc2V0KHBhcmFtcy5ub2RlLmlkLCAxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAvLyBTaSB5YSBoYWLDg8KtYW1vcyBtb2RpZmljYWRvIGxhIGNlbGEsIGF1bWVudGFtb3MgZWwgbnVtZXJvIGRlIGNhbWJpb3MgZW4gZXN0YVxuICAgICAgICAgIGNvbnN0IG1vZGlmaWNhY2lvbnNBY3R1YWxzID0gdGhpcy5tYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKTtcbiAgICAgICAgICB0aGlzLm1hcC5zZXQocGFyYW1zLm5vZGUuaWQsIChtb2RpZmljYWNpb25zQWN0dWFscyArIDEpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRBcGkuZ2V0RGlzcGxheWVkUm93QXRJbmRleChwYXJhbXMucm93SW5kZXgpOyAvLyBDb20gaGEgZXN0YWRvIG1vZGlmaWNhZGEgbGEgbGluaWEsIGxhIHBpbnRhbW9zIGRlIHZlcmRlXG4gICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNFOEYxREUnfTtcbiAgICAgICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3Moe3Jvd05vZGVzOiBbcm93XX0pO1xuICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307IC8vIERlZmluaXJlbW9zIGVsIGNlbGxTdHlsZSBibGFuY28gcGFyYSBmdXR1cmFzIG1vZGlmaWNhY2lvbmVzIGludGVybmFzIChlajogZmlsdHJvKVxuICAgICAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yKys7XG5cbiAgICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmNvbXB0YWRvckNhbnZpcyA8IHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IpeyAvLyBFbnRyYXLDg8KhIGFxdcODwq0gc2kgaGVtb3MgaGVjaG8gdW4gdW5kb1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbW9kaWZpY2FjaW9uc0FjdHVhbHMgPSB0aGlzLm1hcC5nZXQocGFyYW1zLm5vZGUuaWQpO1xuICAgICAgICBcbiAgICAgICAgaWYgKG1vZGlmaWNhY2lvbnNBY3R1YWxzID09PSAxKSB7XG4gICAgICAgICAgLy8gU2kgc29sbyB0aWVuZSB1bmEgbW9kaWZpY2FjaW9uLCBxdWllcmUgZGVjaXIgcXVlIGxhIGNlbGEgZXN0w4PCoSBlbiBzdSBlc3RhZG8gaW5pY2lhbCwgcG9yIGxvIHF1ZSBsYSBwaW50YW1vcyBkZSBibGFuY29cbiAgICAgICAgICB0aGlzLm1hcC5kZWxldGUocGFyYW1zLm5vZGUuaWQpO1xuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7XG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBMaSBwb3NhcmVtIHVuIGFsdHJlIGNvcCBlbCBiYWNrZ3JvdW5kIGJsYW5jXG4gICAgICAgICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3Moe3Jvd05vZGVzOiBbcm93XX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1vZGlmaWNhY2lvbnNBY3R1YWxzID4xKSAvLyBMYSBjZWxhIGHDg8K6biBubyBlc3TDg8KhIGVuIHN1IGVzdGFkbyBpbmljaWFsLCBwb3IgbG8gcXVlIHNlZ2d1aXLDg8KhIHZlcmRlXG4gICAgICAgIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBObyBwb2RlbW9zIGhhY2VyIGVsc2UgcG9yIHNpIGhhY2Vtb3MgdW4gdW5kbyBkZSB1bmEgY2VsYSBzaW4gY2FtYmlvc1xuICAgICAgICAgIHRoaXMubWFwLnNldChwYXJhbXMubm9kZS5pZCwgKG1vZGlmaWNhY2lvbnNBY3R1YWxzIC0gMSkpO1xuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7IC8vIENvbW8gYXVuIHRpZW5lIGNhbWJpb3MsIGVsIGJhY2tncm91bmQgdGllbmUgcXVlIHNlZ3VpciB2ZXJkZVxuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNFOEYxREUnfTtcbiAgICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBEZWZpbmlyZW0gZWwgY2VsbFN0eWxlIGJsYW5jIHBlciBwcm94aW1lcyBjZWxlc1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3ItLTsgIC8vIENvbSB2ZW5pZW0gZCd1bmRvLCBoZW0gZGUgZGVjcmVtZW50YXIgZWwgY29tcHRhZG9yIGRlIGNhbnZpc0FudGVyaW9yXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xuICAgICAgaWYocGFyYW1zLm9sZFZhbHVlICE9PSBwYXJhbXMudmFsdWUgJiYgIShwYXJhbXMub2xkVmFsdWUgPT0gbnVsbCAmJiBwYXJhbXMudmFsdWUgPT09ICcnKSApXG4gICAgICB7XG4gICAgICAgIHRoaXMuY2FudmlBbWJNb2RpZmljYWNpb25zID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIGlmICggdGhpcy5tYXAuaGFzKHBhcmFtcy5ub2RlLmlkKSlcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7IC8vIENvbSBlbmNhcmEgdGUgbW9kaWZpY2FjaW9ucywgaGEgZGUgdGVuaXIgZWwgYmFja2dyb3VuZCB2ZXJkXG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0U4RjFERSd9O1xuICAgICAgICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKHtyb3dOb2RlczogW3Jvd119KTtcbiAgICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307IC8vIERlZmluaXJlbW9zIGVsIGNlbGxTdHlsZSBibGFuY28gcGFyYSBmdXR1cmFzIG1vZGlmaWNhY2lvbmVzIGludGVybmFzIChlajogZmlsdHJvKVxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvcisrOyAvLyBDb21vIGFsIGhhY2VyIHVuZG8gdm9sdmVyw4PCoSBhIGVudHJhciBhIGVzdGEgbWlzbWEgZnVuY2nDg8KzbiwgaGF5IHF1ZSBlbnZpYXJsbyBhIHN1IGlmIGNvcnJlc3BvbmRpZW50ZVxuICAgICAgICAgIHRoaXMuZ3JpZEFwaS51bmRvQ2VsbEVkaXRpbmcoKTsgLy9VbmRvIHBhcmEgZGVzaGFjZXIgZWwgY2FtYmlvIHNpbiBtb2RpZmljYWNpb25lcyBpbnRlcm5hbWVudGVcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlLCBIdHRwQ2xpZW50LCBIVFRQX0lOVEVSQ0VQVE9SU30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSwgTm9vcEFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUsIFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG4vL2ltcG9ydCAqIGFzIG9sIGZyb20gJ29wZW5sYXllcnMnO1xyXG5pbXBvcnQge1RyYW5zbGF0ZU1vZHVsZSwgVHJhbnNsYXRlTG9hZGVyLFRyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5cclxuXHJcbmltcG9ydCB7IEFuZ3VsYXJIYWxNb2R1bGUgfSBmcm9tICdAc2l0bXVuL2Zyb250ZW5kLWNvcmUnO1xyXG5cclxuXHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge1NpdG11bkZyb250ZW5kQ29yZU1vZHVsZX0gZnJvbSAnQHNpdG11bi9mcm9udGVuZC1jb3JlJztcclxuaW1wb3J0IHsgRGF0YUdyaWRDb21wb25lbnQgfSBmcm9tICcuL2RhdGEtZ3JpZC9kYXRhLWdyaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQWdHcmlkTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xyXG5pbXBvcnQge01hdEljb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xyXG5cclxuXHJcblxyXG5cclxuLyoqIFNJVE1VTiBwbHVnaW4gY29yZSBtb2R1bGUgKi9cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBSb3V0ZXJNb2R1bGUsXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBOb29wQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIEFuZ3VsYXJIYWxNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICBBZ0dyaWRNb2R1bGUud2l0aENvbXBvbmVudHMoW10pLFxyXG4gICAgU2l0bXVuRnJvbnRlbmRDb3JlTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuIFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBEYXRhR3JpZENvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIE5vb3BBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQW5ndWxhckhhbE1vZHVsZSxcclxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBEYXRhR3JpZENvbXBvbmVudCxcclxuICAgIFNpdG11bkZyb250ZW5kQ29yZU1vZHVsZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNpdG11bkZyb250ZW5kR3VpTW9kdWxlIHtcclxufVxyXG4iXX0=