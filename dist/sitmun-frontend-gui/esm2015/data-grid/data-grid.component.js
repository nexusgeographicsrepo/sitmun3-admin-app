/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
export class DataGridComponent {
    constructor() {
        this.modules = AllCommunityModules;
        /** @type {?} */
        let gridOptions = {
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
DataGridComponent.decorators = [
    { type: Component, args: [{
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
            },] },
];
/** @nocollapse */
DataGridComponent.ctorParameters = () => [];
DataGridComponent.propDecorators = {
    columnDefs: [{ type: Input }],
    getAll: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzaXRtdW4vZnJvbnRlbmQtZ3VpLyIsInNvdXJjZXMiOlsiZGF0YS1ncmlkL2RhdGEtZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLEtBQUssRUFBd0IsTUFBTSxlQUFlLENBQUM7QUFJekYsT0FBTyxFQUFFLG1CQUFtQixFQUFVLE1BQU0sZ0NBQWdDLENBQUM7QUEyQzdFLE1BQU07SUFZSjt1QkFWb0IsbUJBQW1COztRQVd0QyxJQUFJLFdBQVcsR0FBRztZQUNmLGFBQWEsRUFBRTtnQkFDYixRQUFRLEVBQUUsSUFBSTtnQkFDZCxjQUFjLEVBQUUsSUFBSTtnQkFDcEIsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixRQUFRLEVBQUUsSUFBSTtnQkFDZCxTQUFTLEVBQUUsSUFBSTtnQkFDZixJQUFJLEVBQUUsQ0FBQztnQkFDUCxRQUFRLEVBQUUsR0FBRzthQUNkO1lBQ0QseUJBQXlCLEVBQUUsSUFBSTtZQUMvQixvQkFBb0IsRUFBRSxJQUFJO1lBQzFCLEtBQUssRUFBRSxJQUFJO1lBQ1gsWUFBWSxFQUFFLFVBQVU7WUFDeEIsaUJBQWlCLEVBQUUsUUFBUTtZQUMzQixjQUFjLEVBQUUsUUFBUTtZQUN4QixVQUFVLEVBQUUsS0FBSztZQUNqQixvQkFBb0IsRUFBRSxJQUFJO1NBQzNCLENBQUM7S0FJSDs7OztJQUVELFFBQVE7S0FDUDs7Ozs7SUFFRCxXQUFXLENBQUMsTUFBTTtRQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQzs7UUFFN0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztLQUUvQjs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDakQ7Ozs7SUFFRCxXQUFXO1FBRVQsSUFBSSxDQUFDLE1BQU0sRUFBRTthQUNaLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUM7O1NBR3RCLENBQUMsQ0FBQztLQUNKOzs7WUFwR0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0ErQlg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsNkVBQTZFLENBQUM7YUFDeEY7Ozs7O3lCQU9FLEtBQUs7cUJBRUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFnR3JpZE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbmd1bGFyJztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ01vZHVsZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFsbENvbW11bml0eU1vZHVsZXMsIE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbGwtbW9kdWxlcyc7XG5cblxuXG5cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtZGF0YS1ncmlkJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCIgc3R5bGU9XCJtYXJnaW46IDUwcHg7XCI+XG5cblxuICAgIFxuICAgIDwhLS0gPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIChjbGljayk9XCJyZW1vdmVFbGVtZW50KClcIiA+IGJvcnJhciA8L2J1dHRvbj4gLS0+XG5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTIgdGV4dC1sZWZ0XCIgPlxuICAgICAgICAgICAgPGxhYmVsPlNlYXJjaCA8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJcIiAoa2V5dXApPVwicXVpY2tTZWFyY2goKVwiIFsobmdNb2RlbCldPVwic2VhcmNoVmFsdWVcIiBtbC0yID5cbiAgICAgICAgICAgIFxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRoZW1lLWJhbGhhbSBjb2wtMTJcIiBpZD1cIm15R3JpZFwiPlxuICAgICAgICAgICAgPGFnLWdyaWQtYW5ndWxhclxuICAgICAgICAgICAgc3R5bGU9XCIgd2lkdGg6IDc1MHB4OyBoZWlnaHQ6IDc1MHB4O1wiXG4gICAgICAgICAgICBjbGFzcz1cImFnLXRoZW1lLWJhbGhhbVwiXG4gICAgICAgICAgICBbZmxvYXRpbmdGaWx0ZXJdPVwidHJ1ZVwiXG4gICAgICAgICAgICBbcm93RGF0YV09XCJyb3dEYXRhXCJcbiAgICAgICAgICAgIFtjb2x1bW5EZWZzXT1cImNvbHVtbkRlZnNcIlxuICAgICAgICAgICAgW2FuaW1hdGVSb3dzXT1cInRydWVcIlxuICAgICAgICAgICAgW3BhZ2luYXRpb25dPVwiZmFsc2VcIlxuICAgICAgICAgICAgW21vZHVsZXNdPVwibW9kdWxlc1wiXG4gICAgICAgICAgICAoZ3JpZFJlYWR5KT1cIm9uR3JpZFJlYWR5KCRldmVudClcIj5cbiAgICAgICAgICAgIDwvYWctZ3JpZC1hbmd1bGFyPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG5gLFxuICBzdHlsZXM6IFtgbGFiZWx7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luLXJpZ2h0OjVweDttYXJnaW4tbGVmdDo1cHg7bWFyZ2luLXRvcDo1cHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGF0YUdyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIG1vZHVsZXM6IE1vZHVsZVtdID0gQWxsQ29tbXVuaXR5TW9kdWxlcztcbiAgc2VhcmNoVmFsdWU6IHN0cmluZztcbiAgcHJpdmF0ZSBncmlkQXBpO1xuICBwcml2YXRlIGdyaWRDb2x1bW5BcGk7XG4gIEBJbnB1dCgpIGNvbHVtbkRlZnM6IGFueVtdO1xuICByb3dEYXRhOiBhbnlbXTtcbiAgQElucHV0KCkgZ2V0QWxsOiAoKSA9PiBPYnNlcnZhYmxlPGFueT47XG4gIC8vIEBJbnB1dCgpIHJlbW92ZUZ1bmN0aW9uOiAoaXRlbTogYW55KSA9PiBPYnNlcnZhYmxlPGFueT47XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgIGxldCBncmlkT3B0aW9ucyA9IHtcbiAgICAgIGRlZmF1bHRDb2xEZWY6IHtcbiAgICAgICAgZWRpdGFibGU6IHRydWUsXG4gICAgICAgIGVuYWJsZVJvd0dyb3VwOiB0cnVlLFxuICAgICAgICBlbmFibGVQaXZvdDogdHJ1ZSxcbiAgICAgICAgZW5hYmxlVmFsdWU6IHRydWUsXG4gICAgICAgIHNvcnRhYmxlOiB0cnVlLFxuICAgICAgICByZXNpemFibGU6IHRydWUsXG4gICAgICAgIGZsZXg6IDEsXG4gICAgICAgIG1pbldpZHRoOiAxMDAsXG4gICAgICB9LFxuICAgICAgc3VwcHJlc3NSb3dDbGlja1NlbGVjdGlvbjogdHJ1ZSxcbiAgICAgIGdyb3VwU2VsZWN0c0NoaWxkcmVuOiB0cnVlLFxuICAgICAgZGVidWc6IHRydWUsXG4gICAgICByb3dTZWxlY3Rpb246ICdtdWx0aXBsZScsXG4gICAgICByb3dHcm91cFBhbmVsU2hvdzogJ2Fsd2F5cycsXG4gICAgICBwaXZvdFBhbmVsU2hvdzogJ2Fsd2F5cycsXG4gICAgICBwYWdpbmF0aW9uOiBmYWxzZSxcbiAgICAgIGVuYWJsZVJhbmdlU2VsZWN0aW9uOiB0cnVlLFxuICAgIH07XG5cbiAgXG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgb25HcmlkUmVhZHkocGFyYW1zKXtcbiAgICB0aGlzLmdyaWRBcGkgPSBwYXJhbXMuYXBpO1xuICAgIHRoaXMuZ3JpZENvbHVtbkFwaSA9IHBhcmFtcy5jb2x1bW5BcGk7XG4gICAgdGhpcy5ncmlkQXBpLnJvd0hlaWdodCA9IDEwMDtcbiAgICAvLyB0aGlzLmdyaWRBcGkuc2V0Um93RGF0YSh0aGlzLmdldEFsbCk7XG4gICAgdGhpcy5nZXRFbGVtZW50cygpO1xuICAgIHBhcmFtcy5hcGkuc2l6ZUNvbHVtbnNUb0ZpdCgpO1xuXG4gIH1cblxuICBxdWlja1NlYXJjaCgpe1xuICAgICAgdGhpcy5ncmlkQXBpLnNldFF1aWNrRmlsdGVyKHRoaXMuc2VhcmNoVmFsdWUpO1xuICB9XG5cbiAgZ2V0RWxlbWVudHMoKVxuICB7XG4gICAgdGhpcy5nZXRBbGwoKVxuICAgIC5zdWJzY3JpYmUoKGl0ZW1zKSA9PntcbiAgICAgICAgY29uc29sZS5sb2coaXRlbXMpO1xuICAgICAgICB0aGlzLnJvd0RhdGE9aXRlbXM7XG4gICAgICAgLy8gdGhpcy5ncmlkQXBpLnNldFJvd0RhdGEoaXRlbXMpO1xuXG4gICAgfSk7XG4gIH1cblxuXG4gIC8vIHJlbW92ZUVsZW1lbnQoKVxuICAvLyB7XG4gIC8vICAgdGhpcy5yZW1vdmVGdW5jdGlvbih0aGlzLnJvd0RhdGFbMF0pXG4gIC8vICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAvLyAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gIC8vICAgfSApXG4gIC8vICAgLy8gdGhpcy5nZXRFbGVtZW50cygpO1xuICAgIFxuICAvLyB9XG59XG4iXX0=