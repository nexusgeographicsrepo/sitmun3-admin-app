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
        this.remove = new EventEmitter();
        this.new = new EventEmitter();
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
        params.api.sizeColumnsToFit();
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
            // this.gridApi.setRowData(items);
        });
    }
    /**
     * @return {?}
     */
    removeData() {
        /** @type {?} */
        let selectedNodes = this.gridApi.getSelectedNodes();
        /** @type {?} */
        let selectedData = selectedNodes.map(node => node.data);
        console.log(selectedData);
        this.remove.emit(selectedData);
    }
    /**
     * @return {?}
     */
    newData() {
        this.new.emit(true);
    }
}
DataGridComponent.ɵfac = function DataGridComponent_Factory(t) { return new (t || DataGridComponent)(); };
DataGridComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: DataGridComponent, selectors: [["app-data-grid"]], inputs: { columnDefs: "columnDefs", getAll: "getAll" }, outputs: { remove: "remove", new: "new" }, decls: 13, vars: 7, consts: [[1, "container", 2, "margin", "50px"], [3, "click"], [1, "row"], [1, "col-12", "text-left"], ["type", "text", "placeholder", "", "ml-2", "", 3, "ngModel", "keyup", "ngModelChange"], ["id", "myGrid", 1, "ag-theme-balham", "col-12"], ["rowSelection", "multiple", 1, "ag-theme-balham", 2, "width", "750px", "height", "750px", 3, "floatingFilter", "rowData", "columnDefs", "animateRows", "pagination", "modules", "gridReady"]], template: function DataGridComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "button", 1);
        ɵngcc0.ɵɵlistener("click", function DataGridComponent_Template_button_click_1_listener() { return ctx.removeData(); });
        ɵngcc0.ɵɵtext(2, "Remove");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(3, "button", 1);
        ɵngcc0.ɵɵlistener("click", function DataGridComponent_Template_button_click_3_listener() { return ctx.newData(); });
        ɵngcc0.ɵɵtext(4, "New");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(5, "div", 2);
        ɵngcc0.ɵɵelementStart(6, "div", 3);
        ɵngcc0.ɵɵelementStart(7, "label");
        ɵngcc0.ɵɵtext(8, "Search ");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(9, "input", 4);
        ɵngcc0.ɵɵlistener("keyup", function DataGridComponent_Template_input_keyup_9_listener() { return ctx.quickSearch(); })("ngModelChange", function DataGridComponent_Template_input_ngModelChange_9_listener($event) { return ctx.searchValue = $event; });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(10, "div", 2);
        ɵngcc0.ɵɵelementStart(11, "div", 5);
        ɵngcc0.ɵɵelementStart(12, "ag-grid-angular", 6);
        ɵngcc0.ɵɵlistener("gridReady", function DataGridComponent_Template_ag_grid_angular_gridReady_12_listener($event) { return ctx.onGridReady($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(9);
        ɵngcc0.ɵɵproperty("ngModel", ctx.searchValue);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("floatingFilter", true)("rowData", ctx.rowData)("columnDefs", ctx.columnDefs)("animateRows", true)("pagination", false)("modules", ctx.modules);
    } }, directives: [ɵngcc1.DefaultValueAccessor, ɵngcc1.NgControlStatus, ɵngcc1.NgModel, ɵngcc2.AgGridAngular], styles: ["label[_ngcontent-%COMP%]{display:inline-block;margin-right:5px;margin-left:5px;margin-top:5px}"] });
/** @nocollapse */
DataGridComponent.ctorParameters = () => [];
DataGridComponent.propDecorators = {
    columnDefs: [{ type: Input }],
    getAll: [{ type: Input }],
    remove: [{ type: Output }],
    new: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DataGridComponent, [{
        type: Component,
        args: [{
                selector: 'app-data-grid',
                template: `<div class="container" style="margin: 50px;">


    
    <!-- <button class="btn btn-primary" (click)="removeElement()" > borrar </button> -->
    <button (click)="removeData()">Remove</button>
    <button (click)="newData()">New</button>
    <div class="row">
        <div class="col-12 text-left" >
            <label>Search </label>
            <input type="text" placeholder="" (keyup)="quickSearch()" [(ngModel)]="searchValue" ml-2 >
            
        </div>
    </div>

    <div class="row">
        <div class="ag-theme-balham col-12" id="myGrid">
            <ag-grid-angular
            style=" width: 750px; height: 750px;"
            class="ag-theme-balham"
            [floatingFilter]="true"
            [rowData]="rowData"
            [columnDefs]="columnDefs"
            [animateRows]="true"
            [pagination]="false"
            [modules]="modules"            
            rowSelection="multiple"
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWd1aS5qcyIsInNvdXJjZXMiOlsiQHNpdG11bi9mcm9udGVuZC1ndWkvZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWd1aS9zaXRtdW4tZnJvbnRlbmQtZ3VpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4QkErREU7NEJBWm9CO0tBQW1CLFVBYXJDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztHQUNqQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksbEJBakVuQjtJQWlFK0IsRUFBRSxDQUFDLE1BQy9CLGJBbEV1QixJQStEeEI7aUNBS0EsUUFBUSx6Q0FKVix1QkFic0IsbUJBQW1CO09Ba0J0QyxQQWpCSCxRQVlJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQzs4QkFPbkMsOUJBTkYsUUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7RUFNckIsQ0FBQyxIQUxkLEtBQUc7R0FLaUIsSEFKcEI7T0FLSSxJQUFJLENBQUMsWkFKRjtBQUlTLEdBQUcsSEFEYjtDQUNtQixDQUFDLEdBQUcsQ0FBQyxTQUMxQixmQUZVLElBSFosUUFBUTtFQUtGLENBQUMsSEFKVCxLQUFHO0FBQ0g7RUFHc0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLHRCQUZuQztNQUdILElBQUksQ0FBQyxPQUFPLGxCQUZQO0FBRVEsQUFGVztDQUVGLEdBQUcsR0FBRyxDQUFDLFNBQzdCLElBQUksQ0FBQyx0QkFGSixJQUZILFdBQVcsQ0FBQyxNQUFNO09BSUEsRUFBRSxDQUFDLFNBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsOUJBSmQsUUFBRyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7V0FJQyxFQUFFLENBQUMsTUFFL0IscEJBTEgsUUFBSSxJQUFJLENB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QkFDekI7V0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBQ0s7QUFBQztBQUFDO0FBQUk7QUFFUDtBQUFrRTtBQUFJO0FBQUM7QUFBSTtBQUFrQztBQUFrRTtBQUFJO0FBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZ0dyaWRNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYW5ndWxhcic7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgTmdNb2R1bGUsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBbGxDb21tdW5pdHlNb2R1bGVzLCBNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYWxsLW1vZHVsZXMnO1xuXG5cblxuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWRhdGEtZ3JpZCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiIHN0eWxlPVwibWFyZ2luOiA1MHB4O1wiPlxuXG5cbiAgICBcbiAgICA8IS0tIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiAoY2xpY2spPVwicmVtb3ZlRWxlbWVudCgpXCIgPiBib3JyYXIgPC9idXR0b24+IC0tPlxuICAgIDxidXR0b24gKGNsaWNrKT1cInJlbW92ZURhdGEoKVwiPlJlbW92ZTwvYnV0dG9uPlxuICAgIDxidXR0b24gKGNsaWNrKT1cIm5ld0RhdGEoKVwiPk5ldzwvYnV0dG9uPlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMiB0ZXh0LWxlZnRcIiA+XG4gICAgICAgICAgICA8bGFiZWw+U2VhcmNoIDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlwiIChrZXl1cCk9XCJxdWlja1NlYXJjaCgpXCIgWyhuZ01vZGVsKV09XCJzZWFyY2hWYWx1ZVwiIG1sLTIgPlxuICAgICAgICAgICAgXG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGhlbWUtYmFsaGFtIGNvbC0xMlwiIGlkPVwibXlHcmlkXCI+XG4gICAgICAgICAgICA8YWctZ3JpZC1hbmd1bGFyXG4gICAgICAgICAgICBzdHlsZT1cIiB3aWR0aDogNzUwcHg7IGhlaWdodDogNzUwcHg7XCJcbiAgICAgICAgICAgIGNsYXNzPVwiYWctdGhlbWUtYmFsaGFtXCJcbiAgICAgICAgICAgIFtmbG9hdGluZ0ZpbHRlcl09XCJ0cnVlXCJcbiAgICAgICAgICAgIFtyb3dEYXRhXT1cInJvd0RhdGFcIlxuICAgICAgICAgICAgW2NvbHVtbkRlZnNdPVwiY29sdW1uRGVmc1wiXG4gICAgICAgICAgICBbYW5pbWF0ZVJvd3NdPVwidHJ1ZVwiXG4gICAgICAgICAgICBbcGFnaW5hdGlvbl09XCJmYWxzZVwiXG4gICAgICAgICAgICBbbW9kdWxlc109XCJtb2R1bGVzXCIgICAgICAgICAgICBcbiAgICAgICAgICAgIHJvd1NlbGVjdGlvbj1cIm11bHRpcGxlXCJcbiAgICAgICAgICAgIChncmlkUmVhZHkpPVwib25HcmlkUmVhZHkoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPC9hZy1ncmlkLWFuZ3VsYXI+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW2BsYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tcmlnaHQ6NXB4O21hcmdpbi1sZWZ0OjVweDttYXJnaW4tdG9wOjVweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgbW9kdWxlczogTW9kdWxlW10gPSBBbGxDb21tdW5pdHlNb2R1bGVzO1xuICBzZWFyY2hWYWx1ZTogc3RyaW5nO1xuICBwcml2YXRlIGdyaWRBcGk7XG4gIHByaXZhdGUgZ3JpZENvbHVtbkFwaTtcbiAgQElucHV0KCkgY29sdW1uRGVmczogYW55W107XG4gIHJvd0RhdGE6IGFueVtdO1xuICBASW5wdXQoKSBnZXRBbGw6ICgpID0+IE9ic2VydmFibGU8YW55PjtcblxuICBAT3V0cHV0KCkgcmVtb3ZlOiBFdmVudEVtaXR0ZXI8YW55W10+O1xuICBAT3V0cHV0KCkgbmV3OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj47XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLm5ldyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgb25HcmlkUmVhZHkocGFyYW1zKXtcbiAgICB0aGlzLmdyaWRBcGkgPSBwYXJhbXMuYXBpO1xuICAgIHRoaXMuZ3JpZENvbHVtbkFwaSA9IHBhcmFtcy5jb2x1bW5BcGk7XG4gICAgdGhpcy5ncmlkQXBpLnJvd0hlaWdodCA9IDEwMDtcbiAgICB0aGlzLmdldEVsZW1lbnRzKCk7XG4gICAgcGFyYW1zLmFwaS5zaXplQ29sdW1uc1RvRml0KCk7XG5cbiAgfVxuXG4gIHF1aWNrU2VhcmNoKCl7XG4gICAgICB0aGlzLmdyaWRBcGkuc2V0UXVpY2tGaWx0ZXIodGhpcy5zZWFyY2hWYWx1ZSk7XG4gIH1cblxuICBnZXRFbGVtZW50cygpXG4gIHtcbiAgICB0aGlzLmdldEFsbCgpXG4gICAgLnN1YnNjcmliZSgoaXRlbXMpID0+e1xuICAgICAgICBjb25zb2xlLmxvZyhpdGVtcyk7XG4gICAgICAgIHRoaXMucm93RGF0YT1pdGVtcztcbiAgICAgICAvLyB0aGlzLmdyaWRBcGkuc2V0Um93RGF0YShpdGVtcyk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZURhdGEoKSB7XG4gICAgbGV0IHNlbGVjdGVkTm9kZXMgPSB0aGlzLmdyaWRBcGkuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICBcdGxldCBzZWxlY3RlZERhdGEgPSBzZWxlY3RlZE5vZGVzLm1hcChub2RlID0+IG5vZGUuZGF0YSk7XG4gICAgY29uc29sZS5sb2coc2VsZWN0ZWREYXRhKTtcbiAgICB0aGlzLnJlbW92ZS5lbWl0KHNlbGVjdGVkRGF0YSk7XG59XG5cbiAgbmV3RGF0YSgpXG4gIHtcbiAgICB0aGlzLm5ldy5lbWl0KHRydWUpO1xuICB9XG5cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge0h0dHBDbGllbnRNb2R1bGUsIEh0dHBDbGllbnQsIEhUVFBfSU5URVJDRVBUT1JTfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLCBOb29wQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSwgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbi8vaW1wb3J0ICogYXMgb2wgZnJvbSAnb3BlbmxheWVycyc7XHJcbmltcG9ydCB7VHJhbnNsYXRlTW9kdWxlLCBUcmFuc2xhdGVMb2FkZXIsVHJhbnNsYXRlU2VydmljZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcblxyXG5cclxuaW1wb3J0IHsgQW5ndWxhckhhbE1vZHVsZSB9IGZyb20gJ0BzaXRtdW4vZnJvbnRlbmQtY29yZSc7XHJcblxyXG5cclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7U2l0bXVuRnJvbnRlbmRDb3JlTW9kdWxlfSBmcm9tICdAc2l0bXVuL2Zyb250ZW5kLWNvcmUnO1xyXG5pbXBvcnQgeyBEYXRhR3JpZENvbXBvbmVudCB9IGZyb20gJy4vZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBZ0dyaWRNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYW5ndWxhcic7XHJcblxyXG5cclxuXHJcblxyXG4vKiogU0lUTVVOIHBsdWdpbiBjb3JlIG1vZHVsZSAqL1xyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIFJvdXRlck1vZHVsZSxcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIE5vb3BBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQW5ndWxhckhhbE1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIEFnR3JpZE1vZHVsZS53aXRoQ29tcG9uZW50cyhbXSksXHJcbiAgICBTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGUsXHJcbiBcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRGF0YUdyaWRDb21wb25lbnRcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBOb29wQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIEFuZ3VsYXJIYWxNb2R1bGUsXHJcbiAgICBUcmFuc2xhdGVNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgRGF0YUdyaWRDb21wb25lbnQsXHJcbiAgICBTaXRtdW5Gcm9udGVuZENvcmVNb2R1bGVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaXRtdW5Gcm9udGVuZEd1aU1vZHVsZSB7XHJcbn1cclxuIl19