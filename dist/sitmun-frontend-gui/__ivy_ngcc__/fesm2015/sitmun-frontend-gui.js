import { Component, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularHalModule, SitmunFrontendCoreModule } from '@sitmun/frontend-core';
import localeCa from '@angular/common/locales/ca';
import localeEs from '@angular/common/locales/es';
import { AgGridModule } from '@ag-grid-community/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/material/button';
import * as ɵngcc2 from '@angular/material/icon';
import * as ɵngcc3 from '@ngx-translate/core';
import * as ɵngcc4 from '@angular/common';
import * as ɵngcc5 from '@angular/material/menu';
import * as ɵngcc6 from '@ag-grid-community/angular';
import * as ɵngcc7 from '@angular/forms';
import * as ɵngcc8 from '@angular/material/dialog';

function DataGridComponent_span_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "span", 17);
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("translate", ctx_r0.title);
} }
function DataGridComponent_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r16 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 18);
    ɵngcc0.ɵɵlistener("click", function DataGridComponent_button_2_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r16); const ctx_r15 = ɵngcc0.ɵɵnextContext(); return ctx_r15.deleteChanges(); });
    ɵngcc0.ɵɵelementStart(1, "mat-icon", 19);
    ɵngcc0.ɵɵtext(2, " close ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("disabled", ctx_r1.changeCounter <= 0);
} }
function DataGridComponent_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r18 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 20);
    ɵngcc0.ɵɵlistener("click", function DataGridComponent_button_3_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r18); const ctx_r17 = ɵngcc0.ɵɵnextContext(); return ctx_r17.undo(); });
    ɵngcc0.ɵɵelementStart(1, "mat-icon", 19);
    ɵngcc0.ɵɵtext(2, " undo ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("disabled", ctx_r2.changeCounter <= 0);
} }
function DataGridComponent_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r20 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 21);
    ɵngcc0.ɵɵlistener("click", function DataGridComponent_button_4_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r20); const ctx_r19 = ɵngcc0.ɵɵnextContext(); return ctx_r19.redo(); });
    ɵngcc0.ɵɵelementStart(1, "mat-icon", 19);
    ɵngcc0.ɵɵtext(2, " redo ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("disabled", ctx_r3.redoCounter <= 0);
} }
function DataGridComponent_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r22 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 22);
    ɵngcc0.ɵɵlistener("click", function DataGridComponent_button_5_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r22); const ctx_r21 = ɵngcc0.ɵɵnextContext(); return ctx_r21.applyChanges(); });
    ɵngcc0.ɵɵelementStart(1, "mat-icon", 19);
    ɵngcc0.ɵɵtext(2, " check ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("disabled", ctx_r4.changeCounter <= 0);
} }
function DataGridComponent_label_7_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "label", 17);
} if (rf & 2) {
    ɵngcc0.ɵɵproperty("translate", "Search");
} }
function DataGridComponent_input_8_Template(rf, ctx) { if (rf & 1) {
    const _r24 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "input", 23);
    ɵngcc0.ɵɵlistener("keyup", function DataGridComponent_input_8_Template_input_keyup_0_listener() { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r23 = ɵngcc0.ɵɵnextContext(); return ctx_r23.quickSearch(); })("ngModelChange", function DataGridComponent_input_8_Template_input_ngModelChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r24); const ctx_r25 = ɵngcc0.ɵɵnextContext(); return ctx_r25.searchValue = $event; });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngModel", ctx_r6.searchValue);
} }
function DataGridComponent_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r27 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 24);
    ɵngcc0.ɵɵlistener("click", function DataGridComponent_button_9_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r27); const ctx_r26 = ɵngcc0.ɵɵnextContext(); return ctx_r26.removeData(); });
    ɵngcc0.ɵɵelementStart(1, "mat-icon", 19);
    ɵngcc0.ɵɵtext(2, " delete ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelement(3, "span", 17);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵproperty("translate", "Remove");
} }
function DataGridComponent_button_10_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "button", 25);
    ɵngcc0.ɵɵelement(1, "span", 17);
    ɵngcc0.ɵɵelementStart(2, "mat-icon", 19);
    ɵngcc0.ɵɵtext(3, " keyboard_arrow_down ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    ɵngcc0.ɵɵnextContext();
    const _r9 = ɵngcc0.ɵɵreference(12);
    ɵngcc0.ɵɵproperty("matMenuTriggerFor", _r9);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("translate", "Actions");
} }
function DataGridComponent_button_13_Template(rf, ctx) { if (rf & 1) {
    const _r29 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 26);
    ɵngcc0.ɵɵlistener("click", function DataGridComponent_button_13_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r29); const ctx_r28 = ɵngcc0.ɵɵnextContext(); return ctx_r28.exportData(); });
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵpipe(2, "translate");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1(" ", ɵngcc0.ɵɵpipeBind1(2, 1, "Export"), " ");
} }
function DataGridComponent_button_14_Template(rf, ctx) { if (rf & 1) {
    const _r31 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 26);
    ɵngcc0.ɵɵlistener("click", function DataGridComponent_button_14_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r31); const ctx_r30 = ɵngcc0.ɵɵnextContext(); return ctx_r30.onDuplicateButtonClicked(); });
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵpipe(2, "translate");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1(" ", ɵngcc0.ɵɵpipeBind1(2, 1, "Duplicate"), "");
} }
function DataGridComponent_button_15_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "button", 27);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵpipe(2, "translate");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1(" ", ɵngcc0.ɵɵpipeBind1(2, 1, "Search/Replace"), "");
} }
function DataGridComponent_button_16_Template(rf, ctx) { if (rf & 1) {
    const _r33 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 28);
    ɵngcc0.ɵɵlistener("click", function DataGridComponent_button_16_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r33); const ctx_r32 = ɵngcc0.ɵɵnextContext(); return ctx_r32.newData(); });
    ɵngcc0.ɵɵelementStart(1, "mat-icon", 19);
    ɵngcc0.ɵɵtext(2, " add_circle_outline ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelement(3, "span", 17);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵproperty("translate", "New");
} }
function DataGridComponent_button_17_Template(rf, ctx) { if (rf & 1) {
    const _r35 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 28);
    ɵngcc0.ɵɵlistener("click", function DataGridComponent_button_17_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r35); const ctx_r34 = ɵngcc0.ɵɵnextContext(); return ctx_r34.onAddButtonClicked(); });
    ɵngcc0.ɵɵelementStart(1, "mat-icon", 19);
    ɵngcc0.ɵɵtext(2, " add_circle_outline ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelement(3, "span", 17);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵproperty("translate", "Add");
} }
function DialogGridComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 6);
    ɵngcc0.ɵɵelementStart(1, "app-data-grid", 7);
    ɵngcc0.ɵɵlistener("getSelectedRows", function DialogGridComponent_div_3_Template_app_data_grid_getSelectedRows_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r4); const ctx_r3 = ɵngcc0.ɵɵnextContext(); return ctx_r3.joinRowsReceived($event); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const getAll_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("columnDefs", ctx_r0.columnDefsTable[i_r2])("themeGrid", ctx_r0.themeGrid)("getAll", getAll_r1)("globalSearch", true)("singleSelection", ctx_r0.singleSelectionTable[i_r2])("title", ctx_r0.titlesTable[i_r2])("nonEditable", ctx_r0.nonEditable)("eventGetSelectedRowsSubscription", ctx_r0.getAllRows.asObservable());
} }
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
BtnEditRenderedComponent.ɵfac = function BtnEditRenderedComponent_Factory(t) { return new (t || BtnEditRenderedComponent)(); };
BtnEditRenderedComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: BtnEditRenderedComponent, selectors: [["app-btn-edit-rendered"]], decls: 3, vars: 0, consts: [["mat-mini-fab", "", "type", "button", 1, "buttonEdit", 3, "click"], ["fontSet", "material-icons-round", 1, "iconEdit"]], template: function BtnEditRenderedComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "button", 0);
        ɵngcc0.ɵɵlistener("click", function BtnEditRenderedComponent_Template_button_click_0_listener($event) { return ctx.btnClickedHandler($event); });
        ɵngcc0.ɵɵelementStart(1, "mat-icon", 1);
        ɵngcc0.ɵɵtext(2, " edit ");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } }, directives: [ɵngcc1.MatButton, ɵngcc2.MatIcon], styles: [".buttonEdit[_ngcontent-%COMP%]{color:#000;background-color:#ddd;width:20px;margin-top:3px;height:20px;box-shadow:none}.iconEdit[_ngcontent-%COMP%]{font-size:13px;margin-top:-10px;margin-left:-2px}"] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(BtnEditRenderedComponent, [{
        type: Component,
        args: [{
                selector: 'app-btn-edit-rendered',
                template: `<button mat-mini-fab class="buttonEdit"  type="button"  (click)="btnClickedHandler($event)" >
  <mat-icon class="iconEdit"   fontSet="material-icons-round" > edit </mat-icon>
</button> `,
                styles: [`.buttonEdit{color:#000;background-color:#ddd;width:20px;margin-top:3px;height:20px;box-shadow:none}.iconEdit{font-size:13px;margin-top:-10px;margin-left:-2px}`]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DataGridComponent {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        this.modules = AllCommunityModules;
        this.statusColumn = false;
        this.changesMap = new Map();
        this.modificationChange = false;
        this.undoNoChanges = false;
        this.translate = translate;
        this.frameworkComponents = {
            btnEditRendererComponent: BtnEditRenderedComponent
        };
        this.remove = new EventEmitter();
        this.new = new EventEmitter();
        this.add = new EventEmitter();
        this.sendChanges = new EventEmitter();
        this.getSelectedRows = new EventEmitter();
        this.duplicate = new EventEmitter();
        this.getAllRows = new EventEmitter();
        this.changeCounter = 0;
        this.previousChangeCounter = 0;
        this.redoCounter = 0;
        this.gridOptions = {
            defaultColDef: {
                sortable: true,
                flex: 1,
                filter: true,
                editable: !this.nonEditable,
                cellStyle: { backgroundColor: '#FFFFFF' },
            },
            columnTypes: {
                dateColumn: {
                    filter: 'agDateColumnFilter',
                    filterParams: {
                        /**
                         * @param {?} filterLocalDateAtMidnight
                         * @param {?} cellValue
                         * @return {?}
                         */
                        comparator(filterLocalDateAtMidnight, cellValue) {
                            /** @type {?} */
                            const dateCellValue = new Date(cellValue);
                            /** @type {?} */
                            const dateFilter = new Date(filterLocalDateAtMidnight);
                            if (dateCellValue.getTime() < dateFilter.getTime()) {
                                return -1;
                            }
                            else if (dateCellValue.getTime() > dateFilter.getTime()) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                        },
                    },
                    suppressMenu: true
                }
            },
            rowSelection: 'multiple',
            singleClickEdit: true,
            // suppressHorizontalScroll: true,
            localeTextFunc: (key, defaultValue) => {
                /** @type {?} */
                const data = this.translate.instant(key);
                return data === key ? defaultValue : data;
            }
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.eventRefreshSubscription) {
            this._eventRefreshSubscription = this.eventRefreshSubscription.subscribe(() => {
                this.getElements();
            });
        }
        if (this.eventGetSelectedRowsSubscription) {
            this._eventGetSelectedRowsSubscription = this.eventGetSelectedRowsSubscription.subscribe(() => {
                this.emitSelectedRows();
            });
        }
        if (this.eventGetAllRowsSubscription) {
            this._eventGetAllRowsSubscription = this.eventGetAllRowsSubscription.subscribe(() => {
                this.emitAllRows();
            });
        }
        if (this.eventAddItemsSubscription) {
            this.eventAddItemsSubscription.subscribe((items) => {
                this.addItems(items);
            });
        }
    }
    /**
     * @param {?} params
     * @return {?}
     */
    onGridReady(params) {
        if (this.singleSelection) {
            this.gridOptions.rowSelection = 'single';
        }
        // if (this.nonEditable) {this.gridOptions.defaultColDef.editable = false}
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
    emitSelectedRows() {
        /** @type {?} */
        const selectedNodes = this.gridApi.getSelectedNodes();
        /** @type {?} */
        const selectedData = selectedNodes.map(node => node.data);
        this.getSelectedRows.emit(selectedData);
    }
    /**
     * @return {?}
     */
    emitAllRows() {
        /** @type {?} */
        let rowData = [];
        this.gridApi.forEachNode(node => rowData.push(node.data));
        this.getSelectedRows.emit(rowData);
    }
    /**
     * @param {?} columnkeys
     * @return {?}
     */
    getColumnKeysAndHeaders(columnkeys) {
        /** @type {?} */
        let header = [];
        if (this.columnDefs.length == 0) {
            return '';
        }
        /** @type {?} */
        let allColumnKeys = this.gridOptions.columnApi.getAllDisplayedColumns();
        // console.log(allColumnKeys);
        allColumnKeys.forEach(element => {
            if (element.userProvidedColDef.headerName !== '') {
                columnkeys.push(element.userProvidedColDef.field);
                header.push(element.userProvidedColDef.headerName);
            }
        });
        return header.join(",");
    }
    /**
     * @return {?}
     */
    exportData() {
        /** @type {?} */
        let columnkeys = [];
        /** @type {?} */
        let customHeader = '';
        customHeader = this.getColumnKeysAndHeaders(columnkeys);
        /** @type {?} */
        let params = {
            onlySelected: true,
            columnKeys: columnkeys,
            customHeader: customHeader,
            skipHeader: true
        };
        this.gridApi.exportDataAsCsv(params);
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
            this.rowData = items;
            setTimeout(() => { this.gridApi.sizeColumnsToFit(); }, 30);
            this.gridApi.setRowData(this.rowData);
            console.log(this.rowData);
        });
    }
    /**
     * @param {?} newItems
     * @return {?}
     */
    addItems(newItems) {
        console.log(newItems);
        this.gridApi.updateRowData({ add: newItems });
        console.log(this.columnDefs);
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
    onAddButtonClicked() {
        this.gridApi.stopEditing(false);
        this.add.emit(-1);
    }
    /**
     * @return {?}
     */
    onDuplicateButtonClicked() {
        this.gridApi.stopEditing(false);
        /** @type {?} */
        const selectedNodes = this.gridApi.getSelectedNodes();
        /** @type {?} */
        const selectedData = selectedNodes.map(node => node.data);
        this.duplicate.emit(selectedData);
    }
    /**
     * @return {?}
     */
    applyChanges() {
        /** @type {?} */
        const itemsChanged = [];
        this.gridApi.stopEditing(false);
        for (const key of this.changesMap.keys()) {
            itemsChanged.push(this.gridApi.getRowNode(key).data);
        }
        this.sendChanges.emit(itemsChanged);
        this.changesMap.clear();
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
        this.changesMap.clear();
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
        this.params = params;
        if (this.changeCounter > this.previousChangeCounter) {
            if (params.oldValue !== params.value && !(params.oldValue == null && params.value === '')) {
                if (!this.changesMap.has(params.node.id)) {
                    /** @type {?} */
                    const addMap = new Map();
                    addMap.set(params.colDef.field, 1);
                    this.changesMap.set(params.node.id, addMap);
                }
                else {
                    if (!this.changesMap.get(params.node.id).has(params.colDef.field)) {
                        this.changesMap.get(params.node.id).set(params.colDef.field, 1);
                    }
                    else {
                        /** @type {?} */
                        const currentChanges = this.changesMap.get(params.node.id).get(params.colDef.field);
                        this.changesMap.get(params.node.id).set(params.colDef.field, (currentChanges + 1));
                    }
                }
                this.paintCells(params, this.changesMap); //We paint the row of the edited cell
                this.previousChangeCounter++; //We match the current previousChangeCounter with changeCounter
            }
        }
        else if (this.changeCounter < this.previousChangeCounter) {
            /** @type {?} */
            let currentChanges = -1;
            if (this.changesMap.has(params.node.id)) {
                currentChanges = this.changesMap.get(params.node.id).get(params.colDef.field);
            }
            if (currentChanges === 1) {
                //Once the undo it's done, cell is in his initial status
                this.changesMap.get(params.node.id).delete(params.colDef.field);
                if (this.changesMap.get(params.node.id).size === 0) {
                    // No more modifications in this row
                    this.changesMap.delete(params.node.id);
                    /** @type {?} */
                    const row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex);
                    // We paint it white
                    this.gridApi.redrawRows({ rowNodes: [row] });
                }
                else {
                    this.paintCells(params, this.changesMap);
                }
            }
            else if (currentChanges > 1) {
                //We can't do else because we can be doing an undo without changes
                this.changesMap.get(params.node.id).set(params.colDef.field, (currentChanges - 1));
                this.paintCells(params, this.changesMap); //Not initial state -> green background
            }
            this.previousChangeCounter--; //We decrement previousChangeCounter because we have done undo
        }
        else {
            // Control of modifications without changes
            if (!(params.oldValue == null && params.value === '')) {
                /** @type {?} */
                let newValue;
                if (params.value == null) {
                    newValue = '';
                }
                else {
                    newValue = params.value.toString();
                }
                if (params.oldValue != null) {
                    if (params.oldValue.toString() !== newValue.toString()) {
                        this.modificationChange = true;
                    }
                    else {
                        this.modificationWithoutChanges(params);
                    }
                }
                if (params.oldValue == null) {
                    if (params.oldValue !== newValue.toString()) {
                        this.modificationChange = true;
                    }
                    else {
                        this.modificationWithoutChanges(params);
                    }
                }
            }
            else {
                this.modificationWithoutChanges(params);
            }
        }
    }
    /**
     * @param {?} params
     * @return {?}
     */
    modificationWithoutChanges(params) {
        if (this.changesMap.has(params.node.id)) {
            if (!this.undoNoChanges) {
                this.gridApi.undoCellEditing(); // Undo to delete the change without changes internally
                this.undoNoChanges = true;
                this.paintCells(params, this.changesMap); //The cell has modifications yet -> green background
            }
            else {
                this.undoNoChanges = false;
            }
        }
        else {
            //With the internally undo will enter at this function, so we have to control when done the undo or not
            if (!this.undoNoChanges) {
                this.gridApi.undoCellEditing(); // Undo to delete the change internally
                this.undoNoChanges = true;
            }
            else {
                this.undoNoChanges = false;
            }
        }
    }
    /**
     * @param {?} api
     * @param {?} colId
     * @return {?}
     */
    getColumnIndexByColId(api, colId) {
        return api.getAllColumns().findIndex(col => col.getColId() === colId);
    }
    /**
     * @param {?} params
     * @param {?} changesMap
     * @return {?}
     */
    paintCells(params, changesMap) {
        /** @type {?} */
        const row = this.gridApi.getDisplayedRowAtIndex(params.rowIndex);
        this.changeCellStyleColumns(params, changesMap, '#E8F1DE');
        this.gridApi.redrawRows({ rowNodes: [row] });
        this.changeCellStyleColumns(params, changesMap, '#FFFFFF');
        // We will define cellStyle white to future modifications (like filter)
    }
    /**
     * @param {?} params
     * @param {?} changesMap
     * @param {?} color
     * @return {?}
     */
    changeCellStyleColumns(params, changesMap, color) {
        for (const key of changesMap.get(params.node.id).keys()) {
            /** @type {?} */
            const columnNumber = this.getColumnIndexByColId(this.gridColumnApi, key);
            this.gridColumnApi.columnController.gridColumns[columnNumber].colDef.cellStyle = { backgroundColor: color };
        }
    }
}
DataGridComponent.ɵfac = function DataGridComponent_Factory(t) { return new (t || DataGridComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc3.TranslateService)); };
DataGridComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: DataGridComponent, selectors: [["app-data-grid"]], inputs: { frameworkComponents: "frameworkComponents", eventRefreshSubscription: "eventRefreshSubscription", eventGetSelectedRowsSubscription: "eventGetSelectedRowsSubscription", eventGetAllRowsSubscription: "eventGetAllRowsSubscription", eventAddItemsSubscription: "eventAddItemsSubscription", columnDefs: "columnDefs", getAll: "getAll", discardChangesButton: "discardChangesButton", undoButton: "undoButton", redoButton: "redoButton", applyChangesButton: "applyChangesButton", deleteButton: "deleteButton", newButton: "newButton", actionButton: "actionButton", addButton: "addButton", globalSearch: "globalSearch", themeGrid: "themeGrid", singleSelection: "singleSelection", nonEditable: "nonEditable", title: "title", hideExportButton: "hideExportButton", hideDuplicateButton: "hideDuplicateButton", hideSearchReplaceButton: "hideSearchReplaceButton" }, outputs: { remove: "remove", new: "new", add: "add", sendChanges: "sendChanges", getSelectedRows: "getSelectedRows", duplicate: "duplicate", getAllRows: "getAllRows" }, decls: 21, vars: 28, consts: [["id", "grup1", 1, "editDivBtns"], [3, "translate", 4, "ngIf"], ["mat-mini-fab", "", "class", "editBtn", "id", "deleteChangesButton", "type", "button", 3, "disabled", "click", 4, "ngIf"], ["mat-mini-fab", "", "class", "editBtn", "id", "undo", 3, "disabled", "click", 4, "ngIf"], ["mat-mini-fab", "", "class", "editBtn", "id", "redo", 3, "disabled", "click", 4, "ngIf"], ["mat-mini-fab", "", "class", "editBtn", "id", "applyChangesButton", 3, "disabled", "click", 4, "ngIf"], ["id", "grup2", 1, "actionsDivBtns"], ["type", "text", "class", "searchGenericInput", "placeholder", "", "ml-2", "", 3, "ngModel", "keyup", "ngModelChange", 4, "ngIf"], ["mat-stroked-button", "", "id", "deleteButton", 3, "click", 4, "ngIf"], ["mat-stroked-button", "", "id", "actionButton", 3, "matMenuTriggerFor", 4, "ngIf"], ["menu", "matMenu"], ["mat-menu-item", "", 3, "click", 4, "ngIf"], ["mat-menu-item", "", 4, "ngIf"], ["mat-stroked-button", "", "id", "newButton", 3, "click", 4, "ngIf"], [1, "row", 2, "height", "100%"], ["id", "myGrid", 2, "width", "100%", "height", "100%"], ["rowSelection", "multiple", 2, "width", "100%", "height", "100%", 3, "floatingFilter", "rowData", "columnDefs", "gridOptions", "animateRows", "pagination", "modules", "undoRedoCellEditing", "undoRedoCellEditingLimit", "suppressRowClickSelection", "enableCellChangeFlash", "frameworkComponents", "filterModified", "cellEditingStopped", "cellValueChanged", "gridReady"], [3, "translate"], ["mat-mini-fab", "", "id", "deleteChangesButton", "type", "button", 1, "editBtn", 3, "disabled", "click"], ["fontSet", "material-icons-round"], ["mat-mini-fab", "", "id", "undo", 1, "editBtn", 3, "disabled", "click"], ["mat-mini-fab", "", "id", "redo", 1, "editBtn", 3, "disabled", "click"], ["mat-mini-fab", "", "id", "applyChangesButton", 1, "editBtn", 3, "disabled", "click"], ["type", "text", "placeholder", "", "ml-2", "", 1, "searchGenericInput", 3, "ngModel", "keyup", "ngModelChange"], ["mat-stroked-button", "", "id", "deleteButton", 3, "click"], ["mat-stroked-button", "", "id", "actionButton", 3, "matMenuTriggerFor"], ["mat-menu-item", "", 3, "click"], ["mat-menu-item", ""], ["mat-stroked-button", "", "id", "newButton", 3, "click"]], template: function DataGridComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵtemplate(1, DataGridComponent_span_1_Template, 1, 1, "span", 1);
        ɵngcc0.ɵɵtemplate(2, DataGridComponent_button_2_Template, 3, 1, "button", 2);
        ɵngcc0.ɵɵtemplate(3, DataGridComponent_button_3_Template, 3, 1, "button", 3);
        ɵngcc0.ɵɵtemplate(4, DataGridComponent_button_4_Template, 3, 1, "button", 4);
        ɵngcc0.ɵɵtemplate(5, DataGridComponent_button_5_Template, 3, 1, "button", 5);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(6, "div", 6);
        ɵngcc0.ɵɵtemplate(7, DataGridComponent_label_7_Template, 1, 1, "label", 1);
        ɵngcc0.ɵɵtemplate(8, DataGridComponent_input_8_Template, 1, 1, "input", 7);
        ɵngcc0.ɵɵtemplate(9, DataGridComponent_button_9_Template, 4, 1, "button", 8);
        ɵngcc0.ɵɵtemplate(10, DataGridComponent_button_10_Template, 4, 2, "button", 9);
        ɵngcc0.ɵɵelementStart(11, "mat-menu", null, 10);
        ɵngcc0.ɵɵtemplate(13, DataGridComponent_button_13_Template, 3, 3, "button", 11);
        ɵngcc0.ɵɵtemplate(14, DataGridComponent_button_14_Template, 3, 3, "button", 11);
        ɵngcc0.ɵɵtemplate(15, DataGridComponent_button_15_Template, 3, 3, "button", 12);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(16, DataGridComponent_button_16_Template, 4, 1, "button", 13);
        ɵngcc0.ɵɵtemplate(17, DataGridComponent_button_17_Template, 4, 1, "button", 13);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(18, "div", 14);
        ɵngcc0.ɵɵelementStart(19, "div", 15);
        ɵngcc0.ɵɵelementStart(20, "ag-grid-angular", 16);
        ɵngcc0.ɵɵlistener("filterModified", function DataGridComponent_Template_ag_grid_angular_filterModified_20_listener() { return ctx.onFilterModified(); })("cellEditingStopped", function DataGridComponent_Template_ag_grid_angular_cellEditingStopped_20_listener($event) { return ctx.onCellEditingStopped($event); })("cellValueChanged", function DataGridComponent_Template_ag_grid_angular_cellValueChanged_20_listener($event) { return ctx.onCellValueChanged($event); })("gridReady", function DataGridComponent_Template_ag_grid_angular_gridReady_20_listener($event) { return ctx.onGridReady($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.title);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.discardChangesButton);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.undoButton);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.redoButton);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.applyChangesButton);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngIf", ctx.globalSearch);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.globalSearch);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.deleteButton);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.actionButton);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("ngIf", !ctx.hideExportButton);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", !ctx.hideDuplicateButton);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", !ctx.hideSearchReplaceButton);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.newButton);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.addButton);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵclassMap(ctx.themeGrid);
        ɵngcc0.ɵɵproperty("floatingFilter", true)("rowData", ctx.rowData)("columnDefs", ctx.columnDefs)("gridOptions", ctx.gridOptions)("animateRows", true)("pagination", false)("modules", ctx.modules)("undoRedoCellEditing", true)("undoRedoCellEditingLimit", 200)("suppressRowClickSelection", true)("enableCellChangeFlash", true)("frameworkComponents", ctx.frameworkComponents);
    } }, directives: [ɵngcc4.NgIf, ɵngcc5._MatMenu, ɵngcc6.AgGridAngular, ɵngcc3.TranslateDirective, ɵngcc1.MatButton, ɵngcc2.MatIcon, ɵngcc7.DefaultValueAccessor, ɵngcc7.NgControlStatus, ɵngcc7.NgModel, ɵngcc5.MatMenuTrigger, ɵngcc5.MatMenuItem], pipes: [ɵngcc3.TranslatePipe], styles: ["input[_ngcontent-%COMP%], label[_ngcontent-%COMP%]{display:inline-block;margin:5px 5px 5px 10px}#newButton[_ngcontent-%COMP%]{color:#fff;background:no-repeat padding-box #68a225;margin-left:3px}#deleteButton[_ngcontent-%COMP%]{background:no-repeat padding-box #fff;margin-left:3px}#actionButton[_ngcontent-%COMP%]{background:no-repeat padding-box #fff;margin-left:3px;text-align:center!important}#applyChangesButton[_ngcontent-%COMP%]{color:#fff!important;background:no-repeat padding-box #68a225;margin-left:3px}#applyChangesButton[disabled][_ngcontent-%COMP%]{background:no-repeat padding-box #83976c}#redo[_ngcontent-%COMP%], #undo[_ngcontent-%COMP%]{color:#fff!important;background:#ff9300;margin-left:3px}#redo[disabled][_ngcontent-%COMP%], #undo[disabled][_ngcontent-%COMP%]{background:#ffc97f;margin-left:3px}#deleteChangesButton[_ngcontent-%COMP%]{color:#fff!important;background:#df3133}#deleteChangesButton[disabled][_ngcontent-%COMP%]{color:#fff!important;background:#da8c8e}.editDivBtns[_ngcontent-%COMP%]{margin-left:10px;text-align:start;width:130px;height:30px!important;line-height:30px!important}.actionsDivBtns[_ngcontent-%COMP%]{text-align:end;width:calc(100% - 140px);height:60px}.actionsDivBtns[_ngcontent-%COMP%], .editDivBtns[_ngcontent-%COMP%]{display:inline-block!important}.actionsDivBtns[_ngcontent-%COMP%]   .mat-stroked-button[_ngcontent-%COMP%]{padding:5px 20px!important}.editDivBtns[_ngcontent-%COMP%]   .mat-mini-fab[_ngcontent-%COMP%]   .mat-button-wrapper[_ngcontent-%COMP%]{padding:inherit!important;display:inherit!important}.editDivBtns[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{height:30px!important;bottom:5px;position:relative}.editDivBtns[_ngcontent-%COMP%]   .mat-mini-fab[_ngcontent-%COMP%]{width:30px;height:30px}.actionsDivBtns[_ngcontent-%COMP%]   .searchGenericInput[_ngcontent-%COMP%]{height:45px!important;width:45%!important}.ag-body-viewport.ag-layout-normal[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:#eee}\u200B[_ngcontent-%COMP%]   .ag-body-viewport.ag-layout-normal[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar{width:2em;height:2em}.ag-body-viewport.ag-layout-normal[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar-button{background:#ccc}.ag-body-viewport.ag-layout-normal[_ngcontent-%COMP%]::-webkit-scrollbar-track-piece{background:#888}"] });
/** @nocollapse */
DataGridComponent.ctorParameters = () => [
    { type: TranslateService }
];
DataGridComponent.propDecorators = {
    eventRefreshSubscription: [{ type: Input }],
    eventGetSelectedRowsSubscription: [{ type: Input }],
    eventGetAllRowsSubscription: [{ type: Input }],
    eventAddItemsSubscription: [{ type: Input }],
    frameworkComponents: [{ type: Input }],
    columnDefs: [{ type: Input }],
    getAll: [{ type: Input }],
    discardChangesButton: [{ type: Input }],
    undoButton: [{ type: Input }],
    redoButton: [{ type: Input }],
    applyChangesButton: [{ type: Input }],
    deleteButton: [{ type: Input }],
    newButton: [{ type: Input }],
    actionButton: [{ type: Input }],
    addButton: [{ type: Input }],
    globalSearch: [{ type: Input }],
    themeGrid: [{ type: Input }],
    singleSelection: [{ type: Input }],
    nonEditable: [{ type: Input }],
    title: [{ type: Input }],
    hideExportButton: [{ type: Input }],
    hideDuplicateButton: [{ type: Input }],
    hideSearchReplaceButton: [{ type: Input }],
    remove: [{ type: Output }],
    new: [{ type: Output }],
    add: [{ type: Output }],
    sendChanges: [{ type: Output }],
    duplicate: [{ type: Output }],
    getSelectedRows: [{ type: Output }],
    getAllRows: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DataGridComponent, [{
        type: Component,
        args: [{
                selector: 'app-data-grid',
                template: `    <div id=grup1 class="editDivBtns">
        <span *ngIf="title"  [translate]="title"> </span>
        <button  mat-mini-fab class="editBtn"  *ngIf="discardChangesButton"  id="deleteChangesButton" type="button"  (click)="deleteChanges()" [disabled]="changeCounter <= 0">
            <mat-icon  fontSet="material-icons-round" > close </mat-icon>
        </button>
        <button mat-mini-fab class="editBtn" *ngIf="undoButton"  id="undo"  (click)="undo()" [disabled]="changeCounter <= 0" >
            <mat-icon fontSet="material-icons-round" > undo </mat-icon>
        </button>
        <button mat-mini-fab class="editBtn" *ngIf="redoButton"  id="redo"  (click)="redo()" [disabled]="redoCounter <= 0">
            <mat-icon fontSet="material-icons-round" > redo </mat-icon>
        </button>
        <button mat-mini-fab class="editBtn" *ngIf="applyChangesButton"  id="applyChangesButton"  (click)="applyChanges()" [disabled]="changeCounter <= 0" >
            <mat-icon fontSet="material-icons-round" > check </mat-icon>
        </button>
    </div>

    <div id=grup2 class="actionsDivBtns" >
        <label *ngIf="globalSearch" [translate]="'Search'"> </label>
        <input *ngIf="globalSearch"type="text" class="searchGenericInput" placeholder="" (keyup)="quickSearch()" [(ngModel)]="searchValue" ml-2 >
        <button *ngIf="deleteButton"  mat-stroked-button id="deleteButton"  (click)="removeData()">
            <mat-icon fontSet="material-icons-round" > delete </mat-icon>
            <span  [translate]="'Remove'"> </span>
            
        </button>

        
        <button *ngIf="actionButton"  mat-stroked-button [matMenuTriggerFor]="menu" id="actionButton">
            <span  [translate]="'Actions'"> </span>    
            <mat-icon fontSet="material-icons-round" > keyboard_arrow_down </mat-icon>     
        </button>
        <mat-menu #menu="matMenu">
            <button mat-menu-item *ngIf="!hideExportButton" (click)="exportData()" > {{"Export" | translate}} </button>
            <button mat-menu-item *ngIf="!hideDuplicateButton" (click)="onDuplicateButtonClicked()"> {{"Duplicate" | translate}}</button>
            <button mat-menu-item *ngIf="!hideSearchReplaceButton"> {{"Search/Replace" | translate}}</button>
        </mat-menu>  
            

        <button  *ngIf="newButton" mat-stroked-button id="newButton"  (click)="newData()">
            <mat-icon fontSet="material-icons-round"> add_circle_outline </mat-icon>      
            <span  [translate]="'New'"> </span>           
        </button>

        <button  *ngIf="addButton" mat-stroked-button id="newButton"  (click)="onAddButtonClicked()">
            <mat-icon fontSet="material-icons-round"> add_circle_outline </mat-icon>      
            <span  [translate]="'Add'"> </span>           
        </button>
        

        
    </div>



    <div class="row" style=" height: 100%">
        <div id="myGrid" style=" width:100%; height: 100%" >
            <ag-grid-angular
            style=" width: 100%; height: 100%;"
            [class]="themeGrid"
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
                styles: [`input,label{display:inline-block;margin:5px 5px 5px 10px}#newButton{color:#fff;background:no-repeat padding-box #68a225;margin-left:3px}#deleteButton{background:no-repeat padding-box #fff;margin-left:3px}#actionButton{background:no-repeat padding-box #fff;margin-left:3px;text-align:center!important}#applyChangesButton{color:#fff!important;background:no-repeat padding-box #68a225;margin-left:3px}#applyChangesButton[disabled]{background:no-repeat padding-box #83976c}#redo,#undo{color:#fff!important;background:#ff9300;margin-left:3px}#redo[disabled],#undo[disabled]{background:#ffc97f;margin-left:3px}#deleteChangesButton{color:#fff!important;background:#df3133}#deleteChangesButton[disabled]{color:#fff!important;background:#da8c8e}.editDivBtns{margin-left:10px;text-align:start;width:130px;height:30px!important;line-height:30px!important}.actionsDivBtns{text-align:end;width:calc(100% - 140px);height:60px}.actionsDivBtns,.editDivBtns{display:inline-block!important}.actionsDivBtns .mat-stroked-button{padding:5px 20px!important}.editDivBtns .mat-mini-fab .mat-button-wrapper{padding:inherit!important;display:inherit!important}.editDivBtns .mat-icon{height:30px!important;bottom:5px;position:relative}.editDivBtns .mat-mini-fab{width:30px;height:30px}.actionsDivBtns .searchGenericInput{height:45px!important;width:45%!important}.ag-body-viewport.ag-layout-normal ::-webkit-scrollbar-thumb{background:#eee}​ .ag-body-viewport.ag-layout-normal ::-webkit-scrollbar{width:2em;height:2em}.ag-body-viewport.ag-layout-normal ::-webkit-scrollbar-button{background:#ccc}.ag-body-viewport.ag-layout-normal::-webkit-scrollbar-track-piece{background:#888}`]
            }]
    }], function () { return [{ type: ɵngcc3.TranslateService }]; }, { frameworkComponents: [{
            type: Input
        }], remove: [{
            type: Output
        }], new: [{
            type: Output
        }], add: [{
            type: Output
        }], sendChanges: [{
            type: Output
        }], getSelectedRows: [{
            type: Output
        }], duplicate: [{
            type: Output
        }], getAllRows: [{
            type: Output
        }], eventRefreshSubscription: [{
            type: Input
        }], eventGetSelectedRowsSubscription: [{
            type: Input
        }], eventGetAllRowsSubscription: [{
            type: Input
        }], eventAddItemsSubscription: [{
            type: Input
        }], columnDefs: [{
            type: Input
        }], getAll: [{
            type: Input
        }], discardChangesButton: [{
            type: Input
        }], undoButton: [{
            type: Input
        }], redoButton: [{
            type: Input
        }], applyChangesButton: [{
            type: Input
        }], deleteButton: [{
            type: Input
        }], newButton: [{
            type: Input
        }], actionButton: [{
            type: Input
        }], addButton: [{
            type: Input
        }], globalSearch: [{
            type: Input
        }], themeGrid: [{
            type: Input
        }], singleSelection: [{
            type: Input
        }], nonEditable: [{
            type: Input
        }], title: [{
            type: Input
        }], hideExportButton: [{
            type: Input
        }], hideDuplicateButton: [{
            type: Input
        }], hideSearchReplaceButton: [{
            type: Input
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DialogGridComponent {
    /**
     * @param {?} dialogRef
     */
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
        this.getAllRows = new Subject();
        this.allRowsReceived = [];
        this.joinTables = new EventEmitter();
        // this.nonEditable = true;
        this.tablesReceivedCounter = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.addButtonClickedSubscription) {
            this._addButtonClickedSubscription = this.addButtonClickedSubscription.subscribe(() => {
                this.getAllSelectedRows();
            });
        }
    }
    /**
     * @return {?}
     */
    getAllSelectedRows() {
        this.getAllRows.next(true);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    joinRowsReceived(data) {
        this.allRowsReceived.push(data);
        this.tablesReceivedCounter++;
        if (this.tablesReceivedCounter === this.getAllsTable.length) {
            this.doAdd(this.allRowsReceived);
            console.log(this.allRowsReceived);
        }
    }
    /**
     * @param {?} rowsToAdd
     * @return {?}
     */
    doAdd(rowsToAdd) {
        this.dialogRef.close({ event: 'Add', data: rowsToAdd });
    }
    /**
     * @return {?}
     */
    closeDialog() {
        this.dialogRef.close({ event: 'Cancel' });
    }
}
DialogGridComponent.ɵfac = function DialogGridComponent_Factory(t) { return new (t || DialogGridComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc8.MatDialogRef)); };
DialogGridComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: DialogGridComponent, selectors: [["app-dialog-grid"]], outputs: { joinTables: "joinTables" }, decls: 11, vars: 8, consts: [["mat-dialog-title", ""], [1, "dialogConent"], ["class", "appDialogDataGridDiv", 4, "ngFor", "ngForOf"], ["mat-dialog-actions", "", "align", "end"], ["mat-button", "", 3, "click"], ["mat-button", "", "cdkFocusInitial", "", 3, "click"], [1, "appDialogDataGridDiv"], [3, "columnDefs", "themeGrid", "getAll", "globalSearch", "singleSelection", "title", "nonEditable", "eventGetSelectedRowsSubscription", "getSelectedRows"]], template: function DialogGridComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "h3", 0);
        ɵngcc0.ɵɵtext(1);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(2, "mat-dialog-content", 1);
        ɵngcc0.ɵɵtemplate(3, DialogGridComponent_div_3_Template, 2, 8, "div", 2);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(4, "div", 3);
        ɵngcc0.ɵɵelementStart(5, "button", 4);
        ɵngcc0.ɵɵlistener("click", function DialogGridComponent_Template_button_click_5_listener() { return ctx.closeDialog(); });
        ɵngcc0.ɵɵtext(6);
        ɵngcc0.ɵɵpipe(7, "translate");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(8, "button", 5);
        ɵngcc0.ɵɵlistener("click", function DialogGridComponent_Template_button_click_8_listener() { return ctx.getAllSelectedRows(); });
        ɵngcc0.ɵɵtext(9);
        ɵngcc0.ɵɵpipe(10, "translate");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵtextInterpolate(ctx.title);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.getAllsTable);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵtextInterpolate(ɵngcc0.ɵɵpipeBind1(7, 4, "Cancel"));
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵtextInterpolate(ɵngcc0.ɵɵpipeBind1(10, 6, "Add"));
    } }, directives: [ɵngcc8.MatDialogTitle, ɵngcc8.MatDialogContent, ɵngcc4.NgForOf, ɵngcc8.MatDialogActions, ɵngcc1.MatButton, DataGridComponent], pipes: [ɵngcc3.TranslatePipe], styles: [".dialogConent[_ngcontent-%COMP%]{margin:inherit!important;padding:inherit!important;max-height:60vh!important;height:100%;width:100%;overflow:auto}"] });
/** @nocollapse */
DialogGridComponent.ctorParameters = () => [
    { type: MatDialogRef }
];
DialogGridComponent.propDecorators = {
    joinTables: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DialogGridComponent, [{
        type: Component,
        args: [{
                selector: 'app-dialog-grid',
                template: `<h3 mat-dialog-title>{{title}}</h3>
<mat-dialog-content class="dialogConent">
  <div *ngFor="let getAll of getAllsTable; let i = index" class="appDialogDataGridDiv">
    <app-data-grid 
    [columnDefs]="columnDefsTable[i]" [themeGrid]='themeGrid'  [getAll]='getAll' [globalSearch]=true [singleSelection]="singleSelectionTable[i]"
    [title]="titlesTable[i]" [nonEditable]='nonEditable' [eventGetSelectedRowsSubscription]="getAllRows.asObservable()" (getSelectedRows)='joinRowsReceived($event)' >
    </app-data-grid>
  </div>
</mat-dialog-content>
<div mat-dialog-actions align="end">
  <button mat-button  (click)="closeDialog()">{{"Cancel" | translate}}</button>
  <button mat-button  (click)="getAllSelectedRows()" cdkFocusInitial>{{"Add" | translate}}</button>
</div>
`,
                styles: [`.dialogConent{margin:inherit!important;padding:inherit!important;max-height:60vh!important;height:100%;width:100%;overflow:auto}`]
            }]
    }], function () { return [{ type: ɵngcc8.MatDialogRef }]; }, { joinTables: [{
            type: Output
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
registerLocaleData(localeCa, 'ca');
registerLocaleData(localeEs, 'es');
/**
 * Load translation assets
 * @param {?} http
 * @return {?}
 */
function createTranslateLoader(http) {
    return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
const ɵ0 = (createTranslateLoader);
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
            MatMenuModule,
            MatDialogModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: ɵ0,
                    deps: [HttpClient]
                }
            })
        ], HttpClientModule,
        CommonModule,
        FormsModule,
        NoopAnimationsModule,
        AngularHalModule,
        TranslateModule,
        ReactiveFormsModule,
        SitmunFrontendCoreModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(SitmunFrontendGuiModule, { declarations: function () { return [DataGridComponent, BtnEditRenderedComponent, DialogGridComponent]; }, imports: function () { return [RouterModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        NoopAnimationsModule,
        AngularHalModule,
        ReactiveFormsModule,
        BrowserAnimationsModule, ɵngcc6.AgGridModule, SitmunFrontendCoreModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDialogModule, ɵngcc3.TranslateModule]; }, exports: function () { return [HttpClientModule,
        CommonModule,
        FormsModule,
        NoopAnimationsModule,
        AngularHalModule,
        TranslateModule,
        ReactiveFormsModule, DataGridComponent, DialogGridComponent, SitmunFrontendCoreModule]; } }); })();
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
                    MatMenuModule,
                    MatDialogModule,
                    TranslateModule.forRoot({
                        loader: {
                            provide: TranslateLoader,
                            useFactory: ɵ0,
                            deps: [HttpClient]
                        }
                    })
                ],
                declarations: [
                    DataGridComponent,
                    BtnEditRenderedComponent,
                    DialogGridComponent,
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
                    DialogGridComponent,
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

export { DataGridComponent, createTranslateLoader, SitmunFrontendGuiModule, BtnEditRenderedComponent, DialogGridComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWd1aS5qcyIsInNvdXJjZXMiOlsiQHNpdG11bi9mcm9udGVuZC1ndWkvYnRuLWVkaXQtcmVuZGVyZWQvYnRuLWVkaXQtcmVuZGVyZWQuY29tcG9uZW50LnRzIiwiQHNpdG11bi9mcm9udGVuZC1ndWkvZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWd1aS9kaWFsb2ctZ3JpZC9kaWFsb2ctZ3JpZC5jb21wb25lbnQudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWd1aS9zaXRtdW4tZnJvbnRlbmQtZ3VpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOztJQWFFLE1BQU0sQ0FBQyxNQUFXLFlBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTTtBQUFDLE1BQ3RCO3dCQUVELE9BQU8sQ0FBQyxNQUFXO09BQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQ2I7d0NBRUQ7R0FBaUIsQ0FBQyxNQUFNLFlBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztBQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFDeEM7O1lBRUQsU0FBUyxhQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUNwQjsrQkFFRDtLQUFXOztVQUVWOztXQTdCRixTQUFTLFNBQUMsa0JBQ1QsUUFBUSxFQUFFO1VBQXVCLGtCQUNqQyxRQUFRLEVBQUU7O3lJQUVELGtCQUNULE1BQU0sRUFBRSxDQUFDOzs7O1VBQWdLLENBQUMsY0FDM0s7Ozt5RENSRDs7aUVBc0pFO09BQW1CLFNBQTJCLFlBQTNCLGNBQVM7Q0FBVCxTQUFTLENBQWtCLHdCQW5EMUI7VUFBbUIsOEJBSXhCLEtBQUssNEJBQzJCLElBQUksR0FBRyxFQUErQixvQ0FPaEUsS0FBSywrQkFDVixLQUFLLFVBdUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztNQUUzQixJQUFJLENBQUMsbUJBQW1CLEdBQUc7Q0FDekIsd0JBQXdCLEVBQUU7bUJBQXdCO0VBQ25ELENBQUMsU0FFRixJQUFJLENBQUMsTUFBTSxHQUFHO0dBQUksWUFBWTtDQUFFLENBQUMsU0FDakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO09BQzlCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQyxTQUM5QixJQUFJLENBQUM7QUFBVyxHQUFHO0dBQUksWUFBWSxFQUFFLENBQUMsU0FDdEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUU7QUFBQyxTQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksWUFBWTtDQUFFLENBQUMsU0FDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsU0FDdkIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxTQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxTQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLGNBQ2pCLGFBQWEsRUFBRSxrQkFDYixRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxDQUFDLGtCQUNQLE1BQU0sRUFBRTtHQUFJLGtCQUNaLFFBQVEsRUFBRTtBQUFDLElBQUksQ0FBQyxXQUFXO09BQzNCLFNBQVMsRUFBRSxFQUFDO1FBQWUsRUFBRTtHQUFTLEVBQUMsZUFDeEMsY0FDRDtFQUFXLEVBQUUsa0JBQ1gsVUFBVSxFQUFFLHNCQUNSO0VBQU07QUFBRSxvQkFBb0Isc0JBQzVCLFlBQVksRUFBRTs7O21JQUNaLFVBQVUsQ0FBQyx5QkFBeUIsRUFBRSxTQUFTOztFQUM3QyxNQUFNLGFBQWEsR0FBRyxJQUFJLElBQUk7QUFBQyxTQUFTLENBQUMsQ0FBQzs7O2VBQzFDLE1BQU0sVUFBVSxHQUFHLElBQUksSUFBSTtBQUFDLHlCQUF5QixDQUFDLENBQUMsNkJBRXZELElBQUk7O09BQWEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUU7T0FDbEQsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNYOzJCQUFNLElBQUksYUFBYSxDQUFDOztFQUFPLEVBQUUsR0FBSSxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsa0NBQzFEO0NBQU8sQ0FBQyxDQUFDLDhCQUNWO3VCQUFNO2NBQ0wsT0FBTyxDQUFDLENBQUMsOEJBQ1YsMEJBQ0YsdUJBQ0Ysc0JBQ0QsWUFBWSxFQUFFLElBQUksa0JBQ3JCLGNBQ0osY0FDQyxZQUFZLEVBQUUsVUFBVSxjQUN4QixlQUFlLEVBQUUsSUFBSSw2REFFckIsY0FBYyxFQUFFLENBQUMsR0FBVyxFQUFFLFlBQW9CLHdEQUNoRCxNQUFNLElBQUksR0FBRztDQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUN6QztNQUFPLElBQUksS0FBSyxHQUFHLEdBQUcsWUFBWSxHQUFHLElBQUksQ0FBQztZQUM3QyxVQUNBLENBQUMsTUFFSDs7V0FHRCxRQUFRLGFBRU4sSUFBSSxJQUFJLENBQUMsd0JBQXdCLEVBQUU7V0FDakMsSUFBSSxDQUFDLHlCQUF5QjtBQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLENBQUM7b0JBQ3ZFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUNwQixDQUFDLENBQUMsVUFDSixTQUNELElBQUksSUFBSSxDQUFDLGdDQUFnQyxFQUFFLGNBQ3pDLElBQUksQ0FBQyxpQ0FBaUMsR0FBRyxJQUFJLENBQUM7SUFBZ0MsQ0FBQyxTQUFTLENBQUMsd0JBQ3ZGLElBQUksQ0FBQztjQUFnQixFQUFFLENBQUMsY0FDekIsQ0FBQyxDQUFDO1NBQ0osU0FDRCxJQUFJLElBQUk7QUFBQywyQkFBMkIsRUFBRTtNQUNwQyxJQUFJLENBQUM7WUFBNEIsR0FBRztHQUFJLENBQUM7TUFBMkIsQ0FBQyxTQUFTLENBQUMsd0JBQzdFLElBQUk7QUFBQztPQUFXLEVBQUUsQ0FBQyxjQUNwQixDQUFDLENBQUMsVUFDSixTQUVELElBQUcsSUFBSSxDQUFDO1FBQXlCLEVBQ2pDLGNBQ0UsSUFBSSxDQUFDO1VBQXlCLENBQUMsU0FBUyxDQUN0QyxDQUFDLEtBQUs7YUFDSixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3RCLENBQ0YsQ0FBQSxVQUNGLE1BS0Y7O1dBSUQsV0FBVyxDQUFDO0VBQU0sWUFDaEI7RUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1VBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZO0VBQUcsUUFBUSxDQUFBLFVBQUM7O3VDQUVwRSxJQUFJLENBQUM7R0FBTTtFQUFHLE1BQU0sQ0FBQyxTQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FDMUIsSUFBSSxDQUFDO0FBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQ3RDLElBQUksQ0FBQztDQUFXLEVBQUUsQ0FBQyxTQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQjtBQUFFLENBQUMsU0FDaEMsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQ2pDLElBQUksR0FBRyxDQUFDLEtBQUssS0FBSyxPQUFPLEVBQUUsa0JBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQzFCLFVBQ0YsTUFDRix3Q0FHRDtTQUFnQjt5QkFDZCxNQUFNO1NBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO2NBQWdCO0FBQUUsQ0FBQztVQUN0RCxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUQ7QUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsTUFDekM7V0FFRCxXQUFXO2dCQUNULElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxTQUNqQjtFQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUMxRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUNwQyxxRUFFRCx1QkFBdUIsQ0FBQyxVQUFzQjs7SUFDNUMsSUFBSSxNQUFNLEdBQWMsRUFBRSxDQUFDLFNBQzNCLElBQUk7RUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQztBQUFFLGNBQUM7S0FBTyxFQUFFLENBQUEsVUFBQzsyQkFFNUMsSUFBSSxhQUFhLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7O2FBQXNCLEVBQUUsQ0FBQyxnREFFdEU7TUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLGtCQUN6QjtBQUFJLE9BQU8sQ0FBQztJQUFrQixDQUFDLFVBQVUsS0FBSyxFQUFFLEVBQ2hEO09BQ0UsVUFBVSxDQUFDLElBQUksQ0FBQztHQUFPLENBQUM7TUFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztNQUNsRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxjQUNwRCxVQUdKLENBQUMsQ0FBQzs7SUFFSCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFDekI7R0FHRCxVQUFVO09BQ1IsSUFBSSxVQUFVLEdBQWMsRUFBRSxDQUFDO2lCQUMvQixJQUFJLFlBQVksR0FBVSxFQUFFLENBQUMsU0FDN0IsWUFBWSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsQ0FBQSxrQ0FDdkQsSUFBSSxNQUFNLEdBQUcsY0FDVCxZQUFZLEVBQUUsSUFBSSxjQUNsQjtJQUFVLEVBQUUsVUFBVSxjQUN0QixZQUFZLEVBQUU7VUFBWSxjQUMxQixVQUFVLEVBQUUsSUFBSTtJQUNuQixDQUFDLFNBQ0YsSUFBSSxDQUFDLE9BQU87QUFBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsTUFDdEM7O01BRUQ7Q0FBVyxhQUNULElBQUksQ0FBQztDQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUNqRDs7a0NBRUMsV0FBVyxhQUVULElBQUksQ0FBQyxNQUFNO0FBQUUsY0FDWixTQUFTLENBQUMsQ0FBQyxLQUFLO0tBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsYUFDckI7S0FBVSxDQUFDLFFBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBLEVBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxhQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsYUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsVUFDN0IsQ0FBQyxDQUFDLE1BQ0o7ZUFFQSxRQUFRLENBQUMsUUFBZSxZQUN2QjtLQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBRXRCLElBQUksQ0FBQyxPQUFPLENBQUM7U0FBYSxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVE7QUFBRSxDQUFDLENBQUMsU0FDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7Q0FBVSxDQUFDLENBQUMsTUFFOUI7O01BRUQsVUFBVTtJQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOzt1QkFDaEMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUFnQixFQUFFLENBQUMsa0NBQ3REO0tBQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUM7RUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUMxRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztLQUFZLENBQUMsQ0FBQyxTQUUvQixJQUFHLElBQUksQ0FBQyxZQUFZLEVBQ3BCLDJDQUNFLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUU5RCxLQUFLLE1BQU0sRUFBRSxJQUFJLFlBQVksRUFBQyxrQkFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUs7Q0FBRSxVQUFVLENBQUMsY0FDcEQ7WUFDSCxJQUFJLENBQUM7Q0FBVyxDQUFDLEdBQUcsQ0FBQztFQUFZLEVBQUUsQ0FBQyxVQUNyQyxTQUNELElBQUksQ0FBQztHQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ3BDLHdDQUVEO0lBQU8sYUFFTCxJQUFJLENBQUM7SUFBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQ25CLHdDQUVELGtCQUFrQixhQUVoQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQ25CLHdDQUVELHdCQUF3QixhQUV0QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNoQztHQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGhDRHRXdkM7QUFBaUM7T0NzV3NCLEVBQUUsQ0FBQyxWRHRXakI7QUFFOUI7QUNxV1AsTUFBTSxORHBXTztVQ29XSyxHQUFHLGJEcFdBLElBVXZCLE1BQU0sQ0FBQyxNQUFXO0tDMFZrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLDdCRDFWdEMsUUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDekIsS0FBRztFQ3lWQyxJQUFJLENBQUMsUER4VlQ7UUN3VmtCLENBQUMsSUFBSSxDQUFDLGREdlZqQjtDQ3VWNkIsQ0FBQyxDQUFDLE1BQ25DLFREeFY2QjtBQUVoQztBQUVHLElBSkQsT0FBTyxDQUFDLE1BQVc7QUMyVm5CLFlBQVksWkQzVlcsUUFDckIsT0FBTyxJQUFJLENBQUM7QUFDaEIsS0FBRztBQUNIO2VDMFZJLE1BQU0sckJEelZIO1FDeVZlLEdBQVUsRUFBRSxDQUFDLGREeFZqQztJQ3lWRSxKRHpWaUI7QUN5VmIsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLDVCRHpWUCxJQUQzQixpQkFBaUIsQ0FBQyxNQUFNO0tDMlZ0QixLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQ3hDLC9DRDNWSixRQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0MsS0FBRztPQzJWRyxQRDFWTjtXQzBWa0IsQ0FBQyxJQUFJLENBQUMsakJEelZqQjtFQ3lWcUIsQ0FBQyxIRHhWbEI7RUN3VnlCLENBQUMsVUFBVSxDQUFDLEdBQUcsakJEeFZoQyxJQURqQixTQUFTO0FDeVZ5QyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQ3RELFNBQ0QsMUJEMVZILFFBQUcsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0VDMFZmLENBQUMsSER6VlQsS0FBRztBQUNIO0FDd1ZvQixDQUFDLElBQUksQ0FBQyxZQUFZLGxCRHZWL0I7QUN1VmdDLENBQUMsRER0VmhDO0VDdVZKLElBQUksQ0FBQyxVQUFVLENBQUMsbEJEdlZKLElBRGQsV0FBVztHQ3dWWSxFQUFFLENBQUMsU0FDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsU0FDdkIsSUFBSSxDQUFDLHBERHpWVDtBQUNHLEtBQUE7QUFDSDtXQ3VWOEIsR0FBRyxDQUFDLENBQUMsU0FDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsU0FDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFJLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDLFNBQzdELDFFRHhYSCxTQUFTLFNBQUMsa0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtFQ3VYM0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsTUFDM0Isd0NBSUQsYUFBYSxhQUVYLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxFQUMzQyxjQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUMsVUFDaEMsU0FDRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLDFORGpZMUIsUUFBUSxFQUFFLDJMQUVELGtCQUNULE1BQU0sRUFBRSxDQUFDO29DQUFnSyxDQUFDO0lBQzNLOzs7Ozs7Ozs7Ozs7Ozs7MEJBQ0s7QUFBQztBQUFDO0FBQUk7QUFBa0M7QUFJN0M7QUNiRDtBQUEwQjtBQUFRO0FBQTRCO0FBQVEsSUFzSnBFLFlBQW1CLFNBQTJCO0FBQ2hELFFBRHFCLGNBQVMsR0FBVCxTQUFTLENBQWtCO0FBQUMsdUJBbkQzQixtQkFBbUI7QUFDekMsNEJBR2lCLEtBQUs7QUFDdEIsMEJBQWlELElBQUksR0FBRyxFQUErQjtBQUN2RixrQ0FNdUIsS0FBSztBQUM1Qiw2QkFBa0IsS0FBSztBQUFFLFFBdUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMvQixRQUNJLElBQUksQ0FBQyxtQkFBbUIsR0FBRztBQUMvQixZQUFNLHdCQUF3QixFQUFFLHdCQUF3QjtBQUN4RCxTQUFLLENBQUM7QUFDTixRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztBQUNyQyxRQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztBQUNsQyxRQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztBQUNsQyxRQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztBQUMxQyxRQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztBQUM5QyxRQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztBQUN4QyxRQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztBQUN6QyxRQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLFFBQUksSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQztBQUNuQyxRQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLFFBQUksSUFBSSxDQUFDLFdBQVcsR0FBRztBQUN2QixZQUFNLGFBQWEsRUFBRTtBQUNyQixnQkFBUSxRQUFRLEVBQUUsSUFBSTtBQUN0QixnQkFBUSxJQUFJLEVBQUUsQ0FBQztBQUNmLGdCQUFRLE1BQU0sRUFBRSxJQUFJO0FBQ3BCLGdCQUFRLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXO0FBQ25DLGdCQUFRLFNBQVMsRUFBRSxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUM7QUFDL0MsYUFBTztBQUNQLFlBQU0sV0FBVyxFQUFFO0FBQ25CLGdCQUFRLFVBQVUsRUFBRTtBQUNwQixvQkFBWSxNQUFNLEVBQUUsb0JBQW9CO0FBQ3hDLG9CQUFZLFlBQVksRUFBRTtBQUMxQjtBQUE0QjtBQUNEO0FBQ1g7QUFBdUM7QUFFN0Msd0JBSkksVUFBVSxDQUFDLHlCQUF5QixFQUFFLFNBQVM7QUFDN0Q7QUFBNkMsNEJBQTdCLE1BQU0sYUFBYSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzFEO0FBQTZDLDRCQUE3QixNQUFNLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQ3ZFLDRCQUNnQixJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUU7QUFDcEUsZ0NBQWtCLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDNUIsNkJBQWlCO0FBQUMsaUNBQUssSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFFLEdBQUksVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFO0FBQzVFLGdDQUFrQixPQUFPLENBQUMsQ0FBQztBQUMzQiw2QkFBaUI7QUFBQyxpQ0FBSztBQUN2QixnQ0FBa0IsT0FBTyxDQUFDLENBQUM7QUFDM0IsNkJBQWlCO0FBQ2pCLHlCQUFlO0FBQ2YscUJBQWE7QUFDYixvQkFBWSxZQUFZLEVBQUUsSUFBSTtBQUM5QixpQkFBUztBQUNULGFBQUs7QUFDTCxZQUFNLFlBQVksRUFBRSxVQUFVO0FBQzlCLFlBQU0sZUFBZSxFQUFFLElBQUk7QUFDM0I7QUFDTSxZQUFBLGNBQWMsRUFBRSxDQUFDLEdBQVcsRUFBRSxZQUFvQjtBQUN4RDtBQUFpQyxnQkFBekIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakQsZ0JBQVEsT0FBTyxJQUFJLEtBQUssR0FBRyxHQUFHLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDbEQsYUFBSztBQUNMLFNBQUssQ0FBQztBQUNOLEtBQ0c7QUFDSDtBQUVNO0FBRUk7QUFBUSxJQUZoQixRQUFRO0FBRVYsUUFBSSxJQUFJLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtBQUN2QyxZQUFNLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsU0FBUyxDQUFDO0FBQy9FLGdCQUFRLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUMzQixhQUFPLENBQUMsQ0FBQztBQUNULFNBQUs7QUFDTCxRQUFJLElBQUksSUFBSSxDQUFDLGdDQUFnQyxFQUFFO0FBQy9DLFlBQU0sSUFBSSxDQUFDLGlDQUFpQyxHQUFHLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxTQUFTLENBQUM7QUFDL0YsZ0JBQVEsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7QUFDaEMsYUFBTyxDQUFDLENBQUM7QUFDVCxTQUFLO0FBQ0wsUUFBSSxJQUFJLElBQUksQ0FBQywyQkFBMkIsRUFBRTtBQUMxQyxZQUFNLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsU0FBUyxDQUFDO0FBQ3JGLGdCQUFRLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUMzQixhQUFPLENBQUMsQ0FBQztBQUNULFNBQUs7QUFDTCxRQUNJLElBQUcsSUFBSSxDQUFDLHlCQUF5QixFQUNqQztBQUNKLFlBQU0sSUFBSSxDQUFDLHlCQUF5QixDQUFDLFNBQVMsQ0FDdEMsQ0FBQyxLQUFLO0FBQ2QsZ0JBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMvQixhQUFTLENBQ0YsQ0FBQTtBQUNQLFNBQUs7QUFDTCxLQUlHO0FBQ0g7QUFHSztBQUNKO0FBQW1CO0FBQVEsSUFEMUIsV0FBVyxDQUFDLE1BQU07QUFBSSxRQUNwQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7QUFBRSxZQUFELElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQTtBQUFDLFNBQUE7QUFDeEU7QUFDSSxRQUFBLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3pCLFFBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO0FBQzlCLFFBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQzFDLFFBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ3ZCLFFBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0FBQ3BDLFFBQUksS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO0FBQ3ZDLFlBQU0sSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtBQUNqQyxnQkFBUSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztBQUNqQyxhQUFPO0FBQ1AsU0FBSztBQUNMLEtBQUc7QUFDSDtBQUVJO0FBQW1CO0FBQ3BCLElBREQsZ0JBQWdCO0FBQUs7QUFDSCxRQUFoQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7QUFDMUQ7QUFBeUIsUUFBckIsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlELFFBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDNUMsS0FBRztBQUNIO0FBQ087QUFDSjtBQUFRLElBRFQsV0FBVztBQUFLO0FBQ0UsUUFBaEIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLFFBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDOUQsUUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2QyxLQUFHO0FBQ0g7QUFDTztBQUE2QjtBQUFtQjtBQUN2RCxJQURFLHVCQUF1QixDQUFDLFVBQXNCO0FBQUk7QUFDdEMsUUFBVixJQUFJLE1BQU0sR0FBYyxFQUFFLENBQUM7QUFDL0IsUUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtBQUFFLFlBQUQsT0FBTyxFQUFFLENBQUE7QUFBQyxTQUFBO0FBQUM7QUFFMUIsUUFBbkIsSUFBSSxhQUFhLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztBQUMxRTtBQUNJLFFBQUEsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPO0FBQ2pDLFlBQVEsSUFBSSxPQUFPLENBQUMsa0JBQWtCLENBQUMsVUFBVSxLQUFLLEVBQUUsRUFDaEQ7QUFDUixnQkFBVSxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1RCxnQkFBVSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3RCxhQUFTO0FBQ1QsU0FFSyxDQUFDLENBQUM7QUFDUCxRQUNJLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixLQUFHO0FBQ0g7QUFFTTtBQUNIO0FBQVEsSUFEVCxVQUFVO0FBQUs7QUFDRyxRQUFoQixJQUFJLFVBQVUsR0FBYyxFQUFFLENBQUM7QUFDbkM7QUFBeUIsUUFBckIsSUFBSSxZQUFZLEdBQVUsRUFBRSxDQUFDO0FBQ2pDLFFBQUksWUFBWSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUMzRDtBQUNNLFFBREYsSUFBSSxNQUFNLEdBQUc7QUFDakIsWUFBUSxZQUFZLEVBQUUsSUFBSTtBQUMxQixZQUFRLFVBQVUsRUFBRSxVQUFVO0FBQzlCLFlBQVEsWUFBWSxFQUFFLFlBQVk7QUFDbEMsWUFBUSxVQUFVLEVBQUUsSUFBSTtBQUN4QixTQUFLLENBQUM7QUFDTixRQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLEtBQUc7QUFDSDtBQUNPO0FBQ0o7QUFBUSxJQURULFdBQVc7QUFBSyxRQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsRCxLQUFDO0FBQ0Q7QUFDTztBQUVQO0FBQVEsSUFGTixXQUFXO0FBQUssUUFFZCxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2pCLGFBQUssU0FBUyxDQUFDLENBQUMsS0FBSztBQUNyQixZQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQzdCLFlBQVEsVUFBVSxDQUFDLFFBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBLEVBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUM5RCxZQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM5QyxZQUFRLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2xDLFNBQUssQ0FBQyxDQUFDO0FBQ1AsS0FBRztBQUNIO0FBQ087QUFBMkI7QUFDbEI7QUFBUSxJQURyQixRQUFRLENBQUMsUUFBZTtBQUFJLFFBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUIsUUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQ2xELFFBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDakMsS0FDRztBQUNIO0FBQ087QUFDSjtBQUFRLElBRFQsVUFBVTtBQUFLLFFBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEM7QUFBeUIsUUFBckIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0FBQzFEO0FBQXlCLFFBQXJCLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5RCxRQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ25DLFFBQ0ksSUFBRyxJQUFJLENBQUMsWUFBWSxFQUNwQjtBQUNKO0FBQTZCLFlBQXZCLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNwRSxZQUNNLEtBQUssTUFBTSxFQUFFLElBQUksWUFBWSxFQUFDO0FBQ3BDLGdCQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUUsVUFBVSxDQUFDO0FBQzdELGFBQVM7QUFDVCxZQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQzFDLFNBQUs7QUFDTCxRQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ3ZDLEtBQUc7QUFDSDtBQUNPO0FBRUg7QUFBUSxJQUZWLE9BQU87QUFBSyxRQUVWLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BDLFFBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QixLQUFHO0FBQ0g7QUFDTztBQUFtQjtBQUV6QixJQUZDLGtCQUFrQjtBQUFLLFFBRXJCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BDLFFBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QixLQUFHO0FBQ0g7QUFDTztBQUFtQjtBQUFRLElBQWhDLHdCQUF3QjtBQUFLLFFBRTNCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BDO0FBQXlCLFFBQXJCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztBQUMxRDtBQUF5QixRQUFyQixNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUQsUUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN0QyxLQUFHO0FBQ0g7QUFFTTtBQUNKO0FBQ0ksSUFGSixZQUFZO0FBQUs7QUFFRixRQUFiLE1BQU0sWUFBWSxHQUFVLEVBQUUsQ0FBQztBQUNuQyxRQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BDLFFBQUksS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxFQUN4QztBQUNKLFlBQU0sWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzRCxTQUFLO0FBQ0wsUUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN4QyxRQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDNUIsUUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztBQUMzQixRQUFJLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUM7QUFDbkMsUUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztBQUN6QixRQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBSSxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUMsQ0FBQztBQUNqRSxRQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDOUIsS0FBRztBQUNIO0FBR0s7QUFDTDtBQUNJLElBRkYsYUFBYTtBQUFLLFFBRWhCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxFQUMzQztBQUNKLFlBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7QUFFckMsUUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUMsdkNBQW5DLFFBQUksSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQywvQkFBM0IsUUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyw3QkFBekIsUUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUksRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUMsdEVBQWpFLFFBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFJLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsbENBQTlCLFFBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUMzQixMQUFILEtBQUc7QUFDSDtBQUVNO0FBQW1CO0lBQXZCLGdCQUFnQixwQkFDYixJQURILGdCQUFnQjtRQUNkLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyw3QkFERixRQUNuQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDdEIsTEFBSCxLQUFHO0FBQ0g7QUFFTTtBQUNFO0lBRE4sSUFBSSxSQUNVLElBRGQsSUFBSTtRQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLHhDQUR6QixRQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUMsdkNBQW5DLFFBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQyxoQ0FBNUIsUUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyw5QkFBMUIsUUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztLQUN2QixMQUFILEtBQUc7QUFDSDtBQUNPO0FBQ0U7SUFEUCxJQUFJLFJBQ1csSUFEZixJQUFJO1FBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMseENBRHpCLFFBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQyx2Q0FBbkMsUUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDLGhDQUE1QixRQUFJLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLDlCQUExQixRQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO0tBQ3ZCLExBQUgsS0FBRztBQUNIO0FBRU07QUFDTjtBQUNlO0lBRmIsb0JBQW9CLENBQUMsQ0FBQywxQkFFRCxJQUZyQixvQkFBb0IsQ0FBQyxDQUFDO1FBRWxCLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUMzQixyQ0FGSixRQUNJLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUMzQjtZQUNFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxqQ0FBN0IsWUFBUSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsakNBQTdCLFlBQVEsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLHZDQUFuQyxZQUFRLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLDVDQUF4QyxZQUFRLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7U0FDakMsVEFBUCxTQUFPO0tBQ0osTEFBSCxLQUFHO0FBQ0g7QUFFTTtBQUF5QjtBQUNqQjtJQURaLGtCQUFrQixDQUFDLE1BQU0sN0JBQ0wsSUFEcEIsa0JBQWtCLENBQUMsTUFBTTtRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyw3QkFETSxRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUVqRCw3REFIb0IsUUFDdEIsSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFFakQ7WUFFRSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLEVBQ3pGLHZHQUZSLFlBQ1EsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxFQUN6RjtnQkFFRSxJQUFJLENBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFDekMsMURBRlYsZ0JBQ1UsSUFBSSxDQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQ3pDO0FBQ1Y7b0JBQVksTUFBTSxNQUFNLEdBQXdCLElBQUksR0FBRyxFQUFrQixDQUFDLDdDQUFyQyxvQkFBekIsTUFBTSxNQUFNLEdBQXdCLElBQUksR0FBRyxFQUFrQixDQUFDO29CQUM5RCxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBLHZEQUE5QyxvQkFBWSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO29CQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxoRUFBeEQsb0JBQVksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQzdDLGpCQUFYLGlCQUFXO3FCQUNHLHJCQUFkLHFCQUFjO29CQUNGLElBQUksQ0FBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUNsRSx2RkFEWixvQkFBWSxJQUFJLENBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFDbEU7d0JBRUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMseEZBRDlFLHdCQUNjLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNqRSxyQkFBYixxQkFBYTt5QkFFRyx6QkFEaEIseUJBQ2dCO0FBQ2hCO3dCQUNhLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsNUdBRHhELHdCQUM1QixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNwRixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxjQUFjLEdBQUcsQ0FBQyxFQUFFLENBQUMsM0dBQWhHLHdCQUFhLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLGNBQWMsR0FBRyxDQUFDLEVBQUUsQ0FBQztxQkFDcEYsckJBQVoscUJBQVk7aUJBRUQsakJBRFgsaUJBQ1c7Z0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLHpEQUFuRCxnQkFBVSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLDdDQURtRCxnQkFDaEYsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7YUFDOUIsYkFBVCxhQUFTO1NBRUYsVEFEUCxTQUNPO2FBQ0UsSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBQyxsRUFBN0QsYUFBUyxJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFDO0FBQUU7WUFDdkQsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUMscENBRDRELFlBQ3BGLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxyREFBakQsWUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsOUZBQTdFLGdCQUFELGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQUMsYkFBQSxhQUFBO1lBRXpILElBQUksY0FBYyxLQUFLLENBQUMsRUFBRSx0Q0FEbEMsWUFDUSxJQUFJLGNBQWMsS0FBSyxDQUFDLEVBQUU7QUFBRTtnQkFFMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxoRkFBM0QsZ0JBQUwsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEUsSUFBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUscEVBQTdELGdCQUFVLElBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO0FBQUU7b0JBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsM0RBQS9CLG9CQUFSLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbkQ7b0JBQVksTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsckZBQXhDLG9CQUF6QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM3RTtvQkFFWSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxqRUFBaEQsb0JBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUM7aUJBRTNDLGpCQURaLGlCQUNZO3FCQUVELHJCQURYLHFCQUNXO29CQUNHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyw3REFBdkQsb0JBQWMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUMzQyxqQkFBWixpQkFBWTthQUVILGJBRFQsYUFDUztpQkFDSSxJQUFJLGNBQWMsR0FBRSxDQUFDLEVBQzFCLHpDQURSLGlCQUFhLElBQUksY0FBYyxHQUFFLENBQUMsRUFDMUI7QUFBRTtnQkFDQSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxjQUFjLEdBQUcsQ0FBQyxFQUFFLENBQUMsbkdBREEsZ0JBQ25GLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLGNBQWMsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFFbkYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLHpEQURuRCxnQkFDVSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFFMUMsYkFBVCxhQUFTO1lBQ0QsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsekNBQXJDLFlBQVEsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7U0FDaEMsVEFEZ0csU0FDaEc7YUFDRyxiQUFSLGFBQVE7QUFBRTtZQUNKLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxFQUNyRCxuRUFETSxZQUFOLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxFQUNyRDtBQUNOO2dCQUFRLElBQUksUUFBUSxDQUFTLDdCQUMxQixnQkFESyxJQUFJLFFBQVEsQ0FBUztnQkFDckIsSUFBRyxNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRSwxQ0FBakMsZ0JBQVEsSUFBRyxNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtvQkFBQyxRQUFRLEdBQUMsRUFBRSxDQUFBLGxDQUFWLG9CQUFELFFBQVEsR0FBQyxFQUFFLENBQUE7aUJBQUMsakJBQUEsaUJBQUE7cUJBQ2xDLHJCQUFaLHFCQUFZO29CQUFFLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFBLHZEQUFsQyxvQkFBQSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQTtpQkFBRSxqQkFBRCxpQkFBQztnQkFHMUMsSUFBRyxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksRUFDMUIsN0NBSFIsZ0JBRVEsSUFBRyxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksRUFDMUI7b0JBQ0UsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxLQUFLLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSw1RUFBbEUsb0JBQVUsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxLQUFLLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRTt3QkFBRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHZEQUEvQix3QkFBQSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO3FCQUFFLHJCQUFELHFCQUFDO3lCQUN0Rix6QkFBZix5QkFBZTt3QkFBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTSxDQUFDLENBQUEsaEVBQXRDLHdCQUFELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsQ0FBQTtxQkFBQyxyQkFBQSxxQkFBQTtpQkFDL0MsakJBQVQsaUJBQVM7Z0JBQ0QsSUFBRyxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUssRUFBVSw3Q0FBN0MsZ0JBQVEsSUFBRyxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUssRUFBVTtvQkFDbkMsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxqRUFBdkQsb0JBQVUsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRTt3QkFBRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHZEQUEvQix3QkFBQSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO3FCQUFFLHJCQUFELHFCQUFDO3lCQUMzRSx6QkFBZix5QkFBZTt3QkFBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTSxDQUFDLENBQUEsaEVBQXRDLHdCQUFELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsQ0FBQTtxQkFBQyxyQkFBQSxxQkFBQTtpQkFDL0MsakJBQVQsaUJBQVM7YUFFRixiQURQLGFBQ087aUJBQ0ksakJBQVgsaUJBQVc7Z0JBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxDQUFBLHhEQUF0QyxnQkFBRCxJQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTSxDQUFDLENBQUE7YUFBQyxiQUFBLGFBQUE7U0FDL0MsVEFBTCxTQUFLO0tBQ0YsTEFBSCxLQUFHO0FBQ0g7QUFDTztBQUF5QjtBQUUxQjtJQUZKLDBCQUEwQixDQUFDLE1BQVcsckNBRTFCLElBRlosMEJBQTBCLENBQUMsTUFBVztRQUVwQyxJQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQ3hDLGpEQUZKLFFBQ0ksSUFBSyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUN4QztZQUNFLElBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUN0QixyQ0FETixZQUFNLElBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUN0QjtnQkFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDLC9DQUF2QyxnQkFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQywxQ0FEOEQsZ0JBQ3hGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsekRBQWpELGdCQUFRLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMxQyxiQURnRyxhQUNoRztpQkFDSSxqQkFBWCxpQkFBVztnQkFBRSxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQywzQ0FBM0IsZ0JBQUEsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7YUFBRSxiQUFELGFBQUM7U0FHckMsVEFGTCxTQUVLO2FBQ0ksYkFBVCxhQUFTO0FBQ1Q7WUFDTSxJQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFDdEIsckNBREQsWUFBQyxJQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFDdEI7Z0JBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQywvQ0FBdkMsZ0JBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsMUNBQWxDLGdCQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2FBQzNCLGJBQVAsYUFBTztpQkFDSSxqQkFBWCxpQkFBVztnQkFBRSxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQywzQ0FBM0IsZ0JBQUEsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7YUFBRSxiQUFELGFBQUM7U0FDckMsVEFBTCxTQUFLO0tBRUYsTEFESCxLQUNHO0FBQ0g7QUFDTztBQUFzQjtBQUF3QjtBQUM5QztJQURMLHFCQUFxQixDQUFDLEdBQWMsRUFBRSxLQUFhLHBDQUN0QyxJQURiLHFCQUFxQixDQUFDLEdBQWMsRUFBRSxLQUFhO1FBQ2pELE9BQU8sR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLEtBQUssQ0FBQyxDQUFDLDlFQURqQixRQUNyRCxPQUFPLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQztLQUN2RSxMQUFILEtBQUc7QUFDSDtBQUFRO0FBQXlCO0FBQTZCO0FBRTVEO0lBRkEsVUFBVSxDQUFDLE1BQVcsRUFBRyxVQUE0QyxqQ0FFN0QsSUFGUixVQUFVLENBQUMsTUFBVyxFQUFHLFVBQTRDO0FBQ3ZFO1FBQ0ksTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsekVBQWhELFFBQWpCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWpFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLFNBQVMsQ0FBQyxDQUFDLG5FQUQ3RCxRQUNJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLHJEQUEvQyxRQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLFNBQVMsQ0FBQyxDQUFDLG5FQUE3RCxRQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQUM7S0FFM0QsTEFBQSxLQUFBO0FBQ0g7QUFDTztBQUF5QjtBQUE2QjtBQUF3QjtBQUVsRjtJQUZELHNCQUFzQixDQUFDLE1BQVcsRUFBRSxVQUE0QyxFQUFFLEtBQWEscERBRXRGLElBRlQsc0JBQXNCLENBQUMsTUFBVyxFQUFFLFVBQTRDLEVBQUUsS0FBYTtRQUU3RixLQUFLLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFDdkQsakVBREosUUFBSSxLQUFLLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFDdkQ7QUFDSjtZQUFNLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDLHJGQUFsRCxZQUF2QixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUMsZUFBZSxFQUFFLEtBQUssRUFBQyxDQUFDLHhIQUFoSCxZQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBQyxlQUFlLEVBQUUsS0FBSyxFQUFDLENBQUM7U0FDM0csVEFBTCxTQUFLO0tBR0YsTEFGSCxLQUVHO0FBQ0g7NkNBOWlCQyxTQUFTLFNBQUMsa0JBQ1QsUUFBUSxFQUFFLGVBQWUsa0JBQ3pCLFFBQVEsRUFBRSx6RkFGWCxTQUFTLFNBQUMsa0JBQ1QsUUFBUSxFQUFFLGVBQWUsa0JBQ3pCLFFBQVEsRUFBRTs7Ozs7OztzQ0FpRlgsa0JBQ0MsTUFBTSxFQUFFLENBQUMsM0JBRFYsa0JBQ0MsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztxZkFBcW5ELENBQUMsY0FDaG9ELG1GQXhGTyxsR0F1RnduRCxDQUFDLGNBQ2hvRDtTQXhGdUI7OzZCQStHckI7R0FBSzs7TUFDTCxLQUFLO1lBQ0wsS0FBSztpQ0FDTCxLQUFLO2dCQUNMLEtBQUs7c0JBQ0wsS0FBSztFQUNMLEtBQUs7a0JBQ0wsS0FBSztFQUNMLEtBQUs7UUFDTCxLQUFLLHNDQUNMLEtBQUs7O0FBQ0wsS0FBSyw2QkFDTCxLQUFLO2tCQUNMLEtBQUs7dUJBQ0wsS0FBSztPQUNMLEtBQUs7WUFDTCxLQUFLLG1DQUNMO0lBQUs7TUFDTCxLQUFLLHlCQUNMLEtBQUs7d0JBQ0w7QUFBSyx1Q0FDTCxLQUFLOztBQUNMLEtBQUssMEJBR0wsTUFBTSx1QkFDTjtLQUFNLHVCQUNOO0tBQU0sK0JBQ04sTUFBTTtNQUNOLE1BQU07a0JBQ04sTUFBTTtJQUNOLE1BQU07OztrQkNwSlQ7b0RBb0RFLFlBQW9CLFNBQTRDLFlBQTVDLGNBQVMsR0FBVCxTQUFTLENBQW1DLDJCQXBCakMsSUFBSSxPQUFPLEVBQVksaUNBR3RCLEVBQUUsVUFtQmhDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQyw2Q0FFckMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxNQUMvQix3Q0FFRixRQUFRLGFBRU47RUFBSSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsY0FDckMsSUFBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxTQUFTLENBQUMsd0JBQy9FLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLGNBQzNCLENBQUMsQ0FBQyxVQUNKLE1BRUYsd0NBRUQsa0JBQWtCLGFBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQzVCLCtEQUVELGdCQUFnQixDQUFDLElBQVcsWUFFeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FDaEMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsU0FDN0IsSUFBRyxJQUFJLENBQUMscUJBQXFCLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQzFELGNBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsYUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsVUFDbkMsTUFDSixvRUFFRCxLQUFLLENBQUMsU0FBUyxZQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQyxNQUNyRCx3Q0FFRCxXQUFXLGFBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQyxNQUN4QyxrREEvRUYsU0FBUyxTQUFDLGtCQUNULFFBQVEsRUFBRSxpQkFBaUIsa0JBQzNCLFFBQVEsRUFBRSx3d0JBYVgsa0JBQ0MsTUFBTSxFQUFFLENBQUMsa0lBQWtJLENBQUMsY0FDN0kscUZBMUJRLFlBQVksc0VBNkNsQixNQUFNLG9IQy9DVCxBQStCQSxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FDbkMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLHNFQUduQywrQkFBc0MsSUFBZ0IsUUFDcEQsT0FBTyxJQUFJLG1CQUFtQixDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUNsRSxhQXVCb0IscUJBQXFCLENBQUMsdUNBNEIzQyx1QkZPTTtBQUFDOzBDRXRETiwxQ0ZzRHlCO09FdERqQixTQUFDLGhCRndETSxZQTNGUixnQkFBZ0I7QUFBRztBRW9DekIsT0FBTyxFQUFFLHNCQUNQLC9CRnJDMEI7TUVxQ2Qsc0JBQ1osZ0JBQWdCLDVDRnJDUCx1Q0E4R1YsS0FBSztpQkV4RUosWUFBWSxzQkFDWixuREZ1RVMsK0NBQ1YsS0FBSztLRXhFTyxzQkFDWCxvQkFBb0IsL0NGdUVYLDBDQUNWLEtBQUs7aUJFdkVKLGdCQUFnQixqQ0Z1RVAsd0NBQ1YsS0FBSztLRXZFSixtQkFBbUIseEJGdUVWLGtDQUNWLEtBQUs7RUV2RUosdUJBQXVCLHpCRnVFZCx5QkFDVixLQUFLO1lFdkVKLFlBQVksQ0FBQyx6QkZ1RUoscUJBQ1YsS0FBSztRRXhFdUIsQ0FBQyxFQUFFLENBQUMsc0JBQy9CLGxDRnVFUyxtQ0FDVixLQUFLO2FFeEVvQixiRndFZix5QkFDVixLQUFLO0FFeEVKLGVBQWUsZkZ3RU4seUJBQ1YsS0FBSztFRXhFSixhQUFhLHNCQUNiLHJDRnVFUyxpQ0FDVixLQUFLO09FeEVTLHNCQUNiLDdCRnVFUywyQkFDVixLQUFLO09FeEVXLHNCQUNmLDdCRnVFUyx3QkFDVixLQUFLO1VFeEVXLENBQUMsT0FBTyxDQUFDLG5CRndFZiwyQkFDVixLQUFLO1FFeEVGLE1BQU0sRUFBRSxoQkZ3RUQsd0JBQ1YsS0FBSztZRXhFQSxPQUFPLEVBQUUsZUFBZSxwQ0Z3RW5CLDJCQUNWLEtBQUs7NkJFeEVBLDdCRndFSyx3QkFDVixLQUFLO0tFekVVLElBQXlCLDhCQUNuQyx2Q0Z3RUssOEJBQ1YsS0FBSztHRXpFSSxFQUFFLENBQUMsVUFBVSxDQUFDLGpCRnlFYiwwQkFDVixLQUFLO09FekVELHNCQUNGLDdCRndFUSxvQkFDVixLQUFLO0FFekVGLGtCQUVILGtCQUNELHBDRnNFVywrQkFDVixLQUFLO09FdkVNLEVBQUUsc0JBQ1osL0JGc0VTLGtDQUNWLEtBQUs7SUV2RWEsc0JBQ2pCLDFCRnNFUyxzQ0FDVixLQUFLO0VFdkVvQixzQkFDeEIseEJGc0VTLHFCQUdWLE1BQU07V0V6RWMsWEZ5RVQsa0JBQ1gsTUFBTTtDRXpFTixrQkFDRCxuQkZ3RVksa0JBQ1gsTUFBTTtLRXpFUSxFQUFFLEVBQ2hCLGtCQUNELFNBQVMscENGdUVHLDBCQUNYLE1BQU07Q0V4RUksRUFDVixrQkFDRCxPQUFPLEVBQUUsOUJGc0VHLHdCQUNYLE1BQU07aUJFdEVMLGdCQUFnQixqQ0ZzRU4sOEJBQ1gsTUFBTTtjRXRFTCxZQUFZLDFCRnNFRix5QkFDWCxNQUFNO0FBQUk7VUV0RVQsV0FBVyxzQkFDWCxvQkFBb0I7U0FDcEI7QUFBZ0I7S0FDaEIsZUFBZSxzQkFDZjtrQkFBbUIsc0JBQ25CLGlCQUFpQjthQUNqQixtQkFBbUIsc0JBQ25CO29CQUF3QixrQkFDekIsY0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkY2RGM7QUFBQztBQUFDO0FBQUk7QUFHYjtBQUNjO0FDeEp0QjtBQUE0QjtBQUFRO0FBQTRCO0FBQVEsSUFvRHRFLFlBQW9CLFNBQTRDO0FBQ2xFLFFBRHNCLGNBQVMsR0FBVCxTQUFTLENBQW1DO0FBQUMsMEJBcEJsQyxJQUFJLE9BQU8sRUFBWTtBQUN4RCwrQkFFa0MsRUFBRTtBQUNwQyxRQWtCSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7QUFDekM7QUFDSSxRQUFBLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUM7QUFDbkMsS0FBSTtBQUNKO0FBQ087QUFFRztBQUFRLElBRmhCLFFBQVE7QUFDVixRQUNJLElBQUksSUFBSSxDQUFDLDRCQUE0QixFQUFFO0FBQzNDLFlBQU0sSUFBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxTQUFTLENBQUM7QUFDdkYsZ0JBQVEsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7QUFDbEMsYUFBTyxDQUFDLENBQUM7QUFDVCxTQUFLO0FBQ0wsS0FDRztBQUNIO0FBQ087QUFDTjtBQUFRLElBRFAsa0JBQWtCO0FBQ3BCLFFBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0IsS0FBRztBQUNIO0FBQ087QUFBdUI7QUFFakI7QUFBUSxJQUZuQixnQkFBZ0IsQ0FBQyxJQUFXO0FBQzVCLFFBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEMsUUFBTSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztBQUNuQyxRQUFNLElBQUcsSUFBSSxDQUFDLHFCQUFxQixLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUMxRDtBQUNOLFlBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDekMsWUFBUSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUMxQyxTQUFPO0FBQ1AsS0FBRztBQUNIO0FBQ087QUFDUTtBQUFtQjtBQUFRLElBRHhDLEtBQUssQ0FBQyxTQUFTO0FBQ2hCLFFBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO0FBQ3hELEtBQUc7QUFDSDtBQUNPO0FBQ0U7QUFBUSxJQURmLFdBQVc7QUFDWixRQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7QUFDM0MsS0FBRztBQUNIOytDQWhGQyxTQUFTLFNBQUMsa0JBQ1QsUUFBUSxFQUFFLGlCQUFpQixrQkFDM0IsUUFBUSxFQUFFOzs7O1NBYVgsa0JBQ0M7RUFBTSxFQUFFLENBQUM7NEVBQWtJLENBQUM7U0FDN0k7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dVZBQ0s7QUFBQztBQUFtQjtBQUcxQixZQTlCUyxZQUFZO0FBQUc7QUFBRztBQUVuQix5QkEyQ0wsTUFBTTtBQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkFBRTtBQUFDO0FBQUM7QUFBSTtBQUVwQjtBQUc2RDtBQ3JCOUQsa0JBQWtCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ25DLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuQztBQUNHO0FBQTJCO0FBQ1o7QUFBZTtBQUFqQywrQkFBc0MsSUFBZ0I7QUFDdEQsSUFBRSxPQUFPLElBQUksbUJBQW1CLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ25FLENBQUM7QUFDRCxZQXNCcUIscUJBQXFCLENBQUM7QUFDM0M7QUFBSTtBQUNFO0FBMEJOO0FBQWdDO21EQS9DL0IsUUFBUSxTQUFDLGtCQUNSO0VBQU8sRUFBRSxzQkFDUCxZQUFZLHNCQUNaLGdCQUFnQixzQkFDaEIsWUFBWSxzQkFDWixXQUFXLHNCQUNYLG9CQUFvQjtvQkFDcEI7VUFBZ0I7RUFDaEIsbUJBQW1CO2lCQUNuQjtlQUF1QjtHQUN2QixZQUFZLENBQUM7QUFBYyxDQUFDLEVBQUUsQ0FBQyxzQkFDL0I7aUJBQXdCO0VBQ3hCLGVBQWUsc0JBQ2Y7T0FBYSxzQkFDYjtJQUFhLHNCQUNiO1lBQWU7T0FDZixlQUFlLENBQUM7R0FBTyxDQUFDO0NBQ3RCLE1BQU0sRUFBRTtDQUNOLE9BQU8sRUFBRSxlQUFlOzZCQUN4QixVQUFVLElBQXlCOzJCQUNuQyxJQUFJLEVBQUUsQ0FBQztRQUFVLENBQUMsMEJBQ25COztBQUNGLENBQUM7SUFFSCxrQkFDRDtLQUFZLEVBQUU7T0FDWjtHQUFpQixzQkFDakI7bUJBQXdCO2VBQ3hCO1NBQW1CLG1CQUNwQjtpQkFDRCxlQUFlLEVBQUUsRUFDaEI7Z0JBQ0QsU0FBUyxFQUFFLEVBQ1Ysa0JBQ0QsT0FBTyxFQUFFLHNCQUNQLGdCQUFnQixzQkFDaEIsWUFBWSxzQkFDWixXQUFXLHNCQUNYLG9CQUFvQixzQkFDcEIsZ0JBQWdCLHNCQUNoQjtRQUFlO0lBQ2Y7Q0FBbUI7RUFDbkIsaUJBQWlCO1dBQ2pCO0lBQW1CLHNCQUNuQjtxQkFBd0Isa0JBQ3pCLGNBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFDSztBQUFDO0FBQUM7QUFBSTtBQUVQO0FBQWtFO0FBQUk7QUFBQztBQUFJO0FBQWtDO0FBQWtFO0FBQUk7QUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDZWxsUmVuZGVyZXJBbmd1bGFyQ29tcCB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbmd1bGFyJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWJ0bi1lZGl0LXJlbmRlcmVkJyxcclxuICB0ZW1wbGF0ZTogYDxidXR0b24gbWF0LW1pbmktZmFiIGNsYXNzPVwiYnV0dG9uRWRpdFwiICB0eXBlPVwiYnV0dG9uXCIgIChjbGljayk9XCJidG5DbGlja2VkSGFuZGxlcigkZXZlbnQpXCIgPlxyXG4gIDxtYXQtaWNvbiBjbGFzcz1cImljb25FZGl0XCIgICBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IGVkaXQgPC9tYXQtaWNvbj5cclxuPC9idXR0b24+IGAsXHJcbiAgc3R5bGVzOiBbYC5idXR0b25FZGl0e2NvbG9yOiMwMDA7YmFja2dyb3VuZC1jb2xvcjojZGRkO3dpZHRoOjIwcHg7bWFyZ2luLXRvcDozcHg7aGVpZ2h0OjIwcHg7Ym94LXNoYWRvdzpub25lfS5pY29uRWRpdHtmb250LXNpemU6MTNweDttYXJnaW4tdG9wOi0xMHB4O21hcmdpbi1sZWZ0Oi0ycHh9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJ0bkVkaXRSZW5kZXJlZENvbXBvbmVudCBpbXBsZW1lbnRzIElDZWxsUmVuZGVyZXJBbmd1bGFyQ29tcCwgT25EZXN0cm95IHtcclxuXHJcbiAgcHVibGljIHBhcmFtczogYW55O1xyXG5cclxuICBhZ0luaXQocGFyYW1zOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaChwYXJhbXM6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBidG5DbGlja2VkSGFuZGxlcigkZXZlbnQpIHtcclxuICAgIHRoaXMucGFyYW1zLmNsaWNrZWQodGhpcy5wYXJhbXMudmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UGFyYW1zKCl7XHJcbiAgICByZXR1cm4gdGhpcy5wYXJhbXM7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIC8vIG5vIG5lZWQgdG8gcmVtb3ZlIHRoZSBidXR0b24gY2xpY2sgaGFuZGxlciBcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEFnR3JpZE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbmd1bGFyJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nTW9kdWxlLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBBbGxDb21tdW5pdHlNb2R1bGVzLCBDb2x1bW5BcGksIE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbGwtbW9kdWxlcyc7XHJcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7QnRuRWRpdFJlbmRlcmVkQ29tcG9uZW50fSBmcm9tICcuLi9idG4tZWRpdC1yZW5kZXJlZC9idG4tZWRpdC1yZW5kZXJlZC5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtZGF0YS1ncmlkJyxcclxuICB0ZW1wbGF0ZTogYCAgICA8ZGl2IGlkPWdydXAxIGNsYXNzPVwiZWRpdERpdkJ0bnNcIj5cclxuICAgICAgICA8c3BhbiAqbmdJZj1cInRpdGxlXCIgIFt0cmFuc2xhdGVdPVwidGl0bGVcIj4gPC9zcGFuPlxyXG4gICAgICAgIDxidXR0b24gIG1hdC1taW5pLWZhYiBjbGFzcz1cImVkaXRCdG5cIiAgKm5nSWY9XCJkaXNjYXJkQ2hhbmdlc0J1dHRvblwiICBpZD1cImRlbGV0ZUNoYW5nZXNCdXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgIChjbGljayk9XCJkZWxldGVDaGFuZ2VzKClcIiBbZGlzYWJsZWRdPVwiY2hhbmdlQ291bnRlciA8PSAwXCI+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiAgZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiBjbG9zZSA8L21hdC1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gbWF0LW1pbmktZmFiIGNsYXNzPVwiZWRpdEJ0blwiICpuZ0lmPVwidW5kb0J1dHRvblwiICBpZD1cInVuZG9cIiAgKGNsaWNrKT1cInVuZG8oKVwiIFtkaXNhYmxlZF09XCJjaGFuZ2VDb3VudGVyIDw9IDBcIiA+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IHVuZG8gPC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIG1hdC1taW5pLWZhYiBjbGFzcz1cImVkaXRCdG5cIiAqbmdJZj1cInJlZG9CdXR0b25cIiAgaWQ9XCJyZWRvXCIgIChjbGljayk9XCJyZWRvKClcIiBbZGlzYWJsZWRdPVwicmVkb0NvdW50ZXIgPD0gMFwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiByZWRvIDwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBtYXQtbWluaS1mYWIgY2xhc3M9XCJlZGl0QnRuXCIgKm5nSWY9XCJhcHBseUNoYW5nZXNCdXR0b25cIiAgaWQ9XCJhcHBseUNoYW5nZXNCdXR0b25cIiAgKGNsaWNrKT1cImFwcGx5Q2hhbmdlcygpXCIgW2Rpc2FibGVkXT1cImNoYW5nZUNvdW50ZXIgPD0gMFwiID5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGZvbnRTZXQ9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiID4gY2hlY2sgPC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgaWQ9Z3J1cDIgY2xhc3M9XCJhY3Rpb25zRGl2QnRuc1wiID5cclxuICAgICAgICA8bGFiZWwgKm5nSWY9XCJnbG9iYWxTZWFyY2hcIiBbdHJhbnNsYXRlXT1cIidTZWFyY2gnXCI+IDwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0ICpuZ0lmPVwiZ2xvYmFsU2VhcmNoXCJ0eXBlPVwidGV4dFwiIGNsYXNzPVwic2VhcmNoR2VuZXJpY0lucHV0XCIgcGxhY2Vob2xkZXI9XCJcIiAoa2V5dXApPVwicXVpY2tTZWFyY2goKVwiIFsobmdNb2RlbCldPVwic2VhcmNoVmFsdWVcIiBtbC0yID5cclxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiZGVsZXRlQnV0dG9uXCIgIG1hdC1zdHJva2VkLWJ1dHRvbiBpZD1cImRlbGV0ZUJ1dHRvblwiICAoY2xpY2spPVwicmVtb3ZlRGF0YSgpXCI+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIiA+IGRlbGV0ZSA8L21hdC1pY29uPlxyXG4gICAgICAgICAgICA8c3BhbiAgW3RyYW5zbGF0ZV09XCInUmVtb3ZlJ1wiPiA8L3NwYW4+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgICBcclxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiYWN0aW9uQnV0dG9uXCIgIG1hdC1zdHJva2VkLWJ1dHRvbiBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudVwiIGlkPVwiYWN0aW9uQnV0dG9uXCI+XHJcbiAgICAgICAgICAgIDxzcGFuICBbdHJhbnNsYXRlXT1cIidBY3Rpb25zJ1wiPiA8L3NwYW4+ICAgIFxyXG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCIgPiBrZXlib2FyZF9hcnJvd19kb3duIDwvbWF0LWljb24+ICAgICBcclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8bWF0LW1lbnUgI21lbnU9XCJtYXRNZW51XCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAqbmdJZj1cIiFoaWRlRXhwb3J0QnV0dG9uXCIgKGNsaWNrKT1cImV4cG9ydERhdGEoKVwiID4ge3tcIkV4cG9ydFwiIHwgdHJhbnNsYXRlfX0gPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAqbmdJZj1cIiFoaWRlRHVwbGljYXRlQnV0dG9uXCIgKGNsaWNrKT1cIm9uRHVwbGljYXRlQnV0dG9uQ2xpY2tlZCgpXCI+IHt7XCJEdXBsaWNhdGVcIiB8IHRyYW5zbGF0ZX19PC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAqbmdJZj1cIiFoaWRlU2VhcmNoUmVwbGFjZUJ1dHRvblwiPiB7e1wiU2VhcmNoL1JlcGxhY2VcIiB8IHRyYW5zbGF0ZX19PC9idXR0b24+XHJcbiAgICAgICAgPC9tYXQtbWVudT4gIFxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgPGJ1dHRvbiAgKm5nSWY9XCJuZXdCdXR0b25cIiBtYXQtc3Ryb2tlZC1idXR0b24gaWQ9XCJuZXdCdXR0b25cIiAgKGNsaWNrKT1cIm5ld0RhdGEoKVwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gZm9udFNldD1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCI+IGFkZF9jaXJjbGVfb3V0bGluZSA8L21hdC1pY29uPiAgICAgIFxyXG4gICAgICAgICAgICA8c3BhbiAgW3RyYW5zbGF0ZV09XCInTmV3J1wiPiA8L3NwYW4+ICAgICAgICAgICBcclxuICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgPGJ1dHRvbiAgKm5nSWY9XCJhZGRCdXR0b25cIiBtYXQtc3Ryb2tlZC1idXR0b24gaWQ9XCJuZXdCdXR0b25cIiAgKGNsaWNrKT1cIm9uQWRkQnV0dG9uQ2xpY2tlZCgpXCI+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiBmb250U2V0PVwibWF0ZXJpYWwtaWNvbnMtcm91bmRcIj4gYWRkX2NpcmNsZV9vdXRsaW5lIDwvbWF0LWljb24+ICAgICAgXHJcbiAgICAgICAgICAgIDxzcGFuICBbdHJhbnNsYXRlXT1cIidBZGQnXCI+IDwvc3Bhbj4gICAgICAgICAgIFxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBcclxuICAgIDwvZGl2PlxyXG5cclxuXHJcblxyXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiIHN0eWxlPVwiIGhlaWdodDogMTAwJVwiPlxyXG4gICAgICAgIDxkaXYgaWQ9XCJteUdyaWRcIiBzdHlsZT1cIiB3aWR0aDoxMDAlOyBoZWlnaHQ6IDEwMCVcIiA+XHJcbiAgICAgICAgICAgIDxhZy1ncmlkLWFuZ3VsYXJcclxuICAgICAgICAgICAgc3R5bGU9XCIgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTtcIlxyXG4gICAgICAgICAgICBbY2xhc3NdPVwidGhlbWVHcmlkXCJcclxuICAgICAgICAgICAgW2Zsb2F0aW5nRmlsdGVyXT1cInRydWVcIlxyXG4gICAgICAgICAgICBbcm93RGF0YV09XCJyb3dEYXRhXCJcclxuICAgICAgICAgICAgW2NvbHVtbkRlZnNdPVwiY29sdW1uRGVmc1wiXHJcbiAgICAgICAgICAgIFtncmlkT3B0aW9uc109XCJncmlkT3B0aW9uc1wiXHJcbiAgICAgICAgICAgIFthbmltYXRlUm93c109XCJ0cnVlXCJcclxuICAgICAgICAgICAgW3BhZ2luYXRpb25dPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICBbbW9kdWxlc109XCJtb2R1bGVzXCIgICAgIFxyXG4gICAgICAgICAgICBbdW5kb1JlZG9DZWxsRWRpdGluZ109XCJ0cnVlXCIgICAgXHJcbiAgICAgICAgICAgIFt1bmRvUmVkb0NlbGxFZGl0aW5nTGltaXRdPSAyMDBcclxuICAgICAgICAgICAgW3N1cHByZXNzUm93Q2xpY2tTZWxlY3Rpb25dPXRydWVcclxuICAgICAgICAgICAgW2VuYWJsZUNlbGxDaGFuZ2VGbGFzaF09dHJ1ZVxyXG4gICAgICAgICAgICBbZnJhbWV3b3JrQ29tcG9uZW50c109XCJmcmFtZXdvcmtDb21wb25lbnRzXCJcclxuICAgICAgICAgICAgcm93U2VsZWN0aW9uPVwibXVsdGlwbGVcIlxyXG4gICAgICAgICAgICAoZmlsdGVyTW9kaWZpZWQpPVwib25GaWx0ZXJNb2RpZmllZCgpXCJcclxuICAgICAgICAgICAgKGNlbGxFZGl0aW5nU3RvcHBlZCkgPVwib25DZWxsRWRpdGluZ1N0b3BwZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIChjZWxsVmFsdWVDaGFuZ2VkKT1cIm9uQ2VsbFZhbHVlQ2hhbmdlZCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgKGdyaWRSZWFkeSk9XCJvbkdyaWRSZWFkeSgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8L2FnLWdyaWQtYW5ndWxhcj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuXHJcbmAsXHJcbiAgc3R5bGVzOiBbYGlucHV0LGxhYmVse2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbjo1cHggNXB4IDVweCAxMHB4fSNuZXdCdXR0b257Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOm5vLXJlcGVhdCBwYWRkaW5nLWJveCAjNjhhMjI1O21hcmdpbi1sZWZ0OjNweH0jZGVsZXRlQnV0dG9ue2JhY2tncm91bmQ6bm8tcmVwZWF0IHBhZGRpbmctYm94ICNmZmY7bWFyZ2luLWxlZnQ6M3B4fSNhY3Rpb25CdXR0b257YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggI2ZmZjttYXJnaW4tbGVmdDozcHg7dGV4dC1hbGlnbjpjZW50ZXIhaW1wb3J0YW50fSNhcHBseUNoYW5nZXNCdXR0b257Y29sb3I6I2ZmZiFpbXBvcnRhbnQ7YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggIzY4YTIyNTttYXJnaW4tbGVmdDozcHh9I2FwcGx5Q2hhbmdlc0J1dHRvbltkaXNhYmxlZF17YmFja2dyb3VuZDpuby1yZXBlYXQgcGFkZGluZy1ib3ggIzgzOTc2Y30jcmVkbywjdW5kb3tjb2xvcjojZmZmIWltcG9ydGFudDtiYWNrZ3JvdW5kOiNmZjkzMDA7bWFyZ2luLWxlZnQ6M3B4fSNyZWRvW2Rpc2FibGVkXSwjdW5kb1tkaXNhYmxlZF17YmFja2dyb3VuZDojZmZjOTdmO21hcmdpbi1sZWZ0OjNweH0jZGVsZXRlQ2hhbmdlc0J1dHRvbntjb2xvcjojZmZmIWltcG9ydGFudDtiYWNrZ3JvdW5kOiNkZjMxMzN9I2RlbGV0ZUNoYW5nZXNCdXR0b25bZGlzYWJsZWRde2NvbG9yOiNmZmYhaW1wb3J0YW50O2JhY2tncm91bmQ6I2RhOGM4ZX0uZWRpdERpdkJ0bnN7bWFyZ2luLWxlZnQ6MTBweDt0ZXh0LWFsaWduOnN0YXJ0O3dpZHRoOjEzMHB4O2hlaWdodDozMHB4IWltcG9ydGFudDtsaW5lLWhlaWdodDozMHB4IWltcG9ydGFudH0uYWN0aW9uc0RpdkJ0bnN7dGV4dC1hbGlnbjplbmQ7d2lkdGg6Y2FsYygxMDAlIC0gMTQwcHgpO2hlaWdodDo2MHB4fS5hY3Rpb25zRGl2QnRucywuZWRpdERpdkJ0bnN7ZGlzcGxheTppbmxpbmUtYmxvY2shaW1wb3J0YW50fS5hY3Rpb25zRGl2QnRucyAubWF0LXN0cm9rZWQtYnV0dG9ue3BhZGRpbmc6NXB4IDIwcHghaW1wb3J0YW50fS5lZGl0RGl2QnRucyAubWF0LW1pbmktZmFiIC5tYXQtYnV0dG9uLXdyYXBwZXJ7cGFkZGluZzppbmhlcml0IWltcG9ydGFudDtkaXNwbGF5OmluaGVyaXQhaW1wb3J0YW50fS5lZGl0RGl2QnRucyAubWF0LWljb257aGVpZ2h0OjMwcHghaW1wb3J0YW50O2JvdHRvbTo1cHg7cG9zaXRpb246cmVsYXRpdmV9LmVkaXREaXZCdG5zIC5tYXQtbWluaS1mYWJ7d2lkdGg6MzBweDtoZWlnaHQ6MzBweH0uYWN0aW9uc0RpdkJ0bnMgLnNlYXJjaEdlbmVyaWNJbnB1dHtoZWlnaHQ6NDVweCFpbXBvcnRhbnQ7d2lkdGg6NDUlIWltcG9ydGFudH0uYWctYm9keS12aWV3cG9ydC5hZy1sYXlvdXQtbm9ybWFsIDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWJ7YmFja2dyb3VuZDojZWVlfcOiwoDCiyAuYWctYm9keS12aWV3cG9ydC5hZy1sYXlvdXQtbm9ybWFsIDo6LXdlYmtpdC1zY3JvbGxiYXJ7d2lkdGg6MmVtO2hlaWdodDoyZW19LmFnLWJvZHktdmlld3BvcnQuYWctbGF5b3V0LW5vcm1hbCA6Oi13ZWJraXQtc2Nyb2xsYmFyLWJ1dHRvbntiYWNrZ3JvdW5kOiNjY2N9LmFnLWJvZHktdmlld3BvcnQuYWctbGF5b3V0LW5vcm1hbDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2stcGllY2V7YmFja2dyb3VuZDojODg4fWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiBcclxuICBwcml2YXRlIF9ldmVudFJlZnJlc2hTdWJzY3JpcHRpb246IGFueTtcclxuICBwcml2YXRlIF9ldmVudEdldFNlbGVjdGVkUm93c1N1YnNjcmlwdGlvbjogYW55O1xyXG4gIHByaXZhdGUgX2V2ZW50R2V0QWxsUm93c1N1YnNjcmlwdGlvbjogYW55O1xyXG4gIG1vZHVsZXM6IE1vZHVsZVtdID0gQWxsQ29tbXVuaXR5TW9kdWxlcztcclxuICBzZWFyY2hWYWx1ZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgZ3JpZEFwaTtcclxuICBwcml2YXRlIGdyaWRDb2x1bW5BcGk7XHJcbiAgc3RhdHVzQ29sdW1uID0gZmFsc2U7XHJcbiAgY2hhbmdlc01hcDogTWFwPG51bWJlciwgTWFwPHN0cmluZywgbnVtYmVyPj4gPSBuZXcgTWFwPG51bWJlciwgTWFwPHN0cmluZywgbnVtYmVyPj4oKTtcclxuICAgLy8gV2Ugd2lsbCBzYXZlIHRoZSBpZCBvZiBlZGl0ZWQgY2VsbHMgYW5kIHRoZSBudW1iZXIgb2YgZWRpdGlvbnMgZG9uZS5cclxuICBwcml2YXRlIHBhcmFtczsgLy8gTGFzdCBwYXJhbWV0ZXJzIG9mIHRoZSBncmlkIChpbiBjYXNlIHdlIGRvIGFwcGx5IGNoYW5nZXMgd2Ugd2lsbCBuZWVkIGl0KSBcclxuICByb3dEYXRhOiBhbnlbXTtcclxuICBjaGFuZ2VDb3VudGVyOiBudW1iZXI7IC8vIE51bWJlciBvZiBlZGl0aW9ucyBkb25lIGFib3ZlIGFueSBjZWxsIFxyXG4gIHByZXZpb3VzQ2hhbmdlQ291bnRlcjogbnVtYmVyOyAvLyBOdW1iZXIgb2YgZGl0aW9ucyBkb25lIGFmdGVyIHRoZSBsYXN0IG1vZGlmaWNhdGlvbihjaGFuZ2VDb3VudGVyKVxyXG4gIHJlZG9Db3VudGVyOiBudW1iZXI7IC8vIE51bWJlciBvZiByZWRvIHdlIGNhbiBkb1xyXG4gIG1vZGlmaWNhdGlvbkNoYW5nZSA9IGZhbHNlO1xyXG4gIHVuZG9Ob0NoYW5nZXMgPSBmYWxzZTsgLy8gQm9vbGVhbiB0aGF0IGluZGljYXRlcyBpZiBhbiB1bmRvIGhhc24ndCBtb2RpZmljYXRpb25zXHJcbiAgZ3JpZE9wdGlvbnM7XHJcblxyXG5cclxuICBASW5wdXQoKSBldmVudFJlZnJlc2hTdWJzY3JpcHRpb246IE9ic2VydmFibGUgPGJvb2xlYW4+IDtcclxuICBASW5wdXQoKSBldmVudEdldFNlbGVjdGVkUm93c1N1YnNjcmlwdGlvbjogT2JzZXJ2YWJsZSA8Ym9vbGVhbj4gO1xyXG4gIEBJbnB1dCgpIGV2ZW50R2V0QWxsUm93c1N1YnNjcmlwdGlvbjogT2JzZXJ2YWJsZSA8Ym9vbGVhbj4gO1xyXG4gIEBJbnB1dCgpIGV2ZW50QWRkSXRlbXNTdWJzY3JpcHRpb246IE9ic2VydmFibGUgPGFueVtdPiA7XHJcbiAgQElucHV0KCkgZnJhbWV3b3JrQ29tcG9uZW50czogYW55O1xyXG4gIEBJbnB1dCgpIGNvbHVtbkRlZnM6IGFueVtdO1xyXG4gIEBJbnB1dCgpIGdldEFsbDogKCkgPT4gT2JzZXJ2YWJsZTxhbnk+O1xyXG4gIEBJbnB1dCgpIGRpc2NhcmRDaGFuZ2VzQnV0dG9uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHVuZG9CdXR0b246IGJvb2xlYW47XHJcbiAgQElucHV0KCkgcmVkb0J1dHRvbjogYm9vbGVhbjtcclxuICBASW5wdXQoKSBhcHBseUNoYW5nZXNCdXR0b246IGJvb2xlYW47XHJcbiAgQElucHV0KCkgZGVsZXRlQnV0dG9uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIG5ld0J1dHRvbjogYm9vbGVhbjtcclxuICBASW5wdXQoKSBhY3Rpb25CdXR0b246IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYWRkQnV0dG9uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGdsb2JhbFNlYXJjaDogYm9vbGVhbjtcclxuICBASW5wdXQoKSB0aGVtZUdyaWQ6IGFueTtcclxuICBASW5wdXQoKSBzaW5nbGVTZWxlY3Rpb246IGJvb2xlYW47XHJcbiAgQElucHV0KCkgbm9uRWRpdGFibGU6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcclxuICBASW5wdXQoKSBoaWRlRXhwb3J0QnV0dG9uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGhpZGVEdXBsaWNhdGVCdXR0b246IGJvb2xlYW47XHJcbiAgQElucHV0KCkgaGlkZVNlYXJjaFJlcGxhY2VCdXR0b246IGJvb2xlYW47XHJcblxyXG5cclxuICBAT3V0cHV0KCkgcmVtb3ZlOiBFdmVudEVtaXR0ZXI8YW55W10+O1xyXG4gIEBPdXRwdXQoKSBuZXc6IEV2ZW50RW1pdHRlcjxudW1iZXI+O1xyXG4gIEBPdXRwdXQoKSBhZGQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+O1xyXG4gIEBPdXRwdXQoKSBzZW5kQ2hhbmdlczogRXZlbnRFbWl0dGVyPGFueVtdPjtcclxuICBAT3V0cHV0KCkgZHVwbGljYXRlOiBFdmVudEVtaXR0ZXI8YW55W10+O1xyXG4gIEBPdXRwdXQoKSBnZXRTZWxlY3RlZFJvd3M6IEV2ZW50RW1pdHRlcjxhbnlbXT47XHJcbiAgQE91dHB1dCgpIGdldEFsbFJvd3M6IEV2ZW50RW1pdHRlcjxhbnlbXT47XHJcblxyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLnRyYW5zbGF0ZSA9IHRyYW5zbGF0ZTtcclxuXHJcbiAgICB0aGlzLmZyYW1ld29ya0NvbXBvbmVudHMgPSB7XHJcbiAgICAgIGJ0bkVkaXRSZW5kZXJlckNvbXBvbmVudDogQnRuRWRpdFJlbmRlcmVkQ29tcG9uZW50XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5uZXcgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLmFkZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHRoaXMuc2VuZENoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLmdldFNlbGVjdGVkUm93cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHRoaXMuZHVwbGljYXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5nZXRBbGxSb3dzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5jaGFuZ2VDb3VudGVyID0gMDtcclxuICAgIHRoaXMucHJldmlvdXNDaGFuZ2VDb3VudGVyID0gMDtcclxuICAgIHRoaXMucmVkb0NvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5ncmlkT3B0aW9ucyA9IHtcclxuICAgICAgZGVmYXVsdENvbERlZjoge1xyXG4gICAgICAgIHNvcnRhYmxlOiB0cnVlLFxyXG4gICAgICAgIGZsZXg6IDEsXHJcbiAgICAgICAgZmlsdGVyOiB0cnVlLFxyXG4gICAgICAgIGVkaXRhYmxlOiAhdGhpcy5ub25FZGl0YWJsZSxcclxuICAgICAgICBjZWxsU3R5bGU6IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ30sXHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbHVtblR5cGVzOiB7XHJcbiAgICAgICAgZGF0ZUNvbHVtbjoge1xyXG4gICAgICAgICAgICBmaWx0ZXI6ICdhZ0RhdGVDb2x1bW5GaWx0ZXInLFxyXG4gICAgICAgICAgICBmaWx0ZXJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICBjb21wYXJhdG9yKGZpbHRlckxvY2FsRGF0ZUF0TWlkbmlnaHQsIGNlbGxWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZUNlbGxWYWx1ZSA9IG5ldyBEYXRlKGNlbGxWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlRmlsdGVyID0gbmV3IERhdGUoZmlsdGVyTG9jYWxEYXRlQXRNaWRuaWdodCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGVDZWxsVmFsdWUuZ2V0VGltZSgpIDwgZGF0ZUZpbHRlci5nZXRUaW1lKCkpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRlQ2VsbFZhbHVlLmdldFRpbWUoKSAgPiBkYXRlRmlsdGVyLmdldFRpbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1cHByZXNzTWVudTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAgIHJvd1NlbGVjdGlvbjogJ211bHRpcGxlJyxcclxuICAgICAgc2luZ2xlQ2xpY2tFZGl0OiB0cnVlLFxyXG4gICAgICAvLyBzdXBwcmVzc0hvcml6b250YWxTY3JvbGw6IHRydWUsXHJcbiAgICAgIGxvY2FsZVRleHRGdW5jOiAoa2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoa2V5KTtcclxuICAgICAgICByZXR1cm4gZGF0YSA9PT0ga2V5ID8gZGVmYXVsdFZhbHVlIDogZGF0YTtcclxuICAgIH1cclxuICAgIH07XHJcblxyXG4gIH1cclxuXHJcblxyXG4gIG5nT25Jbml0KCl7XHJcblxyXG4gICAgaWYgKHRoaXMuZXZlbnRSZWZyZXNoU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50UmVmcmVzaFN1YnNjcmlwdGlvbiA9IHRoaXMuZXZlbnRSZWZyZXNoU3Vic2NyaXB0aW9uLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50cygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmV2ZW50R2V0U2VsZWN0ZWRSb3dzU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50R2V0U2VsZWN0ZWRSb3dzU3Vic2NyaXB0aW9uID0gdGhpcy5ldmVudEdldFNlbGVjdGVkUm93c1N1YnNjcmlwdGlvbi5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZW1pdFNlbGVjdGVkUm93cygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmV2ZW50R2V0QWxsUm93c1N1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLl9ldmVudEdldEFsbFJvd3NTdWJzY3JpcHRpb24gPSB0aGlzLmV2ZW50R2V0QWxsUm93c1N1YnNjcmlwdGlvbi5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZW1pdEFsbFJvd3MoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy5ldmVudEFkZEl0ZW1zU3Vic2NyaXB0aW9uKVxyXG4gICAge1xyXG4gICAgICB0aGlzLmV2ZW50QWRkSXRlbXNTdWJzY3JpcHRpb24uc3Vic2NyaWJlKFxyXG4gICAgICAgIChpdGVtcykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5hZGRJdGVtcyhpdGVtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG5cclxuICB9XHJcblxyXG5cclxuXHJcbiAgb25HcmlkUmVhZHkocGFyYW1zKTogdm9pZHtcclxuICAgIGlmICh0aGlzLnNpbmdsZVNlbGVjdGlvbikge3RoaXMuZ3JpZE9wdGlvbnMucm93U2VsZWN0aW9uID0gJ3NpbmdsZSd9XHJcbiAgICAvLyBpZiAodGhpcy5ub25FZGl0YWJsZSkge3RoaXMuZ3JpZE9wdGlvbnMuZGVmYXVsdENvbERlZi5lZGl0YWJsZSA9IGZhbHNlfVxyXG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgICB0aGlzLmdyaWRBcGkgPSBwYXJhbXMuYXBpO1xyXG4gICAgdGhpcy5ncmlkQ29sdW1uQXBpID0gcGFyYW1zLmNvbHVtbkFwaTtcclxuICAgIHRoaXMuZ2V0RWxlbWVudHMoKTtcclxuICAgIHRoaXMuZ3JpZEFwaS5zaXplQ29sdW1uc1RvRml0KCk7XHJcbiAgICBmb3IgKGNvbnN0IGNvbCBvZiB0aGlzLmNvbHVtbkRlZnMpIHtcclxuICAgICAgaWYgKGNvbC5maWVsZCA9PT0gJ2VzdGF0Jykge1xyXG4gICAgICAgIHRoaXMuc3RhdHVzQ29sdW1uID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgXHJcbiAgZW1pdFNlbGVjdGVkUm93cygpOiB2b2lke1xyXG4gICAgY29uc3Qgc2VsZWN0ZWROb2RlcyA9IHRoaXMuZ3JpZEFwaS5nZXRTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICBjb25zdCBzZWxlY3RlZERhdGEgPSBzZWxlY3RlZE5vZGVzLm1hcChub2RlID0+IG5vZGUuZGF0YSk7XHJcbiAgICB0aGlzLmdldFNlbGVjdGVkUm93cy5lbWl0KHNlbGVjdGVkRGF0YSk7XHJcbiAgfVxyXG5cclxuICBlbWl0QWxsUm93cygpOiB2b2lke1xyXG4gICAgbGV0IHJvd0RhdGEgPSBbXTtcclxuICAgIHRoaXMuZ3JpZEFwaS5mb3JFYWNoTm9kZShub2RlID0+IHJvd0RhdGEucHVzaChub2RlLmRhdGEpKTtcclxuICAgIHRoaXMuZ2V0U2VsZWN0ZWRSb3dzLmVtaXQocm93RGF0YSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb2x1bW5LZXlzQW5kSGVhZGVycyhjb2x1bW5rZXlzOiBBcnJheTxhbnk+KTogU3RyaW5neyAgICBcclxuICAgIGxldCBoZWFkZXI6QXJyYXk8YW55PiA9IFtdO1xyXG4gICAgaWYgKHRoaXMuY29sdW1uRGVmcy5sZW5ndGggPT0gMCkge3JldHVybiAnJ307XHJcblxyXG4gICAgbGV0IGFsbENvbHVtbktleXM9dGhpcy5ncmlkT3B0aW9ucy5jb2x1bW5BcGkuZ2V0QWxsRGlzcGxheWVkQ29sdW1ucygpO1xyXG4gICAgLy8gY29uc29sZS5sb2coYWxsQ29sdW1uS2V5cyk7XHJcbiAgICBhbGxDb2x1bW5LZXlzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQudXNlclByb3ZpZGVkQ29sRGVmLmhlYWRlck5hbWUgIT09ICcnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGNvbHVtbmtleXMucHVzaChlbGVtZW50LnVzZXJQcm92aWRlZENvbERlZi5maWVsZCk7XHJcbiAgICAgICAgICBoZWFkZXIucHVzaChlbGVtZW50LnVzZXJQcm92aWRlZENvbERlZi5oZWFkZXJOYW1lKTtcclxuICAgICAgICB9XHJcbiAgXHJcbiAgICAgIFxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHJldHVybiBoZWFkZXIuam9pbihcIixcIik7XHJcbiAgfVxyXG5cclxuXHJcbiAgZXhwb3J0RGF0YSgpOiB2b2lke1xyXG4gICAgbGV0IGNvbHVtbmtleXM6QXJyYXk8YW55PiA9IFtdO1xyXG4gICAgbGV0IGN1c3RvbUhlYWRlcjpTdHJpbmcgPSAnJztcclxuICAgIGN1c3RvbUhlYWRlciA9IHRoaXMuZ2V0Q29sdW1uS2V5c0FuZEhlYWRlcnMoY29sdW1ua2V5cylcclxuICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgb25seVNlbGVjdGVkOiB0cnVlLFxyXG4gICAgICAgIGNvbHVtbktleXM6IGNvbHVtbmtleXMsXHJcbiAgICAgICAgY3VzdG9tSGVhZGVyOiBjdXN0b21IZWFkZXIsXHJcbiAgICAgICAgc2tpcEhlYWRlcjogdHJ1ZVxyXG4gICAgfTtcclxuICAgIHRoaXMuZ3JpZEFwaS5leHBvcnREYXRhQXNDc3YocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHF1aWNrU2VhcmNoKCk6IHZvaWR7XHJcbiAgICB0aGlzLmdyaWRBcGkuc2V0UXVpY2tGaWx0ZXIodGhpcy5zZWFyY2hWYWx1ZSk7XHJcbn1cclxuXHJcbiAgZ2V0RWxlbWVudHMoKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuZ2V0QWxsKClcclxuICAgIC5zdWJzY3JpYmUoKGl0ZW1zKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yb3dEYXRhID0gaXRlbXM7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKT0+e3RoaXMuZ3JpZEFwaS5zaXplQ29sdW1uc1RvRml0KCl9LCAzMCk7XHJcbiAgICAgICAgdGhpcy5ncmlkQXBpLnNldFJvd0RhdGEodGhpcy5yb3dEYXRhKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJvd0RhdGEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAgYWRkSXRlbXMobmV3SXRlbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZyhuZXdJdGVtcyk7XHJcblxyXG4gICAgdGhpcy5ncmlkQXBpLnVwZGF0ZVJvd0RhdGEoeyBhZGQ6IG5ld0l0ZW1zIH0pO1xyXG4gICAgY29uc29sZS5sb2codGhpcy5jb2x1bW5EZWZzKTtcclxuXHJcbiAgfVxyXG5cclxuICByZW1vdmVEYXRhKCk6IHZvaWQge1xyXG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdyaWRBcGkuZ2V0U2VsZWN0ZWROb2RlcygpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWREYXRhID0gc2VsZWN0ZWROb2Rlcy5tYXAobm9kZSA9PiBub2RlLmRhdGEpO1xyXG4gICAgdGhpcy5yZW1vdmUuZW1pdChzZWxlY3RlZERhdGEpO1xyXG5cclxuICAgIGlmKHRoaXMuc3RhdHVzQ29sdW1uKVxyXG4gICAge1xyXG4gICAgICBjb25zdCBzZWxlY3RlZFJvd3MgPSBzZWxlY3RlZE5vZGVzLm1hcChub2RlID0+IG5vZGUucm93SW5kZXgpO1xyXG5cclxuICAgICAgZm9yIChjb25zdCBpZCBvZiBzZWxlY3RlZFJvd3Mpe1xyXG4gICAgICAgICAgdGhpcy5ncmlkQXBpLmdldFJvd05vZGUoaWQpLmRhdGEuZXN0YXQgPSdFbGltaW5hdCc7XHJcbiAgICAgICAgfVxyXG4gICAgICB0aGlzLmdyaWRPcHRpb25zLmFwaS5yZWZyZXNoQ2VsbHMoKTtcclxuICAgIH1cclxuICAgIHRoaXMuZ3JpZE9wdGlvbnMuYXBpLmRlc2VsZWN0QWxsKCk7XHJcbiAgfVxyXG5cclxuICBuZXdEYXRhKCk6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xyXG4gICAgdGhpcy5uZXcuZW1pdCgtMSk7XHJcbiAgfVxyXG5cclxuICBvbkFkZEJ1dHRvbkNsaWNrZWQoKTogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XHJcbiAgICB0aGlzLmFkZC5lbWl0KC0xKTtcclxuICB9XHJcblxyXG4gIG9uRHVwbGljYXRlQnV0dG9uQ2xpY2tlZCgpOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdyaWRBcGkuZ2V0U2VsZWN0ZWROb2RlcygpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWREYXRhID0gc2VsZWN0ZWROb2Rlcy5tYXAobm9kZSA9PiBub2RlLmRhdGEpO1xyXG4gICAgdGhpcy5kdXBsaWNhdGUuZW1pdChzZWxlY3RlZERhdGEpO1xyXG4gIH1cclxuXHJcblxyXG4gIGFwcGx5Q2hhbmdlcygpOiB2b2lkXHJcbiAge1xyXG4gICAgY29uc3QgaXRlbXNDaGFuZ2VkOiBhbnlbXSA9IFtdO1xyXG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcclxuICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMuY2hhbmdlc01hcC5rZXlzKCkpXHJcbiAgICB7XHJcbiAgICAgIGl0ZW1zQ2hhbmdlZC5wdXNoKHRoaXMuZ3JpZEFwaS5nZXRSb3dOb2RlKGtleSkuZGF0YSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbmRDaGFuZ2VzLmVtaXQoaXRlbXNDaGFuZ2VkKTtcclxuICAgIHRoaXMuY2hhbmdlc01hcC5jbGVhcigpO1xyXG4gICAgdGhpcy5jaGFuZ2VDb3VudGVyID0gMDtcclxuICAgIHRoaXMucHJldmlvdXNDaGFuZ2VDb3VudGVyID0gMDtcclxuICAgIHRoaXMucmVkb0NvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5wYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9ICB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9O1xyXG4gICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3MoKTtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgZGVsZXRlQ2hhbmdlcygpOiB2b2lkXHJcbiAge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoYW5nZUNvdW50ZXI7IGkrKylcclxuICAgIHtcclxuICAgICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jaGFuZ2VzTWFwLmNsZWFyKCk7XHJcbiAgICB0aGlzLnByZXZpb3VzQ2hhbmdlQ291bnRlciA9IDA7XHJcbiAgICB0aGlzLmNoYW5nZUNvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5yZWRvQ291bnRlciA9IDA7XHJcbiAgICB0aGlzLnBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0gIHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307XHJcbiAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cygpO1xyXG4gIH1cclxuXHJcblxyXG4gIG9uRmlsdGVyTW9kaWZpZWQoKTogdm9pZHtcclxuICAgIHRoaXMuZGVsZXRlQ2hhbmdlcygpO1xyXG4gIH1cclxuXHJcblxyXG4gIHVuZG8oKTogdm9pZCB7XHJcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xyXG4gICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpO1xyXG4gICAgdGhpcy5jaGFuZ2VDb3VudGVyIC09IDE7XHJcbiAgICB0aGlzLnJlZG9Db3VudGVyICs9IDE7XHJcbiAgfVxyXG5cclxuICByZWRvKCk6IHZvaWQge1xyXG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcclxuICAgIHRoaXMuZ3JpZEFwaS5yZWRvQ2VsbEVkaXRpbmcoKTtcclxuICAgIHRoaXMuY2hhbmdlQ291bnRlciArPSAxO1xyXG4gICAgdGhpcy5yZWRvQ291bnRlciAtPSAxO1xyXG4gIH1cclxuXHJcblxyXG4gIG9uQ2VsbEVkaXRpbmdTdG9wcGVkKGUpXHJcbiAge1xyXG4gICAgICBpZiAodGhpcy5tb2RpZmljYXRpb25DaGFuZ2UpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLmNoYW5nZUNvdW50ZXIrKztcclxuICAgICAgICB0aGlzLnJlZG9Db3VudGVyID0gMDtcclxuICAgICAgICB0aGlzLm9uQ2VsbFZhbHVlQ2hhbmdlZChlKTtcclxuICAgICAgICB0aGlzLm1vZGlmaWNhdGlvbkNoYW5nZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgb25DZWxsVmFsdWVDaGFuZ2VkKHBhcmFtcyk6IHZvaWR7XHJcbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtczsgXHJcbiAgICBpZiAodGhpcy5jaGFuZ2VDb3VudGVyID4gdGhpcy5wcmV2aW91c0NoYW5nZUNvdW50ZXIpXHJcbiAgICAgIC8vIFRydWUgaWYgd2UgaGF2ZSBlZGl0ZWQgc29tZSBjZWxsIG9yIHdlIGhhdmUgZG9uZSBhIHJlZG8gXHJcbiAgICAgIHtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtcy5vbGRWYWx1ZSAhPT0gcGFyYW1zLnZhbHVlICYmICEocGFyYW1zLm9sZFZhbHVlID09IG51bGwgJiYgcGFyYW1zLnZhbHVlID09PSAnJykpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBpZiAoISB0aGlzLmNoYW5nZXNNYXAuaGFzKHBhcmFtcy5ub2RlLmlkKSkgLy8gSWYgaXQncyBmaXJ0cyBlZGl0IG9mIGEgY2VsbCwgd2UgYWRkIGl0IHRvIHRoZSBtYXAgYW5kIHdlIHBhaW50IGl0XHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkZE1hcDogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XHJcbiAgICAgICAgICAgIGFkZE1hcC5zZXQocGFyYW1zLmNvbERlZi5maWVsZCwgMSlcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VzTWFwLnNldChwYXJhbXMubm9kZS5pZCwgYWRkTWFwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmICghIHRoaXMuY2hhbmdlc01hcC5nZXQocGFyYW1zLm5vZGUuaWQpLmhhcyhwYXJhbXMuY29sRGVmLmZpZWxkKSlcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLmNoYW5nZXNNYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKS5zZXQocGFyYW1zLmNvbERlZi5maWVsZCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgLy8gV2UgYWxyZWFkeSBoYWQgZWRpdGVkIHRoaXMgY2VsbCwgc28gd2Ugb25seSBpbmNyZW1lbnQgbnVtYmVyIG9mIGNoYW5nZXMgb2YgaXQgb24gdGhlIG1hcCBcclxuICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRDaGFuZ2VzID0gdGhpcy5jaGFuZ2VzTWFwLmdldChwYXJhbXMubm9kZS5pZCkuZ2V0KHBhcmFtcy5jb2xEZWYuZmllbGQpO1xyXG4gICAgICAgICAgICAgdGhpcy5jaGFuZ2VzTWFwLmdldChwYXJhbXMubm9kZS5pZCkuc2V0KHBhcmFtcy5jb2xEZWYuZmllbGQsIChjdXJyZW50Q2hhbmdlcyArIDEpKTtcclxuICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5wYWludENlbGxzKHBhcmFtcywgdGhpcy5jaGFuZ2VzTWFwKTsgLy9XZSBwYWludCB0aGUgcm93IG9mIHRoZSBlZGl0ZWQgY2VsbCBcclxuICAgICAgICAgIHRoaXMucHJldmlvdXNDaGFuZ2VDb3VudGVyKys7IC8vV2UgbWF0Y2ggdGhlIGN1cnJlbnQgcHJldmlvdXNDaGFuZ2VDb3VudGVyIHdpdGggY2hhbmdlQ291bnRlclxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMuY2hhbmdlQ291bnRlciA8IHRoaXMucHJldmlvdXNDaGFuZ2VDb3VudGVyKXsgLy8gVHJ1ZSBpZiB3ZSBoYXZlIGRvbmUgYW4gdW5kb1xyXG4gICAgICAgIGxldCBjdXJyZW50Q2hhbmdlcyA9IC0xO1xyXG4gICAgICAgIGlmICh0aGlzLmNoYW5nZXNNYXAuaGFzKHBhcmFtcy5ub2RlLmlkKSkge2N1cnJlbnRDaGFuZ2VzID0gdGhpcy5jaGFuZ2VzTWFwLmdldChwYXJhbXMubm9kZS5pZCkuZ2V0KHBhcmFtcy5jb2xEZWYuZmllbGQpO31cclxuICAgICAgICBcclxuICAgICAgICBpZiAoY3VycmVudENoYW5nZXMgPT09IDEpIHsgLy9PbmNlIHRoZSB1bmRvIGl0J3MgZG9uZSwgY2VsbCBpcyBpbiBoaXMgaW5pdGlhbCBzdGF0dXNcclxuXHJcbiAgICAgICAgICB0aGlzLmNoYW5nZXNNYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKS5kZWxldGUocGFyYW1zLmNvbERlZi5maWVsZCk7XHJcbiAgICAgICAgICBpZih0aGlzLmNoYW5nZXNNYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKS5zaXplID09PSAwKSB7IC8vIE5vIG1vcmUgbW9kaWZpY2F0aW9ucyBpbiB0aGlzIHJvd1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZXNNYXAuZGVsZXRlKHBhcmFtcy5ub2RlLmlkKTtcclxuICAgICAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5ncmlkQXBpLmdldERpc3BsYXllZFJvd0F0SW5kZXgocGFyYW1zLnJvd0luZGV4KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFdlIHBhaW50IGl0IHdoaXRlXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKHtyb3dOb2RlczogW3Jvd119KTtcclxuXHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGhpcy5wYWludENlbGxzKHBhcmFtcywgdGhpcy5jaGFuZ2VzTWFwKTtcclxuICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50Q2hhbmdlcyA+MSkgLy8gVGhlIGNlbGwgaXNuJ3QgaW4gaGlzIGluaXRpYWwgc3RhdGUgeWV0XHJcbiAgICAgICAgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vV2UgY2FuJ3QgZG8gZWxzZSBiZWNhdXNlIHdlIGNhbiBiZSBkb2luZyBhbiB1bmRvIHdpdGhvdXQgY2hhbmdlcyBcclxuICAgICAgICAgIHRoaXMuY2hhbmdlc01hcC5nZXQocGFyYW1zLm5vZGUuaWQpLnNldChwYXJhbXMuY29sRGVmLmZpZWxkLCAoY3VycmVudENoYW5nZXMgLSAxKSk7XHJcblxyXG4gICAgICAgICAgdGhpcy5wYWludENlbGxzKHBhcmFtcywgdGhpcy5jaGFuZ2VzTWFwKTsvL05vdCBpbml0aWFsIHN0YXRlIC0+IGdyZWVuIGJhY2tncm91bmRcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJldmlvdXNDaGFuZ2VDb3VudGVyLS07ICAvL1dlIGRlY3JlbWVudCBwcmV2aW91c0NoYW5nZUNvdW50ZXIgYmVjYXVzZSB3ZSBoYXZlIGRvbmUgdW5kb1xyXG4gICAgfVxyXG4gICAgZWxzZXsgLy8gQ29udHJvbCBvZiBtb2RpZmljYXRpb25zIHdpdGhvdXQgY2hhbmdlc1xyXG4gICAgICBpZiggIShwYXJhbXMub2xkVmFsdWUgPT0gbnVsbCAmJiBwYXJhbXMudmFsdWUgPT09ICcnKSlcclxuICAgICAge1xyXG4gICAgICAgIGxldCBuZXdWYWx1ZTogc3RyaW5nO1xyXG4gICAgICAgIGlmKHBhcmFtcy52YWx1ZSA9PSBudWxsKSB7bmV3VmFsdWU9Jyd9XHJcbiAgICAgICAgZWxzZXsgbmV3VmFsdWUgPSBwYXJhbXMudmFsdWUudG9TdHJpbmcoKSB9XHJcblxyXG5cclxuICAgICAgICBpZihwYXJhbXMub2xkVmFsdWUgIT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZiAocGFyYW1zLm9sZFZhbHVlLnRvU3RyaW5nKCkgIT09IG5ld1ZhbHVlLnRvU3RyaW5nKCkpIHsgdGhpcy5tb2RpZmljYXRpb25DaGFuZ2UgPSB0cnVlOyB9XHJcbiAgICAgICAgICBlbHNlIHt0aGlzLm1vZGlmaWNhdGlvbldpdGhvdXRDaGFuZ2VzKHBhcmFtcyl9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHBhcmFtcy5vbGRWYWx1ZSA9PSBudWxsICkgICAgICAgICB7XHJcbiAgICAgICAgICBpZiAocGFyYW1zLm9sZFZhbHVlICE9PSBuZXdWYWx1ZS50b1N0cmluZygpKSB7IHRoaXMubW9kaWZpY2F0aW9uQ2hhbmdlID0gdHJ1ZTsgfVxyXG4gICAgICAgICAgZWxzZSB7dGhpcy5tb2RpZmljYXRpb25XaXRob3V0Q2hhbmdlcyhwYXJhbXMpfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHt0aGlzLm1vZGlmaWNhdGlvbldpdGhvdXRDaGFuZ2VzKHBhcmFtcyl9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtb2RpZmljYXRpb25XaXRob3V0Q2hhbmdlcyhwYXJhbXM6IGFueSkge1xyXG5cclxuICAgIGlmICggdGhpcy5jaGFuZ2VzTWFwLmhhcyhwYXJhbXMubm9kZS5pZCkpIC8vTW9kaWZpY2F0aW9uIHdpdGhvdXQgY2hhbmdlcyBpbiBlbiBlZGl0ZWQgY2VsbFxyXG4gICAge1xyXG4gICAgICBpZighdGhpcy51bmRvTm9DaGFuZ2VzKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpOyAvLyBVbmRvIHRvIGRlbGV0ZSB0aGUgY2hhbmdlIHdpdGhvdXQgY2hhbmdlcyBpbnRlcm5hbGx5IFxyXG4gICAgICAgIHRoaXMudW5kb05vQ2hhbmdlcyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wYWludENlbGxzKHBhcmFtcywgdGhpcy5jaGFuZ2VzTWFwKTsgIC8vVGhlIGNlbGwgaGFzIG1vZGlmaWNhdGlvbnMgeWV0IC0+IGdyZWVuIGJhY2tncm91bmQgXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7IHRoaXMudW5kb05vQ2hhbmdlcyA9IGZhbHNlOyB9XHJcblxyXG5cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAvL1dpdGggdGhlIGludGVybmFsbHkgdW5kbyB3aWxsIGVudGVyIGF0IHRoaXMgZnVuY3Rpb24sIHNvIHdlIGhhdmUgdG8gY29udHJvbCB3aGVuIGRvbmUgdGhlIHVuZG8gb3Igbm90IFxyXG4gICAgICBpZighdGhpcy51bmRvTm9DaGFuZ2VzKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpOyAvLyBVbmRvIHRvIGRlbGV0ZSB0aGUgY2hhbmdlIGludGVybmFsbHlcclxuICAgICAgICB0aGlzLnVuZG9Ob0NoYW5nZXMgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgeyB0aGlzLnVuZG9Ob0NoYW5nZXMgPSBmYWxzZTsgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGdldENvbHVtbkluZGV4QnlDb2xJZChhcGk6IENvbHVtbkFwaSwgY29sSWQ6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gYXBpLmdldEFsbENvbHVtbnMoKS5maW5kSW5kZXgoY29sID0+IGNvbC5nZXRDb2xJZCgpID09PSBjb2xJZCk7XHJcbiAgfVxyXG4gIHBhaW50Q2VsbHMocGFyYW1zOiBhbnksICBjaGFuZ2VzTWFwOiBNYXA8bnVtYmVyLCBNYXA8c3RyaW5nLCBudW1iZXI+PiwgKVxyXG4gIHtcclxuICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VDZWxsU3R5bGVDb2x1bW5zKHBhcmFtcyxjaGFuZ2VzTWFwLCcjRThGMURFJyk7XHJcbiAgICB0aGlzLmdyaWRBcGkucmVkcmF3Um93cyh7cm93Tm9kZXM6IFtyb3ddfSk7XHJcbiAgICB0aGlzLmNoYW5nZUNlbGxTdHlsZUNvbHVtbnMocGFyYW1zLGNoYW5nZXNNYXAsJyNGRkZGRkYnKTsgXHJcbiAgICAvLyBXZSB3aWxsIGRlZmluZSBjZWxsU3R5bGUgd2hpdGUgdG8gZnV0dXJlIG1vZGlmaWNhdGlvbnMgKGxpa2UgZmlsdGVyKVxyXG4gIH1cclxuXHJcbiAgY2hhbmdlQ2VsbFN0eWxlQ29sdW1ucyhwYXJhbXM6IGFueSwgY2hhbmdlc01hcDogTWFwPG51bWJlciwgTWFwPHN0cmluZywgbnVtYmVyPj4sIGNvbG9yOiBzdHJpbmcpe1xyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IG9mIGNoYW5nZXNNYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKS5rZXlzKCkpXHJcbiAgICB7XHJcbiAgICAgIGNvbnN0IGNvbHVtbk51bWJlciA9IHRoaXMuZ2V0Q29sdW1uSW5kZXhCeUNvbElkKHRoaXMuZ3JpZENvbHVtbkFwaSwga2V5KTtcclxuICAgICAgdGhpcy5ncmlkQ29sdW1uQXBpLmNvbHVtbkNvbnRyb2xsZXIuZ3JpZENvbHVtbnNbY29sdW1uTnVtYmVyXS5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogY29sb3J9O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEaWFsb2dEYXRhIHtcclxuICBfR2V0QWxsc1RhYmxlOiAgQXJyYXk8KCkgPT4gT2JzZXJ2YWJsZTxhbnk+PjtcclxuICBfY29sdW1uRGVmc1RhYmxlOiBBcnJheTxhbnlbXT47XHJcbiAgX3NpbmdsZVNlbGVjdGlvblRhYmxlOiBBcnJheTxib29sZWFuPjtcclxufVxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWRpYWxvZy1ncmlkJyxcclxuICB0ZW1wbGF0ZTogYDxoMyBtYXQtZGlhbG9nLXRpdGxlPnt7dGl0bGV9fTwvaDM+XHJcbjxtYXQtZGlhbG9nLWNvbnRlbnQgY2xhc3M9XCJkaWFsb2dDb25lbnRcIj5cclxuICA8ZGl2ICpuZ0Zvcj1cImxldCBnZXRBbGwgb2YgZ2V0QWxsc1RhYmxlOyBsZXQgaSA9IGluZGV4XCIgY2xhc3M9XCJhcHBEaWFsb2dEYXRhR3JpZERpdlwiPlxyXG4gICAgPGFwcC1kYXRhLWdyaWQgXHJcbiAgICBbY29sdW1uRGVmc109XCJjb2x1bW5EZWZzVGFibGVbaV1cIiBbdGhlbWVHcmlkXT0ndGhlbWVHcmlkJyAgW2dldEFsbF09J2dldEFsbCcgW2dsb2JhbFNlYXJjaF09dHJ1ZSBbc2luZ2xlU2VsZWN0aW9uXT1cInNpbmdsZVNlbGVjdGlvblRhYmxlW2ldXCJcclxuICAgIFt0aXRsZV09XCJ0aXRsZXNUYWJsZVtpXVwiIFtub25FZGl0YWJsZV09J25vbkVkaXRhYmxlJyBbZXZlbnRHZXRTZWxlY3RlZFJvd3NTdWJzY3JpcHRpb25dPVwiZ2V0QWxsUm93cy5hc09ic2VydmFibGUoKVwiIChnZXRTZWxlY3RlZFJvd3MpPSdqb2luUm93c1JlY2VpdmVkKCRldmVudCknID5cclxuICAgIDwvYXBwLWRhdGEtZ3JpZD5cclxuICA8L2Rpdj5cclxuPC9tYXQtZGlhbG9nLWNvbnRlbnQ+XHJcbjxkaXYgbWF0LWRpYWxvZy1hY3Rpb25zIGFsaWduPVwiZW5kXCI+XHJcbiAgPGJ1dHRvbiBtYXQtYnV0dG9uICAoY2xpY2spPVwiY2xvc2VEaWFsb2coKVwiPnt7XCJDYW5jZWxcIiB8IHRyYW5zbGF0ZX19PC9idXR0b24+XHJcbiAgPGJ1dHRvbiBtYXQtYnV0dG9uICAoY2xpY2spPVwiZ2V0QWxsU2VsZWN0ZWRSb3dzKClcIiBjZGtGb2N1c0luaXRpYWw+e3tcIkFkZFwiIHwgdHJhbnNsYXRlfX08L2J1dHRvbj5cclxuPC9kaXY+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYC5kaWFsb2dDb25lbnR7bWFyZ2luOmluaGVyaXQhaW1wb3J0YW50O3BhZGRpbmc6aW5oZXJpdCFpbXBvcnRhbnQ7bWF4LWhlaWdodDo2MHZoIWltcG9ydGFudDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO292ZXJmbG93OmF1dG99YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIERpYWxvZ0dyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGdldEFsbFJvd3M6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdCA8Ym9vbGVhbj4oKTtcclxuICBwcml2YXRlIF9hZGRCdXR0b25DbGlja2VkU3Vic2NyaXB0aW9uOiBhbnk7XHJcbiAgdGFibGVzUmVjZWl2ZWRDb3VudGVyOiBudW1iZXI7XHJcbiAgYWxsUm93c1JlY2VpdmVkOiBBcnJheTxhbnlbXT4gPSBbXTtcclxuXHJcbiAgLy9JbnB1dHNcclxuICB0aGVtZUdyaWQ6IGFueTtcclxuICBnZXRBbGxzVGFibGU6IEFycmF5PCgpID0+IE9ic2VydmFibGU8YW55Pj47XHJcbiAgY29sdW1uRGVmc1RhYmxlOiBBcnJheTxhbnlbXT47XHJcbiAgc2luZ2xlU2VsZWN0aW9uVGFibGU6IEFycmF5PGJvb2xlYW4+O1xyXG4gIHRpdGxlc1RhYmxlOiBBcnJheTxzdHJpbmc+O1xyXG4gIGFkZEJ1dHRvbkNsaWNrZWRTdWJzY3JpcHRpb246IE9ic2VydmFibGUgPGJvb2xlYW4+IDtcclxuICBub25FZGl0YWJsZTogYm9vbGVhbjtcclxuXHJcbiAgLy9PdXRwdXRzXHJcbiAgQE91dHB1dCgpIGpvaW5UYWJsZXMgOiBFdmVudEVtaXR0ZXI8QXJyYXk8YW55W10+PjtcclxuXHJcbiAgXHJcblxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPERpYWxvZ0dyaWRDb21wb25lbnQ+KSB7XHJcbiAgICBcclxuICAgIHRoaXMuam9pblRhYmxlcyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIC8vIHRoaXMubm9uRWRpdGFibGUgPSB0cnVlO1xyXG4gICAgdGhpcy50YWJsZXNSZWNlaXZlZENvdW50ZXIgPSAwO1xyXG4gICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG5cclxuICAgIGlmICh0aGlzLmFkZEJ1dHRvbkNsaWNrZWRTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5fYWRkQnV0dG9uQ2xpY2tlZFN1YnNjcmlwdGlvbiA9IHRoaXMuYWRkQnV0dG9uQ2xpY2tlZFN1YnNjcmlwdGlvbi5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2V0QWxsU2VsZWN0ZWRSb3dzKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGdldEFsbFNlbGVjdGVkUm93cygpIHtcclxuICAgIHRoaXMuZ2V0QWxsUm93cy5uZXh0KHRydWUpO1xyXG4gIH1cclxuXHJcbiAgam9pblJvd3NSZWNlaXZlZChkYXRhOiBhbnlbXSlcclxuICB7XHJcbiAgICAgIHRoaXMuYWxsUm93c1JlY2VpdmVkLnB1c2goZGF0YSk7XHJcbiAgICAgIHRoaXMudGFibGVzUmVjZWl2ZWRDb3VudGVyKys7XHJcbiAgICAgIGlmKHRoaXMudGFibGVzUmVjZWl2ZWRDb3VudGVyID09PSB0aGlzLmdldEFsbHNUYWJsZS5sZW5ndGgpXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLmRvQWRkKHRoaXMuYWxsUm93c1JlY2VpdmVkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmFsbFJvd3NSZWNlaXZlZCk7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIGRvQWRkKHJvd3NUb0FkZCl7XHJcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh7ZXZlbnQ6J0FkZCcsZGF0YTogcm93c1RvQWRkfSk7XHJcbiAgfVxyXG5cclxuICBjbG9zZURpYWxvZygpe1xyXG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2Uoe2V2ZW50OidDYW5jZWwnfSk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUsIEh0dHBDbGllbnQsIEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSwgTm9vcEFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUsIFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG4vL2ltcG9ydCAqIGFzIG9sIGZyb20gJ29wZW5sYXllcnMnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUsIFRyYW5zbGF0ZUxvYWRlciwgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyByZWdpc3RlckxvY2FsZURhdGEgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBBbmd1bGFySGFsTW9kdWxlIH0gZnJvbSAnQHNpdG11bi9mcm9udGVuZC1jb3JlJztcclxuXHJcblxyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgbG9jYWxlQ2EgZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2xvY2FsZXMvY2EnO1xyXG5pbXBvcnQgbG9jYWxlRXMgZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2xvY2FsZXMvZXMnO1xyXG5pbXBvcnQgeyBTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGUgfSBmcm9tICdAc2l0bXVuL2Zyb250ZW5kLWNvcmUnO1xyXG5pbXBvcnQgeyBEYXRhR3JpZENvbXBvbmVudCB9IGZyb20gJy4vZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQnO1xyXG5cclxuaW1wb3J0IHsgQWdHcmlkTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xyXG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XHJcbmltcG9ydCB7IE1hdE1lbnVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcclxuaW1wb3J0IHsgTWF0RGlhbG9nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcclxuaW1wb3J0IHsgQnRuRWRpdFJlbmRlcmVkQ29tcG9uZW50IH0gZnJvbSAnLi9idG4tZWRpdC1yZW5kZXJlZC9idG4tZWRpdC1yZW5kZXJlZC5jb21wb25lbnQnO1xyXG5cclxuaW1wb3J0IHsgVHJhbnNsYXRlSHR0cExvYWRlciB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2h0dHAtbG9hZGVyJztcclxuaW1wb3J0IHsgRGlhbG9nR3JpZENvbXBvbmVudCB9IGZyb20gJy4vZGlhbG9nLWdyaWQvZGlhbG9nLWdyaWQuY29tcG9uZW50JztcclxuXHJcblxyXG5yZWdpc3RlckxvY2FsZURhdGEobG9jYWxlQ2EsICdjYScpO1xyXG5yZWdpc3RlckxvY2FsZURhdGEobG9jYWxlRXMsICdlcycpO1xyXG5cclxuLyoqIExvYWQgdHJhbnNsYXRpb24gYXNzZXRzICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUcmFuc2xhdGVMb2FkZXIoaHR0cDogSHR0cENsaWVudCkge1xyXG4gIHJldHVybiBuZXcgVHJhbnNsYXRlSHR0cExvYWRlcihodHRwLCAnLi4vYXNzZXRzL2kxOG4vJywgJy5qc29uJyk7XHJcbn1cclxuXHJcblxyXG4vKiogU0lUTVVOIHBsdWdpbiBjb3JlIG1vZHVsZSAqL1xyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIFJvdXRlck1vZHVsZSxcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIE5vb3BBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQW5ndWxhckhhbE1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIEFnR3JpZE1vZHVsZS53aXRoQ29tcG9uZW50cyhbXSksXHJcbiAgICBTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0TWVudU1vZHVsZSxcclxuICAgIE1hdERpYWxvZ01vZHVsZSxcclxuICAgIFRyYW5zbGF0ZU1vZHVsZS5mb3JSb290KHtcclxuICAgICAgbG9hZGVyOiB7XHJcbiAgICAgICAgcHJvdmlkZTogVHJhbnNsYXRlTG9hZGVyLFxyXG4gICAgICAgIHVzZUZhY3Rvcnk6IChjcmVhdGVUcmFuc2xhdGVMb2FkZXIpLFxyXG4gICAgICAgIGRlcHM6IFtIdHRwQ2xpZW50XVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRGF0YUdyaWRDb21wb25lbnQsXHJcbiAgICBCdG5FZGl0UmVuZGVyZWRDb21wb25lbnQsXHJcbiAgICBEaWFsb2dHcmlkQ29tcG9uZW50LFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIE5vb3BBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQW5ndWxhckhhbE1vZHVsZSxcclxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBEYXRhR3JpZENvbXBvbmVudCxcclxuICAgIERpYWxvZ0dyaWRDb21wb25lbnQsXHJcbiAgICBTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaXRtdW5Gcm9udGVuZEd1aU1vZHVsZSB7XHJcbn1cclxuIl19