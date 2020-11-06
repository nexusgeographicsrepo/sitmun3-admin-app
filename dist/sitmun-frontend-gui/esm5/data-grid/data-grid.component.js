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
                    template: "<div class=\"container\" style=\"margin: 50px;\">\n\n\n    \n    <!-- <button class=\"btn btn-primary\" (click)=\"removeElement()\" > borrar </button> -->\n\n    <div class=\"row\">\n        <div class=\"col-12 text-left\" >\n            <label>Search </label>\n            <input type=\"text\" placeholder=\"\" (keyup)=\"quickSearch()\" [(ngModel)]=\"searchValue\" ml-2 >\n            \n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"ag-theme-balham col-12\" id=\"myGrid\">\n            <ag-grid-angular\n            style=\" width: 750px; height: 750px;\"\n            class=\"ag-theme-balham\"\n            [rowData]=\"rowData\"\n            [columnDefs]=\"columnDefs\"\n            [animateRows]=\"true\"\n            [pagination]=\"false\"\n            [modules]=\"modules\"\n            (gridReady)=\"onGridReady($event)\">\n            </ag-grid-angular>\n        </div>\n    </div>\n</div>\n\n",
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzaXRtdW4vZnJvbnRlbmQtZ3VpLyIsInNvdXJjZXMiOlsiZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLEtBQUssRUFBd0IsTUFBTSxlQUFlLENBQUM7QUFJekYsT0FBTyxFQUFFLG1CQUFtQixFQUFVLE1BQU0sZ0NBQWdDLENBQUM7O0lBbUQzRSwyREFBMkQ7SUFHM0Q7dUJBVm9CLG1CQUFtQjs7UUFXdEMsSUFBSSxXQUFXLEdBQUc7WUFDZixhQUFhLEVBQUU7Z0JBQ2IsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsY0FBYyxFQUFFLElBQUk7Z0JBQ3BCLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixXQUFXLEVBQUUsSUFBSTtnQkFDakIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsUUFBUSxFQUFFLEdBQUc7YUFDZDtZQUNELHlCQUF5QixFQUFFLElBQUk7WUFDL0Isb0JBQW9CLEVBQUUsSUFBSTtZQUMxQixLQUFLLEVBQUUsSUFBSTtZQUNYLFlBQVksRUFBRSxVQUFVO1lBQ3hCLGlCQUFpQixFQUFFLFFBQVE7WUFDM0IsY0FBYyxFQUFFLFFBQVE7WUFDeEIsVUFBVSxFQUFFLEtBQUs7WUFDakIsb0JBQW9CLEVBQUUsSUFBSTtTQUMzQixDQUFDO0tBSUg7Ozs7SUFFRCxvQ0FBUTs7O0lBQVI7S0FDQzs7Ozs7SUFFRCx1Q0FBVzs7OztJQUFYLFVBQVksTUFBTTtRQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQzs7UUFFN0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBRXBCOzs7O0lBRUQsdUNBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ2pEOzs7O0lBRUQsdUNBQVc7OztJQUFYO1FBQUEsaUJBU0M7UUFQQyxJQUFJLENBQUMsTUFBTSxFQUFFO2FBQ1osU0FBUyxDQUFDLFVBQUMsS0FBSztZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsS0FBSSxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUM7O1NBR3RCLENBQUMsQ0FBQztLQUNKOztnQkFsR0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsbzZCQThCWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyw2RUFBNkUsQ0FBQztpQkFDeEY7Ozs7OzZCQU9FLEtBQUs7eUJBRUwsS0FBSzs7NEJBdkRSOztTQStDYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZ0dyaWRNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYW5ndWxhcic7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgTmdNb2R1bGUsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBbGxDb21tdW5pdHlNb2R1bGVzLCBNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYWxsLW1vZHVsZXMnO1xuXG5cblxuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWRhdGEtZ3JpZCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiIHN0eWxlPVwibWFyZ2luOiA1MHB4O1wiPlxuXG5cbiAgICBcbiAgICA8IS0tIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiAoY2xpY2spPVwicmVtb3ZlRWxlbWVudCgpXCIgPiBib3JyYXIgPC9idXR0b24+IC0tPlxuXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyIHRleHQtbGVmdFwiID5cbiAgICAgICAgICAgIDxsYWJlbD5TZWFyY2ggPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiXCIgKGtleXVwKT1cInF1aWNrU2VhcmNoKClcIiBbKG5nTW9kZWwpXT1cInNlYXJjaFZhbHVlXCIgbWwtMiA+XG4gICAgICAgICAgICBcbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aGVtZS1iYWxoYW0gY29sLTEyXCIgaWQ9XCJteUdyaWRcIj5cbiAgICAgICAgICAgIDxhZy1ncmlkLWFuZ3VsYXJcbiAgICAgICAgICAgIHN0eWxlPVwiIHdpZHRoOiA3NTBweDsgaGVpZ2h0OiA3NTBweDtcIlxuICAgICAgICAgICAgY2xhc3M9XCJhZy10aGVtZS1iYWxoYW1cIlxuICAgICAgICAgICAgW3Jvd0RhdGFdPVwicm93RGF0YVwiXG4gICAgICAgICAgICBbY29sdW1uRGVmc109XCJjb2x1bW5EZWZzXCJcbiAgICAgICAgICAgIFthbmltYXRlUm93c109XCJ0cnVlXCJcbiAgICAgICAgICAgIFtwYWdpbmF0aW9uXT1cImZhbHNlXCJcbiAgICAgICAgICAgIFttb2R1bGVzXT1cIm1vZHVsZXNcIlxuICAgICAgICAgICAgKGdyaWRSZWFkeSk9XCJvbkdyaWRSZWFkeSgkZXZlbnQpXCI+XG4gICAgICAgICAgICA8L2FnLWdyaWQtYW5ndWxhcj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuYCxcbiAgc3R5bGVzOiBbYGxhYmVse2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1yaWdodDo1cHg7bWFyZ2luLWxlZnQ6NXB4O21hcmdpbi10b3A6NXB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBtb2R1bGVzOiBNb2R1bGVbXSA9IEFsbENvbW11bml0eU1vZHVsZXM7XG4gIHNlYXJjaFZhbHVlOiBzdHJpbmc7XG4gIHByaXZhdGUgZ3JpZEFwaTtcbiAgcHJpdmF0ZSBncmlkQ29sdW1uQXBpO1xuICBASW5wdXQoKSBjb2x1bW5EZWZzOiBhbnlbXTtcbiAgcm93RGF0YTogYW55W107XG4gIEBJbnB1dCgpIGdldEFsbDogKCkgPT4gT2JzZXJ2YWJsZTxhbnk+O1xuICAvLyBASW5wdXQoKSByZW1vdmVGdW5jdGlvbjogKGl0ZW06IGFueSkgPT4gT2JzZXJ2YWJsZTxhbnk+O1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICBsZXQgZ3JpZE9wdGlvbnMgPSB7XG4gICAgICBkZWZhdWx0Q29sRGVmOiB7XG4gICAgICAgIGVkaXRhYmxlOiB0cnVlLFxuICAgICAgICBlbmFibGVSb3dHcm91cDogdHJ1ZSxcbiAgICAgICAgZW5hYmxlUGl2b3Q6IHRydWUsXG4gICAgICAgIGVuYWJsZVZhbHVlOiB0cnVlLFxuICAgICAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgICAgICAgcmVzaXphYmxlOiB0cnVlLFxuICAgICAgICBmbGV4OiAxLFxuICAgICAgICBtaW5XaWR0aDogMTAwLFxuICAgICAgfSxcbiAgICAgIHN1cHByZXNzUm93Q2xpY2tTZWxlY3Rpb246IHRydWUsXG4gICAgICBncm91cFNlbGVjdHNDaGlsZHJlbjogdHJ1ZSxcbiAgICAgIGRlYnVnOiB0cnVlLFxuICAgICAgcm93U2VsZWN0aW9uOiAnbXVsdGlwbGUnLFxuICAgICAgcm93R3JvdXBQYW5lbFNob3c6ICdhbHdheXMnLFxuICAgICAgcGl2b3RQYW5lbFNob3c6ICdhbHdheXMnLFxuICAgICAgcGFnaW5hdGlvbjogZmFsc2UsXG4gICAgICBlbmFibGVSYW5nZVNlbGVjdGlvbjogdHJ1ZSxcbiAgICB9O1xuXG4gIFxuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG9uR3JpZFJlYWR5KHBhcmFtcyl7XG4gICAgdGhpcy5ncmlkQXBpID0gcGFyYW1zLmFwaTtcbiAgICB0aGlzLmdyaWRDb2x1bW5BcGkgPSBwYXJhbXMuY29sdW1uQXBpO1xuICAgIHRoaXMuZ3JpZEFwaS5yb3dIZWlnaHQgPSAxMDA7XG4gICAgLy8gdGhpcy5ncmlkQXBpLnNldFJvd0RhdGEodGhpcy5nZXRBbGwpO1xuICAgIHRoaXMuZ2V0RWxlbWVudHMoKTtcblxuICB9XG5cbiAgcXVpY2tTZWFyY2goKXtcbiAgICAgIHRoaXMuZ3JpZEFwaS5zZXRRdWlja0ZpbHRlcih0aGlzLnNlYXJjaFZhbHVlKTtcbiAgfVxuXG4gIGdldEVsZW1lbnRzKClcbiAge1xuICAgIHRoaXMuZ2V0QWxsKClcbiAgICAuc3Vic2NyaWJlKChpdGVtcykgPT57XG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW1zKTtcbiAgICAgICAgdGhpcy5yb3dEYXRhPWl0ZW1zO1xuICAgICAgIC8vIHRoaXMuZ3JpZEFwaS5zZXRSb3dEYXRhKGl0ZW1zKTtcblxuICAgIH0pO1xuICB9XG5cblxuICAvLyByZW1vdmVFbGVtZW50KClcbiAgLy8ge1xuICAvLyAgIHRoaXMucmVtb3ZlRnVuY3Rpb24odGhpcy5yb3dEYXRhWzBdKVxuICAvLyAgIC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgLy8gICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAvLyAgIH0gKVxuICAvLyAgIC8vIHRoaXMuZ2V0RWxlbWVudHMoKTtcbiAgICBcbiAgLy8gfVxufVxuIl19