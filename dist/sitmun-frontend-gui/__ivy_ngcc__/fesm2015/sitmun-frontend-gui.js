import { Component, Input, NgModule } from '@angular/core';
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
        // this.gridApi.setRowData(this.getAll);
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
}
DataGridComponent.ɵfac = function DataGridComponent_Factory(t) { return new (t || DataGridComponent)(); };
DataGridComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: DataGridComponent, selectors: [["app-data-grid"]], inputs: { columnDefs: "columnDefs", getAll: "getAll" }, decls: 9, vars: 7, consts: [[1, "container", 2, "margin", "50px"], [1, "row"], [1, "col-12", "text-left"], ["type", "text", "placeholder", "", "ml-2", "", 3, "ngModel", "keyup", "ngModelChange"], ["id", "myGrid", 1, "ag-theme-balham", "col-12"], [1, "ag-theme-balham", 2, "width", "750px", "height", "750px", 3, "floatingFilter", "rowData", "columnDefs", "animateRows", "pagination", "modules", "gridReady"]], template: function DataGridComponent_Template(rf, ctx) { if (rf & 1) {
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
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(6, "div", 1);
        ɵngcc0.ɵɵelementStart(7, "div", 4);
        ɵngcc0.ɵɵelementStart(8, "ag-grid-angular", 5);
        ɵngcc0.ɵɵlistener("gridReady", function DataGridComponent_Template_ag_grid_angular_gridReady_8_listener($event) { return ctx.onGridReady($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(5);
        ɵngcc0.ɵɵproperty("ngModel", ctx.searchValue);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("floatingFilter", true)("rowData", ctx.rowData)("columnDefs", ctx.columnDefs)("animateRows", true)("pagination", false)("modules", ctx.modules);
    } }, directives: [ɵngcc1.DefaultValueAccessor, ɵngcc1.NgControlStatus, ɵngcc1.NgModel, ɵngcc2.AgGridAngular], styles: ["label[_ngcontent-%COMP%]{display:inline-block;margin-right:5px;margin-left:5px;margin-top:5px}"] });
/** @nocollapse */
DataGridComponent.ctorParameters = () => [];
DataGridComponent.propDecorators = {
    columnDefs: [{ type: Input }],
    getAll: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DataGridComponent, [{
        type: Component,
        args: [{
                selector: 'app-data-grid',
                template: `<div class="container" style="margin: 50px;">


    
    <!-- <button class="btn btn-primary" (click)="removeElement()" > borrar </button> -->

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
            (gridReady)="onGridReady($event)">
            </ag-grid-angular>
        </div>
    </div>
</div>

`,
                styles: [`label{display:inline-block;margin-right:5px;margin-left:5px;margin-top:5px}`]
            }]
    }], function () { return []; }, { columnDefs: [{
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0bXVuLWZyb250ZW5kLWd1aS5qcyIsInNvdXJjZXMiOlsiQHNpdG11bi9mcm9udGVuZC1ndWkvZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiLCJAc2l0bXVuL2Zyb250ZW5kLWd1aS9zaXRtdW4tZnJvbnRlbmQtZ3VpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4QkEyREU7NEJBVm9CO0tBQW1CLE9Ba0N0Qyx3Q0FFRDtNQUFRLFVBQ1AsaEJBdEZIO0FBQTBCLElBMkR4QjttQ0E2QkEsbkNBNUJGLHVCQVhzQixtQkFBbUI7RUF1QzVCLENBQUMsSEF0Q2QsS0FpQ0c7R0FLaUIsSEFKcEI7T0FLSSxJQUFJLENBQUMsWkFKRjtBQUlTLEdBQUcsSEFEYjtDQUNtQixDQUFDLEdBQUcsQ0FBQyxTQUMxQixmQUZVLElBSFosUUFBUTtFQUtGLENBQUMsSEFKVCxLQUFHO0FBQ0g7RUFHc0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLHRCQUZuQztNQUdILElBQUksQ0FBQyxPQUFPLGxCQUZQO0FBRVEsQUFGVztDQUVGLEdBQUcsR0FBRyxDQUFDLFJBRDVCLElBRkgsV0FBVyxDQUFDLE1BQU07QUFDbkIsUUFBRyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7S0FJMUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsNUNBSmYsUUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7YUFJWCxFQUFFLENBQUMsTUFFL0IsdEJBTEgsUUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7d0JBTy9CLFdBQVcsYUFDUCxoREFQTjtHQU9VLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQywzQkFOOUIsUUFBQSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7R0FNZSxDQUFDLFdBQVcsQ0FBQyxD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Ozs7OzBCQUNLO0FBQUM7QUFBQztBQUFJO0FBRVA7QUFBa0U7QUFBSTtBQUFDO0FBQUk7QUFBa0M7QUFBa0U7QUFBSTtBQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWdHcmlkTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nTW9kdWxlLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWxsQ29tbXVuaXR5TW9kdWxlcywgTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FsbC1tb2R1bGVzJztcblxuXG5cblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1kYXRhLWdyaWQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjb250YWluZXJcIiBzdHlsZT1cIm1hcmdpbjogNTBweDtcIj5cblxuXG4gICAgXG4gICAgPCEtLSA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgKGNsaWNrKT1cInJlbW92ZUVsZW1lbnQoKVwiID4gYm9ycmFyIDwvYnV0dG9uPiAtLT5cblxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMiB0ZXh0LWxlZnRcIiA+XG4gICAgICAgICAgICA8bGFiZWw+U2VhcmNoIDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlwiIChrZXl1cCk9XCJxdWlja1NlYXJjaCgpXCIgWyhuZ01vZGVsKV09XCJzZWFyY2hWYWx1ZVwiIG1sLTIgPlxuICAgICAgICAgICAgXG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGhlbWUtYmFsaGFtIGNvbC0xMlwiIGlkPVwibXlHcmlkXCI+XG4gICAgICAgICAgICA8YWctZ3JpZC1hbmd1bGFyXG4gICAgICAgICAgICBzdHlsZT1cIiB3aWR0aDogNzUwcHg7IGhlaWdodDogNzUwcHg7XCJcbiAgICAgICAgICAgIGNsYXNzPVwiYWctdGhlbWUtYmFsaGFtXCJcbiAgICAgICAgICAgIFtmbG9hdGluZ0ZpbHRlcl09XCJ0cnVlXCJcbiAgICAgICAgICAgIFtyb3dEYXRhXT1cInJvd0RhdGFcIlxuICAgICAgICAgICAgW2NvbHVtbkRlZnNdPVwiY29sdW1uRGVmc1wiXG4gICAgICAgICAgICBbYW5pbWF0ZVJvd3NdPVwidHJ1ZVwiXG4gICAgICAgICAgICBbcGFnaW5hdGlvbl09XCJmYWxzZVwiXG4gICAgICAgICAgICBbbW9kdWxlc109XCJtb2R1bGVzXCJcbiAgICAgICAgICAgIChncmlkUmVhZHkpPVwib25HcmlkUmVhZHkoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPC9hZy1ncmlkLWFuZ3VsYXI+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW2BsYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tcmlnaHQ6NXB4O21hcmdpbi1sZWZ0OjVweDttYXJnaW4tdG9wOjVweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgbW9kdWxlczogTW9kdWxlW10gPSBBbGxDb21tdW5pdHlNb2R1bGVzO1xuICBzZWFyY2hWYWx1ZTogc3RyaW5nO1xuICBwcml2YXRlIGdyaWRBcGk7XG4gIHByaXZhdGUgZ3JpZENvbHVtbkFwaTtcbiAgQElucHV0KCkgY29sdW1uRGVmczogYW55W107XG4gIHJvd0RhdGE6IGFueVtdO1xuICBASW5wdXQoKSBnZXRBbGw6ICgpID0+IE9ic2VydmFibGU8YW55PjtcbiAgLy8gQElucHV0KCkgcmVtb3ZlRnVuY3Rpb246IChpdGVtOiBhbnkpID0+IE9ic2VydmFibGU8YW55PjtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgbGV0IGdyaWRPcHRpb25zID0ge1xuICAgICAgZGVmYXVsdENvbERlZjoge1xuICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgZW5hYmxlUm93R3JvdXA6IHRydWUsXG4gICAgICAgIGVuYWJsZVBpdm90OiB0cnVlLFxuICAgICAgICBlbmFibGVWYWx1ZTogdHJ1ZSxcbiAgICAgICAgc29ydGFibGU6IHRydWUsXG4gICAgICAgIHJlc2l6YWJsZTogdHJ1ZSxcbiAgICAgICAgZmxleDogMSxcbiAgICAgICAgbWluV2lkdGg6IDEwMCxcbiAgICAgIH0sXG4gICAgICBzdXBwcmVzc1Jvd0NsaWNrU2VsZWN0aW9uOiB0cnVlLFxuICAgICAgZ3JvdXBTZWxlY3RzQ2hpbGRyZW46IHRydWUsXG4gICAgICBkZWJ1ZzogdHJ1ZSxcbiAgICAgIHJvd1NlbGVjdGlvbjogJ211bHRpcGxlJyxcbiAgICAgIHJvd0dyb3VwUGFuZWxTaG93OiAnYWx3YXlzJyxcbiAgICAgIHBpdm90UGFuZWxTaG93OiAnYWx3YXlzJyxcbiAgICAgIHBhZ2luYXRpb246IGZhbHNlLFxuICAgICAgZW5hYmxlUmFuZ2VTZWxlY3Rpb246IHRydWUsXG4gICAgfTtcblxuICBcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBvbkdyaWRSZWFkeShwYXJhbXMpe1xuICAgIHRoaXMuZ3JpZEFwaSA9IHBhcmFtcy5hcGk7XG4gICAgdGhpcy5ncmlkQ29sdW1uQXBpID0gcGFyYW1zLmNvbHVtbkFwaTtcbiAgICB0aGlzLmdyaWRBcGkucm93SGVpZ2h0ID0gMTAwO1xuICAgIC8vIHRoaXMuZ3JpZEFwaS5zZXRSb3dEYXRhKHRoaXMuZ2V0QWxsKTtcbiAgICB0aGlzLmdldEVsZW1lbnRzKCk7XG4gICAgcGFyYW1zLmFwaS5zaXplQ29sdW1uc1RvRml0KCk7XG5cbiAgfVxuXG4gIHF1aWNrU2VhcmNoKCl7XG4gICAgICB0aGlzLmdyaWRBcGkuc2V0UXVpY2tGaWx0ZXIodGhpcy5zZWFyY2hWYWx1ZSk7XG4gIH1cblxuICBnZXRFbGVtZW50cygpXG4gIHtcbiAgICB0aGlzLmdldEFsbCgpXG4gICAgLnN1YnNjcmliZSgoaXRlbXMpID0+e1xuICAgICAgICBjb25zb2xlLmxvZyhpdGVtcyk7XG4gICAgICAgIHRoaXMucm93RGF0YT1pdGVtcztcbiAgICAgICAvLyB0aGlzLmdyaWRBcGkuc2V0Um93RGF0YShpdGVtcyk7XG5cbiAgICB9KTtcbiAgfVxuXG5cbiAgLy8gcmVtb3ZlRWxlbWVudCgpXG4gIC8vIHtcbiAgLy8gICB0aGlzLnJlbW92ZUZ1bmN0aW9uKHRoaXMucm93RGF0YVswXSlcbiAgLy8gICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gIC8vICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgLy8gICB9IClcbiAgLy8gICAvLyB0aGlzLmdldEVsZW1lbnRzKCk7XG4gICAgXG4gIC8vIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlLCBIdHRwQ2xpZW50LCBIVFRQX0lOVEVSQ0VQVE9SU30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSwgTm9vcEFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUsIFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG4vL2ltcG9ydCAqIGFzIG9sIGZyb20gJ29wZW5sYXllcnMnO1xyXG5pbXBvcnQge1RyYW5zbGF0ZU1vZHVsZSwgVHJhbnNsYXRlTG9hZGVyLFRyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5cclxuXHJcbmltcG9ydCB7IEFuZ3VsYXJIYWxNb2R1bGUgfSBmcm9tICdAc2l0bXVuL2Zyb250ZW5kLWNvcmUnO1xyXG5cclxuXHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge1NpdG11bkZyb250ZW5kQ29yZU1vZHVsZX0gZnJvbSAnQHNpdG11bi9mcm9udGVuZC1jb3JlJztcclxuaW1wb3J0IHsgRGF0YUdyaWRDb21wb25lbnQgfSBmcm9tICcuL2RhdGEtZ3JpZC9kYXRhLWdyaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQWdHcmlkTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xyXG5cclxuXHJcblxyXG5cclxuLyoqIFNJVE1VTiBwbHVnaW4gY29yZSBtb2R1bGUgKi9cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBSb3V0ZXJNb2R1bGUsXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBOb29wQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIEFuZ3VsYXJIYWxNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICBBZ0dyaWRNb2R1bGUud2l0aENvbXBvbmVudHMoW10pLFxyXG4gICAgU2l0bXVuRnJvbnRlbmRDb3JlTW9kdWxlLFxyXG4gXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIERhdGFHcmlkQ29tcG9uZW50XHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgSHR0cENsaWVudE1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgTm9vcEFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICBBbmd1bGFySGFsTW9kdWxlLFxyXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIERhdGFHcmlkQ29tcG9uZW50LFxyXG4gICAgU2l0bXVuRnJvbnRlbmRDb3JlTW9kdWxlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2l0bXVuRnJvbnRlbmRHdWlNb2R1bGUge1xyXG59XHJcbiJdfQ==