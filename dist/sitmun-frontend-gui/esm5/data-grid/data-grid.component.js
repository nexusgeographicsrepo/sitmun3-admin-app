/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
var DataGridComponent = /** @class */ (function () {
    // @Input() removeFunction: (item: any) => Observable<any>;
    function DataGridComponent() {
        this.modules = AllCommunityModules;
        /** @type {?} */
        var gridOptions = {
            defaultColDef: {
                editable: true,
                enableRowGroup: true,
                enablePivot: true,
                enableValue: true,
                sortable: true,
                resizable: true,
                flex: 1,
                minWidth: 100,
            },
            suppressRowClickSelection: true,
            groupSelectsChildren: true,
            debug: true,
            rowSelection: 'multiple',
            rowGroupPanelShow: 'always',
            pivotPanelShow: 'always',
            pagination: false,
            enableRangeSelection: true,
        };
    }
    /**
     * @return {?}
     */
    DataGridComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} params
     * @return {?}
     */
    DataGridComponent.prototype.onGridReady = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.rowHeight = 100;
        // this.gridApi.setRowData(this.getAll);
        this.getElements();
        params.api.sizeColumnsToFit();
    };
    /**
     * @return {?}
     */
    DataGridComponent.prototype.quickSearch = /**
     * @return {?}
     */
    function () {
        this.gridApi.setQuickFilter(this.searchValue);
    };
    /**
     * @return {?}
     */
    DataGridComponent.prototype.getElements = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.getAll()
            .subscribe(function (items) {
            console.log(items);
            _this.rowData = items;
            // this.gridApi.setRowData(items);
        });
    };
    DataGridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-data-grid',
                    template: "<div class=\"container\" style=\"margin: 50px;\">\n\n\n    \n    <!-- <button class=\"btn btn-primary\" (click)=\"removeElement()\" > borrar </button> -->\n\n    <div class=\"row\">\n        <div class=\"col-12 text-left\" >\n            <label>Search </label>\n            <input type=\"text\" placeholder=\"\" (keyup)=\"quickSearch()\" [(ngModel)]=\"searchValue\" ml-2 >\n            \n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"ag-theme-balham col-12\" id=\"myGrid\">\n            <ag-grid-angular\n            style=\" width: 750px; height: 750px;\"\n            class=\"ag-theme-balham\"\n            [floatingFilter]=\"true\"\n            [rowData]=\"rowData\"\n            [columnDefs]=\"columnDefs\"\n            [animateRows]=\"true\"\n            [pagination]=\"false\"\n            [modules]=\"modules\"\n            (gridReady)=\"onGridReady($event)\">\n            </ag-grid-angular>\n        </div>\n    </div>\n</div>\n\n",
                    styles: ["label{display:inline-block;margin-right:5px;margin-left:5px;margin-top:5px}"]
                },] },
    ];
    /** @nocollapse */
    DataGridComponent.ctorParameters = function () { return []; };
    DataGridComponent.propDecorators = {
        columnDefs: [{ type: Input }],
        getAll: [{ type: Input }]
    };
    return DataGridComponent;
}());
export { DataGridComponent };
if (false) {
    /** @type {?} */
    DataGridComponent.prototype.modules;
    /** @type {?} */
    DataGridComponent.prototype.searchValue;
    /** @type {?} */
    DataGridComponent.prototype.gridApi;
    /** @type {?} */
    DataGridComponent.prototype.gridColumnApi;
    /** @type {?} */
    DataGridComponent.prototype.columnDefs;
    /** @type {?} */
    DataGridComponent.prototype.rowData;
    /** @type {?} */
    DataGridComponent.prototype.getAll;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzaXRtdW4vZnJvbnRlbmQtZ3VpLyIsInNvdXJjZXMiOlsiZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLEtBQUssRUFBd0IsTUFBTSxlQUFlLENBQUM7QUFJekYsT0FBTyxFQUFFLG1CQUFtQixFQUFVLE1BQU0sZ0NBQWdDLENBQUM7O0lBb0QzRSwyREFBMkQ7SUFHM0Q7dUJBVm9CLG1CQUFtQjs7UUFXdEMsSUFBSSxXQUFXLEdBQUc7WUFDZixhQUFhLEVBQUU7Z0JBQ2IsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsY0FBYyxFQUFFLElBQUk7Z0JBQ3BCLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixXQUFXLEVBQUUsSUFBSTtnQkFDakIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsUUFBUSxFQUFFLEdBQUc7YUFDZDtZQUNELHlCQUF5QixFQUFFLElBQUk7WUFDL0Isb0JBQW9CLEVBQUUsSUFBSTtZQUMxQixLQUFLLEVBQUUsSUFBSTtZQUNYLFlBQVksRUFBRSxVQUFVO1lBQ3hCLGlCQUFpQixFQUFFLFFBQVE7WUFDM0IsY0FBYyxFQUFFLFFBQVE7WUFDeEIsVUFBVSxFQUFFLEtBQUs7WUFDakIsb0JBQW9CLEVBQUUsSUFBSTtTQUMzQixDQUFDO0tBSUg7Ozs7SUFFRCxvQ0FBUTs7O0lBQVI7S0FDQzs7Ozs7SUFFRCx1Q0FBVzs7OztJQUFYLFVBQVksTUFBTTtRQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQzs7UUFFN0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztLQUUvQjs7OztJQUVELHVDQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUNqRDs7OztJQUVELHVDQUFXOzs7SUFBWDtRQUFBLGlCQVNDO1FBUEMsSUFBSSxDQUFDLE1BQU0sRUFBRTthQUNaLFNBQVMsQ0FBQyxVQUFDLEtBQUs7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxPQUFPLEdBQUMsS0FBSyxDQUFDOztTQUd0QixDQUFDLENBQUM7S0FDSjs7Z0JBcEdGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLDI4QkErQlg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsNkVBQTZFLENBQUM7aUJBQ3hGOzs7Ozs2QkFPRSxLQUFLO3lCQUVMLEtBQUs7OzRCQXhEUjs7U0FnRGEsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWdHcmlkTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nTW9kdWxlLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWxsQ29tbXVuaXR5TW9kdWxlcywgTW9kdWxlIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FsbC1tb2R1bGVzJztcblxuXG5cblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1kYXRhLWdyaWQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjb250YWluZXJcIiBzdHlsZT1cIm1hcmdpbjogNTBweDtcIj5cblxuXG4gICAgXG4gICAgPCEtLSA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgKGNsaWNrKT1cInJlbW92ZUVsZW1lbnQoKVwiID4gYm9ycmFyIDwvYnV0dG9uPiAtLT5cblxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMiB0ZXh0LWxlZnRcIiA+XG4gICAgICAgICAgICA8bGFiZWw+U2VhcmNoIDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlwiIChrZXl1cCk9XCJxdWlja1NlYXJjaCgpXCIgWyhuZ01vZGVsKV09XCJzZWFyY2hWYWx1ZVwiIG1sLTIgPlxuICAgICAgICAgICAgXG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGhlbWUtYmFsaGFtIGNvbC0xMlwiIGlkPVwibXlHcmlkXCI+XG4gICAgICAgICAgICA8YWctZ3JpZC1hbmd1bGFyXG4gICAgICAgICAgICBzdHlsZT1cIiB3aWR0aDogNzUwcHg7IGhlaWdodDogNzUwcHg7XCJcbiAgICAgICAgICAgIGNsYXNzPVwiYWctdGhlbWUtYmFsaGFtXCJcbiAgICAgICAgICAgIFtmbG9hdGluZ0ZpbHRlcl09XCJ0cnVlXCJcbiAgICAgICAgICAgIFtyb3dEYXRhXT1cInJvd0RhdGFcIlxuICAgICAgICAgICAgW2NvbHVtbkRlZnNdPVwiY29sdW1uRGVmc1wiXG4gICAgICAgICAgICBbYW5pbWF0ZVJvd3NdPVwidHJ1ZVwiXG4gICAgICAgICAgICBbcGFnaW5hdGlvbl09XCJmYWxzZVwiXG4gICAgICAgICAgICBbbW9kdWxlc109XCJtb2R1bGVzXCJcbiAgICAgICAgICAgIChncmlkUmVhZHkpPVwib25HcmlkUmVhZHkoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPC9hZy1ncmlkLWFuZ3VsYXI+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW2BsYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tcmlnaHQ6NXB4O21hcmdpbi1sZWZ0OjVweDttYXJnaW4tdG9wOjVweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgbW9kdWxlczogTW9kdWxlW10gPSBBbGxDb21tdW5pdHlNb2R1bGVzO1xuICBzZWFyY2hWYWx1ZTogc3RyaW5nO1xuICBwcml2YXRlIGdyaWRBcGk7XG4gIHByaXZhdGUgZ3JpZENvbHVtbkFwaTtcbiAgQElucHV0KCkgY29sdW1uRGVmczogYW55W107XG4gIHJvd0RhdGE6IGFueVtdO1xuICBASW5wdXQoKSBnZXRBbGw6ICgpID0+IE9ic2VydmFibGU8YW55PjtcbiAgLy8gQElucHV0KCkgcmVtb3ZlRnVuY3Rpb246IChpdGVtOiBhbnkpID0+IE9ic2VydmFibGU8YW55PjtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgbGV0IGdyaWRPcHRpb25zID0ge1xuICAgICAgZGVmYXVsdENvbERlZjoge1xuICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgZW5hYmxlUm93R3JvdXA6IHRydWUsXG4gICAgICAgIGVuYWJsZVBpdm90OiB0cnVlLFxuICAgICAgICBlbmFibGVWYWx1ZTogdHJ1ZSxcbiAgICAgICAgc29ydGFibGU6IHRydWUsXG4gICAgICAgIHJlc2l6YWJsZTogdHJ1ZSxcbiAgICAgICAgZmxleDogMSxcbiAgICAgICAgbWluV2lkdGg6IDEwMCxcbiAgICAgIH0sXG4gICAgICBzdXBwcmVzc1Jvd0NsaWNrU2VsZWN0aW9uOiB0cnVlLFxuICAgICAgZ3JvdXBTZWxlY3RzQ2hpbGRyZW46IHRydWUsXG4gICAgICBkZWJ1ZzogdHJ1ZSxcbiAgICAgIHJvd1NlbGVjdGlvbjogJ211bHRpcGxlJyxcbiAgICAgIHJvd0dyb3VwUGFuZWxTaG93OiAnYWx3YXlzJyxcbiAgICAgIHBpdm90UGFuZWxTaG93OiAnYWx3YXlzJyxcbiAgICAgIHBhZ2luYXRpb246IGZhbHNlLFxuICAgICAgZW5hYmxlUmFuZ2VTZWxlY3Rpb246IHRydWUsXG4gICAgfTtcblxuICBcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBvbkdyaWRSZWFkeShwYXJhbXMpe1xuICAgIHRoaXMuZ3JpZEFwaSA9IHBhcmFtcy5hcGk7XG4gICAgdGhpcy5ncmlkQ29sdW1uQXBpID0gcGFyYW1zLmNvbHVtbkFwaTtcbiAgICB0aGlzLmdyaWRBcGkucm93SGVpZ2h0ID0gMTAwO1xuICAgIC8vIHRoaXMuZ3JpZEFwaS5zZXRSb3dEYXRhKHRoaXMuZ2V0QWxsKTtcbiAgICB0aGlzLmdldEVsZW1lbnRzKCk7XG4gICAgcGFyYW1zLmFwaS5zaXplQ29sdW1uc1RvRml0KCk7XG5cbiAgfVxuXG4gIHF1aWNrU2VhcmNoKCl7XG4gICAgICB0aGlzLmdyaWRBcGkuc2V0UXVpY2tGaWx0ZXIodGhpcy5zZWFyY2hWYWx1ZSk7XG4gIH1cblxuICBnZXRFbGVtZW50cygpXG4gIHtcbiAgICB0aGlzLmdldEFsbCgpXG4gICAgLnN1YnNjcmliZSgoaXRlbXMpID0+e1xuICAgICAgICBjb25zb2xlLmxvZyhpdGVtcyk7XG4gICAgICAgIHRoaXMucm93RGF0YT1pdGVtcztcbiAgICAgICAvLyB0aGlzLmdyaWRBcGkuc2V0Um93RGF0YShpdGVtcyk7XG5cbiAgICB9KTtcbiAgfVxuXG5cbiAgLy8gcmVtb3ZlRWxlbWVudCgpXG4gIC8vIHtcbiAgLy8gICB0aGlzLnJlbW92ZUZ1bmN0aW9uKHRoaXMucm93RGF0YVswXSlcbiAgLy8gICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gIC8vICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgLy8gICB9IClcbiAgLy8gICAvLyB0aGlzLmdldEVsZW1lbnRzKCk7XG4gICAgXG4gIC8vIH1cbn1cbiJdfQ==