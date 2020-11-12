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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/forms';
import * as ɵngcc2 from '@ag-grid-community/angular';
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
            params.colDef.cellStyle = { backgroundColor: '#17AB4D' };
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
                params.colDef.cellStyle = { backgroundColor: '#17AB4D' };
                this.gridApi.redrawRows({ rowNodes: [row] });
                params.colDef.cellStyle = { backgroundColor: '#FFFFFF' }; // Definirem el cellStyle blanc per proximes celes
            }
            this.comptadorCanvisAnterior--; // Com veniem d'undo, hem de decrementar el comptador de canvisAnterior
        }
    }
}
DataGridComponent.ɵfac = function DataGridComponent_Factory(t) { return new (t || DataGridComponent)(); };
DataGridComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: DataGridComponent, selectors: [["app-data-grid"]], inputs: { columnDefs: "columnDefs", getAll: "getAll" }, outputs: { remove: "remove", new: "new", sendChanges: "sendChanges" }, decls: 23, vars: 16, consts: [[1, "container", 2, "width", "100%", "height", "100%"], [1, "row"], [1, "text-left"], ["type", "text", "placeholder", "", "ml-2", "", 3, "ngModel", "keyup", "ngModelChange"], [1, "text-right", "btn-group-sm"], [1, "btn", "btn-danger", 3, "disabled", "click"], [1, "btn", "btn-warning", 3, "disabled", "click"], [1, "btn", "btn-success", 3, "disabled", "click"], [1, "btn", "btn-secondary", 3, "click"], [1, "btn", "btn-success", 3, "click"], [1, "row", 2, "width", "100%", "height", "100%"], ["id", "myGrid", 1, "ag-theme-balham", 2, "width", "100%", "height", "100%"], ["rowSelection", "multiple", 1, "ag-theme-balham", 2, "width", "100%", "height", "100%", 3, "floatingFilter", "rowData", "columnDefs", "gridOptions", "animateRows", "pagination", "modules", "undoRedoCellEditing", "undoRedoCellEditingLimit", "suppressRowClickSelection", "enableCellChangeFlash", "cellEditingStopped", "cellValueChanged", "gridReady"]], template: function DataGridComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵelementStart(2, "div", 2);
        ɵngcc0.ɵɵelementStart(3, "label");
        ɵngcc0.ɵɵtext(4, "Search ");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(5, "input", 3);
        ɵngcc0.ɵɵlistener("keyup", function DataGridComponent_Template_input_keyup_5_listener() { return ctx.quickSearch(); })("ngModelChange", function DataGridComponent_Template_input_ngModelChange_5_listener($event) { return ctx.searchValue = $event; });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(6, "div", 4);
        ɵngcc0.ɵɵelementStart(7, "button", 5);
        ɵngcc0.ɵɵlistener("click", function DataGridComponent_Template_button_click_7_listener() { return ctx.deleteChanges(); });
        ɵngcc0.ɵɵtext(8, "Delete Changes");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(9, "button", 6);
        ɵngcc0.ɵɵlistener("click", function DataGridComponent_Template_button_click_9_listener() { return ctx.undo(); });
        ɵngcc0.ɵɵtext(10, "Undo");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(11, "button", 6);
        ɵngcc0.ɵɵlistener("click", function DataGridComponent_Template_button_click_11_listener() { return ctx.redo(); });
        ɵngcc0.ɵɵtext(12, "Redo");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(13, "button", 7);
        ɵngcc0.ɵɵlistener("click", function DataGridComponent_Template_button_click_13_listener() { return ctx.applyChanges(); });
        ɵngcc0.ɵɵtext(14, "Apply Changes");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(15, "div", 4);
        ɵngcc0.ɵɵelementStart(16, "button", 8);
        ɵngcc0.ɵɵlistener("click", function DataGridComponent_Template_button_click_16_listener() { return ctx.removeData(); });
        ɵngcc0.ɵɵtext(17, "Remove");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(18, "button", 9);
        ɵngcc0.ɵɵlistener("click", function DataGridComponent_Template_button_click_18_listener() { return ctx.newData(); });
        ɵngcc0.ɵɵtext(19, "New");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(20, "div", 10);
        ɵngcc0.ɵɵelementStart(21, "div", 11);
        ɵngcc0.ɵɵelementStart(22, "ag-grid-angular", 12);
        ɵngcc0.ɵɵlistener("cellEditingStopped", function DataGridComponent_Template_ag_grid_angular_cellEditingStopped_22_listener($event) { return ctx.onCellEditingStopped($event); })("cellValueChanged", function DataGridComponent_Template_ag_grid_angular_cellValueChanged_22_listener($event) { return ctx.onCellValueChanged($event); })("gridReady", function DataGridComponent_Template_ag_grid_angular_gridReady_22_listener($event) { return ctx.onGridReady($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(5);
        ɵngcc0.ɵɵproperty("ngModel", ctx.searchValue);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("disabled", ctx.comptadorCanvis <= 0);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("disabled", ctx.comptadorCanvis <= 0);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("disabled", ctx.comptadorRedo <= 0);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("disabled", ctx.comptadorCanvis <= 0);
        ɵngcc0.ɵɵadvance(9);
        ɵngcc0.ɵɵproperty("floatingFilter", true)("rowData", ctx.rowData)("columnDefs", ctx.columnDefs)("gridOptions", ctx.gridOptions)("animateRows", true)("pagination", false)("modules", ctx.modules)("undoRedoCellEditing", true)("undoRedoCellEditingLimit", 200)("suppressRowClickSelection", true)("enableCellChangeFlash", true);
    } }, directives: [ɵngcc1.DefaultValueAccessor, ɵngcc1.NgControlStatus, ɵngcc1.NgModel, ɵngcc2.AgGridAngular], styles: ["label[_ngcontent-%COMP%]{display:inline-block;margin-right:5px;margin-left:5px;margin-top:5px}"] });
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
                template: `<div class="container" style=" width:100%; height: 100%;"  >


    

    <div class="row">
        <div class="text-left" >
            <label>Search </label>
            <input type="text" placeholder="" (keyup)="quickSearch()" [(ngModel)]="searchValue" ml-2 >
            
        </div>


        <div class=" text-right btn-group-sm">
            <button class="btn btn-danger"  (click)="deleteChanges()" [disabled]="comptadorCanvis <= 0">Delete Changes</button>
            <button class="btn btn-warning" (click)="undo()" [disabled]="comptadorCanvis <= 0" >Undo</button>
            <button class="btn btn-warning" (click)="redo()" [disabled]="comptadorRedo <= 0">Redo</button>
            <button class="btn btn-success" (click)="applyChanges()" [disabled]="comptadorCanvis <= 0" >Apply Changes</button>
        </div>

        
        <div class=" text-right btn-group-sm">
            <button class="btn btn-secondary" (click)="removeData()">Remove</button>
            <button class="btn btn-success" (click)="newData()">New</button>
        </div>


    </div>

    <div class="row" style="width:100%; height: 100%">
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
</div>

`,
                styles: [`label{display:inline-block;margin-right:5px;margin-left:5px;margin-top:5px}`]
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
        BrowserAnimationsModule, ɵngcc2.AgGridModule, SitmunFrontendCoreModule]; }, exports: function () { return [HttpClientModule,
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWd1aS5qcyIsInNvdXJjZXMiOlsiQHNpdG11bi9mcm9udGVuZC1ndWkvZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWd1aS9zaXRtdW4tZnJvbnRlbmQtZ3VpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4QkF3RkU7NEJBbEJvQjtLQUFtQixxQkFJWixJQUFJLEdBQUcsRUFBa0IsVUFnQmxELElBQUksQ0FBQztFQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQyx4QkExRnJDO09BMkZJLElBQUksQ0FBQyxHQUFHLEdBQUcsbEJBM0ZXLElBd0Z4QjtFQUdpQixZQUFZLEVBQUUsQ0FBQyxTQUM5QixJQUFJLENBQUMsV0FBVywxQ0FIcEIsdUJBbkJzQixtQkFBbUI7Q0FzQmxCLElBQUksWUFBWSxFQUFFLENBQUMsU0FDdEMsN0JBdEJKLG1CQUc2QixJQUFJLEdBQUcsRUFBa0I7R0FtQjlDLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxTQUN6QixJQUFJLENBQUMsdENBcEIrQyxRQWdCcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO21CQUlMLEdBQUcsQ0FBQyxDQUFDLFNBQ2pDLElBQUksQ0FBQyx0Q0FKVCxRQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUlaLEdBQUcsQ0FBQyxDQUFDLFNBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsN0NBSnZCLFFBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1lBS3BDLGFBQWEsRUFBRSwzQkFKckIsUUFBSSxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztXQUtyQixJQUFJLEVBQUUsQ0FBQyxrQkFDUCxwQ0FMUixRQUFJLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLENBQUM7QUFLdkIsRUFBRSxJQUFJLGtCQUNaLHhCQUxSLFFBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFLWCxFQUFFLElBQUksa0JBQ2QseEJBTFIsUUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHO0dBS1AsRUFBRSxHQUFHLGtCQUNiLDFCQUxSLFlBQU0sYUFBYSxFQUFFO01BS0osRUFBRSxFQUFDLFZBSnBCLGdCQUFRLElBQUksRUFBRSxDQUFDO0FBSW9CLEVBQUUsU0FBUyxFQUFDLGVBQ3hDLDVCQUpQLGdCQUFRLE1BQU0sRUFBRSxJQUFJO1lBS2QsWUFBWSxFQUFFLDFCQUpwQixnQkFBUSxRQUFRLEVBQUUsSUFBSTtJQUlRLFdBRXpCLENBQUMsTUFFSCx0QkFQSCxnQkFBUSxRQUFRLEVBQUUsR0FBRzt3REFXbkIseERBVkYsZ0JBQVEsU0FBUyxFQUFFLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQztRQVVsQyxDQUFDLFRBVGQsYUFBTztBQVNhLFlBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLGpDQVR6QixZQUFNLFlBQVksRUFBRSxVQUFVO0lBVTFCLElBQUksQ0FBQyxUQVRULFNBQ0ssQ0FBQztLQVFVLExBUGhCLEtBQ0c7RUFNZ0IsRkFMbkI7QUFLeUIsQ0FBQyxHQUFHLENBQUMsU0FDMUIsSUFBSSxDQUFDLG5CQUhKO09BR2lCLEdBQUcsTUFBTSxDQUFDLGpCQUYvQjtPQUV3QyxQQUZyQjtBQUVzQixTQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLHRCQUZmLElBRkEsV0FBVyxDQUFDLE1BQU07S0FJTSxHQUFHLEdBQUcsQ0FBQyxTQUM3QixJQUFJLENBQUMsMUJBTGUsUUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7T0FJTCxFQUFFLENBQUMsU0FDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxoQ0FKakIsUUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFJRyxFQUFFLENBQUMsTUFHakMsdEJBTkgsUUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7ZUFReEMsV0FBVywxQkFQYixRQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztDQVEzQixJQUFJLENBQUMsT0FBTyxDQUFDLGRBUG5CLFFBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBT1UsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsTUFDakQsekJBUEgsUUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7QUFDcEMsS0FFRztBQUNIO1VBS0UsVkFKSztFQUlNLEZBSFY7T0FLQyxJQUFJLENBQUMsTUFBTSxsQkFMSixJQURULFdBQVc7QUFNSSxjQUNaLFNBQVMsQ0FBQyxDQUFDLEtBQUssbUJBQ2IsakRBUlUsUUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Q0FPckMsQ0FBQyxHQUFHLExBTm5CLEtBQUc7QUFNaUIsS0FBSyxDQUFDLENBQUMsUEFMM0I7WUFNUSxJQUFJLENBQUMsakJBTE47S0FLYSxMQUhwQjtBQUd1QixLQUFLLENBQUMsVUFDeEIsQ0FBQyxDQUFDLGxCQUpDLElBRk4sV0FBVztJQU9WLEpBUGUsUUFFZCxJQUFJLENBQUMsTUFBTSxFQUFFO3NCQU9mLFVBQVUsaENBTlosYUFBSyxTQUFTLENBQUMsQ0FBQyxLQUFLO1NBT2pCLElBQUksQ0FBQyxPQUFPLENBQUMsdEJBTmpCLFlBQVEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQU1DLENBQUMsS0FBSyxDQUFDLENBQUMsVEFMcEMsWUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQU16QixUQUxKLFNBQUssQ0FBQyxDQUFDO0dBS0csSEFKVixLQUFHO0FBQ0g7RUFHdUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGxCQUZoQztBQUNKO09BQ29ELEVBQUUsQ0FBQyxWQUQvQyxJQURULFVBQVU7eUJBR1IsTUFBTSwvQkFITyxRQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBRWQsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLHZCQUQzQztFQUMrQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQzFCLDdEQUhxQixRQUFyQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7RUFHbEQsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGZBRnJCO0VBRWlDLENBQUMsQ0FBQyxNQUNoQyx3Q0FFRCxPQUFPLHpEQUxnQixRQUFyQixNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7R0FPMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMscEJBTnJCLFFBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQU1NLENBQUMsQ0FBQyxTQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxwQ0FON0IsUUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztDQU1ELENBQUMsQ0FBQyxIQUxwQyxLQUFHO01BTUMsTkFMSjtFQUtRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxsQkFKakI7S0FLSixMQUhDO0FBQVEsSUFGVixPQUFPO3FCQU9QLFlBQVksakNBUEEsUUFFVixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzs0QkFPbEMsTUFBTSxsQ0FOVixRQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBTWQsR0FBVSxFQUFFLENBQUMsU0FDL0IsSUFBSSxDQUFDLHpCQU5ULFFBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7R0FNUixDQUFDLEpBTGpCLEtBQUc7QUFDSDtDQUk0QixDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQ2hDLGxCQUpHO0lBSUUsSkFITjtFQUdZLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGxCQUZ4QixJQUZMLFlBQVk7Q0FJcUIsRUFBRSxFQUNqQyxjQUNFLG5CQU5hO01BTUQsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx6QkFKcEIsUUFBYixNQUFNLFlBQVksR0FBVSxFQUFFLENBQUM7RUFJWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQ3RELFNBQ0QsSUFBSSxDQUFDLHRDQUxULFFBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFLaEIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsU0FDcEMsSUFBSSxDQUFDLDFDQUxULFFBQUksS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUNqQztBQUlRLENBQUMsS0FBSyxFQUFFLENBQUMsU0FDakIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsU0FDekIsSUFBSSxDQUFDLHpEQUxULFlBQU0sWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzRCxTQUFLO0lBSTJCLEdBQUcsQ0FBQyxDQUFDLFNBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLHpDQUozQixRQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBS3BDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLHhCQUp2QixRQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7T0FJVyxHQUFJLEVBQUMsZUFBZSxFQUFFLDdCQUh0RCxRQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO0lBR2tDLEVBQUMsQ0FBQyxTQUM3RCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSx6Q0FIN0IsUUFBSSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0FBR1AsTUFDM0IsTkFISCxRQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO2NBT3pCLGFBQWEsYUFFWCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx6REFSckIsUUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUksRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUM7Q0FRN0IsQ0FBQyxDQUFDLFNBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxoQ0FSeEIsUUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0NBUUYsQ0FBQyxGQVA3QixLQUFHO0FBQ0g7R0FNNEMsRUFBRSxDQUFDLEVBQUUsRUFDN0MsVkFKQztLQUtDLExBSk47Q0FJVSxDQUFDLE9BQU8sQ0FBQyxWQUhmLElBRkYsYUFBYTtHQUttQixFQUFFLENBQUMsVUFDaEMsU0FDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLDFDQVBELFFBRWhCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBTWxDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLENBQUMsU0FDakMsSUFBSSxDQUFDLHZEQU5ULFFBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLEVBQzdDO2FBS29CLEdBQUcsQ0FBQyxDQUFDLGxCQUo3QixZQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7QUFDckMsU0FBSztBQUNMLFFBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7QUFFckIsUUFBSSxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQywvQkFBM0IsUUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUksRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUMsdEVBQWpFLFFBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFJLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsbENBQTlCLFFBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUMzQixMQUFILEtBQUc7QUFDSDtBQUdLO0FBQ0U7SUFETCxJQUFJLFJBQ1MsSUFEYixJQUFJO1FBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMseENBRHpCLFFBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQyx2Q0FBbkMsUUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxDQUFDLGxDQUE5QixRQUFJLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDLGhDQUE1QixRQUFJLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDO0tBQ3pCLExBQUgsS0FBRztBQUNIO0FBQ087QUFDRTtJQURQLElBQUksUkFDVyxJQURmLElBQUk7UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyx4Q0FEekIsUUFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDLHZDQUFuQyxRQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUMsbENBQTlCLFFBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUMsaENBQTVCLFFBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUM7S0FDekIsTEFBSCxLQUFHO0FBQ0g7QUFFTTtBQUNOO0FBQ2U7SUFGYixvQkFBb0IsQ0FBQyxDQUFDLDFCQUVELElBRnJCLG9CQUFvQixDQUFDLENBQUM7UUFFcEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLC9CQUR6QixRQUNFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQywvQkFBM0IsUUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsbkNBQS9CLFFBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVCLExBQUgsS0FBRztBQUNIO0FBSUk7QUFBeUI7QUFDakI7SUFEVixrQkFBa0IsQ0FBQyxNQUFNLDdCQUNQLElBRGxCLGtCQUFrQixDQUFDLE1BQU07UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsN0JBRE0sUUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckIsSUFBSSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFHckQsakVBSk4sUUFDSSxJQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUdyRDtZQUNFLElBQUksQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUNsQywvQ0FEUixZQUFRLElBQUksQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUNsQztnQkFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxoREFBMUMsZ0JBQVUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDakMsYkFBVCxhQUFTO2lCQUNHLGpCQUFaLGlCQUFZO0FBQ1o7Z0JBQ1UsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLDFFQURuQyxnQkFDdkIsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxvQkFBb0IsR0FBRyxDQUFDLEVBQUUsQ0FBQyx6RUFBbkUsZ0JBQVUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsb0JBQW9CLEdBQUcsQ0FBQyxFQUFFLENBQUM7YUFDMUQsYkFBVCxhQUFTO0FBQ1Q7WUFBUSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyw3RUFBNUMsWUFBckIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUMsckVBQS9ELFlBQVEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsekRBQW5ELFlBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUMsckVBQS9ELFlBQVEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsM0NBQXZDLFlBQVEsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7U0FFaEMsVEFEUCxTQUNPO1FBQ0gsSUFBSSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBQyxqRUFBNUQsUUFBSSxJQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFDO0FBQUU7WUFFdEQsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLHRFQUZ5QixZQUVuRixNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFMUQsSUFBSSxvQkFBb0IsS0FBSyxDQUFDLEVBQUUsNUNBRHhDLFlBQ1EsSUFBSSxvQkFBb0IsS0FBSyxDQUFDLEVBQUU7QUFDeEM7Z0JBQ1UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxoREFBdEMsZ0JBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUMxQztnQkFBVSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxqRkFBMUMsZ0JBQXZCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNqRSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUMsQ0FBQyx6RUFBakUsZ0JBQVUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLDdEQUFyRCxnQkFBVSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQzthQUM1QyxiQUFULGFBQVM7aUJBRUQsakJBRFIsaUJBQ1E7Z0JBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsb0JBQW9CLEdBQUcsQ0FBQyxFQUFFLENBQUMsekVBQW5FLGdCQUFVLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLG9CQUFvQixHQUFHLENBQUMsRUFBRSxDQUFDO0FBQ25FO2dCQUFVLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGpGQUExQyxnQkFBdkIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pFLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDLHpFQUFqRSxnQkFBVSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUMsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsN0RBQXJELGdCQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUMsQ0FBQyx6RUFBakUsZ0JBQVUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUM7YUFDeEQsYkFBVCxhQUFTO1lBQ0QsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsM0NBQXZDLFlBQVEsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7U0FDaEMsVEFEeUcsU0FDekc7S0FDRixMQUFMLEtBQUs7QUFDTDs2Q0EzUEMsU0FBUyxTQUFDLGtCQUNULFFBQVEsRUFBRSxlQUFlLDdEQUQxQixTQUFTLFNBQUMsa0JBQ1QsUUFBUSxFQUFFLGVBQWU7aUJBQ3pCLFFBQVEsRUFBRSxWQUFWLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OzsyR0F1RFgsa0JBQ0MsbEJBREQsa0JBQ0M7QUFBTSxFQUFFLENBQUMsSEFBSCxFQUFFLENBQUM7O0tBQTZFLENBQUMsY0FDeEYsZkFEdUYsQ0FBQyxjQUN4Rjs0R0FnQkUsS0FBSztpQkFDTCxLQUFLO2FBQ0wsTUFBTTtXQUNOLE1BQU07QUFDTixNQUFNLG9IQ3RGVDs7Q0EwREE7O09BakNDLFFBQVEsU0FBQyxrQkFDUixPQUFPLEVBQUUsc0JBQ1AsWUFBWSxzQkFDWixnQkFBZ0I7Y0FDaEIsWUFBWTtJQUNaLFdBQVc7TUFDWCxvQkFBb0I7aUJBQ3BCLGdCQUFnQjtVQUNoQixtQkFBbUI7R0FDbkIsdUJBQXVCLHNCQUN2QixZQUFZLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxzQkFDL0Isd0JBQXdCO2VBRXpCLGtCQUNEO1FBQVksRUFBRTtDQUNaLGlCQUFpQixrQkFDbEI7TUFDRCxlQUFlLEVBQUUsRUFDaEIsa0JBQ0QsU0FBUyxFQUFFLEVBQ1Ysa0JBQ0QsT0FBTyxFQUFFLHNCQUNQLGdCQUFnQjtpQkFDaEIsWUFBWTtpQkFDWixXQUFXO21CQUNYO1FBQW9CLHNCQUNwQjtlQUFnQixzQkFDaEI7TUFBZSxzQkFDZjtDQUFtQixzQkFDbkIsaUJBQWlCO0lBQ2pCLHdCQUF3QixrQkFDekIsY0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dPRFVLO0FBQUM7QUFBbUI7QUFJUTtBQUU3Qix5QkFTRixLQUFLO0FBQUsscUJBQ1YsS0FBSztBQUFLLHFCQUNWLE1BQU07QUFBSyxrQkFDWCxNQUFNO0FBQUssMEJBQ1gsTUFBTTtBQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUFFO0FBQUM7QUFBQztBQUFJO0FBR2Q7QUFHUztBQzVGaEI7QUFBSTtBQUE2QjtBQTBEakM7QUFBZ0M7bURBakMvQixRQUFRLFNBQUMsa0JBQ1I7RUFBTyxFQUFFLHNCQUNQLFlBQVksc0JBQ1osZ0JBQWdCLHNCQUNoQixZQUFZLHNCQUNaLFdBQVcsc0JBQ1gsb0JBQW9CO29CQUNwQjtVQUFnQjtFQUNoQixtQkFBbUI7aUJBQ25CO2VBQXVCO0dBQ3ZCLFlBQVksQ0FBQztBQUFjLENBQUMsRUFBRSxDQUFDLHNCQUMvQjtpQkFBd0IsbUJBRXpCO2lCQUNELFlBQVksRUFBRTtRQUNaLGlCQUFpQjtLQUNsQixrQkFDRDtTQUFlLEVBQUUsRUFDaEI7U0FDRCxTQUFTLEVBQUU7Q0FDVixrQkFDRCxPQUFPLEVBQUU7b0JBQ1A7VUFBZ0I7T0FDaEIsWUFBWTtZQUNaLFdBQVc7T0FDWCxvQkFBb0Isc0JBQ3BCLGdCQUFnQixzQkFDaEIsZUFBZSxzQkFDZixtQkFBbUIsc0JBQ25CLGlCQUFpQixzQkFDakI7S0FBd0Isa0JBQ3pCO1dBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUNLO0FBQUM7QUFBQztBQUFJO0FBRVA7QUFBa0U7QUFBSTtBQUFDO0FBQUk7QUFBa0M7QUFBa0U7QUFBSTtBQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWdHcmlkTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nTW9kdWxlLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWxsQ29tbXVuaXR5TW9kdWxlcywgTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FsbC1tb2R1bGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWRhdGEtZ3JpZCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiIHN0eWxlPVwiIHdpZHRoOjEwMCU7IGhlaWdodDogMTAwJTtcIiAgPlxuXG5cbiAgICBcblxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtbGVmdFwiID5cbiAgICAgICAgICAgIDxsYWJlbD5TZWFyY2ggPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiXCIgKGtleXVwKT1cInF1aWNrU2VhcmNoKClcIiBbKG5nTW9kZWwpXT1cInNlYXJjaFZhbHVlXCIgbWwtMiA+XG4gICAgICAgICAgICBcbiAgICAgICAgPC9kaXY+XG5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiIHRleHQtcmlnaHQgYnRuLWdyb3VwLXNtXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXJcIiAgKGNsaWNrKT1cImRlbGV0ZUNoYW5nZXMoKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JDYW52aXMgPD0gMFwiPkRlbGV0ZSBDaGFuZ2VzPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nXCIgKGNsaWNrKT1cInVuZG8oKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JDYW52aXMgPD0gMFwiID5VbmRvPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nXCIgKGNsaWNrKT1cInJlZG8oKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JSZWRvIDw9IDBcIj5SZWRvPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgKGNsaWNrKT1cImFwcGx5Q2hhbmdlcygpXCIgW2Rpc2FibGVkXT1cImNvbXB0YWRvckNhbnZpcyA8PSAwXCIgPkFwcGx5IENoYW5nZXM8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCIgdGV4dC1yaWdodCBidG4tZ3JvdXAtc21cIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiIChjbGljayk9XCJyZW1vdmVEYXRhKClcIj5SZW1vdmU8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIiAoY2xpY2spPVwibmV3RGF0YSgpXCI+TmV3PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIiBzdHlsZT1cIndpZHRoOjEwMCU7IGhlaWdodDogMTAwJVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGhlbWUtYmFsaGFtXCIgaWQ9XCJteUdyaWRcIiBzdHlsZT1cIiB3aWR0aDoxMDAlOyBoZWlnaHQ6IDEwMCVcIiA+XG4gICAgICAgICAgICA8YWctZ3JpZC1hbmd1bGFyXG4gICAgICAgICAgICBzdHlsZT1cIiB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiXG4gICAgICAgICAgICBjbGFzcz1cImFnLXRoZW1lLWJhbGhhbVwiXG4gICAgICAgICAgICBbZmxvYXRpbmdGaWx0ZXJdPVwidHJ1ZVwiXG4gICAgICAgICAgICBbcm93RGF0YV09XCJyb3dEYXRhXCJcbiAgICAgICAgICAgIFtjb2x1bW5EZWZzXT1cImNvbHVtbkRlZnNcIlxuICAgICAgICAgICAgW2dyaWRPcHRpb25zXT1cImdyaWRPcHRpb25zXCJcbiAgICAgICAgICAgIFthbmltYXRlUm93c109XCJ0cnVlXCJcbiAgICAgICAgICAgIFtwYWdpbmF0aW9uXT1cImZhbHNlXCJcbiAgICAgICAgICAgIFttb2R1bGVzXT1cIm1vZHVsZXNcIiAgICAgXG4gICAgICAgICAgICBbdW5kb1JlZG9DZWxsRWRpdGluZ109XCJ0cnVlXCIgICAgXG4gICAgICAgICAgICBbdW5kb1JlZG9DZWxsRWRpdGluZ0xpbWl0XT0gMjAwXG4gICAgICAgICAgICBbc3VwcHJlc3NSb3dDbGlja1NlbGVjdGlvbl09dHJ1ZVxuICAgICAgICAgICAgW2VuYWJsZUNlbGxDaGFuZ2VGbGFzaF09dHJ1ZVxuICAgICAgICAgICAgcm93U2VsZWN0aW9uPVwibXVsdGlwbGVcIlxuICAgICAgICAgICAgKGNlbGxFZGl0aW5nU3RvcHBlZCkgPVwib25DZWxsRWRpdGluZ1N0b3BwZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAoY2VsbFZhbHVlQ2hhbmdlZCk9XCJvbkNlbGxWYWx1ZUNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAoZ3JpZFJlYWR5KT1cIm9uR3JpZFJlYWR5KCRldmVudClcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9hZy1ncmlkLWFuZ3VsYXI+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW2BsYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tcmlnaHQ6NXB4O21hcmdpbi1sZWZ0OjVweDttYXJnaW4tdG9wOjVweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhR3JpZENvbXBvbmVudCB7XG4gXG5cblxuICBtb2R1bGVzOiBNb2R1bGVbXSA9IEFsbENvbW11bml0eU1vZHVsZXM7XG4gIHNlYXJjaFZhbHVlOiBzdHJpbmc7XG4gIHByaXZhdGUgZ3JpZEFwaTtcbiAgcHJpdmF0ZSBncmlkQ29sdW1uQXBpO1xuICBtYXA6IE1hcDxudW1iZXIsIG51bWJlcj4gPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpOyAvLyBHdWFyZGFyZW0gbCdpZCBkZSBsZXMgY2VsZXMgbW9kaWZpY2FkZXMgaSBlbCBuw4LCuiBkJ2VkaWNpb25zIHNvYnJlIGFxdWVzdGVzXG4gIHByaXZhdGUgcGFyYW1zOyAvLyBQYXJhbXMgZGVsIGdyaWQgYSBsJ8ODwrpsdGltYSBtb2RpZmljYWNpbyAocGVyIHNpIGZlbSBhcHBseSBjaGFuZ2VzKVxuICByb3dEYXRhOiBhbnlbXTtcbiAgY29tcHRhZG9yQ2FudmlzOiBudW1iZXI7IC8vIE5vbWJyZSBkJ2VkaWNpb25zIGZldGVzIHNvYnJlIGNlbGVzXG4gIGNvbXB0YWRvckNhbnZpc0FudGVyaW9yOiBudW1iZXI7IC8vIE5vbWJyZSBkJ2VkaWNpb25zIGFudGVyaW9yIGEgbCdhY3R1YWwgKGNvbXB0YWRvckNhbnZpcylcbiAgY29tcHRhZG9yUmVkbzogbnVtYmVyOyAvLyBOb21icmUgZGUgcmVkb3MgcXVlIHBvZGVtIGZlclxuICBncmlkT3B0aW9ucztcbiAgQElucHV0KCkgY29sdW1uRGVmczogYW55W107XG4gIEBJbnB1dCgpIGdldEFsbDogKCkgPT4gT2JzZXJ2YWJsZTxhbnk+O1xuICBAT3V0cHV0KCkgcmVtb3ZlOiBFdmVudEVtaXR0ZXI8YW55W10+O1xuICBAT3V0cHV0KCkgbmV3OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj47XG4gIEBPdXRwdXQoKSBzZW5kQ2hhbmdlczogRXZlbnRFbWl0dGVyPGFueVtdPjtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgdGhpcy5yZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5uZXcgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5zZW5kQ2hhbmdlcyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcyA9IDA7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvciA9IDA7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvID0gMDtcbiAgICB0aGlzLmdyaWRPcHRpb25zID0ge1xuICAgICAgZGVmYXVsdENvbERlZjoge1xuICAgICAgICBmbGV4OiAxLFxuICAgICAgICBmaWx0ZXI6IHRydWUsXG4gICAgICAgIGVkaXRhYmxlOiB0cnVlLFxuICAgICAgICBtaW5XaWR0aDogMTAwLFxuICAgICAgICBjZWxsU3R5bGU6IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ30sXG4gICAgICB9LFxuICAgICAgcm93U2VsZWN0aW9uOiAnbXVsdGlwbGUnLFxuXG4gICAgfTtcblxuICB9XG5cblxuXG4gIG9uR3JpZFJlYWR5KHBhcmFtcyk6IHZvaWR7XG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gICAgdGhpcy5ncmlkQXBpID0gcGFyYW1zLmFwaTtcbiAgICB0aGlzLmdyaWRDb2x1bW5BcGkgPSBwYXJhbXMuY29sdW1uQXBpO1xuICAgIHRoaXMuZ3JpZEFwaS5yb3dIZWlnaHQgPSAxMDA7XG4gICAgdGhpcy5nZXRFbGVtZW50cygpO1xuICAgIHRoaXMuZ3JpZEFwaS5zaXplQ29sdW1uc1RvRml0KCk7XG5cblxuICB9XG5cbiAgcXVpY2tTZWFyY2goKTogdm9pZHtcbiAgICAgIHRoaXMuZ3JpZEFwaS5zZXRRdWlja0ZpbHRlcih0aGlzLnNlYXJjaFZhbHVlKTtcbiAgfVxuXG4gIGdldEVsZW1lbnRzKCk6IHZvaWRcbiAge1xuICAgIHRoaXMuZ2V0QWxsKClcbiAgICAuc3Vic2NyaWJlKChpdGVtcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhpdGVtcyk7XG4gICAgICAgIHRoaXMucm93RGF0YSA9IGl0ZW1zO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlRGF0YSgpOiB2b2lkIHtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIGNvbnN0IHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdyaWRBcGkuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICBcdCBjb25zdCBzZWxlY3RlZERhdGEgPSBzZWxlY3RlZE5vZGVzLm1hcChub2RlID0+IG5vZGUuZGF0YSk7XG4gICAgY29uc29sZS5sb2coc2VsZWN0ZWREYXRhKTtcbiAgICB0aGlzLnJlbW92ZS5lbWl0KHNlbGVjdGVkRGF0YSk7XG4gIH1cblxuICBuZXdEYXRhKCk6IHZvaWRcbiAge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuY29tcHRhZG9yQ2FudmlzKTtcbiAgICB0aGlzLmdyaWRBcGkuc3RvcEVkaXRpbmcoZmFsc2UpO1xuICAgIHRoaXMubmV3LmVtaXQodHJ1ZSk7XG4gIH1cblxuICBhcHBseUNoYW5nZXMoKTogdm9pZFxuICB7XG4gICAgY29uc3QgaXRlbXNDaGFuZ2VkOiBhbnlbXSA9IFtdO1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5tYXAua2V5cygpKVxuICAgIHtcbiAgICAgIGl0ZW1zQ2hhbmdlZC5wdXNoKHRoaXMuZ3JpZEFwaS5nZXRSb3dOb2RlKGtleSkuZGF0YSk7XG4gICAgfVxuICAgIHRoaXMuc2VuZENoYW5nZXMuZW1pdChpdGVtc0NoYW5nZWQpO1xuICAgIHRoaXMubWFwLmNsZWFyKCk7XG4gICAgdGhpcy5jb21wdGFkb3JDYW52aXMgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzQW50ZXJpb3IgPSAwO1xuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XG4gICAgdGhpcy5wYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9ICB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9O1xuICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKCk7XG4gIH1cblxuXG5cbiAgZGVsZXRlQ2hhbmdlcygpOiB2b2lkXG4gIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNvbXB0YWRvckNhbnZpcyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbXB0YWRvckNhbnZpczsgaSsrKVxuICAgIHtcbiAgICAgIHRoaXMuZ3JpZEFwaS51bmRvQ2VsbEVkaXRpbmcoKTtcbiAgICB9XG4gICAgdGhpcy5tYXAuY2xlYXIoKTtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcyA9IDA7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvID0gMDtcbiAgICB0aGlzLnBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0gIHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307XG4gICAgdGhpcy5ncmlkQXBpLnJlZHJhd1Jvd3MoKTtcbiAgfVxuXG5cblxuICB1bmRvKCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzIC09IDE7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvICs9IDE7XG4gIH1cblxuICByZWRvKCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgdGhpcy5ncmlkQXBpLnJlZG9DZWxsRWRpdGluZygpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzICs9IDE7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvIC09IDE7XG4gIH1cblxuXG4gIG9uQ2VsbEVkaXRpbmdTdG9wcGVkKGUpXG4gIHtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcysrO1xuICAgIHRoaXMuY29tcHRhZG9yUmVkbyA9IDA7XG4gICAgdGhpcy5vbkNlbGxWYWx1ZUNoYW5nZWQoZSk7XG4gIH1cblxuXG5cblxuICBvbkNlbGxWYWx1ZUNoYW5nZWQocGFyYW1zKTogdm9pZHtcbiAgICB0aGlzLnBhcmFtcyA9IHBhcmFtczsgLy8gR3VhcmRhcmVtIGVscyBwYXJhbWF0cmVzIGFjdHVhbHMgcGVyIHNpIGhlbSBkZSBmZXIgdW4gYXBwbHkgY2hhbmdlc1xuXG4gICAgaWYgKHRoaXMuY29tcHRhZG9yQ2FudmlzID4gdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvcilcbiAgICAgIC8vIEFxdWVzdGEgY29uZGljacODwrMgc2Vyw4PCoCBjZXJ0YSBzaSB2ZW5pbSBkJ2VkaXRhciBvIGRlIGZlciB1biByZWRvIChjb21wdGFkb3IgY2FudmlzID4pLCBwZXLDg8KyIG5vIHNpIHZlbmltIGQndW4gdW5kb1xuXG4gICAgICB7XG4gICAgICAgIGlmICghIHRoaXMubWFwLmhhcyhwYXJhbXMubm9kZS5pZCkpIC8vIFNpIG5vIGhlbSBlZGl0YXQgbGEgY2VsYSBhbWIgYW50ZXJpb3JpdGF0LCBsJ2FmZWdpcmVtIGFsIG1hcCBpIGNhbnZpYXJlbSBlbCBiYWNrZ3JvdW5kIGEgdmVyZFxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5tYXAuc2V0KHBhcmFtcy5ub2RlLmlkLCAxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAvLyBTaSBqYSBlc3RhdmEgbW9kaWZpY2FkYSwgaW5jcmVtZW50YXJlbSBlbCBub21icmUgZGUgY2FudmlzIGQnYXF1ZXN0YSBjZWxhIGFsIG1hcFxuICAgICAgICAgIGNvbnN0IG1vZGlmaWNhY2lvbnNBY3R1YWxzID0gdGhpcy5tYXAuZ2V0KHBhcmFtcy5ub2RlLmlkKTtcbiAgICAgICAgICB0aGlzLm1hcC5zZXQocGFyYW1zLm5vZGUuaWQsIChtb2RpZmljYWNpb25zQWN0dWFscyArIDEpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRBcGkuZ2V0RGlzcGxheWVkUm93QXRJbmRleChwYXJhbXMucm93SW5kZXgpOyAvLyBDb20gaGEgZXN0YXQgbW9kaWZpY2FkYSBsYSBsaW5lYSwgbGEgcGludGFyZW0gZGUgdmVyZFxuICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjMTdBQjREJ307XG4gICAgICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKHtyb3dOb2RlczogW3Jvd119KTtcbiAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRid9OyAvLyBEZWZpbmlyZW0gZWwgY2VsbFN0eWxlIGJsYW5jIHBlciBwcm94aW1lcyBjZWxlc1xuICAgICAgICB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yKys7XG5cbiAgICAgIH1cbiAgICBpZiAodGhpcy5jb21wdGFkb3JDYW52aXMgPCB0aGlzLmNvbXB0YWRvckNhbnZpc0FudGVyaW9yKXsgLy8gRW50cmFyw4PCoCBhcXXDg8KtIHNpIHZlbmltIGQndW4gdW5kb1xuICAgICAgICAvLyBDb20gc2FiZW0gcXVlIGphIGhhdmllbSBlZGl0YXQgbGEgY2VsYSwgYWdhZmVtIGVsIG5vbWJyZSBkZSBtb2RpZmljYWNpb25zIHF1ZSBsJ2hlbSBmZXRcbiAgICAgICAgY29uc3QgbW9kaWZpY2FjaW9uc0FjdHVhbHMgPSB0aGlzLm1hcC5nZXQocGFyYW1zLm5vZGUuaWQpO1xuXG4gICAgICAgIGlmIChtb2RpZmljYWNpb25zQWN0dWFscyA9PT0gMSkge1xuICAgICAgICAgIC8vIFNpIG5vbcODwqlzIHRlIHVuYSBtb2RpZmljYWNpw4PCsywgdm9sIGRpciBxdWUgYW1iIGwndW5kbyBoZW0gZGVpeGF0IGxhIGNlbGEgY29tIGEgbCdlc3RhdCBpbmljaWFsLCBwZWwgcXVlIGwnaGVtIGRlIGJvcnJhciBkZWwgbWFwXG4gICAgICAgICAgdGhpcy5tYXAuZGVsZXRlKHBhcmFtcy5ub2RlLmlkKTtcbiAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRBcGkuZ2V0RGlzcGxheWVkUm93QXRJbmRleChwYXJhbXMucm93SW5kZXgpO1xuICAgICAgICAgIHBhcmFtcy5jb2xEZWYuY2VsbFN0eWxlID0ge2JhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnfTsgLy8gTGkgcG9zYXJlbSB1biBhbHRyZSBjb3AgZWwgYmFja2dyb3VuZCBibGFuY1xuICAgICAgICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKHtyb3dOb2RlczogW3Jvd119KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIC8vIExhIGNlbGEgZW5jYXJhIG5vIGVzdMODwqAgY29tIGEgbCdlc3RhdCBpbmljaWFsLCBwZWwgcXVlIG5vbWVzIHJlc3RlbSBlbCBub21icmUgZGUgbW9kaWZpY2FjaW9ucyBhbCBtYXBcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMubWFwLnNldChwYXJhbXMubm9kZS5pZCwgKG1vZGlmaWNhY2lvbnNBY3R1YWxzIC0gMSkpO1xuICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZEFwaS5nZXREaXNwbGF5ZWRSb3dBdEluZGV4KHBhcmFtcy5yb3dJbmRleCk7IC8vIENvbSBlbmNhcmEgdGUgbW9kaWZpY2FjaW9ucywgaGEgZGUgdGVuaXIgZWwgYmFja2dyb3VuZCB2ZXJkXG4gICAgICAgICAgcGFyYW1zLmNvbERlZi5jZWxsU3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiAnIzE3QUI0RCd9O1xuICAgICAgICAgIHRoaXMuZ3JpZEFwaS5yZWRyYXdSb3dzKHtyb3dOb2RlczogW3Jvd119KTtcbiAgICAgICAgICBwYXJhbXMuY29sRGVmLmNlbGxTdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJ307IC8vIERlZmluaXJlbSBlbCBjZWxsU3R5bGUgYmxhbmMgcGVyIHByb3hpbWVzIGNlbGVzXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb21wdGFkb3JDYW52aXNBbnRlcmlvci0tOyAgLy8gQ29tIHZlbmllbSBkJ3VuZG8sIGhlbSBkZSBkZWNyZW1lbnRhciBlbCBjb21wdGFkb3IgZGUgY2FudmlzQW50ZXJpb3JcbiAgICAgIH1cbiAgICB9XG5cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge0h0dHBDbGllbnRNb2R1bGUsIEh0dHBDbGllbnQsIEhUVFBfSU5URVJDRVBUT1JTfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLCBOb29wQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSwgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbi8vaW1wb3J0ICogYXMgb2wgZnJvbSAnb3BlbmxheWVycyc7XHJcbmltcG9ydCB7VHJhbnNsYXRlTW9kdWxlLCBUcmFuc2xhdGVMb2FkZXIsVHJhbnNsYXRlU2VydmljZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcblxyXG5cclxuaW1wb3J0IHsgQW5ndWxhckhhbE1vZHVsZSB9IGZyb20gJ0BzaXRtdW4vZnJvbnRlbmQtY29yZSc7XHJcblxyXG5cclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7U2l0bXVuRnJvbnRlbmRDb3JlTW9kdWxlfSBmcm9tICdAc2l0bXVuL2Zyb250ZW5kLWNvcmUnO1xyXG5pbXBvcnQgeyBEYXRhR3JpZENvbXBvbmVudCB9IGZyb20gJy4vZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBZ0dyaWRNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYW5ndWxhcic7XHJcblxyXG5cclxuXHJcblxyXG4vKiogU0lUTVVOIHBsdWdpbiBjb3JlIG1vZHVsZSAqL1xyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIFJvdXRlck1vZHVsZSxcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIE5vb3BBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQW5ndWxhckhhbE1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIEFnR3JpZE1vZHVsZS53aXRoQ29tcG9uZW50cyhbXSksXHJcbiAgICBTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGUsXHJcbiBcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRGF0YUdyaWRDb21wb25lbnRcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBOb29wQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIEFuZ3VsYXJIYWxNb2R1bGUsXHJcbiAgICBUcmFuc2xhdGVNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgRGF0YUdyaWRDb21wb25lbnQsXHJcbiAgICBTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaXRtdW5Gcm9udGVuZEd1aU1vZHVsZSB7XHJcbn1cclxuIl19