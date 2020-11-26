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
import * as ɵngcc5 from '@ngx-translate/core';
import * as ɵngcc6 from '@angular/forms';

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
    ɵngcc0.ɵɵelement(0, "label", 18);
} if (rf & 2) {
    ɵngcc0.ɵɵproperty("translate", "Search");
} }
function DataGridComponent_input_7_Template(rf, ctx) { if (rf & 1) {
    const _r17 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "input", 19);
    ɵngcc0.ɵɵlistener("keyup", function DataGridComponent_input_7_Template_input_keyup_0_listener() { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r16 = ɵngcc0.ɵɵnextContext(); return ctx_r16.quickSearch(); })("ngModelChange", function DataGridComponent_input_7_Template_input_ngModelChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r18 = ɵngcc0.ɵɵnextContext(); return ctx_r18.searchValue = $event; });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngModel", ctx_r5.searchValue);
} }
function DataGridComponent_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r20 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 20);
    ɵngcc0.ɵɵlistener("click", function DataGridComponent_button_8_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r20); const ctx_r19 = ɵngcc0.ɵɵnextContext(); return ctx_r19.removeData(); });
    ɵngcc0.ɵɵelementStart(1, "mat-icon", 14);
    ɵngcc0.ɵɵtext(2, " delete ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelement(3, "span", 18);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵproperty("translate", "Remove");
} }
function DataGridComponent_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r22 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 21);
    ɵngcc0.ɵɵlistener("click", function DataGridComponent_button_9_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r22); const ctx_r21 = ɵngcc0.ɵɵnextContext(); return ctx_r21.newData(); });
    ɵngcc0.ɵɵelementStart(1, "mat-icon", 14);
    ɵngcc0.ɵɵtext(2, " add_circle_outline ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelement(3, "span", 18);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵproperty("translate", "New");
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
            if (params.oldValue !== params.value && !(params.oldValue == null && params.value === '')) {
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
DataGridComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: DataGridComponent, selectors: [["app-data-grid"]], inputs: { frameworkComponents: "frameworkComponents", columnDefs: "columnDefs", getAll: "getAll", botoDescartarCanvis: "botoDescartarCanvis", botoUndo: "botoUndo", botoRedo: "botoRedo", botoAplicarCanvis: "botoAplicarCanvis", botoElimina: "botoElimina", botoNou: "botoNou", searchGeneral: "searchGeneral" }, outputs: { remove: "remove", new: "new", sendChanges: "sendChanges" }, decls: 13, vars: 20, consts: [["id", "grup1", 1, "editDivBtns"], ["mat-mini-fab", "", "class", "editBtn", "id", "borrarCanvis", "type", "button", 3, "disabled", "click", 4, "ngIf"], ["mat-mini-fab", "", "class", "editBtn", "id", "undo", 3, "disabled", "click", 4, "ngIf"], ["mat-mini-fab", "", "class", "editBtn", "id", "redo", 3, "disabled", "click", 4, "ngIf"], ["mat-mini-fab", "", "class", "editBtn", "id", "aplicarCanvis", 3, "disabled", "click", 4, "ngIf"], ["id", "grup2", 1, "actionsDivBtns"], [3, "translate", 4, "ngIf"], ["type", "text", "class", "searchGenericInput", "placeholder", "", "ml-2", "", 3, "ngModel", "keyup", "ngModelChange", 4, "ngIf"], ["mat-stroked-button", "", "id", "botoElimina", 3, "click", 4, "ngIf"], ["mat-stroked-button", "", "id", "botoNou", 3, "click", 4, "ngIf"], [1, "row", 2, "height", "100%"], ["id", "myGrid", 1, "ag-theme-alpine", 2, "width", "100%", "height", "100%"], ["rowSelection", "multiple", 1, "ag-theme-alpine", 2, "width", "100%", "height", "100%", 3, "floatingFilter", "rowData", "columnDefs", "gridOptions", "animateRows", "pagination", "modules", "undoRedoCellEditing", "undoRedoCellEditingLimit", "suppressRowClickSelection", "enableCellChangeFlash", "frameworkComponents", "filterModified", "cellEditingStopped", "cellValueChanged", "gridReady"], ["mat-mini-fab", "", "id", "borrarCanvis", "type", "button", 1, "editBtn", 3, "disabled", "click"], ["fontSet", "material-icons-round"], ["mat-mini-fab", "", "id", "undo", 1, "editBtn", 3, "disabled", "click"], ["mat-mini-fab", "", "id", "redo", 1, "editBtn", 3, "disabled", "click"], ["mat-mini-fab", "", "id", "aplicarCanvis", 1, "editBtn", 3, "disabled", "click"], [3, "translate"], ["type", "text", "placeholder", "", "ml-2", "", 1, "searchGenericInput", 3, "ngModel", "keyup", "ngModelChange"], ["mat-stroked-button", "", "id", "botoElimina", 3, "click"], ["mat-stroked-button", "", "id", "botoNou", 3, "click"]], template: function DataGridComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵtemplate(1, DataGridComponent_button_1_Template, 3, 1, "button", 1);
        ɵngcc0.ɵɵtemplate(2, DataGridComponent_button_2_Template, 3, 1, "button", 2);
        ɵngcc0.ɵɵtemplate(3, DataGridComponent_button_3_Template, 3, 1, "button", 3);
        ɵngcc0.ɵɵtemplate(4, DataGridComponent_button_4_Template, 3, 1, "button", 4);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(5, "div", 5);
        ɵngcc0.ɵɵtemplate(6, DataGridComponent_label_6_Template, 1, 1, "label", 6);
        ɵngcc0.ɵɵtemplate(7, DataGridComponent_input_7_Template, 1, 1, "input", 7);
        ɵngcc0.ɵɵtemplate(8, DataGridComponent_button_8_Template, 4, 1, "button", 8);
        ɵngcc0.ɵɵtemplate(9, DataGridComponent_button_9_Template, 4, 1, "button", 9);
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
        ɵngcc0.ɵɵproperty("floatingFilter", true)("rowData", ctx.rowData)("columnDefs", ctx.columnDefs)("gridOptions", ctx.gridOptions)("animateRows", true)("pagination", false)("modules", ctx.modules)("undoRedoCellEditing", true)("undoRedoCellEditingLimit", 200)("suppressRowClickSelection", true)("enableCellChangeFlash", true)("frameworkComponents", ctx.frameworkComponents);
    } }, directives: [ɵngcc1.NgIf, ɵngcc2.AgGridAngular, ɵngcc3.MatButton, ɵngcc4.MatIcon, ɵngcc5.TranslateDirective, ɵngcc6.DefaultValueAccessor, ɵngcc6.NgControlStatus, ɵngcc6.NgModel], styles: ["input[_ngcontent-%COMP%], label[_ngcontent-%COMP%]{display:inline-block;margin:5px 5px 5px 10px}#botoNou[_ngcontent-%COMP%]{color:#fff;background:no-repeat padding-box #68a225;margin-left:3px}#botoElimina[_ngcontent-%COMP%]{background:no-repeat padding-box #fff;margin-left:3px}#aplicarCanvis[_ngcontent-%COMP%]{color:#fff!important;background:no-repeat padding-box #68a225;margin-left:3px}#aplicarCanvis[disabled][_ngcontent-%COMP%]{background:no-repeat padding-box #83976c}#redo[_ngcontent-%COMP%], #undo[_ngcontent-%COMP%]{color:#fff!important;background:#ff9300;margin-left:3px}#redo[disabled][_ngcontent-%COMP%], #undo[disabled][_ngcontent-%COMP%]{background:#ffc97f;margin-left:3px}#borrarCanvis[_ngcontent-%COMP%]{color:#fff!important;background:#df3133}#borrarCanvis[disabled][_ngcontent-%COMP%]{color:#fff!important;background:#da8c8e}.editDivBtns[_ngcontent-%COMP%]{text-align:start;width:20%;height:30px!important;line-height:30px!important}.actionsDivBtns[_ngcontent-%COMP%]{text-align:end;width:80%;height:60px}.actionsDivBtns[_ngcontent-%COMP%], .editDivBtns[_ngcontent-%COMP%]{display:inline-block!important}.actionsDivBtns[_ngcontent-%COMP%]   .mat-stroked-button[_ngcontent-%COMP%]{padding:5px 20px!important}.editDivBtns[_ngcontent-%COMP%]   .mat-mini-fab[_ngcontent-%COMP%]   .mat-button-wrapper[_ngcontent-%COMP%]{padding:inherit!important;display:inherit!important}.editDivBtns[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{height:30px!important;bottom:5px;position:relative}.editDivBtns[_ngcontent-%COMP%]   .mat-mini-fab[_ngcontent-%COMP%]{width:30px;height:30px}.actionsDivBtns[_ngcontent-%COMP%]   .searchGenericInput[_ngcontent-%COMP%]{height:45px!important;width:50%!important}"] });
/** @nocollapse */
DataGridComponent.ctorParameters = () => [];
DataGridComponent.propDecorators = {
    frameworkComponents: [{ type: Input }],
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
                template: `    <div id=grup1 class="editDivBtns">
        <button  mat-mini-fab class="editBtn"  *ngIf="botoDescartarCanvis"  id="borrarCanvis" type="button"  (click)="deleteChanges()" [disabled]="comptadorCanvis <= 0">
            <mat-icon  fontSet="material-icons-round" > close </mat-icon>
        </button>
        <button mat-mini-fab class="editBtn" *ngIf="botoUndo"  id="undo"  (click)="undo()" [disabled]="comptadorCanvis <= 0" >
            <mat-icon fontSet="material-icons-round" > undo </mat-icon>
        </button>
        <button mat-mini-fab class="editBtn" *ngIf="botoRedo"  id="redo"  (click)="redo()" [disabled]="comptadorRedo <= 0">
            <mat-icon fontSet="material-icons-round" > redo </mat-icon>
        </button>
        <button mat-mini-fab class="editBtn" *ngIf="botoAplicarCanvis"  id="aplicarCanvis"  (click)="applyChanges()" [disabled]="comptadorCanvis <= 0" >
            <mat-icon fontSet="material-icons-round" > check </mat-icon>
        </button>
    </div>

    <div id=grup2 class="actionsDivBtns" >
        <label *ngIf="searchGeneral" [translate]="'Search'"> </label>
        <input *ngIf="searchGeneral"type="text" class="searchGenericInput" placeholder="" (keyup)="quickSearch()" [(ngModel)]="searchValue" ml-2 >
        <button *ngIf="botoElimina"  mat-stroked-button id="botoElimina"  (click)="removeData()">
            <mat-icon fontSet="material-icons-round" > delete </mat-icon>
            <span  [translate]="'Remove'"> </span>
            
        </button>
        <button  *ngIf="botoNou" mat-stroked-button id="botoNou"  (click)="newData()">
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
            }]
    }], function () { return []; }, { remove: [{
            type: Output
        }], new: [{
            type: Output
        }], sendChanges: [{
            type: Output
        }], frameworkComponents: [{
            type: Input
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWd1aS5qcyIsInNvdXJjZXMiOlsiQHNpdG11bi9mcm9udGVuZC1ndWkvZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWd1aS9zaXRtdW4tZnJvbnRlbmQtZ3VpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhCQTZHRTs0QkEvQm9CO0lBQW1CLDhCQUl4QixLQUFLO01BQ08sSUFBSSxHQUFHLEVBQWtCO0VBTTVCLEtBQUssVUFzQjNCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUU7QUFBQyxTQUNqQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7Q0FDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDOztLQUN0QyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxTQUN6QixJQUFJLENBQUMsdUJBQXVCO0FBQUcsQ0FBQyxDQUFDLFNBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FDakI7RUFBYSxFQUFFLGtCQUNiLElBQUksRUFBRSxDQUFDLGtCQUNQLE1BQU0sRUFBRSxJQUFJLGtCQUNaLFFBQVEsRUFBRSxJQUFJLGtCQUNkLFNBQVMsRUFBRSxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUMsZUFDeEMsY0FDRCxZQUFZLEVBQUUsVUFBVTtTQUd6QixDQUFDLE1BRUg7O0VBSUQsV0FBVyxDQUFDLE1BQU07S0FDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDO0lBQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQzFCLElBQUksQ0FBQztFQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUN0QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsU0FDbkIs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QUk7QUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFnR3JpZE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbmd1bGFyJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nTW9kdWxlLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBBbGxDb21tdW5pdHlNb2R1bGVzLCBNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYWxsLW1vZHVsZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtZGF0YS1ncmlkJyxcclxuICB0ZW1wbGF0ZTogYCAgICA8ZGl2IGlkPWdydXAxIGNsYXNzPVwiZWRpdERpdkJ0bnNcIj5cclxuICAgICAgICA8YnV0dG9uICBtYXQtbWluaS1mYWIgY2xhc3M9XCJlZGl0QnRuXCIgICpuZ0lmPVwiYm90b0Rlc2NhcnRhckNhbnZpc1wiICBpZD1cImJvcnJhckNhbnZpc1wiIHR5cGU9XCJidXR0b25cIiAgKGNsaWNrKT1cImRlbGV0ZUNoYW5nZXMoKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JDYW52aXMgPD0gMFwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gY2xvc2UgPC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIG1hdC1taW5pLWZhYiBjbGFzcz1cImVkaXRCdG5cIiAqbmdJZj1cImJvdG9VbmRvXCIgIGlkPVwidW5kb1wiICAoY2xpY2spPVwidW5kbygpXCIgW2Rpc2FibGVkXT1cImNvbXB0YWRvckNhbnZpcyA8PSAwXCIgPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiB1bmRvIDwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBtYXQtbWluaS1mYWIgY2xhc3M9XCJlZGl0QnRuXCIgKm5nSWY9XCJib3RvUmVkb1wiICBpZD1cInJlZG9cIiAgKGNsaWNrKT1cInJlZG8oKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JSZWRvIDw9IDBcIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gcmVkbyA8L21hdC1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gbWF0LW1pbmktZmFiIGNsYXNzPVwiZWRpdEJ0blwiICpuZ0lmPVwiYm90b0FwbGljYXJDYW52aXNcIiAgaWQ9XCJhcGxpY2FyQ2FudmlzXCIgIChjbGljayk9XCJhcHBseUNoYW5nZXMoKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JDYW52aXMgPD0gMFwiID5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gY2hlY2sgPC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgaWQ9Z3J1cDIgY2xhc3M9XCJhY3Rpb25zRGl2QnRuc1wiID5cclxuICAgICAgICA8bGFiZWwgKm5nSWY9XCJzZWFyY2hHZW5lcmFsXCIgW3RyYW5zbGF0ZV09XCInU2VhcmNoJ1wiPiA8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCAqbmdJZj1cInNlYXJjaEdlbmVyYWxcInR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJzZWFyY2hHZW5lcmljSW5wdXRcIiBwbGFjZWhvbGRlcj1cIlwiIChrZXl1cCk9XCJxdWlja1NlYXJjaCgpXCIgWyhuZ01vZGVsKV09XCJzZWFyY2hWYWx1ZVwiIG1sLTIgPlxyXG4gICAgICAgIDxidXR0b24gKm5nSWY9XCJib3RvRWxpbWluYVwiICBtYXQtc3Ryb2tlZC1idXR0b24gaWQ9XCJib3RvRWxpbWluYVwiICAoY2xpY2spPVwicmVtb3ZlRGF0YSgpXCI+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IGRlbGV0ZSA8L21hdC1pY29uPlxyXG4gICAgICAgICAgICA8c3BhbiAgW3RyYW5zbGF0ZV09XCInUmVtb3ZlJ1wiPiA8L3NwYW4+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gICpuZ0lmPVwiYm90b05vdVwiIG1hdC1zdHJva2VkLWJ1dHRvbiBpZD1cImJvdG9Ob3VcIiAgKGNsaWNrKT1cIm5ld0RhdGEoKVwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCI+IGFkZF9jaXJjbGVfb3V0bGluZSA8L21hdC1pY29uPiAgICAgIFxyXG4gICAgICAgICAgICA8c3BhbiAgW3RyYW5zbGF0ZV09XCInTmV3J1wiPiA8L3NwYW4+ICAgICAgICAgICBcclxuICAgICAgICA8L2J1dHRvbj5cclxuXHJcblxyXG4gICAgICAgIFxyXG4gICAgPC9kaXY+XHJcblxyXG5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwicm93XCIgc3R5bGU9XCIgaGVpZ2h0OiAxMDAlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRoZW1lLWFscGluZVwiIGlkPVwibXlHcmlkXCIgc3R5bGU9XCIgd2lkdGg6MTAwJTsgaGVpZ2h0OiAxMDAlXCIgPlxyXG4gICAgICAgICAgICA8YWctZ3JpZC1hbmd1bGFyXHJcbiAgICAgICAgICAgIHN0eWxlPVwiIHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCJcclxuICAgICAgICAgICAgY2xhc3M9XCJhZy10aGVtZS1hbHBpbmVcIlxyXG4gICAgICAgICAgICBbZmxvYXRpbmdGaWx0ZXJdPVwidHJ1ZVwiXHJcbiAgICAgICAgICAgIFtyb3dEYXRhXT1cInJvd0RhdGFcIlxyXG4gICAgICAgICAgICBbY29sdW1uRGVmc109XCJjb2x1bW5EZWZzXCJcclxuICAgICAgICAgICAgW2dyaWRPcHRpb25zXT1cImdyaWRPcHRpb25zXCJcclxuICAgICAgICAgICAgW2FuaW1hdGVSb3dzXT1cInRydWVcIlxyXG4gICAgICAgICAgICBbcGFnaW5hdGlvbl09XCJmYWxzZVwiXHJcbiAgICAgICAgICAgIFttb2R1bGVzXT1cIm1vZHVsZXNcIiAgICAgXHJcbiAgICAgICAgICAgIFt1bmRvUmVkb0NlbGxFZGl0aW5nXT1cInRydWVcIiAgICBcclxuICAgICAgICAgICAgW3VuZG9SZWRvQ2VsbEVkaXRpbmdMaW1pdF09IDIwMFxyXG4gICAgICAgICAgICBbc3VwcHJlc3NSb3dDbGlja1NlbGVjdGlvbl09dHJ1ZVxyXG4gICAgICAgICAgICBbZW5hYmxlQ2VsbENoYW5nZUZsYXNoXT10cnVlXHJcbiAgICAgICAgICAgIFtmcmFtZXdvcmtDb21wb25lbnRzXT1cImZyYW1ld29ya0NvbXBvbmVudHNcIlxyXG4gICAgICAgICAgICByb3dTZWxlY3Rpb249XCJtdWx0aXBsZVwiXHJcbiAgICAgICAgICAgIChmaWx0ZXJNb2RpZmllZCk9XCJvbkZpbHRlck1vZGlmaWVkKClcIlxyXG4gICAgICAgICAgICAoY2VsbEVkaXRpbmdTdG9wcGVkKSA9XCJvbkNlbGxFZGl0aW5nU3RvcHBlZCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgKGNlbGxWYWx1ZUNoYW5nZWQpPVwib25DZWxsVmFsdWVDaGFuZ2VkKCRldmVudClcIlxyXG4gICAgICAgICAgICAoZ3JpZFJlYWR5KT1cIm9uR3JpZFJlYWR5KCRldmVudClcIj5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDwvYWctZ3JpZC1hbmd1bGFyPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG5cclxuYCxcclxuICBzdHlsZXM6IFtgaW5wdXQsbGFiZWx7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luOjVweCA1cHggNXB4IDEwcHh9I2JvdG9Ob3V7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjNjhhMjI1O21hcmdpbi1sZWZ0OjNweH0jYm90b0VsaW1pbmF7YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggI2ZmZjttYXJnaW4tbGVmdDozcHh9I2FwbGljYXJDYW52aXN7Y29sb3I6I2ZmZiFpbXBvcnRhbnQ7YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggIzY4YTIyNTttYXJnaW4tbGVmdDozcHh9I2FwbGljYXJDYW52aXNbZGlzYWJsZWRde2JhY2tncm91bmQ6bm8tcmVwZWF0IHBhZGRpbmctYm94ICM4Mzk3NmN9I3JlZG8sI3VuZG97Y29sb3I6I2ZmZiFpbXBvcnRhbnQ7YmFja2dyb3VuZDojZmY5MzAwO21hcmdpbi1sZWZ0OjNweH0jcmVkb1tkaXNhYmxlZF0sI3VuZG9bZGlzYWJsZWRde2JhY2tncm91bmQ6I2ZmYzk3ZjttYXJnaW4tbGVmdDozcHh9I2JvcnJhckNhbnZpc3tjb2xvcjojZmZmIWltcG9ydGFudDtiYWNrZ3JvdW5kOiNkZjMxMzN9I2JvcnJhckNhbnZpc1tkaXNhYmxlZF17Y29sb3I6I2ZmZiFpbXBvcnRhbnQ7YmFja2dyb3VuZDojZGE4YzhlfS5lZGl0RGl2QnRuc3t0ZXh0LWFsaWduOnN0YXJ0O3dpZHRoOjIwJTtoZWlnaHQ6MzBweCFpbXBvcnRhbnQ7bGluZS1oZWlnaHQ6MzBweCFpbXBvcnRhbnR9LmFjdGlvbnNEaXZCdG5ze3RleHQtYWxpZ246ZW5kO3dpZHRoOjgwJTtoZWlnaHQ6NjBweH0uYWN0aW9uc0RpdkJ0bnMsLmVkaXREaXZCdG5ze2Rpc3BsYXk6aW5saW5lLWJsb2NrIWltcG9ydGFudH0uYWN0aW9uc0RpdkJ0bnMgLm1hdC1zdHJva2VkLWJ1dHRvbntwYWRkaW5nOjVweCAyMHB4IWltcG9ydGFudH0uZWRpdERpdkJ0bnMgLm1hdC1taW5pLWZhYiAubWF0LWJ1dHRvbi13cmFwcGVye3BhZGRpbmc6aW5oZXJpdCFpbXBvcnRhbnQ7ZGlzcGxheTppbmhlcml0IWltcG9ydGFudH0uZWRpdERpdkJ0bnMgLm1hdC1pY29ue2hlaWdodDozMHB4IWltcG9ydGFudDtib3R0b206NXB4O3Bvc2l0aW9uOnJlbGF0aXZlfS5lZGl0RGl2QnRucyAubWF0LW1pbmktZmFie3dpZHRoOjMwcHg7aGVpZ2h0OjMwcHh9LmFjdGlvbnNEaXZCdG5zIC5zZWFyY2hHZW5lcmljSW5wdXR7aGVpZ2h0OjQ1cHghaW1wb3J0YW50O3dpZHRoOjUwJSFpbXBvcnRhbnR9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFHcmlkQ29tcG9uZW50IHtcclxuIFxyXG5cclxuXHJcblxyXG4gIG1vZHVsZXM6IE1vZHVsZVtdID0gQWxsQ29tbXVuaXR5TW9kdWxlcztcclxuICBzZWFyY2hWYWx1ZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgZ3JpZEFwaTtcclxuICBwcml2YXRlIGdyaWRDb2x1bW5BcGk7XHJcbiAgY29sdW1uYUVzdGF0ID0gZmFsc2U7XHJcbiAgbWFwOiBNYXA8bnVtYmVyLCBudW1iZXI+ID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTsgLy8gR3VhcmRhcmVtb3MgZWwgaWQgZGUgbGFzIGNlbGFzIG1vZGlmaWNhZGFzIGkgZWwgbsOCwrogZGUgZWRpY2lvbmVzIGhlY2hhcyBzb2JyZSBlc3Rhc1xyXG4gIHByaXZhdGUgcGFyYW1zOyAvL1BhcmFtZXRyb3MgZGVsIGdyaWQgZW4gbGEgdWx0aW1hIG1vZGlmaWNhY2lvbiBoZWNoYSAocG9yIHNpIGhhY2Vtb3MgYXBwbHkgY2hhbmdlcylcclxuICByb3dEYXRhOiBhbnlbXTtcclxuICBjb21wdGFkb3JDYW52aXM6IG51bWJlcjsgLy8gTnVtZXJvIGRlIGVkaWNpb25lcyBoZWNoYXMgc29icmUgbGFzIGNlbGFzXHJcbiAgY29tcHRhZG9yQ2FudmlzQW50ZXJpb3I6IG51bWJlcjsgLy8gIE51bWVybyBkZSBlZGljaW9uZXMgcXVlIGhhYmlhIGFudGVzIGRlIGhhY2VyIGxhIHVsdGltYSBtb2RpZmljYWNpb24gKGNvbXB0YWRvckNhbnZpcylcclxuICBjb21wdGFkb3JSZWRvOiBudW1iZXI7IC8vIE51bWVybyBkZSByZWRvIHF1ZSBwb2RlbW9zIGhhY2VyXHJcbiAgY2FudmlBbWJNb2RpZmljYWNpb25zID0gZmFsc2U7XHJcbiAgZ3JpZE9wdGlvbnM7XHJcbiAgQElucHV0KCkgZnJhbWV3b3JrQ29tcG9uZW50czogYW55O1xyXG4gIEBJbnB1dCgpIGNvbHVtbkRlZnM6IGFueVtdO1xyXG4gIEBJbnB1dCgpIGdldEFsbDogKCkgPT4gT2JzZXJ2YWJsZTxhbnk+O1xyXG4gIEBJbnB1dCgpIGJvdG9EZXNjYXJ0YXJDYW52aXM6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYm90b1VuZG86IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYm90b1JlZG86IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYm90b0FwbGljYXJDYW52aXM6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYm90b0VsaW1pbmE6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYm90b05vdTogYm9vbGVhbjtcclxuICBASW5wdXQoKSBzZWFyY2hHZW5lcmFsOiBib29sZWFuO1xyXG5cclxuXHJcblxyXG4gIEBPdXRwdXQoKSByZW1vdmU6IEV2ZW50RW1pdHRlcjxhbnlbXT47XHJcbiAgQE91dHB1dCgpIG5ldzogRXZlbnRFbWl0dGVyPG51bWJlcj47XHJcbiAgQE91dHB1dCgpIHNlbmRDaGFuZ2VzOiBFdmVudEVtaXR0ZXI8YW55W10+O1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgdGhpcy5yZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLm5ldyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHRoaXMuc2VuZENoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcyA9IDA7XHJcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yID0gMDtcclxuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XHJcbiAgICB0aGlzLmdyaWRPcHRpb25zID0ge1xyXG4gICAgICBkZWZhdWx0Q29sRGVmOiB7XHJcbiAgICAgICAgZmxleDogMSxcclxuICAgICAgICBmaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgZWRpdGFibGU6IHRydWUsXHJcbiAgICAgICAgY2VsbFN0eWxlOiB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9LFxyXG4gICAgICB9LFxyXG4gICAgICByb3dTZWxlY3Rpb246ICdtdWx0aXBsZScsXHJcbiAgICAgIC8vIHN1cHByZXNzSG9yaXpvbnRhbFNjcm9sbDogdHJ1ZSxcclxuXHJcbiAgICB9O1xyXG5cclxuICB9XHJcblxyXG5cclxuXHJcbiAgb25HcmlkUmVhZHkocGFyYW1zKTogdm9pZHtcclxuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xyXG4gICAgdGhpcy5ncmlkQXBpID0gcGFyYW1zLmFwaTtcclxuICAgIHRoaXMuZ3JpZENvbHVtbkFwaSA9IHBhcmFtcy5jb2x1bW5BcGk7XHJcbiAgICB0aGlzLmdldEVsZW1lbnRzKCk7XHJcbiAgICB0aGlzLmdyaWRBcGkuc2l6ZUNvbHVtbnNUb0ZpdCgpO1xyXG4gICAgZm9yIChjb25zdCBjb2wgb2YgdGhpcy5jb2x1bW5EZWZzKSB7XHJcbiAgICAgIGlmIChjb2wuZmllbGQgPT09ICdlc3RhdCcpIHtcclxuICAgICAgICB0aGlzLmNvbHVtbmFFc3RhdCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuIFxyXG4gICBcclxuXHJcbiAgfVxyXG5cclxuICBxdWlja1NlYXJjaCgpOiB2b2lke1xyXG4gICAgICB0aGlzLmdyaWRBcGkuc2V0UXVpY2tGaWx0ZXIodGhpcy5zZWFyY2hWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRFbGVtZW50cygpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5nZXRBbGwoKVxyXG4gICAgLnN1YnNjcmliZSgoaXRlbXMpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpdGVtcyk7XHJcbiAgICAgICAgdGhpcy5yb3dEYXRhID0gaXRlbXM7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKT0+e3RoaXMuZ3JpZEFwaS5zaXplQ29sdW1uc1RvRml0KCl9LCAzMCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbW92ZURhdGEoKTogdm9pZCB7XHJcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ3JpZEFwaS5nZXRTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICBjb25zdCBzZWxlY3RlZERhdGEgPSBzZWxlY3RlZE5vZGVzLm1hcChub2RlID0+IG5vZGUuZGF0YSk7XHJcbiAgICB0aGlzLnJlbW92ZS5lbWl0KHNlbGVjdGVkRGF0YSk7XHJcblxyXG4gICAgaWYodGhpcy5jb2x1bW5hRXN0YXQpXHJcbiAgICB7XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkUm93cyA9IHNlbGVjdGVkTm9kZXMubWFwKG5vZGUgPT4gbm9kZS5yb3dJbmRleCk7XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IGlkIG9mIHNlbGVjdGVkUm93cyl7XHJcbiAgICAgICAgICB0aGlzLmdyaWRBcGkuZ2V0Um93Tm9kZShpZCkuZGF0YS5lc3RhdCA9J0VsaW1pbmF0JztcclxuICAgICAgICB9XHJcbiAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuYXBpLnJlZnJlc2hDZWxscygpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ncmlkT3B0aW9ucy5hcGkuZGVzZWxlY3RBbGwoKTtcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICBuZXdEYXRhKCk6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xyXG4gICAgdGhpcy5uZXcuZW1pdCgtMSk7XHJcbiAgfVxyXG5cclxuICBhcHBseUNoYW5nZXMoKTogdm9pZFxyXG4gIHtcclxuICAgIGNvbnN0IGl0ZW1zQ2hhbmdlZDogYW55W10gPSBbXTtcclxuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLm1hcC5rZXlzKCkpXHJcbiAgICB7XHJcbiAgICAgIGl0ZW1zQ2hhbmdlZC5wdXNoKHRoaXMuZ3JpZEFwaS5nZXRSb3dOb2RlKGtleSkuZGF0YSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbmRDaGFuZ2VzLmVtaXQoaXRlbXNDaGFuZ2VkKTtcclxuICAgIHRoaXMubWFwLmNsZWFyKCk7XHJcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcyA9IDA7XHJcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yID0gMDtcclxuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XHJcbiAgICB0aGlzLnBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0gIHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307XHJcbiAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cygpO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICBkZWxldGVDaGFuZ2VzKCk6IHZvaWRcclxuICB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29tcHRhZG9yQ2FudmlzOyBpKyspXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuZ3JpZEFwaS51bmRvQ2VsbEVkaXRpbmcoKTtcclxuICAgIH1cclxuICAgIHRoaXMubWFwLmNsZWFyKCk7XHJcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yID0gMDtcclxuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzID0gMDtcclxuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XHJcbiAgICB0aGlzLnBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0gIHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307XHJcbiAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cygpO1xyXG4gIH1cclxuXHJcblxyXG4gIG9uRmlsdGVyTW9kaWZpZWQoKTogdm9pZHtcclxuICAgIHRoaXMuZGVsZXRlQ2hhbmdlcygpO1xyXG4gIH1cclxuXHJcblxyXG4gIHVuZG8oKTogdm9pZCB7XHJcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xyXG4gICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpO1xyXG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgLT0gMTtcclxuICAgIHRoaXMuY29tcHRhZG9yUmVkbyArPSAxO1xyXG4gIH1cclxuXHJcbiAgcmVkbygpOiB2b2lkIHtcclxuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XHJcbiAgICB0aGlzLmdyaWRBcGkucmVkb0NlbGxFZGl0aW5nKCk7XHJcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcyArPSAxO1xyXG4gICAgdGhpcy5jb21wdGFkb3JSZWRvIC09IDE7XHJcbiAgfVxyXG5cclxuXHJcbiAgb25DZWxsRWRpdGluZ1N0b3BwZWQoZSlcclxuICB7XHJcbiAgICAgIGlmICh0aGlzLmNhbnZpQW1iTW9kaWZpY2FjaW9ucylcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzKys7XHJcbiAgICAgICAgdGhpcy5jb21wdGFkb3JSZWRvID0gMDtcclxuICAgICAgICB0aGlzLm9uQ2VsbFZhbHVlQ2hhbmdlZChlKTtcclxuICAgICAgICB0aGlzLmNhbnZpQW1iTW9kaWZpY2FjaW9ucyA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIG9uQ2VsbFZhbHVlQ2hhbmdlZChwYXJhbXMpOiB2b2lke1xyXG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7IC8vIEd1YXJkYXJlbW9zIGxvcyBwYXJhbWV0cm9zIHBvciBzaSBoYXkgcXVlIGhhY2VyIHVuIGFwcGx5IGNoYW5nZXNcclxuXHJcbiAgICBpZiAodGhpcy5jb21wdGFkb3JDYW52aXMgPiB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yKVxyXG4gICAgICAvLyBFc3RhIGNvbmRpY2nDg8KzbiBzZXLDg8KhIGNpZXJ0YSBzaSB2ZW5pbW9zIGRlIGVkaXRhciBsYSBjZWxhIG8gZGUgaGFjZXIgdW4gcmVkb1xyXG4gICAgICB7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5vbGRWYWx1ZSAhPT0gcGFyYW1zLnZhbHVlICYmICEocGFyYW1zLm9sZFZhbHVlID09IG51bGwgJiYgcGFyYW1zLnZhbHVlID09PSAnJykpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWYgKCEgdGhpcy5tYXAuaGFzKHBhcmFtcy5ub2RlLmlkKSkgLy8gU2kgbm8gaGFiaWFtb3MgZWRpdGFkbyBsYSBjZWxhIGNvbiBhbnRlcmlvcmlkYWQsIGxhIGHDg8KxYWRpbW9zIGFsIG1hcCB5IGxhIHBpbnRhbW9zIGRlIHZlcmRlXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLnNldChwYXJhbXMubm9kZS5pZCwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgLy8gU2kgeWEgaGFiw4PCrWFtb3MgbW9kaWZpY2FkbyBsYSBjZWxhLCBhdW1lbnRhbW9zIGVsIG51bWVybyBkZSBjYW1iaW9zIGVuIGVzdGFcclxuICAgICAgICAgICAgY29uc3QgbW9kaWZpY2FjaW9uc0FjdHVhbHMgPSB0aGlzLm1hcC5nZXQocGFyYW1zLm5vZGUuaWQpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5zZXQocGFyYW1zLm5vZGUuaWQsIChtb2RpZmljYWNpb25zQWN0dWFscyArIDEpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7IC8vIENvbSBoYSBlc3RhZG8gbW9kaWZpY2FkYSBsYSBsaW5pYSwgbGEgcGludGFtb3MgZGUgdmVyZGVcclxuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNFOEYxREUnfTtcclxuICAgICAgICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKHtyb3dOb2RlczogW3Jvd119KTtcclxuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTsgLy8gRGVmaW5pcmVtb3MgZWwgY2VsbFN0eWxlIGJsYW5jbyBwYXJhIGZ1dHVyYXMgbW9kaWZpY2FjaW9uZXMgaW50ZXJuYXMgKGVqOiBmaWx0cm8pXHJcbiAgICAgICAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yKys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5jb21wdGFkb3JDYW52aXMgPCB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yKXsgLy8gRW50cmFyw4PCoSBhcXXDg8KtIHNpIGhlbW9zIGhlY2hvIHVuIHVuZG9cclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBtb2RpZmljYWNpb25zQWN0dWFscyA9IHRoaXMubWFwLmdldChwYXJhbXMubm9kZS5pZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG1vZGlmaWNhY2lvbnNBY3R1YWxzID09PSAxKSB7XHJcbiAgICAgICAgICAvLyBTaSBzb2xvIHRpZW5lIHVuYSBtb2RpZmljYWNpb24sIHF1aWVyZSBkZWNpciBxdWUgbGEgY2VsYSBlc3TDg8KhIGVuIHN1IGVzdGFkbyBpbmljaWFsLCBwb3IgbG8gcXVlIGxhIHBpbnRhbW9zIGRlIGJsYW5jb1xyXG4gICAgICAgICAgdGhpcy5tYXAuZGVsZXRlKHBhcmFtcy5ub2RlLmlkKTtcclxuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7XHJcbiAgICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307IC8vIExpIHBvc2FyZW0gdW4gYWx0cmUgY29wIGVsIGJhY2tncm91bmQgYmxhbmNcclxuICAgICAgICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKHtyb3dOb2RlczogW3Jvd119KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobW9kaWZpY2FjaW9uc0FjdHVhbHMgPjEpIC8vIExhIGNlbGEgYcODwrpuIG5vIGVzdMODwqEgZW4gc3UgZXN0YWRvIGluaWNpYWwsIHBvciBsbyBxdWUgc2VnZ3VpcsODwqEgdmVyZGVcclxuICAgICAgICB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm8gcG9kZW1vcyBoYWNlciBlbHNlIHBvciBzaSBoYWNlbW9zIHVuIHVuZG8gZGUgdW5hIGNlbGEgc2luIGNhbWJpb3NcclxuICAgICAgICAgIHRoaXMubWFwLnNldChwYXJhbXMubm9kZS5pZCwgKG1vZGlmaWNhY2lvbnNBY3R1YWxzIC0gMSkpO1xyXG4gICAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5ncmlkQXBpLmdldERpc3BsYXllZFJvd0F0SW5kZXgocGFyYW1zLnJvd0luZGV4KTsgLy8gQ29tbyBhdW4gdGllbmUgY2FtYmlvcywgZWwgYmFja2dyb3VuZCB0aWVuZSBxdWUgc2VndWlyIHZlcmRlXHJcbiAgICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRThGMURFJ307XHJcbiAgICAgICAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XHJcbiAgICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307IC8vIERlZmluaXJlbSBlbCBjZWxsU3R5bGUgYmxhbmMgcGVyIHByb3hpbWVzIGNlbGVzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3ItLTsgIC8vIENvbSB2ZW5pZW0gZCd1bmRvLCBoZW0gZGUgZGVjcmVtZW50YXIgZWwgY29tcHRhZG9yIGRlIGNhbnZpc0FudGVyaW9yXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xyXG4gICAgICBpZihwYXJhbXMub2xkVmFsdWUgIT09IHBhcmFtcy52YWx1ZSAmJiAhKHBhcmFtcy5vbGRWYWx1ZSA9PSBudWxsICYmIHBhcmFtcy52YWx1ZSA9PT0gJycpIClcclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuY2FudmlBbWJNb2RpZmljYWNpb25zID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIGlmICggdGhpcy5tYXAuaGFzKHBhcmFtcy5ub2RlLmlkKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRBcGkuZ2V0RGlzcGxheWVkUm93QXRJbmRleChwYXJhbXMucm93SW5kZXgpOyAvLyBDb20gZW5jYXJhIHRlIG1vZGlmaWNhY2lvbnMsIGhhIGRlIHRlbmlyIGVsIGJhY2tncm91bmQgdmVyZFxyXG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0U4RjFERSd9O1xyXG4gICAgICAgICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3Moe3Jvd05vZGVzOiBbcm93XX0pO1xyXG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBEZWZpbmlyZW1vcyBlbCBjZWxsU3R5bGUgYmxhbmNvIHBhcmEgZnV0dXJhcyBtb2RpZmljYWNpb25lcyBpbnRlcm5hcyAoZWo6IGZpbHRybylcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvcisrOyAvLyBDb21vIGFsIGhhY2VyIHVuZG8gdm9sdmVyw4PCoSBhIGVudHJhciBhIGVzdGEgbWlzbWEgZnVuY2nDg8KzbiwgaGF5IHF1ZSBlbnZpYXJsbyBhIHN1IGlmIGNvcnJlc3BvbmRpZW50ZVxyXG4gICAgICAgICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpOyAvL1VuZG8gcGFyYSBkZXNoYWNlciBlbCBjYW1iaW8gc2luIG1vZGlmaWNhY2lvbmVzIGludGVybmFtZW50ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlLCBIdHRwQ2xpZW50LCBIVFRQX0lOVEVSQ0VQVE9SU30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSwgTm9vcEFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUsIFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG4vL2ltcG9ydCAqIGFzIG9sIGZyb20gJ29wZW5sYXllcnMnO1xyXG5pbXBvcnQge1RyYW5zbGF0ZU1vZHVsZSwgVHJhbnNsYXRlTG9hZGVyLFRyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5cclxuXHJcbmltcG9ydCB7IEFuZ3VsYXJIYWxNb2R1bGUgfSBmcm9tICdAc2l0bXVuL2Zyb250ZW5kLWNvcmUnO1xyXG5cclxuXHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge1NpdG11bkZyb250ZW5kQ29yZU1vZHVsZX0gZnJvbSAnQHNpdG11bi9mcm9udGVuZC1jb3JlJztcclxuaW1wb3J0IHsgRGF0YUdyaWRDb21wb25lbnQgfSBmcm9tICcuL2RhdGEtZ3JpZC9kYXRhLWdyaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQWdHcmlkTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xyXG5pbXBvcnQge01hdEljb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xyXG5cclxuXHJcblxyXG5cclxuLyoqIFNJVE1VTiBwbHVnaW4gY29yZSBtb2R1bGUgKi9cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBSb3V0ZXJNb2R1bGUsXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBOb29wQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIEFuZ3VsYXJIYWxNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICBBZ0dyaWRNb2R1bGUud2l0aENvbXBvbmVudHMoW10pLFxyXG4gICAgU2l0bXVuRnJvbnRlbmRDb3JlTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuIFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBEYXRhR3JpZENvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIE5vb3BBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQW5ndWxhckhhbE1vZHVsZSxcclxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBEYXRhR3JpZENvbXBvbmVudCxcclxuICAgIFNpdG11bkZyb250ZW5kQ29yZU1vZHVsZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNpdG11bkZyb250ZW5kR3VpTW9kdWxlIHtcclxufVxyXG4iXX0=