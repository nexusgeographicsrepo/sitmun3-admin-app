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
        this.set = new Set();
        this.remove = new EventEmitter();
        this.new = new EventEmitter();
        this.sendChanges = new EventEmitter();
        this.comptadorCanvis = 0;
        this.comptadorRedo = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} params
     * @return {?}
     */
    onGridReady(params) {
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
        this.remove.emit(selectedData);
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
        this.set.forEach(id => itemsChanged.push(this.gridApi.getRowNode(id).data));
        this.sendChanges.emit(itemsChanged);
        this.set.clear();
        this.comptadorCanvis = 0;
        this.comptadorRedo = 0;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onCellEditingStopped(e) {
        this.set.add(e.node.id);
        this.comptadorCanvis += 1;
        this.comptadorRedo = 0;
    }
    /**
     * @return {?}
     */
    deleteChanges() {
        for (let i = 0; i <= this.comptadorCanvis; i++) {
            this.gridApi.undoCellEditing();
        }
        this.set.clear();
        this.comptadorCanvis = 0;
        this.comptadorRedo = 0;
    }
    /**
     * @return {?}
     */
    undo() {
        this.gridApi.stopEditing(false);
        this.gridApi.undoCellEditing();
        if (this.comptadorCanvis > 0) {
            this.comptadorCanvis -= 1;
            this.comptadorRedo += 1;
        }
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
}
DataGridComponent.ɵfac = function DataGridComponent_Factory(t) { return new (t || DataGridComponent)(); };
DataGridComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: DataGridComponent, selectors: [["app-data-grid"]], inputs: { columnDefs: "columnDefs", getAll: "getAll" }, outputs: { remove: "remove", new: "new", sendChanges: "sendChanges" }, decls: 23, vars: 15, consts: [[1, "container", 2, "margin", "50px"], [1, "row"], [1, "text-left"], ["type", "text", "placeholder", "", "ml-2", "", 3, "ngModel", "keyup", "ngModelChange"], [1, "text-right", "btn-group-sm"], [1, "btn", "btn-danger", 3, "disabled", "click"], [1, "btn", "btn-warning", 3, "disabled", "click"], [1, "btn", "btn-success", 3, "disabled", "click"], [1, "btn", "btn-secondary", 3, "click"], [1, "btn", "btn-success", 3, "click"], ["id", "myGrid", 1, "ag-theme-balham"], ["rowSelection", "multiple", 1, "ag-theme-balham", 2, "width", "750px", "height", "500px", 3, "floatingFilter", "rowData", "columnDefs", "animateRows", "pagination", "modules", "undoRedoCellEditing", "undoRedoCellEditingLimit", "suppressRowClickSelection", "enableCellChangeFlash", "cellEditingStopped", "gridReady"]], template: function DataGridComponent_Template(rf, ctx) { if (rf & 1) {
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
        ɵngcc0.ɵɵelementStart(20, "div", 1);
        ɵngcc0.ɵɵelementStart(21, "div", 10);
        ɵngcc0.ɵɵelementStart(22, "ag-grid-angular", 11);
        ɵngcc0.ɵɵlistener("cellEditingStopped", function DataGridComponent_Template_ag_grid_angular_cellEditingStopped_22_listener($event) { return ctx.onCellEditingStopped($event); })("gridReady", function DataGridComponent_Template_ag_grid_angular_gridReady_22_listener($event) { return ctx.onGridReady($event); });
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
        ɵngcc0.ɵɵproperty("floatingFilter", true)("rowData", ctx.rowData)("columnDefs", ctx.columnDefs)("animateRows", true)("pagination", false)("modules", ctx.modules)("undoRedoCellEditing", true)("undoRedoCellEditingLimit", 200)("suppressRowClickSelection", true)("enableCellChangeFlash", true);
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
                template: `<div class="container" style="margin: 50px;"  >


    

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

    <div class="row">
        <div class="ag-theme-balham" id="myGrid" >
            <ag-grid-angular
            style=" width: 750px; height: 500px;"
            class="ag-theme-balham"
            [floatingFilter]="true"
            [rowData]="rowData"
            [columnDefs]="columnDefs"
            [animateRows]="true"
            [pagination]="false"
            [modules]="modules"     
            [undoRedoCellEditing]="true"    
            [undoRedoCellEditingLimit]= 200
            [suppressRowClickSelection]=true
            [enableCellChangeFlash]=true
            rowSelection="multiple"
            (cellEditingStopped)="onCellEditingStopped($event)"
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWd1aS5qcyIsInNvdXJjZXMiOlsiQHNpdG11bi9mcm9udGVuZC1ndWkvZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWd1aS9zaXRtdW4tZnJvbnRlbmQtZ3VpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4QkFvRkU7NEJBZm9CO0tBQW1CLHFCQUlwQixJQUFJLEdBQUcsRUFBVSxVQWFsQyxJQUFJLENBQUM7RUFBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUMseEJBdEZyQztPQXVGSSxJQUFJLENBQUMsR0FBRyxHQUFHLGxCQXZGVyxJQW9GeEI7RUFHaUIsWUFBWSxFQUFFLENBQUMsU0FDOUIsSUFBSSxDQUFDLFdBQVcsMUNBSHBCLHVCQWhCc0IsbUJBQW1CO0NBbUJsQixJQUFJLFlBQVksRUFBRSxDQUFDLFNBQ3RDLDdCQW5CSixtQkFHcUIsSUFBSSxHQUFHLEVBQVU7R0FnQjlCLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxTQUN6QixJQUFJLENBQUMsdENBaEJULFFBWUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1NBSWYsR0FBRyxDQUFDLENBQUMsTUFDeEIscEJBSkgsUUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7cUJBT2hDLFFBQVEsVUFDUCx2Q0FQSCxRQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztBQUMxQyxRQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO3VCQVEzQix2QkFQRixRQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0VBT2QsQ0FBQyxIQU5kLEtBQUc7R0FNaUIsSEFMcEI7T0FNSSxJQUFJLENBQUMsWkFKTDtBQUlZLEdBQUcsSEFEaEI7Q0FDc0IsQ0FBQyxHQUFHLENBQUMsU0FDMUIs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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUFFO0FBQUM7QUFBQztBQUFJO0FBR2Q7QUFHUztBQ3hGaEI7QUFBSTtBQUE2QjtBQTBEakM7QUFBZ0M7bURBakMvQixRQUFRLFNBQUMsa0JBQ1I7RUFBTyxFQUFFLHNCQUNQLFlBQVksc0JBQ1osZ0JBQWdCLHNCQUNoQixZQUFZLHNCQUNaLFdBQVcsc0JBQ1gsb0JBQW9CO29CQUNwQjtVQUFnQjtFQUNoQixtQkFBbUI7aUJBQ25CO2VBQXVCO0dBQ3ZCLFlBQVksQ0FBQztBQUFjLENBQUMsRUFBRSxDQUFDLHNCQUMvQjtpQkFBd0IsbUJBRXpCO2lCQUNELFlBQVksRUFBRTtRQUNaLGlCQUFpQjtLQUNsQixrQkFDRDtTQUFlLEVBQUUsRUFDaEI7U0FDRCxTQUFTLEVBQUU7Q0FDVixrQkFDRCxPQUFPLEVBQUU7b0JBQ1A7VUFBZ0I7T0FDaEIsWUFBWTtZQUNaLFdBQVc7T0FDWCxvQkFBb0Isc0JBQ3BCLGdCQUFnQixzQkFDaEIsZUFBZSxzQkFDZixtQkFBbUIsc0JBQ25CLGlCQUFpQixzQkFDakI7S0FBd0Isa0JBQ3pCO1dBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUNLO0FBQUM7QUFBQztBQUFJO0FBRVA7QUFBa0U7QUFBSTtBQUFDO0FBQUk7QUFBa0M7QUFBa0U7QUFBSTtBQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWdHcmlkTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nTW9kdWxlLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWxsQ29tbXVuaXR5TW9kdWxlcywgTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FsbC1tb2R1bGVzJztcblxuXG5cblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1kYXRhLWdyaWQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjb250YWluZXJcIiBzdHlsZT1cIm1hcmdpbjogNTBweDtcIiAgPlxuXG5cbiAgICBcblxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtbGVmdFwiID5cbiAgICAgICAgICAgIDxsYWJlbD5TZWFyY2ggPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiXCIgKGtleXVwKT1cInF1aWNrU2VhcmNoKClcIiBbKG5nTW9kZWwpXT1cInNlYXJjaFZhbHVlXCIgbWwtMiA+XG4gICAgICAgICAgICBcbiAgICAgICAgPC9kaXY+XG5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiIHRleHQtcmlnaHQgYnRuLWdyb3VwLXNtXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXJcIiAgKGNsaWNrKT1cImRlbGV0ZUNoYW5nZXMoKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JDYW52aXMgPD0gMFwiPkRlbGV0ZSBDaGFuZ2VzPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nXCIgKGNsaWNrKT1cInVuZG8oKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JDYW52aXMgPD0gMFwiID5VbmRvPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nXCIgKGNsaWNrKT1cInJlZG8oKVwiIFtkaXNhYmxlZF09XCJjb21wdGFkb3JSZWRvIDw9IDBcIj5SZWRvPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgKGNsaWNrKT1cImFwcGx5Q2hhbmdlcygpXCIgW2Rpc2FibGVkXT1cImNvbXB0YWRvckNhbnZpcyA8PSAwXCIgPkFwcGx5IENoYW5nZXM8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCIgdGV4dC1yaWdodCBidG4tZ3JvdXAtc21cIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiIChjbGljayk9XCJyZW1vdmVEYXRhKClcIj5SZW1vdmU8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIiAoY2xpY2spPVwibmV3RGF0YSgpXCI+TmV3PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRoZW1lLWJhbGhhbVwiIGlkPVwibXlHcmlkXCIgPlxuICAgICAgICAgICAgPGFnLWdyaWQtYW5ndWxhclxuICAgICAgICAgICAgc3R5bGU9XCIgd2lkdGg6IDc1MHB4OyBoZWlnaHQ6IDUwMHB4O1wiXG4gICAgICAgICAgICBjbGFzcz1cImFnLXRoZW1lLWJhbGhhbVwiXG4gICAgICAgICAgICBbZmxvYXRpbmdGaWx0ZXJdPVwidHJ1ZVwiXG4gICAgICAgICAgICBbcm93RGF0YV09XCJyb3dEYXRhXCJcbiAgICAgICAgICAgIFtjb2x1bW5EZWZzXT1cImNvbHVtbkRlZnNcIlxuICAgICAgICAgICAgW2FuaW1hdGVSb3dzXT1cInRydWVcIlxuICAgICAgICAgICAgW3BhZ2luYXRpb25dPVwiZmFsc2VcIlxuICAgICAgICAgICAgW21vZHVsZXNdPVwibW9kdWxlc1wiICAgICBcbiAgICAgICAgICAgIFt1bmRvUmVkb0NlbGxFZGl0aW5nXT1cInRydWVcIiAgICBcbiAgICAgICAgICAgIFt1bmRvUmVkb0NlbGxFZGl0aW5nTGltaXRdPSAyMDBcbiAgICAgICAgICAgIFtzdXBwcmVzc1Jvd0NsaWNrU2VsZWN0aW9uXT10cnVlXG4gICAgICAgICAgICBbZW5hYmxlQ2VsbENoYW5nZUZsYXNoXT10cnVlXG4gICAgICAgICAgICByb3dTZWxlY3Rpb249XCJtdWx0aXBsZVwiXG4gICAgICAgICAgICAoY2VsbEVkaXRpbmdTdG9wcGVkKT1cIm9uQ2VsbEVkaXRpbmdTdG9wcGVkKCRldmVudClcIlxuICAgICAgICAgICAgKGdyaWRSZWFkeSk9XCJvbkdyaWRSZWFkeSgkZXZlbnQpXCI+XG4gICAgICAgICAgICA8L2FnLWdyaWQtYW5ndWxhcj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuYCxcbiAgc3R5bGVzOiBbYGxhYmVse2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1yaWdodDo1cHg7bWFyZ2luLWxlZnQ6NXB4O21hcmdpbi10b3A6NXB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgbW9kdWxlczogTW9kdWxlW10gPSBBbGxDb21tdW5pdHlNb2R1bGVzO1xuICBzZWFyY2hWYWx1ZTogc3RyaW5nO1xuICBwcml2YXRlIGdyaWRBcGk7XG4gIHByaXZhdGUgZ3JpZENvbHVtbkFwaTtcbiAgc2V0OiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICByb3dEYXRhOiBhbnlbXTtcbiAgY29tcHRhZG9yQ2FudmlzOiBudW1iZXI7XG4gIGNvbXB0YWRvclJlZG86IG51bWJlcjtcbiAgQElucHV0KCkgY29sdW1uRGVmczogYW55W107XG4gIEBJbnB1dCgpIGdldEFsbDogKCkgPT4gT2JzZXJ2YWJsZTxhbnk+O1xuICBAT3V0cHV0KCkgcmVtb3ZlOiBFdmVudEVtaXR0ZXI8YW55W10+O1xuICBAT3V0cHV0KCkgbmV3OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj47XG4gIEBPdXRwdXQoKSBzZW5kQ2hhbmdlczogRXZlbnRFbWl0dGVyPGFueVtdPjtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgdGhpcy5yZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5uZXcgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5zZW5kQ2hhbmdlcyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcyA9IDA7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvID0gMDtcbiAgfVxuXG4gIFxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG9uR3JpZFJlYWR5KHBhcmFtcyl7XG4gICAgdGhpcy5ncmlkQXBpID0gcGFyYW1zLmFwaTtcbiAgICB0aGlzLmdyaWRDb2x1bW5BcGkgPSBwYXJhbXMuY29sdW1uQXBpO1xuICAgIHRoaXMuZ3JpZEFwaS5yb3dIZWlnaHQgPSAxMDA7XG4gICAgdGhpcy5nZXRFbGVtZW50cygpO1xuICAgIHRoaXMuZ3JpZEFwaS5zaXplQ29sdW1uc1RvRml0KCk7XG5cbiAgfVxuXG4gIHF1aWNrU2VhcmNoKCl7XG4gICAgICB0aGlzLmdyaWRBcGkuc2V0UXVpY2tGaWx0ZXIodGhpcy5zZWFyY2hWYWx1ZSk7XG4gIH1cblxuICBnZXRFbGVtZW50cygpXG4gIHtcbiAgICB0aGlzLmdldEFsbCgpXG4gICAgLnN1YnNjcmliZSgoaXRlbXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coaXRlbXMpO1xuICAgICAgICB0aGlzLnJvd0RhdGEgPSBpdGVtcztcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZURhdGEoKSB7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICBjb25zdCBzZWxlY3RlZE5vZGVzID0gdGhpcy5ncmlkQXBpLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgXHRjb25zdCBzZWxlY3RlZERhdGEgPSBzZWxlY3RlZE5vZGVzLm1hcChub2RlID0+IG5vZGUuZGF0YSk7XG4gICAgdGhpcy5yZW1vdmUuZW1pdChzZWxlY3RlZERhdGEpO1xufVxuXG4gIG5ld0RhdGEoKVxuICB7XG4gICAgdGhpcy5ncmlkQXBpLnN0b3BFZGl0aW5nKGZhbHNlKTtcbiAgICB0aGlzLm5ldy5lbWl0KHRydWUpO1xuICB9XG5cbiAgYXBwbHlDaGFuZ2VzKClcbiAge1xuICAgIGNvbnN0IGl0ZW1zQ2hhbmdlZDogYW55W10gPVtdO1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgdGhpcy5zZXQuZm9yRWFjaCggaWQgPT4gaXRlbXNDaGFuZ2VkLnB1c2godGhpcy5ncmlkQXBpLmdldFJvd05vZGUoaWQpLmRhdGEpKTtcbiAgICB0aGlzLnNlbmRDaGFuZ2VzLmVtaXQoaXRlbXNDaGFuZ2VkKTtcbiAgICB0aGlzLnNldC5jbGVhcigpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzPTA7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvPTA7XG4gIH1cblxuXG4gIG9uQ2VsbEVkaXRpbmdTdG9wcGVkKGUpXG4gIHtcbiAgICB0aGlzLnNldC5hZGQoZS5ub2RlLmlkKTtcbiAgICB0aGlzLmNvbXB0YWRvckNhbnZpcyArPSAxO1xuICAgIHRoaXMuY29tcHRhZG9yUmVkbz0wO1xuICB9XG5cbiAgZGVsZXRlQ2hhbmdlcygpXG4gIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDw9IHRoaXMuY29tcHRhZG9yQ2FudmlzOyBpKyspXG4gICAge1xuICAgICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpO1xuICAgIH1cbiAgICB0aGlzLnNldC5jbGVhcigpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzID0gMDtcbiAgICB0aGlzLmNvbXB0YWRvclJlZG89MDtcbiAgfVxuXG5cblxuICB1bmRvKCkge1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgdGhpcy5ncmlkQXBpLnVuZG9DZWxsRWRpdGluZygpO1xuICAgIGlmICh0aGlzLmNvbXB0YWRvckNhbnZpcyA+IDApIFxuICAgIHsgdGhpcy5jb21wdGFkb3JDYW52aXMgLT0gMTtcbiAgICAgIHRoaXMuY29tcHRhZG9yUmVkbyArPSAxO1xuICAgICB9XG4gIH1cblxuICByZWRvKCkge1xuICAgIHRoaXMuZ3JpZEFwaS5zdG9wRWRpdGluZyhmYWxzZSk7XG4gICAgdGhpcy5ncmlkQXBpLnJlZG9DZWxsRWRpdGluZygpO1xuICAgIHRoaXMuY29tcHRhZG9yQ2FudmlzICs9IDE7XG4gICAgdGhpcy5jb21wdGFkb3JSZWRvIC09IDE7XG4gIH1cblxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZSwgSHR0cENsaWVudCwgSFRUUF9JTlRFUkNFUFRPUlN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsIE5vb3BBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlLCBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuLy9pbXBvcnQgKiBhcyBvbCBmcm9tICdvcGVubGF5ZXJzJztcclxuaW1wb3J0IHtUcmFuc2xhdGVNb2R1bGUsIFRyYW5zbGF0ZUxvYWRlcixUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuXHJcblxyXG5pbXBvcnQgeyBBbmd1bGFySGFsTW9kdWxlIH0gZnJvbSAnQHNpdG11bi9mcm9udGVuZC1jb3JlJztcclxuXHJcblxyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHtTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGV9IGZyb20gJ0BzaXRtdW4vZnJvbnRlbmQtY29yZSc7XHJcbmltcG9ydCB7IERhdGFHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRhLWdyaWQvZGF0YS1ncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFnR3JpZE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbmd1bGFyJztcclxuXHJcblxyXG5cclxuXHJcbi8qKiBTSVRNVU4gcGx1Z2luIGNvcmUgbW9kdWxlICovXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgUm91dGVyTW9kdWxlLFxyXG4gICAgSHR0cENsaWVudE1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgTm9vcEFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICBBbmd1bGFySGFsTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQWdHcmlkTW9kdWxlLndpdGhDb21wb25lbnRzKFtdKSxcclxuICAgIFNpdG11bkZyb250ZW5kQ29yZU1vZHVsZSxcclxuIFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBEYXRhR3JpZENvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIE5vb3BBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQW5ndWxhckhhbE1vZHVsZSxcclxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBEYXRhR3JpZENvbXBvbmVudCxcclxuICAgIFNpdG11bkZyb250ZW5kQ29yZU1vZHVsZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNpdG11bkZyb250ZW5kR3VpTW9kdWxlIHtcclxufVxyXG4iXX0=